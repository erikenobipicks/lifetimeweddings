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
//  2. Quote follow-up review: 7 days after Eric clicks "📧 Enviar" on a
//     quote, if the couple hasn't replied, FLAG it to Eric on Telegram (with
//     a link) so he can review and send the soft-nudge himself. The cron does
//     NOT send it — it stamps `quotes.follow_up_notified_at` so he's only
//     pinged once per quote; the send is a manual action from /admin/[id].
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
import { listQuotesAwaitingFollowUpReview, markQuoteFollowUpNotified } from '~/lib/quotes';
import { securityAlert } from '~/lib/security-alerts';
import { sendTelegramNotification } from '~/lib/email';
import { SITE } from '~/data/site';
import type { SendDueResult } from '~/lib/bookings/sequences';

const SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;

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

interface QuoteReviewItem {
  id: number;
  couple: string;
  daysWaiting: number;
}

interface QuoteFollowUpReviewResult {
  flagged: number;
  items: QuoteReviewItem[];
}

/** Flag quotes that have crossed the 7-day mark for a MANUAL follow-up
 *  decision — the cron no longer auto-sends. It stamps each once
 *  (follow_up_notified_at) so Eric isn't pinged again for the same quote, and
 *  returns the list for the Telegram recap; he sends each from /admin/[id]. */
async function tickQuoteFollowUpReview(): Promise<QuoteFollowUpReviewResult> {
  const due = await listQuotesAwaitingFollowUpReview(7);
  const items: QuoteReviewItem[] = [];
  for (const quote of due) {
    try {
      await markQuoteFollowUpNotified(quote.id);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[cron.email-queue] mark follow-up notified failed', { quoteId: quote.id, err });
      continue;
    }
    const days = quote.sentAt
      ? Math.floor((Date.now() - new Date(quote.sentAt).getTime()) / 86_400_000)
      : 7;
    items.push({ id: quote.id, couple: quote.coupleName, daysWaiting: days });
  }
  return { flagged: items.length, items };
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escHtml(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}

/** Build the Telegram recap of a cron tick — one line per booking email
 *  sent (so Eric gets the "s'ha enviat" confirmation) and per failure (so a
 *  stuck email is never silent). Returns null when nothing happened, so quiet
 *  days don't ping the chat. */
function buildEmailRecap(bookings: SendDueResult, quotes: QuoteFollowUpReviewResult): string | null {
  const lines: string[] = [];
  const okDetails = bookings.details.filter((d) => d.ok);
  const failDetails = bookings.details.filter((d) => !d.ok);

  if (okDetails.length > 0) {
    lines.push(`✅ <b>Enviats (${okDetails.length})</b>`);
    for (const d of okDetails) lines.push(` • ${escHtml(d.couple)} — ${escHtml(d.subject.slice(0, 70))}`);
  }
  if (failDetails.length > 0) {
    lines.push(`⚠️ <b>Fallits (${failDetails.length})</b>`);
    for (const d of failDetails) lines.push(` • ${escHtml(d.couple)} — ${escHtml(d.error ?? 'error')}`);
  }
  // Quote follow-ups are NOT auto-sent — this is an action list for Eric to
  // review and send (or skip) himself from each quote's page.
  if (quotes.items.length > 0) {
    lines.push(`📄 <b>Pressupostos pendents de seguiment — revisa i decideix (${quotes.items.length})</b>`);
    for (const q of quotes.items) {
      lines.push(` • <a href="${SITE_URL}/admin/${q.id}">${escHtml(q.couple)}</a> — fa ${q.daysWaiting} dies`);
    }
  }
  if (lines.length === 0) return null;
  return `📧 <b>Emails automàtics</b>\n${lines.join('\n')}`;
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
  const quoteResult = await tickQuoteFollowUpReview();
  const preweddingResult = await tickPreweddingDigests();
  console.log('[cron.email-queue] tick', { bookingResult, quoteResult, preweddingResult });

  // Push a recap to Telegram so every automated send (and every failure) is
  // visible to Eric instead of silently happening in the cron. Fail-soft —
  // a notification problem must never break the cron response.
  try {
    const recap = buildEmailRecap(bookingResult, quoteResult);
    if (recap) await sendTelegramNotification(recap);
  } catch (err) {
    console.error('[cron.email-queue] telegram recap failed', err);
  }

  return json(
    { ok: true, bookings: bookingResult, quoteFollowUpReview: quoteResult, preweddingDigests: preweddingResult },
    200,
  );
};
