// Issues a FacturaDirecta invoice for a delivery's pending balance, on
// demand from the admin (there's no automatic trigger — Eric asked for a
// manual button, not an auto-invoice like the reserva deposit).
//
// Fiscal data (name + NIF + address) comes from the LINKED booking's form
// response, so an invoice can only be issued for a delivery that is linked
// to a booking whose couple already submitted their /reserva data. Without
// that link there's no tax code to bill, so the caller surfaces a clear
// "link a booking first" message instead.
//
// Idempotent + fail-soft: a delivery that already carries a balance-invoice
// id is skipped; any FacturaDirecta error is swallowed (returns a reason)
// so the admin action never 500s.

import { getDeliveryById, setDeliveryBalanceInvoice } from './deliveries';
import { getBookingById, getFormResponseForBooking } from './bookings/repository';
import { issueDepositInvoice } from './facturadirecta';

export type BalanceInvoiceResult =
  | { ok: true; number: string | null }
  | { ok: false; reason: 'not_found' | 'already_invoiced' | 'no_amount' | 'no_booking' | 'no_fiscal_data' | 'issue_failed' };

/** Issue the pending-balance invoice for a delivery, once. */
export async function issueBalanceInvoiceForDelivery(deliveryId: string): Promise<BalanceInvoiceResult> {
  const delivery = await getDeliveryById(deliveryId);
  if (!delivery) return { ok: false, reason: 'not_found' };

  // Idempotency: never emit a second numbered invoice for the same balance.
  if (delivery.balanceInvoiceId) return { ok: false, reason: 'already_invoiced' };

  if (!delivery.balanceDueCents || delivery.balanceDueCents <= 0) {
    return { ok: false, reason: 'no_amount' };
  }

  // Fiscal identity comes from the linked booking's form response.
  if (!delivery.bookingId) return { ok: false, reason: 'no_booking' };
  const booking = await getBookingById(delivery.bookingId);
  const form = booking ? await getFormResponseForBooking(booking.id) : null;
  if (!form) return { ok: false, reason: 'no_fiscal_data' };

  // Same billing-identity resolution as bookings/invoicing.ts: a billing
  // override wins; otherwise the principal contraent (c1 unless c2 marked).
  const useBilling = !form.billingAddressSame && !!form.billingName && !!form.billingDni;
  const useC2 = !useBilling && form.billingContact === 'c2';
  const clientName = useBilling ? form.billingName! : useC2 ? form.c2FullName : form.c1FullName;
  const clientTaxCode = useBilling ? form.billingDni! : useC2 ? form.c2Dni : form.c1Dni;
  const clientAddress = useBilling ? form.billingAddress : useC2 ? form.c2Address : form.c1Address;
  const clientEmail = useC2 ? form.c2Email : form.c1Email;
  const clientPhone = useC2 ? form.c2Phone : form.c1Phone;

  if (!clientName || !clientTaxCode) return { ok: false, reason: 'no_fiscal_data' };

  const weddingDate = delivery.weddingDate.toISOString().slice(0, 10);
  const description = `Pago pendiente boda ${delivery.coupleName1} & ${delivery.coupleName2} — ${weddingDate}`;

  const issued = await issueDepositInvoice({
    clientName,
    clientTaxCode,
    clientAddress,
    clientEmail,
    clientPhone,
    depositCents: delivery.balanceDueCents,
    description,
  });

  if (!issued?.id) return { ok: false, reason: 'issue_failed' };
  await setDeliveryBalanceInvoice(delivery.id, issued.id, issued.number ?? '');
  return { ok: true, number: issued.number };
}
