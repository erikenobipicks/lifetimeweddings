// FacturaDirecta v3 REST client — creates contacts and documents
// (albarà = deliveryNote, pressupost = estimate) from the admin.
//
// Implemented from the account's own API spec:
//   Base:   https://app.facturadirecta.com/api/{COMPANY}/{path}
//   Auth:   header `facturadirecta-api-key: {TOKEN}`  (NOT Bearer)
//   Bodies + responses are JSON, wrapped in a `content` envelope:
//     { "content": { "type": "...", "main": { …fields } } }
//
// Fail-soft by contract: every network call returns either the parsed JSON or
// a typed { _error, _msg } object (never throws), with a ~10 s timeout, so a
// FacturaDirecta outage can only ever surface an error the caller chooses to
// handle — it can't tumble the admin flow.

import 'dotenv/config';

// Credentials. The spec names them FACTURADIRECTA_TOKEN / _COMPANY; we also
// accept the previously-deployed names so an already-configured environment
// keeps working without a redeploy of its secrets.
const TOKEN =
  process.env.FACTURADIRECTA_TOKEN ??
  process.env.FACTURADIRECTA_API_KEY ??
  process.env.FACTURADIRECTA_API_TOKEN ??
  '';
const COMPANY =
  process.env.FACTURADIRECTA_COMPANY ?? process.env.FACTURADIRECTA_COMPANY_ID ?? '';
const API_BASE = (
  process.env.FACTURADIRECTA_API_BASE ?? 'https://app.facturadirecta.com/api'
).replace(/\/$/, '');

/** Albarà series (docNumber.series). Estimates deliberately omit the series so
 *  FacturaDirecta assigns its default. */
const DELIVERY_SERIES = process.env.FACTURADIRECTA_DELIVERY_SERIES ?? 'AL';
/** VAT rate as a percentage (Spain standard 21). Used only to recover the net
 *  base from a gross amount; the actual VAT is applied by the line tax code. */
const IVA_RATE = Number(process.env.FACTURADIRECTA_IVA_RATE ?? '21');
/** FacturaDirecta tax code for 21% VAT. */
const IVA_TAX_CODE = process.env.FACTURADIRECTA_IVA_TAX_CODE ?? 'S_IVA_21';

const TIMEOUT_MS = 10_000;

/** Public: whether FacturaDirecta credentials are configured. */
export function isFacturadirectaConfigured(): boolean {
  return TOKEN.length > 0 && COMPANY.length > 0;
}

// ─── Errors (returned, never thrown) ─────────────────────────────────────────

export interface FdError {
  /** HTTP status, or 'net' for network/timeout, or a short reason code. */
  _error: string | number;
  /** Response body (truncated) or error detail. */
  _msg: string;
}
export function isFdError(x: unknown): x is FdError {
  return !!x && typeof x === 'object' && '_error' in x;
}

// ─── HTTP ────────────────────────────────────────────────────────────────────

