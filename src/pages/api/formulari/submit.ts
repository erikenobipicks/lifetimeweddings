// POST /api/formulari/submit
//
// Generic submission endpoint for the follow-up forms (timeline, guest
// list, music…). The token resolves to one email_schedule row → one
// booking. We persist the form data as JSON in `form_submissions` so
// adding new forms doesn't require new tables.
//
// Concrete forms validate their own shape before posting here — this
// endpoint just trusts the shape, enforces the token, and prevents
// double-submits.

export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db, initSchema } from '~/lib/db';
import { getScheduleByToken } from '~/lib/bookings/sequences';
import { getBookingById } from '~/lib/bookings/repository';
import { sendFormSubmissionNotification } from '~/lib/bookings/emails';

const schema = z.object({
  token: z.string().min(8).max(80),
  data: z.record(z.string(), z.unknown()),
});

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function clientIp(headers: Headers): string {
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf;
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try { body = await request.json(); }
  catch { return json({ error: 'invalid_json' }, 400); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: 'validation' }, 400);
  const { token, data } = parsed.data;

  // Cap the serialized payload so an attacker can't use this open-shape
  // endpoint (`data` is an arbitrary record) to write unbounded blobs into
  // the DB. 20 KB is comfortably above any legitimate follow-up form.
  if (JSON.stringify(data).length > 20_000) {
    return json({ error: 'too_large' }, 413);
  }

  const schedule = await getScheduleByToken(token);
  if (!schedule) return json({ error: 'not_found' }, 404);

  await initSchema();
  // Look up the form_kind + slug via the sequence (slug is just for the
  // internal notification subject line).
  const seqRes = await db.execute({
    sql: 'SELECT form_kind, slug FROM email_sequences WHERE id = ?',
    args: [schedule.sequenceId],
  });
  const formKind = seqRes.rows[0]?.form_kind ? String(seqRes.rows[0].form_kind) : null;
  const sequenceSlug = seqRes.rows[0]?.slug ? String(seqRes.rows[0].slug) : `#${schedule.sequenceId}`;
  if (!formKind) return json({ error: 'no_form' }, 409);

  // One submission per schedule. If we ever want to allow edits, expose
  // an update endpoint instead; this keeps the audit trail clean.
  const prev = await db.execute({
    sql: 'SELECT id FROM form_submissions WHERE schedule_id = ? LIMIT 1',
    args: [schedule.id],
  });
  if (prev.rows.length > 0) return json({ error: 'already_submitted' }, 409);

  const ip = clientIp(request.headers);
  await db.execute({
    sql: `INSERT INTO form_submissions (booking_id, schedule_id, form_kind, data_json, submitted_at, ip_address, user_agent)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      schedule.bookingId,
      schedule.id,
      formKind,
      JSON.stringify(data),
      new Date().toISOString(),
      ip,
      request.headers.get('user-agent'),
    ],
  });
  console.log('[formulari.submit] saved', { scheduleId: schedule.id, formKind, bookingId: schedule.bookingId });

  // Fire-and-forget internal notification so Eric finds out right away.
  // Fail-soft: the submission is already persisted; a missing/erroring
  // Resend never blocks the 200.
  try {
    const booking = await getBookingById(schedule.bookingId);
    if (booking) {
      // Tiny preview from the submitted JSON — first 3 string fields, kept
      // short. Helpful at-a-glance content in the email body.
      const preview = Object.entries(data)
        .filter(([, v]) => typeof v === 'string' && v.trim().length > 0)
        .slice(0, 3)
        .map(([k, v]) => `${k}: ${String(v).slice(0, 120)}`)
        .join('\n');
      await sendFormSubmissionNotification({
        booking,
        formKind,
        sequenceSlug,
        dataPreview: preview || undefined,
      });
    }
  } catch (err) {
    console.error('[formulari.submit] notification failed (non-fatal)', err);
  }

  return json({ ok: true }, 200);
};
