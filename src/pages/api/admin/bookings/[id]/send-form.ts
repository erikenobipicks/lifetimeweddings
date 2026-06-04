// POST /api/admin/bookings/[id]/send-form
//
// Manual "send a form to this couple now" — for cases like "the wedding
// is in a month, send the timeline form today" or "we already past the
// scheduled date and want to re-send it". The schedule row is created or
// reactivated with scheduled_for=today and a fresh form_token; we then
// dispatch the queue immediately so the email fires on the spot.

export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import { manualSendSequence, sendDueEmails } from '~/lib/bookings/sequences';

const schema = z.object({
  sequenceId: z.string().regex(/^\d+$/).transform((s) => Number(s)),
});

export const POST: APIRoute = async ({ request, params, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const bookingId = params.id!;
  const form = await request.formData();
  const parsed = schema.safeParse({ sequenceId: String(form.get('sequenceId') ?? '') });
  if (!parsed.success) {
    return redirect(`/admin/bookings/${bookingId}?error=Plantilla+inv%C3%A0lida`, 303);
  }
  const { sequenceId } = parsed.data;

  try {
    await manualSendSequence(bookingId, sequenceId);
    // Dispatch the queue immediately — capped low so a botched cron flood
    // never piggy-backs on a manual click. The cron handles the rest.
    await sendDueEmails({ limit: 5 });
    return redirect(`/admin/bookings/${bookingId}?ok=form:sent`, 303);
  } catch (err) {
    console.error('[admin.send-form] failed', { bookingId, sequenceId, err });
    const msg = err instanceof Error ? err.message : 'error';
    return redirect(`/admin/bookings/${bookingId}?error=${encodeURIComponent('No s\'ha pogut enviar: ' + msg)}`, 303);
  }
};
