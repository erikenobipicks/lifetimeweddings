// POST /api/admin/bookings/[id]/push-to-sheet
//
// Admin-only manual re-push of a booking row to Eric's master Google Sheet.
// Same payload as the automatic dispatch from /api/reserva/submit — useful
// when the webhook env vars weren't set at the time of the original
// submission, or when Apps Script returned an error and the row never
// landed.

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { getBookingById, getFormResponseForBooking } from '~/lib/bookings/repository';
import { pushBookingToSheet } from '~/lib/sheets/bookings';

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
  const result = await pushBookingToSheet(booking, formResponse);
  if (!result.ok) {
    if (result.reason === 'not_configured') {
      return json({ error: 'not_configured' }, 503);
    }
    return json({ error: 'push_failed', detail: result.detail }, 502);
  }

  return json({ ok: true }, 200);
};
