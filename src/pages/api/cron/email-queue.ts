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
import { timingSafeEqual } from 'node:crypto';
import { sendDueEmails } from '~/lib/bookings/sequences';
import {
  listBookingsForPreweddingDigest,
  markPreweddingTelegramSent,
} from '~/lib/bookings/repository';
import { sendPreweddingDigest } from '~/lib/bookings/preweddingDigest';
import { listQuotesPendingFollowUp, markQuoteFollowUpSent } from '~/lib/quotes';
import { sendQuoteFollowUp } from '~/lib/quotes/followup';
import { securityAlert } from '~/lib/security-alerts';

interface PreweddingDigestSweepResult {
  due: number;
  sent: number;
  failed: number;
}

/** Fire the internal pre-wedding Telegram digest for weddings happening
 *  within the next 2 days that haven't had it yet. The window (rather than
 *  an exact "wedding − 2" match) means a missed cron day still catches the
 *  wedding; the prewedding_telegram_sent_at stamp keeps it once-only. */
async function tickPreweddingDigests(): Promise<PreweddingDigestSweepResult> {
  const todayYmd = new Date().toISOString().slice(0, 10);
  const due = await listBookingsForPreweddingDigest(todayYmd, 2);
  let sent = 0;
  let failed = 0;
  for (const booking of due) {
    try {
      const result = await sendPreweddingDigest(booking.id);
      if (!result.ok) {
        failed += 1;
        continue;
      }
      // Stamp first so a retry within the same day can't double-send even
      // if a later step throws.
      await markPreweddingTelegramSent(booking.id);
      sent += 1;
    } catch (err) {
      failed += 1;
      // eslint-disable-next-line no-console
      console.error('[cron.email-queue] prewedding digest failed', { bookingId: booking.id, err });
    }
  }
  return { due: due.length, sent, failed };
}

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

/** Constant-time string comparison so the auth check doesn't leak the
 *  secret one byte at a time via response timing. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export const POST: APIRoute = async ({ request }) => {
  const secret = (process.env.CRON_SECRET ?? '').trim();
  if (!secret) {
    return json({ error: 'cron_disabled' }, 503);
  }
  const auth = request.headers.get('authorization') ?? '';
  const provided = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!provided || !safeEqual(provided, secret)) {
    console.warn('[cron.email-queue] unauthorized');
    const ip =
      request.headers.get('cf-connecting-ip') ??
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      'unknown';
    await securityAlert(
      'cron-unauth',
      `Intent no autoritzat a l'endpoint del cron (/api/cron/email-queue).\nIP: ${ip}`,
    );
    return json({ error: 'unauthorized' }, 401);
  }

  const bookingResult = await sendDueEmails();
  const quoteResult = await tickQuoteFollowUps();
  const preweddingResult = await tickPreweddingDigests();
  console.log('[cron.email-queue] tick', { bookingResult, quoteResult, preweddingResult });
  return json(
    { ok: true, bookings: bookingResult, quoteFollowUps: quoteResult, preweddingDigests: preweddingResult },
    200,
  );
};
