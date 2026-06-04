import type { APIRoute } from 'astro';
import { db, initSchema } from '~/lib/db';
import { fastForwardSchedule, sendDueEmails } from '~/lib/bookings/sequences';

export const POST: APIRoute = async ({ params, redirect }) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return redirect('/admin/bookings', 303);
  await initSchema();
  const res = await db.execute({ sql: 'SELECT booking_id FROM email_schedules WHERE id = ?', args: [id] });
  const bookingId = res.rows[0]?.booking_id ? String(res.rows[0].booking_id) : null;
  // Set scheduled_for=today and dispatch the queue immediately so the
  // admin sees the result without waiting for the next cron tick.
  await fastForwardSchedule(id);
  await sendDueEmails({ limit: 5 });
  return redirect(bookingId ? `/admin/bookings/${bookingId}?ok=schedule:sent` : '/admin/bookings', 303);
};
