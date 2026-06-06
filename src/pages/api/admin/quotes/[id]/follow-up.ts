// POST /api/admin/quotes/[id]/follow-up
//
// Manual trigger for the 7-day follow-up email. Same body / template as
// the cron path — both go through sendQuoteFollowUp(). Eric can fire it
// from /admin/[id] whenever he likes (no 7-day wait imposed server-side
// for the manual path; the gating in the UI prevents accidental re-sends
// by greying the button when follow_up_sent_at is already set).
//
// Marks follow_up_sent_at on success so a subsequent cron tick skips
// this quote.

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { getQuoteById, markQuoteFollowUpSent } from '~/lib/quotes';
import { sendQuoteFollowUp } from '~/lib/quotes/followup';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ params, cookies }) => {
  const user = await getUser(cookies);
  if (!user) return json({ error: 'unauthorized' }, 401);

  const id = Number(params.id);
  if (!Number.isFinite(id)) return json({ error: 'bad_id' }, 400);

  const quote = await getQuoteById(id);
  if (!quote) return json({ error: 'not_found' }, 404);
  if (!quote.coupleEmail) return json({ error: 'no_recipient' }, 400);

  const result = await sendQuoteFollowUp(quote);
  if (!result.ok) {
    return json({ error: 'send_failed', detail: result.detail ?? result.reason }, 502);
  }

  try {
    await markQuoteFollowUpSent(quote.id);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[admin.quote-followup] mark failed (non-fatal)', err);
  }

  return json({ ok: true, sentTo: quote.coupleEmail }, 200);
};
