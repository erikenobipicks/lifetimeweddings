// FacturaDirecta REST client — issues the deposit (anticipo) invoice for a
// signed booking once the operator confirms the deposit was received.
//
// Activation: this module is a NO-OP unless FACTURADIRECTA_API_KEY *and*
// FACTURADIRECTA_COMPANY_ID are set. That keeps dev and any environment
// without credentials safe. The single public helper is fail-soft (errors
// are logged, never thrown) — FacturaDirecta downtime must not break the
// admin "marcar dipòsit rebut" action.
//
// API shape (FacturaDirecta v3 — the modern JSON REST API, the one behind
// 3.facturadirecta.com / app.facturadirecta.com with granular API keys):
//   - Base URL is company-scoped:
//       https://app.facturadirecta.com/api/{COMPANY_ID}
//     (COMPANY_ID looks like "com_c6b526af-…", visible in the web app URL.)
//   - Auth: a single header  `facturadirecta-api-key: <key>`  (NOT
//     Authorization / NOT basic auth — that was the legacy XML API).
//   - Request + response bodies are JSON.
//   - Resources used here:
//       GET  /contacts?nif=…  → search a fiscal contact (best-effort dedupe)
//       POST /contacts        → create a fiscal contact (returns id "con_…")
//       POST /invoices        → create the invoice referencing contactId
//
// Verification note: this environment can't reach the FacturaDirecta API or
// its docs (network allowlist), so the invoice body (contactId/date/lines/
// taxes) is taken from the public quickstart, and the contact field names
// (name/nif/address/email/phone) plus the search param are best-effort. The
// request() error log includes FacturaDirecta's response body verbatim, so
// the first real call surfaces any field mismatch precisely. Because the
// whole module is env-gated and fail-soft, an imperfect shape can only ever
// log an error — never corrupt the booking flow.

import 'dotenv/config';

// Accept either the new name or the previous FACTURADIRECTA_API_TOKEN so an
// already-configured environment keeps working.
const API_KEY =
  process.env.FACTURADIRECTA_API_KEY ?? process.env.FACTURADIRECTA_API_TOKEN ?? '';
const COMPANY_ID = process.env.FACTURADIRECTA_COMPANY_ID ?? '';
const API_BASE = (
  process.env.FACTURADIRECTA_API_BASE ?? 'https://app.facturadirecta.com/api'
).replace(/\/$/, '');
/** Invoice series code (e.g. "2026"). Empty → FacturaDirecta account default. */
const INVOICE_SERIES =
  process.env.FACTURADIRECTA_INVOICE_SERIES ?? process.env.FACTURADIRECTA_INVOICE_SERIAL ?? '';
/** VAT rate applied to the deposit line, as a percentage. Spain standard 21. */
const IVA_RATE = Number(process.env.FACTURADIRECTA_IVA_RATE ?? '21');

/** Module is disabled (silently) when credentials are missing. */
function enabled(): boolean {
  return API_KEY.length > 0 && COMPANY_ID.length > 0;
}

/** Public: whether FacturaDirecta credentials are configured. Interactive
 *  callers (the one-click "Fer factura" button) use this to tell the operator
 *  "not configured" apart from "the API call failed". */
export function isFacturadirectaConfigured(): boolean {
  return enabled();
}

function baseUrl(): string {
  return `${API_BASE}/${COMPANY_ID}`;
}

// ─── HTTP ──────────────────────────────────────────────────────────────────

interface FdRequestInit {
  method: 'GET' | 'POST';
  path: string;
  body?: unknown;
}

