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
import type { BookingFormResponse } from './types';
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

    // Fiscal data lives on the form response (DNI, address, optional billing
    // override). Both admin paths create it before marking the deposit, so a
    // missing row means "too early" — skip silently.
    const form = await getFormResponseForBooking(bookingId);
    if (!form) return;

    const { clientName, clientTaxCode, clientAddress, clientEmail, clientPhone } =
      fiscalFromForm(form);

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

/** Result of a one-click "Fer factura" on a single payment. `ok` with a
 *  number → invoice created (or already existed). Otherwise `reason` tells the
 *  operator WHY, so the admin can show a precise message rather than a silent
 *  no-op. */
export type IssuePaymentInvoiceResult =
  | { ok: true; number: string | null; alreadyIssued?: boolean }
  | { ok: false; reason: 'booking' | 'payment' | 'unconfigured' | 'nofiscal' | 'apierror' };

/** Issue a FacturaDirecta invoice for ONE payment of the ledger, on demand.
 *  IVA-inclòs (the payment amount is gross; the line stores base + 21% like the
 *  deposit invoice). Idempotent: a payment that already carries an invoice is
 *  returned untouched. Never throws — returns a typed result for the UI. */
export async function issueInvoiceForPayment(
  bookingId: string,
  paymentId: string,
): Promise<IssuePaymentInvoiceResult> {
  try {
    const booking = await getBookingById(bookingId);
    if (!booking) return { ok: false, reason: 'booking' };

    const payment = await getPaymentById(paymentId, bookingId);
    if (!payment) return { ok: false, reason: 'payment' };

    // Idempotency: never emit a second numbered invoice for the same payment.
    if (payment.invoiceId) {
      return { ok: true, number: payment.invoiceNumber, alreadyIssued: true };
    }

    // Distinguish "not configured" from "API failed" for a clear message.
    if (!isFacturadirectaConfigured()) return { ok: false, reason: 'unconfigured' };

    // Fiscal identity comes from the /reserva form response (DNI, name…). No
    // form or no tax code → we cannot legally invoice yet.
    const form = await getFormResponseForBooking(bookingId);
    if (!form) return { ok: false, reason: 'nofiscal' };
    const fiscal = fiscalFromForm(form);
    if (!fiscal.clientName || !fiscal.clientTaxCode) return { ok: false, reason: 'nofiscal' };

    const dateStr = payment.paidOn ?? new Date().toISOString().slice(0, 10);
    const description =
      `Pagament boda ${booking.coupleName1} & ${booking.coupleName2} — ${dateStr}`;

    const issued = await issueDepositInvoice({
      clientName: fiscal.clientName,
      clientTaxCode: fiscal.clientTaxCode,
      clientAddress: fiscal.clientAddress,
      clientEmail: fiscal.clientEmail,
      clientPhone: fiscal.clientPhone,
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
