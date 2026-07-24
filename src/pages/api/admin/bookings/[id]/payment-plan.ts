// POST /api/admin/bookings/[id]/payment-plan
// Dumps the payment-calculator tranches (reserva / 2n / 3r / efectiu) into
// the booking_payments ledger as real rows. Called by the <PackPaymentTools>
// "Afegir trams al llibre de pagaments" button on the booking ficha.
// Admin-only (middleware guards /api/admin/*).

export const prerender = false;

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { addPayment, getBookingById } from '~/lib/bookings/repository';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Each tranche → a labelled ledger row. Cash is tagged with the "Efectiu"
// method so it's distinguishable from the invoiced payments at a glance.
const TRANCHES: { key: 'reserva' | 'p2' | 'p3' | 'cash'; note: string; method: string | null }[] = [
  { key: 'reserva', note: 'Reserva', method: null },
  { key: 'p2', note: '2n pagament', method: null },
  { key: 'p3', note: '3r pagament', method: null },
  { key: 'cash', note: 'Efectiu (sense IVA)', method: 'Efectiu' },
];

export const POST: APIRoute = async ({ request, params, cookies }) => {
  const user = await getUser(cookies);
  if (!user) return json({ error: 'unauthorized' }, 401);

  const id = params.id!;
  const booking = await getBookingById(id);
  if (!booking) return json({ error: 'not_found' }, 404);

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const paidOnRaw = typeof body.paidOn === 'string' ? body.paidOn.trim() : '';
  const paidOn = /^\d{4}-\d{2}-\d{2}$/.test(paidOnRaw) ? paidOnRaw : null;

  // Read the four tranches as euros → exact cents (don't truncate the
  // sub-euro part, or a ledger with cents never reconciles to the total).
  // Only rows with a positive amount become ledger entries.
  const amountFor = (key: string): number => {
    const v = Number(body[key]);
    if (!Number.isFinite(v) || v <= 0) return 0;
    return Math.round(v * 100);
  };

  let created = 0;
  for (const t of TRANCHES) {
    const cents = amountFor(t.key);
    if (cents <= 0) continue;
    await addPayment({
      bookingId: id,
      amountCents: cents,
      paidOn,
      method: t.method,
      note: t.note,
    });
    created += 1;
  }

  if (created === 0) return json({ error: 'no_tranches' }, 400);
  return json({ ok: true, created }, 200);
};
