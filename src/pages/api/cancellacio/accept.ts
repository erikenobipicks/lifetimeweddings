// POST /api/cancellacio/accept  { slug }
// Records the couple's e-signature of the cancellation agreement. Gated by the
// booking being cancelled and not yet signed. Idempotent.

export const prerender = false;

import type { APIRoute } from 'astro';
import { getBookingBySlug, markCancellationSigned } from '~/lib/bookings/repository';
import { clientIp } from '~/lib/captcha';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let body: { slug?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }
  const slug = typeof body.slug === 'string' ? body.slug : '';
  if (!slug) return json({ error: 'bad_request' }, 400);

  const booking = await getBookingBySlug(slug);
  if (!booking || !booking.cancelledAt) return json({ error: 'not_found' }, 404);
  if (booking.cancellationSignedAt) return json({ error: 'already_signed' }, 409);

  const ip = clientIp(request) ?? null;
  const ok = await markCancellationSigned(booking.id, ip);
  if (!ok) return json({ error: 'already_signed' }, 409);

  return json({ ok: true }, 200);
};
