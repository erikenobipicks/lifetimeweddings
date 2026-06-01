// FacturaDirecta REST client — issues the deposit (anticipo) invoice for a
// signed booking once the operator confirms the deposit was received.
//
// Activation: this module is a NO-OP unless FACTURADIRECTA_API_TOKEN *and*
// FACTURADIRECTA_API_BASE are set. That keeps dev and any environment
// without credentials safe. The single public helper is fail-soft (errors
// are logged, never thrown) — FacturaDirecta downtime must not break the
// admin "marcar dipòsit rebut" action.
//
// API shape (FacturaDirecta legacy XML REST API):
//   - Base URL is account-scoped: https://<account>.facturadirecta.com/api
//   - Auth: HTTP Basic, api-token as the username and any string ("x") as
//     the password.  (curl -u <token>:x)
//   - Request + response bodies are XML; we set Accept/Content-Type to
//     application/xml.
//   - Resources used here:
//       POST /clients/companies.xml  → create a fiscal client (company)
//       GET  /clients/companies.xml  → search (best-effort dedupe by taxCode)
//       POST /invoices.xml           → issue an invoice
//
// The exact element names below follow the public legacy docs
// (dev.facturadirecta.com). They should be confirmed against the live
// account once a real token is in hand — but because the whole module is
// env-gated and fail-soft, an imperfect shape can only ever log an error,
// never corrupt the booking flow. No XML library is pulled in: we build the
// payload as strings (escaped) and extract ids with a narrow regex, matching
// the dependency-free convention of the rest of the repo.

import 'dotenv/config';

const API_TOKEN = process.env.FACTURADIRECTA_API_TOKEN ?? '';
const API_BASE = (process.env.FACTURADIRECTA_API_BASE ?? '').replace(/\/$/, '');
/** Invoice series/serial (e.g. "2026"). Empty → let FacturaDirecta apply the
 *  account default. */
const INVOICE_SERIAL = process.env.FACTURADIRECTA_INVOICE_SERIAL ?? '';
/** VAT rate applied to the deposit line, as a percentage. Spain standard 21. */
const IVA_RATE = Number(process.env.FACTURADIRECTA_IVA_RATE ?? '21');
/** Optional catalogue product code to stamp on the deposit line. */
const DEPOSIT_PRODUCT_CODE = process.env.FACTURADIRECTA_DEPOSIT_PRODUCT_CODE ?? '';

/** Module is disabled (silently) when credentials are missing. */
function enabled(): boolean {
  return API_TOKEN.length > 0 && API_BASE.length > 0;
}

// ─── HTTP ──────────────────────────────────────────────────────────────────

interface FdRequestInit {
  method: 'GET' | 'POST';
  path: string;
  /** Raw XML body for POSTs. */
  body?: string;
}

async function request({ method, path, body }: FdRequestInit): Promise<string> {
  const url = `${API_BASE}${path}`;
  // Basic auth: token as user, "x" as a throwaway password.
  const auth = Buffer.from(`${API_TOKEN}:x`).toString('base64');
  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/xml',
      ...(body ? { 'Content-Type': 'application/xml' } : {}),
    },
    body,
  });
  const text = await res.text().catch(() => '');
  if (!res.ok) {
    throw new Error(`facturadirecta ${method} ${path} → ${res.status} ${text.slice(0, 200)}`);
  }
  return text;
}

// ─── XML helpers (dependency-free) ───────────────────────────────────────────

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Extract the first <tag>…</tag> text from an XML string, or null. Used to
 *  read back the created resource id without a full XML parser. */
function firstTag(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? m[1].trim() : null;
}

// ─── Client (company) upsert ─────────────────────────────────────────────────

interface ClientInput {
  name: string;
  taxCode: string;
  address?: string;
  email?: string;
  phone?: string;
}

/** Find an existing fiscal client by taxCode, else create one. Returns the
 *  FacturaDirecta company id. Search is best-effort: any failure falls
 *  through to a create (FacturaDirecta dedupes on taxCode on its side). */
async function upsertClientCompany(input: ClientInput): Promise<string> {
  if (input.taxCode) {
    try {
      const found = await request({
        method: 'GET',
        path: `/clients/companies.xml?taxCode=${encodeURIComponent(input.taxCode)}`,
      });
      const id = firstTag(found, 'id');
      if (id) return id;
    } catch (err) {
      console.warn('[facturadirecta] client search failed, creating instead', err);
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<company>` +
    `<name>${escapeXml(input.name)}</name>` +
    `<taxCode>${escapeXml(input.taxCode)}</taxCode>` +
    (input.address ? `<address>${escapeXml(input.address)}</address>` : '') +
    (input.email ? `<email>${escapeXml(input.email)}</email>` : '') +
    (input.phone ? `<phone>${escapeXml(input.phone)}</phone>` : '') +
    `</company>`;

  const created = await request({ method: 'POST', path: '/clients/companies.xml', body: xml });
  const id = firstTag(created, 'id');
  if (!id) throw new Error('facturadirecta: created client returned no id');
  return id;
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
   *  the net base (gross / (1 + IVA)) and VAT is added back at invoice level,
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

/** Create + issue the deposit invoice. Returns the new invoice id/number, or
 *  null when the module is disabled or the call failed (both are non-fatal —
 *  the caller treats a null as "nothing persisted, can retry later"). */
export async function issueDepositInvoice(
  input: IssueDepositInvoiceInput,
): Promise<IssuedInvoice | null> {
  if (!enabled()) return null;
  try {
    const clientId = await upsertClientCompany({
      name: input.clientName,
      taxCode: input.clientTaxCode,
      address: input.clientAddress ?? undefined,
      email: input.clientEmail ?? undefined,
      phone: input.clientPhone ?? undefined,
    });

    // deposit_cents is gross (VAT included). Recover the net base so that
    // base + IVA% ≈ deposit. Kept to 2 decimals (euros) for the line.
    const grossEuros = input.depositCents / 100;
    const netEuros = grossEuros / (1 + IVA_RATE / 100);
    const unitPrice = netEuros.toFixed(2);

    const date = (input.invoiceDate ?? new Date()).toISOString().slice(0, 10);

    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>` +
      `<invoice>` +
      `<client><id>${escapeXml(clientId)}</id></client>` +
      `<invoiceDate>${date}</invoiceDate>` +
      (INVOICE_SERIAL ? `<invoiceSerial>${escapeXml(INVOICE_SERIAL)}</invoiceSerial>` : '') +
      `<currency>EUR</currency>` +
      `<tax><name>IVA</name><rate>${IVA_RATE}</rate></tax>` +
      `<invoiceLines>` +
      `<invoiceLine>` +
      (DEPOSIT_PRODUCT_CODE ? `<productCode>${escapeXml(DEPOSIT_PRODUCT_CODE)}</productCode>` : '') +
      `<description>${escapeXml(input.description)}</description>` +
      `<quantity>1</quantity>` +
      `<unitPrice>${unitPrice}</unitPrice>` +
      `</invoiceLine>` +
      `</invoiceLines>` +
      `</invoice>`;

    const res = await request({ method: 'POST', path: '/invoices.xml', body: xml });
    const id = firstTag(res, 'id');
    if (!id) throw new Error('facturadirecta: created invoice returned no id');
    return { id, number: firstTag(res, 'invoiceNumber') };
  } catch (err) {
    console.error('[facturadirecta] issueDepositInvoice failed (non-fatal)', err);
    return null;
  }
}
