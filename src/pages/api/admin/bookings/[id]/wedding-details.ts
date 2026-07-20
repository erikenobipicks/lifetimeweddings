// POST /api/admin/bookings/:id/wedding-details
//
// Lets Eric fill in (or edit) the "Info de la boda" questionnaire on the
// couple's behalf. Saves a form_submissions row (form_kind='wedding_details',
// schedule_id NULL — it's operator-entered, not tied to a sent email) using
// the exact same field keys as the couple's public form, so /formulari/<token>
// pre-fills from it and the couple can validate/modify. Latest row wins.

export const prerender = false;

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { db, initSchema } from '~/lib/db';
import { getBookingById } from '~/lib/bookings/repository';
import { weddingDetailsAdminGroups } from '~/lib/bookings/weddingDetailsForm';

// Field keys don't depend on the couple names — pass blanks just to read them.
const FIELD_KEYS = weddingDetailsAdminGroups('', '').flatMap((g) => g.fields.map((f) => f.key));

export const POST: APIRoute = async ({ params, request, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const id = params.id!;
  const booking = await getBookingById(id);
  if (!booking) return redirect('/admin/bookings', 303);

  const form = await request.formData();
  const data: Record<string, string> = {};
  for (const key of FIELD_KEYS) {
    const v = form.get(key);
    if (typeof v === 'string' && v.trim()) data[key] = v.trim();
  }

  const json = JSON.stringify(data);
  if (json.length > 20_000) {
    return redirect(`/admin/bookings/${id}/wedding-details?error=too_large`, 303);
  }

  await initSchema();
  await db.execute({
    sql: `INSERT INTO form_submissions (booking_id, schedule_id, form_kind, data_json, submitted_at, ip_address, user_agent)
          VALUES (?, NULL, 'wedding_details', ?, ?, NULL, ?)`,
    args: [id, json, new Date().toISOString(), 'admin'],
  });

  return redirect(`/admin/bookings/${id}?ok=wd-saved`, 303);
};
