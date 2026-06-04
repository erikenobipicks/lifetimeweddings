// POST /api/admin/bookings/[id]/resend-confirmation
//
// Re-sends the post-/reserva couple confirmation email. The email body
// resolves the card-payment availability dynamically (isStripeEnabled() at
// send time), so re-sending after Stripe gets wired in env is the easiest
// way to give a couple the card CTA they were missed in the original email.
//
// Guards:
//   - admin session required;
//   - booking must already be in `form_submitted` status (so a real
//     BookingFormResponse exists to feed the email); we explicitly do NOT
//     re-send from `draft` because there's no captured couple data yet.
//
// Returns JSON. The caller is a fetch() from the admin booking page so
// nothing renders here.

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { getBookingById, getFormResponseForBooking } from '~/lib/bookings/repository';
import { sendCoupleConfirmation } from '~/lib/bookings/emails';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ params, cookies }) => {
  const user = await getUser(cookies);
  if (!user) return json({ error: 'unauthorized' }, 401);

  const id = params.id!;
  const booking = await getBookingById(id);
  if (!booking) return json({ error: 'not_found' }, 404);

  if (booking.status !== 'form_submitted' && booking.status !== 'viewed' && booking.status !== 'sent') {
    // Allow `form_submitted` (typical). Also tolerate `viewed`/`sent` for
    // safety if the status didn't flip for some reason yet there's a form
    // response on file — we'll fail one line down if there isn't.
    return json({ error: 'wrong_status', status: booking.status }, 409);
  }

  const formResponse = await getFormResponseForBooking(id);
  if (!formResponse) {
    return json({ error: 'no_form_response' }, 409);
  }

  try {
    await sendCoupleConfirmation(booking, formResponse);
  } catch (err) {
    console.error('[admin.resend-confirmation] failed', err);
    return json({ error: 'send_failed' }, 500);
  }

  return json({ ok: true, sentAt: new Date().toISOString() }, 200);
};
