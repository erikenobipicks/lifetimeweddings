// POST /api/cron/email-queue
//
// Daily cron tick. Two jobs run on each call to keep the external cron
// config simple (one job, one URL):
//
//  1. Booking email-sequences: sends every email_schedules row whose
//     `scheduled_for` is today or earlier. Idempotent — rows that
//     succeed stamp `sent_at`; failures get `last_error` and retry
//     on the next tick.
//
//  2. Quote follow-up reminders: 7 days after Eric clicks "📧 Enviar"
//     on a quote, if the couple hasn't replied, send the soft-nudge
//     email. Stamps `quotes.follow_up_sent_at` so the reminder only
//     ever goes out once per quote.
//
// Authentication: Bearer token in the Authorization header, value
// matches `CRON_SECRET`. Without the env var set the endpoint is
// disabled (503) so a fresh deploy can't be hit anonymously.
//
//   curl -X POST https://www.lifetime.photo/api/cron/email-queue \
//        -H "Authorization: Bearer $CRON_SECRET"
//
// Returns JSON with both job results so the caller can alert on any
// non-zero `failed` count.

export const prerender = false;

import type { APIRoute } from 'astro';
import { sendDueEmails } from '~/lib/bookings/sequences';
import { listQuotesPendingFollowUp, markQuoteFollowUpSent } from '~/lib/quotes';
import { sendQuoteFollowUp } from '~/lib/quotes/followup';

interface QuoteFollowUpResult {
  due: number;
  sent: number;
  failed: number;
  skipped: number;
}

async function tickQuoteFollowUps(): Promise<QuoteFollowUpResult> {
  const due = await listQuotesPendingFollowUp(7);
  let sent = 0;
  let failed = 0;
  let skipped = 0;
  for (const quote of due) {
    if (!quote.coupleEmail) {
      skipped += 1;
      continue;
    }
    const result = await sendQuoteFollowUp(quote);
    if (!result.ok) {
      failed += 1;
      // eslint-disable-next-line no-console
      console.error('[cron.email-queue] follow-up failed', {
        quoteId: quote.id,
        reason: result.reason,
        detail: result.detail,
      });
      continue;
    }
    try {
      await markQuoteFollowUpSent(quote.id);
      sent += 1;
    } catch (err) {
      failed += 1;
      // eslint-disable-next-line no-console
      console.error('[cron.email-queue] mark follow-up failed', { quoteId: quote.id, err });
    }
  }
  return { due: due.length, sent, failed, skipped };
}

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

  const bookingResult = await sendDueEmails();
  const quoteResult = await tickQuoteFollowUps();
  console.log('[cron.email-queue] tick', { bookingResult, quoteResult });
  return json({ ok: true, bookings: bookingResult, quoteFollowUps: quoteResult }, 200);
};
