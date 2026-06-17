// Single source of truth for money math across the booking/payment system.
//
// Before this module the same logic lived in several places: euro parsing
// and discount math were copy-pasted in create.ts + update.ts, price
// formatting existed in 3-4 variants, the IVA rate was hardcoded in a few
// spots, and the payment calculator re-implemented the discount/VAT/tranche
// arithmetic inline. Everything money-related now flows through here so a
// rule only ever changes in one file.
//
// Two unit conventions live side by side on purpose:
//   - SERVER persistence works in integer CENTS (no float drift): the
//     *Cents helpers (eurosStringToCents, computeDiscountCents, formatEuros).
//   - The CLIENT payment calculator works in EUROS (what the operator types):
//     the *Euros helpers (parseEurosLoose, computeDiscountEuros,
//     paymentBreakdown, solveTranche).
// Both are safe to import from a browser <script> — this module is pure and
// pulls in no server-only dependencies (the PackAddon import is type-only).

import type { PackAddon } from '~/lib/bookings/types';

// ─── Constants ─────────────────────────────────────────────────────────────

/** Spanish general VAT, as a fraction (0.21 = 21 %). */
export const IVA_RATE = 0.21;
/** Multiplier to add VAT to a base (base * IVA_MULTIPLIER = gross). */
export const IVA_MULTIPLIER = 1 + IVA_RATE;

/** Default deposit as a fraction of the pack price (30 %). */
export const DEPOSIT_FRACTION = 0.3;

// Accepted price formats (Spanish-first, US fallback):
//   "3170"   "3170.00"   "3170,00"
//   "3.170"  "3.170,00"  "1.500.000,00"
// Spanish convention: "." = thousands separator, "," = decimal.
// US fallback: a bare "1500.00" with 1–2 trailing digits is treated as
// decimal so old quotes / picker output keep working.
export const SPANISH_EUROS_RE = /^(?:\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:[.,]\d{1,2})?)$/;

// ─── Parsing (string → cents) ────────────────────────────────────────────

/** Parse a strict Spanish (or US-style) euro string into integer cents.
 *  Returns NaN if the input is unparseable so the caller can reject it. */
export function eurosStringToCents(raw: string): number {
  const s = raw.trim();
  if (!SPANISH_EUROS_RE.test(s)) return NaN;
  // If a comma is present, it's the decimal — strip all dots (thousands)
  // and swap the comma. Without a comma, ".\d{3}" groups are thousands;
  // a lone ".\d{1,2}" tail is a decimal (US fallback).
  let normalized: string;
  if (s.includes(',')) {
    normalized = s.replace(/\./g, '').replace(',', '.');
  } else if (/^\d{1,3}(?:\.\d{3})+$/.test(s)) {
    normalized = s.replace(/\./g, '');
  } else {
    normalized = s;
  }
  const n = parseFloat(normalized);
  if (!Number.isFinite(n) || n < 0) return NaN;
  return Math.round(n * 100);
}

/** Parse a localised "1.290 €" / "1.290,50 €" price string into cents.
 *  Looser than eurosStringToCents: strips currency symbols and never fails
 *  (returns 0 for junk). For author-controlled catalog strings. */
