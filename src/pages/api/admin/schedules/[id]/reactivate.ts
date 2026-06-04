import type { APIRoute } from 'astro';
import { db, initSchema } from '~/lib/db';
import { reactivateSchedule } from '~/lib/bookings/sequences';

export const POST: APIRoute = async ({ params, redirect }) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return redirect('/admin/bookings', 303);
  await initSchema();
  const res = await db.execute({ sql: 'SELECT booking_id FROM email_schedules WHERE id = ?', args: [id] });
  const bookingId = res.rows[0]?.booking_id ? String(res.rows[0].booking_id) : null;
  await reactivateSchedule(id);
  return redirect(bookingId ? `/admin/bookings/${bookingId}?ok=schedule:reactivated` : '/admin/bookings', 303);
};