async function request<T>({ method, path, body }: FdRequestInit): Promise<T> {
  const url = `${baseUrl()}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'facturadirecta-api-key': API_KEY,
      'Accept': 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    // FacturaDirecta v3 requires every write body wrapped in a `content`
    // envelope: { "content": { …fields } }. Without it the API returns 400
    // "/body/content: must have required property 'content'".
    body: body ? JSON.stringify({ content: body }) : undefined,
  });
  const text = await res.text().catch(() => '');
  if (!res.ok) {
    throw new Error(`facturadirecta ${method} ${path} → ${res.status} ${text.slice(0, 300)}`);
  }
  return (text ? JSON.parse(text) : {}) as T;
}

// ─── Contact upsert ──────────────────────────────────────────────────────────

interface ContactInput {
  name: string;
  nif: string;
  address?: string;
  email?: string;
  phone?: string;
}

// Responses may or may not come back wrapped in a `content` envelope and the
// list shape isn't documented for our reach, so every reader below is
// defensive: it unwraps `content` and tries a few common list keys.

/** The id of the first contact in a (possibly wrapped) search response. */
function firstContactId(res: any): string | null {
  const c = res?.content ?? res;
  const arr = Array.isArray(c) ? c : c?.contacts ?? c?.items ?? c?.rows ?? c?.data ?? [];
  const row = Array.isArray(arr) ? arr[0] : undefined;
  return row?.id ?? row?.main?.id ?? row?.content?.id ?? row?.content?.main?.id ?? null;
}

/** Find an existing fiscal contact by NIF, else create one. Returns the
 *  FacturaDirecta contact id ("con_…"). Search is best-effort: any failure
 *  falls through to a create. */
async function upsertContact(input: ContactInput): Promise<string> {
  if (input.nif) {
    try {
      const found = await request<any>({
        method: 'GET',
        path: `/contacts?nif=${encodeURIComponent(input.nif)}`,
      });
      const id = firstContactId(found);
      if (id) return id;
    } catch (err) {
      console.warn('[facturadirecta] contact search failed, creating instead', err);
    }
  }

  const created = await request<any>({
    method: 'POST',
    path: '/contacts',
    // The API nests a resource's primary fields under `content.main`.
    // request() adds the outer `content`, so we pass `{ main: {…} }` here.
    body: {
      main: {
        name: input.name,
        // Omit the NIF entirely when there isn't one — a simplified invoice
        // ("factura simplificada") is issued to a client without a tax code.
        ...(input.nif ? { nif: input.nif } : {}),
        ...(input.address ? { address: input.address } : {}),
        ...(input.email ? { email: input.email } : {}),
        ...(input.phone ? { phone: input.phone } : {}),
      },
    },
  });
  const contactId =
    created?.id ??
    created?.content?.id ??
    created?.content?.main?.id ??
    created?.main?.id ??
    created?.data?.id;
  if (!contactId) throw new Error('facturadirecta: created contact returned no id');
  return contactId;
}

// ─── Public helper (fail-soft) ───────────────────────────────────────────────

export interface IssueDepositInvoiceInput {
  /** Fiscal name on the invoice (billing name, or couple member 1). */
  clientName: string;
  /** DNI / NIF / NIE. */
  clientTaxCode: string;
  clientAddress?: string | null;
  clientEmail?: string | null;
  clientPhone?: string | null;
  /** Deposit amount in cents, VAT *included* (gross). The invoice line stores
   *  the net base (gross / (1 + IVA)) and VAT is added back via the line tax,
   *  so the document total matches this gross figure. */
  depositCents: number;
  /** Human description for the invoice line. */
  description: string;
  /** Invoice issue date. Defaults to today. */
  invoiceDate?: Date;
}

export interface IssuedInvoice {
  id: string;
  number: string | null;
}

/** Create the deposit invoice. Returns the new invoice id/number, or null
 *  when the module is disabled or the call failed (both non-fatal — the
 *  caller treats null as "nothing persisted, can retry later"). */
export async function issueDepositInvoice(
  input: IssueDepositInvoiceInput,
): Promise<IssuedInvoice | null> {
  if (!enabled()) return null;
  try {
    const contactId = await upsertContact({
      name: input.clientName,
      nif: input.clientTaxCode,
      address: input.clientAddress ?? undefined,
      email: input.clientEmail ?? undefined,
      phone: input.clientPhone ?? undefined,
    });

    // deposit_cents is gross (VAT included). Recover the net base so that
    // base + IVA% ≈ deposit. Kept to 2 decimals (euros) for the line.
    const grossEuros = input.depositCents / 100;
    const netEuros = grossEuros / (1 + IVA_RATE / 100);
    const unitPrice = Number(netEuros.toFixed(2));

    const date = (input.invoiceDate ?? new Date()).toISOString().slice(0, 10);

    const res = await request<any>({
      method: 'POST',
      path: '/invoices',
      // Same envelope as contacts: header fields under `content.main`, with the
      // line items alongside as `lines`. request() adds the outer `content`.
      body: {
        main: {
          contactId,
          date,
          ...(INVOICE_SERIES ? { series: INVOICE_SERIES } : {}),
        },
        lines: [
          {
            description: input.description,
            quantity: 1,
            unitPrice,
            taxes: [{ name: 'IVA', percent: IVA_RATE }],
          },
        ],
      },
    });

    const inv = res?.content ?? res;
    const invMain = inv?.main ?? inv;
    const invId = invMain?.id ?? inv?.id ?? inv?.data?.id;
    if (!invId) throw new Error('facturadirecta: created invoice returned no id');
    return {
      id: invId,
      number: invMain?.number ?? invMain?.code ?? inv?.number ?? inv?.invoiceNumber ?? null,
    };
  } catch (err) {
    console.error('[facturadirecta] issueDepositInvoice failed (non-fatal)', err);
    return null;
  }
}
