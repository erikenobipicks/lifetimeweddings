// POST /api/cron/email-queue
//
// Daily cron tick. Sends every email_schedules row whose `scheduled_for`
// is today or earlier (and not yet sent / not cancelled). Idempotent —
// rows that succeed are stamped `sent_at`; failures get `last_error` and
// are retried on the next tick.
//
// Authentication: Bearer token in the Authorization header, value matches
// `CRON_SECRET`. Without the env var set the endpoint is disabled (503)
// so a fresh deploy can't be hit anonymously. Configure an external cron
// (Railway Cron, GitHub Actions, cron-job.org) to call this once a day:
//
//   curl -X POST https://www.lifetime.photo/api/cron/email-queue \
//        -H "Authorization: Bearer $CRON_SECRET"
//
// Returns JSON with the result so the caller can alert on a non-zero
// `failed` count.

export const prerender = false;

import type { APIRoute } from 'astro';
import { sendDueEmails } from '~/lib/bookings/sequences';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const secret = (process.env.CRON_SECRET ?? '').trim();
  if (!secret) {
    return json({ error: 'cron_disabled' }, 503);
  }
  const auth = request.headers.get('authorization') ?? '';
  const provided = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!provided || provided !== secret) {
    console.warn('[cron.email-queue] unauthorized');
    return json({ error: 'unauthorized' }, 401);
  }

  const result = await sendDueEmails();
  console.log('[cron.email-queue] tick', result);
  return json({ ok: true, ...result }, 200);
};
