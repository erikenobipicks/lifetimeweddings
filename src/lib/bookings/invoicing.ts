// Bridges a booking's "deposit received" event to FacturaDirecta: builds the
// fiscal payload from the booking + form response and issues the deposit
// (anticipo) invoice. Called from the admin flows that mark the deposit paid
// (/api/admin/bookings/[id] deposit_paid action and confirm-offline).
//
// Idempotent + fail-soft: a booking that already carries a FacturaDirecta
// invoice id is skipped, and any error inside issueDepositInvoice is
// swallowed there (returns null). The admin redirect never breaks because of
// billing.

import {
  getBookingById,
  getFormResponseForBooking,
  getPaymentById,
  setFacturadirectaInvoice,
  setPaymentInvoice,
} from './repository';
import type { Booking, BookingFormResponse } from './types';
import { issueDepositInvoice, isFacturadirectaConfigured } from '~/lib/facturadirecta';

/** Fiscal identity (name / NIF / address / contact) for the invoice, derived
 *  from the booking's form response. Uses the billing override when the couple
 *  gave a separate billing identity; otherwise the principal contraent
 *  (billingContact 'c2' → member 2, else member 1). */
function fiscalFromForm(form: BookingFormResponse) {
  const useBilling =
    !form.billingAddressSame && !!form.billingName && !!form.billingDni;
  const useC2 = !useBilling && form.billingContact === 'c2';
  return {
    clientName: useBilling ? form.billingName! : useC2 ? form.c2FullName : form.c1FullName,
    clientTaxCode: useBilling ? form.billingDni! : useC2 ? form.c2Dni : form.c1Dni,
    clientAddress: useBilling ? form.billingAddress : useC2 ? form.c2Address : form.c1Address,
    clientEmail: useC2 ? form.c2Email : form.c1Email,
    clientPhone: useC2 ? form.c2Phone : form.c1Phone,
  };
}

/** Resolve the invoice's fiscal identity: prefer the /reserva form response;
 *  fall back to the booking's manually-entered billing identity (for bookings
 *  registered by hand with no form). Returns null when neither yields a usable
 *  name + tax code. */
function resolveFiscal(booking: Booking, form: BookingFormResponse | null) {
  if (form) {
    const f = fiscalFromForm(form);
    if (f.clientName && f.clientTaxCode) return f;
  }
  if (booking.manualBillingName && booking.manualBillingNif) {
    return {
      clientName: booking.manualBillingName,
      clientTaxCode: booking.manualBillingNif,
      clientAddress: booking.manualBillingAddress,
      clientEmail: booking.coupleEmailPrimary || null,
      clientPhone: booking.couplePhonePrimary || null,
    };
  }
  return null;
}

/** Issue the deposit invoice for a booking, once. No-op when FacturaDirecta
 *  is unconfigured, when the booking was already invoiced, when there is no
 *  deposit to charge, or when the fiscal data isn't there yet. */
export async function issueDepositInvoiceForBooking(bookingId: string): Promise<void> {
  try {
    const booking = await getBookingById(bookingId);
    if (!booking) return;

    // Idempotency guard: never emit a second fiscal (numbered) invoice for
    // the same booking. If the operator un-marks and re-marks the deposit,
    // the original invoice id stays put and we skip.
    if (booking.facturadirectaInvoiceId) return;

    // Only invoice a real, received deposit with an amount.
    if (!booking.depositPaidAt) return;
    if (!booking.depositCents || booking.depositCents <= 0) return;

    // Fiscal identity: the /reserva form response, or the booking's manual
    // billing fields for hand-entered bookings. Neither present → skip silently.
    const form = await getFormResponseForBooking(bookingId);
    const fiscal = resolveFiscal(booking, form);
    if (!fiscal) return;
    const { clientName, clientTaxCode, clientAddress, clientEmail, clientPhone } = fiscal;

    const weddingDate = booking.weddingDate.toISOString().slice(0, 10);
    const description =
      `Anticipo reserva boda ${booking.coupleName1} & ${booking.coupleName2} — ${weddingDate}`;

    const issued = await issueDepositInvoice({
      clientName,
      clientTaxCode,
      clientAddress,
      clientEmail,
      clientPhone,
      depositCents: booking.depositCents,
      description,
    });

    if (issued?.id) {
      await setFacturadirectaInvoice(bookingId, issued.id, issued.number);
    }
  } catch (err) {
    console.error('[invoicing] issueDepositInvoiceForBooking failed (non-fatal)', err);
  }
}

/** Result of a one-click "Fer albarà" on a single payment. `ok` with a number
 *  → document created (or already existed). Otherwise `reason` tells the
 *  operator WHY, so the admin can show a precise message. */
export type IssuePaymentInvoiceResult =
  | { ok: true; number: string | null; alreadyIssued?: boolean }
  | { ok: false; reason: 'booking' | 'payment' | 'unconfigured' | 'apierror' };

/** Create a FacturaDirecta albarà (delivery note) for ONE payment of the
 *  ledger, on demand. IVA-inclòs (the amount is gross; the line stores the net
 *  base and the 21% tax code re-applies VAT). Idempotent: a payment that
 *  already carries a document is returned untouched. Never throws.
 *
 *  The client's NIF is optional for an albarà: we use the fiscal data when we
 *  have it (form response / manual billing fields), otherwise just the couple's
 *  names — so a hand-entered booking without a DNI still works. */
export async function issueInvoiceForPayment(
  bookingId: string,
  paymentId: string,
): Promise<IssuePaymentInvoiceResult> {
  try {
    const booking = await getBookingById(bookingId);
    if (!booking) return { ok: false, reason: 'booking' };

    const payment = await getPaymentById(paymentId, bookingId);
    if (!payment) return { ok: false, reason: 'payment' };

    // Idempotency: never emit a second document for the same payment.
    if (payment.invoiceId) {
      return { ok: true, number: payment.invoiceNumber, alreadyIssued: true };
    }

    // Distinguish "not configured" from "API failed" for a clear message.
    if (!isFacturadirectaConfigured()) return { ok: false, reason: 'unconfigured' };

    // Client identity: full fiscal data (form / manual billing) when present,
    // otherwise the manually-entered name, otherwise the couple's names. NIF is
    // optional for an albarà.
    const form = await getFormResponseForBooking(bookingId);
    const fiscal = resolveFiscal(booking, form);
    const coupleName = `${booking.coupleName1} & ${booking.coupleName2}`.trim();
    const clientName = fiscal?.clientName?.trim() || booking.manualBillingName?.trim() || coupleName;
    const clientTaxCode = (fiscal?.clientTaxCode || booking.manualBillingNif || '').trim();

    const dateStr = payment.paidOn ?? new Date().toISOString().slice(0, 10);
    const description = `Pagament boda ${coupleName} — ${dateStr}`;

    const issued = await issueDepositInvoice({
      clientName,
      clientTaxCode,
      clientPhone: fiscal?.clientPhone ?? booking.couplePhonePrimary ?? null,
      depositCents: payment.amountCents, // gross; VAT recovered inside
      description,
      invoiceDate: payment.paidOn ? new Date(`${payment.paidOn}T12:00:00Z`) : undefined,
    });

    // Configured but null → the API call itself failed (logged inside).
    if (!issued?.id) return { ok: false, reason: 'apierror' };

    await setPaymentInvoice(paymentId, bookingId, issued.id, issued.number, new Date().toISOString());
    return { ok: true, number: issued.number };
  } catch (err) {
    console.error('[invoicing] issueInvoiceForPayment failed (non-fatal)', err);
    return { ok: false, reason: 'apierror' };
  }
}
