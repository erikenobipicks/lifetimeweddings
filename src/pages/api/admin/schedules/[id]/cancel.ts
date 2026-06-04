import type { APIRoute } from 'astro';
import { db, initSchema } from '~/lib/db';
import { cancelSchedule } from '~/lib/bookings/sequences';

export const POST: APIRoute = async ({ params, redirect }) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return redirect('/admin/bookings', 303);
  // Look up the booking via the schedule so we can redirect back to its page.
  await initSchema();
  const res = await db.execute({ sql: 'SELECT booking_id FROM email_schedules WHERE id = ?', args: [id] });
  const bookingId = res.rows[0]?.booking_id ? String(res.rows[0].booking_id) : null;
  await cancelSchedule(id);
  return redirect(bookingId ? `/admin/bookings/${bookingId}?ok=schedule:cancelled` : '/admin/bookings', 303);
};
