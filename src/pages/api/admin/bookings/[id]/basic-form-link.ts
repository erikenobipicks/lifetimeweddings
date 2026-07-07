// POST /api/admin/bookings/[id]/basic-form-link
//
// Generates (or refreshes) a shareable /formulari/<token> link for the
// basic-info form, WITHOUT sending any email. For collab / external
// (white-label) bookings — Eric copies the link and sends it himself.
//
// Returns JSON { ok, url }. Each call mints a fresh token, invalidating
// any previous link (so a re-generated form starts clean).

export const prerender = false;

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { getBookingById } from '~/lib/bookings/repository';
import { getSequenceBySlug, generateFormLink, seedDefaultSequences } from '~/lib/bookings/sequences';
import { SITE } from '~/data/site';

const SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;
const BASIC_INFO_SLUG = 'formulari-basic-info';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ params, cookies }) => {
  const user = await getUser(cookies);
  if (!user) return json({ error: 'unauthorized' }, 401);

  const bookingId = params.id!;
  const booking = await getBookingById(bookingId);
  if (!booking) return json({ error: 'not_found' }, 404);

  try {
    // Resolve the basic-info sequence. If it doesn't exist yet (fresh DB
    // that never ran the "seed defaults" button), seed it on the fly so
    // this never dead-ends for the operator.
    let seq = await getSequenceBySlug(BASIC_INFO_SLUG);
    if (!seq) {
      await seedDefaultSequences();
      seq = await getSequenceBySlug(BASIC_INFO_SLUG);
    }
    if (!seq) return json({ error: 'sequence_missing' }, 500);

    const token = await generateFormLink(bookingId, seq.id);
    return json({ ok: true, url: `${SITE_URL}/formulari/${token}` }, 200);
  } catch (err) {
    console.error('[admin.basic-form-link] failed', { bookingId, err });
    const msg = err instanceof Error ? err.message : 'error';
    return json({ error: 'server_error', detail: msg }, 500);
  }
};