async function request(
  method: 'GET' | 'POST',
  path: string,
  body?: unknown,
): Promise<unknown> {
  const url = `${API_BASE}/${COMPANY}${path}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'facturadirecta-api-key': TOKEN,
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });
    const text = await res.text().catch(() => '');
    if (!res.ok) {
      return { _error: res.status, _msg: text.slice(0, 500) } satisfies FdError;
    }
    return text ? JSON.parse(text) : {};
  } catch (err) {
    return {
      _error: 'net',
      _msg: err instanceof Error ? err.message : String(err),
    } satisfies FdError;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Response id extraction ──────────────────────────────────────────────────

/** The id of a created/looked-up resource, checked across the documented
 *  shapes in order. */
function extractId(res: any): string | null {
  return (
    res?.id ??
    res?.uuid ??
    res?.contactId ??
    res?._id ??
    res?.content?.uuid ??
    res?.content?.id ??
    res?.content?.contactId ??
    res?.content?.main?.id ??
    res?.content?.main?.uuid ??
    null
  );
}

/** First item's id from a (possibly wrapped) list response. */
function firstItemId(res: any): string | null {
  const c = res?.content ?? res;
  const arr = Array.isArray(c) ? c : c?.items ?? c?.data ?? c?.contacts ?? c?.rows ?? [];
  const row = Array.isArray(arr) ? arr[0] : undefined;
  return row ? extractId(row) : null;
}

// ─── Contacts ────────────────────────────────────────────────────────────────

export interface ContactInput {
  /** Pre-linked FacturaDirecta contact id — used directly when present. */
  contactId?: string | null;
  name: string;
  /** NIF / DNI / NIE. Optional (a document to a client without tax code). */
  fiscalId?: string | null;
  phone?: string | null;
}

/** Resolve a contact id: pre-linked id → exact NIF match → name search (last
 *  resort) → create. Returns the contact id, or an FdError from the create. */
export async function findOrCreateContact(input: ContactInput): Promise<string | FdError> {
  if (input.contactId) return input.contactId;

  // Prefer an exact NIF match; only fall back to a name search when there is
  // no NIF, to avoid false positives that would merge different clients.
  if (input.fiscalId) {
    const byNif = await request('GET', `/contacts?fiscalId=${encodeURIComponent(input.fiscalId)}`);
    if (!isFdError(byNif)) {
      const id = firstItemId(byNif);
      if (id) return id;
    }
  } else if (input.name) {
    const byName = await request('GET', `/contacts?search=${encodeURIComponent(input.name)}`);
    if (!isFdError(byName)) {
      const id = firstItemId(byName);
      if (id) return id;
    }
  }

  const created = await request('POST', '/contacts', {
    content: {
      type: 'contact',
      main: {
        name: input.name,
        country: 'ES',
        currency: 'EUR',
        ...(input.fiscalId ? { fiscalId: input.fiscalId } : {}),
        ...(input.phone ? { phone: input.phone } : {}),
        accounts: { client: '430000', clientCredit: '438000' },
      },
    },
  });
  if (isFdError(created)) return created;
  const id = extractId(created);
  return id ?? { _error: 'no_id', _msg: 'contact created but no id in response' };
}

// ─── Documents (albarà / pressupost) ─────────────────────────────────────────

/** One document line, priced from a GROSS (VAT-included) amount. The line
 *  stores the net unit price (gross / 1+VAT) and the VAT is re-applied by the
 *  `S_IVA_21` tax code, so the line total matches the gross figure. */
export interface GrossLineInput {
  text: string;
  grossCents: number;
  quantity?: number;
}

function buildLine(line: GrossLineInput) {
  const quantity = line.quantity ?? 1;
  const grossEuros = line.grossCents / 100;
  const netEuros = grossEuros / (1 + IVA_RATE / 100);
  const unitPrice = Number((netEuros / quantity).toFixed(2));
  return { text: line.text, quantity, unitPrice, tax: [IVA_TAX_CODE] };
}

function extractDocNumber(res: any): string | null {
  const main = res?.content?.main ?? res?.main ?? res;
  const dn = main?.docNumber;
  const raw = (dn && typeof dn === 'object' ? (dn.number ?? dn.formatted ?? dn.value) : dn) ?? main?.number ?? res?.number;
  return raw == null ? null : String(raw);
}

export interface CreatedDocument {
  id: string;
  number: string | null;
}

export interface DocumentInput {
  contact: ContactInput;
  /** YYYY-MM-DD; defaults to today. */
  date?: string;
  notes?: string | null;
  lines: GrossLineInput[];
}

async function createDocument(
  kind: 'deliveryNote' | 'estimate',
  input: DocumentInput,
): Promise<CreatedDocument | FdError> {
  if (!isFacturadirectaConfigured()) {
    return { _error: 'unconfigured', _msg: 'FACTURADIRECTA_TOKEN / FACTURADIRECTA_COMPANY missing' };
  }
  const contact = await findOrCreateContact(input.contact);
  if (isFdError(contact)) return contact;

  const path = kind === 'deliveryNote' ? '/deliveryNotes' : '/estimates';
  const main: Record<string, unknown> = {
    contact,
    currency: 'EUR',
    baseState: 'pending',
    date: input.date ?? new Date().toISOString().slice(0, 10),
    ...(input.notes ? { notes: input.notes } : {}),
    lines: input.lines.map(buildLine),
  };
  // Albarà: fixed series "AL". Pressupost: let FacturaDirecta assign the series.
  if (kind === 'deliveryNote') main.docNumber = { series: DELIVERY_SERIES };

  const res = await request('POST', path, { content: { type: kind, main } });
  if (isFdError(res)) return res;
  const id = extractId(res);
  if (!id) return { _error: 'no_id', _msg: `${kind} created but no id in response` };
  return { id, number: extractDocNumber(res) };
}

/** Create an albarà (deliveryNote). */
export function createDeliveryNote(input: DocumentInput): Promise<CreatedDocument | FdError> {
  return createDocument('deliveryNote', input);
}

/** Create a pressupost (estimate). */
export function createEstimate(input: DocumentInput): Promise<CreatedDocument | FdError> {
  return createDocument('estimate', input);
}

// ─── Back-compat helper used by the booking invoicing flow ───────────────────
// The one-click flow issues an ALBARÀ for a payment/deposit. Kept under the
// original name + shape so its callers (bookings/invoicing.ts) stay unchanged;
// returns null on any failure (the error is logged with its FacturaDirecta body
// so the operator can see exactly what the API rejected).

export interface IssueDepositInvoiceInput {
  clientName: string;
  clientTaxCode: string;
  clientAddress?: string | null;
  clientEmail?: string | null;
  clientPhone?: string | null;
  /** Gross (VAT-included) amount in cents. */
  depositCents: number;
  description: string;
  invoiceDate?: Date;
}

export interface IssuedInvoice {
  id: string;
  number: string | null;
}

export async function issueDepositInvoice(
  input: IssueDepositInvoiceInput,
): Promise<IssuedInvoice | null> {
  const res = await createDeliveryNote({
    contact: {
      name: input.clientName,
      fiscalId: input.clientTaxCode || null,
      phone: input.clientPhone ?? null,
    },
    date: input.invoiceDate ? input.invoiceDate.toISOString().slice(0, 10) : undefined,
    notes: null,
    lines: [{ text: input.description, grossCents: input.depositCents }],
  });
  if (isFdError(res)) {
    console.error('[facturadirecta] createDeliveryNote failed (non-fatal)', res);
    return null;
  }
  return { id: res.id, number: res.number };
}
