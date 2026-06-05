// POST /api/admin/bookings/[id]/resend-telegram
//
// Re-fires the new-reservation Telegram alert for a booking — same
// message sendBookingTelegram() produces from /api/reserva/submit, so
// Eric gets the suggested WhatsApp group name + wa.me links again
// (useful for legacy bookings created before that block existed, or
// when the original Telegram message scrolled away).
//
// Admin-guarded; refuses if the booking has no BookingFormResponse on
// file (the helper signature requires it — `draft` bookings don't have
// the couple data yet).

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { getBookingById, getFormResponseForBooking } from '~/lib/bookings/repository';
import { sendBookingTelegram } from '~/lib/bookings/emails';

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

  const formResponse = await getFormResponseForBooking(id);
  if (!formResponse) return json({ error: 'no_form_response' }, 409);

  try {
    await sendBookingTelegram(booking, formResponse);
  } catch (err) {
    console.error('[admin.resend-telegram] failed', err);
    return json({ error: 'send_failed' }, 500);
  }

  return json({ ok: true, sentAt: new Date().toISOString() }, 200);
};
