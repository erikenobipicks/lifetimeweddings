// Fire-and-forget POST to a Google Apps Script Web App that appends a row
// to Eric's master bookings spreadsheet (the one with the per-year tabs).
//
// Auth model: BOOKINGS_SHEET_WEBHOOK_URL is the exec endpoint published by
// Apps Script (anyone with the link can call). To prevent random POSTs from
// poisoning the sheet we ship BOOKINGS_SHEET_WEBHOOK_TOKEN in the payload —
// the Apps Script ignores any body where token != PROPERTIES.token.
//
// Both env vars optional. If either is missing we no-op silently (so dev /
// preview branches don't try to push test rows). Failures are logged but
// never thrown — the booking is already persisted, missing a sheet row is
// recoverable via the manual "Pujar al Sheet" button in /admin/bookings/[id].
//
// Apps Script template lives in docs/bookings-sheet-apps-script.gs (see PR
// description for the paste-ready code).

import type { Booking, BookingFormResponse } from '~/lib/bookings/types';

const IVA_DIVISOR = 1.21; // Spanish IVA general

interface SheetPayload {
  token: string;
  /** ISO 'YYYY-MM-DD' — the Apps Script picks the per-year tab from this. */
  weddingDate: string;
  /** Pre-joined display name, e.g. "Anna i Marc". Keeps the script trivial. */
  pareja: string;
  hora: string | null;
  lugarBoda: string;
  contractacio: string;
  /** All amounts in EUR (not cents) so the Sheet shows the values directly. */
  noIva: number;
  pago1: number;
  pago2: number;
  pago2Bis: number;
  pago3: number;
  pagoTotal: number;
  /** Echo of the booking id so a re-push can dedupe if the script wants to. */
  bookingId: string;
}

function buildPayload(
  booking: Booking,
  formResponse: BookingFormResponse | null,
  token: string,
): SheetPayload {
  const total = booking.packPriceCents / 100;
  const deposit = booking.depositCents / 100;
  const pago2 = total * 0.5;
  const pago3 = total * 0.2;

  const pareja =
    booking.coupleName2 && booking.coupleName2.trim().length > 0
      ? `${booking.coupleName1} i ${booking.coupleName2}`
      : booking.coupleName1;

  const hora = formResponse?.ceremonyTime ?? null;

  // Round to 2 decimals to avoid spurious 1234.5678999 trailing junk.
  const r2 = (n: number) => Math.round(n * 100) / 100;

  // Neutralise spreadsheet formula injection: a couple/venue value starting
  // with = + - @ would be evaluated as a live formula in the master sheet
  // (e.g. =HYPERLINK(...)). Prefix it with an apostrophe so it stays text.
  const sanitize = (v: string | null): string | null =>
    v && /^[=+\-@]/.test(v) ? `'${v}` : v;

  return {
    token,
    weddingDate: booking.weddingDate.toISOString().slice(0, 10),
    pareja: sanitize(pareja) ?? pareja,
    hora: sanitize(hora),
    lugarBoda: sanitize(booking.venueName) ?? booking.venueName,
    contractacio: sanitize(booking.packName) ?? booking.packName,
    noIva: r2(total / IVA_DIVISOR),
    pago1: r2(deposit),
    pago2: r2(pago2),
    pago2Bis: r2(pago2 / IVA_DIVISOR),
    pago3: r2(pago3),
    pagoTotal: r2(total),
    bookingId: booking.id,
  };
}

export interface PushResult {
  ok: boolean;
  reason?: 'not_configured' | 'http_error' | 'network_error';
  detail?: string;
}

/** Push a single booking to Eric's master sheet. Safe to await — never
 *  throws and never blocks the caller for more than 8 s (timeout). */
export async function pushBookingToSheet(
  booking: Booking,
  formResponse: BookingFormResponse | null,
): Promise<PushResult> {
  const url = (process.env.BOOKINGS_SHEET_WEBHOOK_URL ?? '').trim();
  const token = (process.env.BOOKINGS_SHEET_WEBHOOK_TOKEN ?? '').trim();
  if (!url || !token) {
    // Quiet by design: in dev / preview deploys this is the expected state.
    return { ok: false, reason: 'not_configured' };
  }

  const payload = buildPayload(booking, formResponse, token);

  // Apps Script web apps redirect through Google's auth proxy on the first
  // hop; redirect: 'follow' is the default but we set it explicitly so a
  // future fetch impl change doesn't silently break this.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      // eslint-disable-next-line no-console
      console.error('[sheets.bookings] HTTP', res.status, body.slice(0, 200));
      return { ok: false, reason: 'http_error', detail: `HTTP ${res.status}` };
    }
    // eslint-disable-next-line no-console
    console.log('[sheets.bookings] pushed', { bookingId: booking.id });
    return { ok: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[sheets.bookings] network error', err);
    return {
      ok: false,
      reason: 'network_error',
      detail: String((err as Error)?.message ?? err),
    };
  } finally {
    clearTimeout(timeout);
  }
}