export function parsePriceCents(price: string): number {
  const cleaned = price.replace(/[€\s]/g, '');
  if (!cleaned) return 0;
  const normalised = cleaned.replace(/\./g, '').replace(',', '.');
  const n = Number(normalised);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

/** Loose euro parse for live UI inputs: accepts "1500" or "1500,5", returns
 *  a float in euros (0 for empty/invalid). Used by the client calculator. */
export function parseEurosLoose(s: string | null | undefined): number {
  if (!s) return 0;
  const n = parseFloat(String(s).replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

// ─── Formatting (cents → string) ─────────────────────────────────────────

/** Format a cent amount back to "1.290 €" (no decimals when round). */
export function formatEuros(cents: number): string {
  const abs = Math.abs(cents);
  const euros = abs / 100;
  const isRound = abs % 100 === 0;
  const formatted = isRound
    ? new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(euros)
    : new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(euros);
  return `${cents < 0 ? '−' : ''}${formatted} €`;
}

/** Format a euro amount (float) — thin wrapper so the client calculator and
 *  the server share one currency style. */
export function formatEurosAmount(euros: number): string {
  return formatEuros(Math.round(euros * 100));
}

// ─── Textarea list parsing (server forms) ────────────────────────────────

/** Split a textarea into trimmed, non-empty lines. */
export function parseLines(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** Parse "Name | 290" add-on lines into {name, price_cents}. Skips lines
 *  without a pipe or with an unparseable price. */
export function parseAddons(raw: string | null | undefined): PackAddon[] {
  return parseLines(raw)
    .map((line): PackAddon | null => {
      // Split on the last "|" so names containing the pipe character
      // (unlikely but possible) don't break the parse.
      const idx = line.lastIndexOf('|');
      if (idx < 0) return null;
      const name = line.slice(0, idx).trim();
      const priceStr = line.slice(idx + 1).trim();
      if (!name) return null;
      const cents = eurosStringToCents(priceStr);
      if (Number.isNaN(cents)) return null;
      return { name, price_cents: cents };
    })
    .filter((x): x is PackAddon => x !== null);
}

// ─── Discount ────────────────────────────────────────────────────────────

/** Discount in CENTS for the server. `type` is 'percent' | 'amount'; for
 *  'percent' it's a % of `packCents` (capped at 100), for 'amount' it's an
 *  absolute euro value. 0 when value is empty / non-positive. */
export function computeDiscountCents(type: string, value: string, packCents: number): number {
  const v = parseFloat(value.trim().replace(',', '.'));
  if (!Number.isFinite(v) || v <= 0) return 0;
  if (type === 'percent') return Math.round((packCents * Math.min(v, 100)) / 100);
  if (type === 'amount') return Math.round(v * 100);
  return 0;
}

/** Discount in EUROS for the client calculator. Same rules as
 *  computeDiscountCents but in euros, and never exceeds the pack price. */
export function computeDiscountEuros(type: string, value: string | null | undefined, packEuros: number): number {
  const v = parseEurosLoose(value);
  if (v <= 0) return 0;
  const raw = type === 'percent' ? (packEuros * Math.min(v, 100)) / 100 : v;
  return Math.min(packEuros, raw);
}

// ─── Payment calculator (euros) ──────────────────────────────────────────
// The booking ficha lets the operator split the total into tranches:
//   reserva + 2n + 3r + efectiu(cash).
// The cash slice sits OUTSIDE the invoice, so the couple saves the VAT on
// that tram:
//   gross      = (pack − discount) + addons        (IVA included)
//   cashSaving = cash * IVA_RATE
//   net        = gross − cashSaving                (total actually collected)
//   invoiced   = gross − cash * IVA_MULTIPLIER     (amount that gets invoiced)
//   base       = invoiced / IVA_MULTIPLIER ; vat = invoiced − base

export interface PaymentInput {
  packEuros: number;
  discountEuros: number;
  addonsEuros: number;
  cashEuros: number;
  /** [reserva, 2n, 3r] in euros. */
  scheduled: [number, number, number];
}

export interface PaymentBreakdown {
  pack: number;
  discount: number;
  packNet: number;
  addons: number;
  gross: number;
  cash: number;
  cashSaving: number;
  net: number;
  scheduled: number;
  paid: number;
  invoiced: number;
  base: number;
  vat: number;
}

export function paymentBreakdown(input: PaymentInput): PaymentBreakdown {
  const pack = Math.max(0, input.packEuros);
  const discount = Math.min(pack, Math.max(0, input.discountEuros));
  const packNet = pack - discount;
  const addons = Math.max(0, input.addonsEuros);
  const gross = packNet + addons;
  const cash = Math.max(0, input.cashEuros);
  const cashSaving = cash * IVA_RATE;
  const net = gross - cashSaving;
  const s = input.scheduled;
  const scheduled = s[0] + s[1] + s[2];
  const paid = scheduled + cash;
  const invoiced = Math.max(0, gross - cash * IVA_MULTIPLIER);
  const base = invoiced / IVA_MULTIPLIER;
  const vat = invoiced - base;
  return { pack, discount, packNet, addons, gross, cash, cashSaving, net, scheduled, paid, invoiced, base, vat };
}

/** Solve the amount (rounded euros) that makes a given tranche "balance the
 *  books": the remaining amount after the other tranches. The cash slot is
 *  un-VAT'd (divided by the multiplier) since it's not invoiced. */
export function solveTranche(input: PaymentInput, slot: '0' | '1' | '2' | 'cash'): number {
  const st = paymentBreakdown(input);
  if (slot === 'cash') {
    return Math.max(0, Math.round((st.gross - st.scheduled) / IVA_MULTIPLIER));
  }
  const idx = Number(slot);
  const otherScheds = input.scheduled.reduce((acc, x, i) => (i === idx ? acc : acc + x), 0);
  return Math.max(0, Math.round(st.gross - st.cash * IVA_MULTIPLIER - otherScheds));
}
