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
  setFacturadirectaInvoice,
} from './repository';
import { issueDepositInvoice } from '~/lib/facturadirecta';

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

    // Use the billing override when the couple gave a separate billing
    // identity; otherwise fall back to contraent 1.
    const useBilling =
      !form.billingAddressSame && !!form.billingName && !!form.billingDni;

    const clientName = useBilling ? form.billingName! : form.c1FullName;
    const clientTaxCode = useBilling ? form.billingDni! : form.c1Dni;
    const clientAddress = useBilling ? form.billingAddress : form.c1Address;

    const weddingDate = booking.weddingDate.toISOString().slice(0, 10);
    const description =
      `Anticipo reserva boda ${booking.coupleName1} & ${booking.coupleName2} — ${weddingDate}`;

    const issued = await issueDepositInvoice({
      clientName,
      clientTaxCode,
      clientAddress,
      clientEmail: form.c1Email,
      clientPhone: form.c1Phone,
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
