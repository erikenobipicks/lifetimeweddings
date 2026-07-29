// GET /api/entrega/cover/<slug>
//
// Serves the gallery cover photo uploaded for a delivery (stored as a
// sharp-resized JPEG blob in delivery_covers). Public — same access model as
// the /entrega/<slug> page itself: the slug is the only secret. Returns 404
// when the delivery has no cover (or is archived / doesn't exist).
//
// Cache-busting is handled by the caller appending ?v=<updatedAt> to the src;
// we set a long max-age so repeat views don't re-fetch the blob.

export const prerender = false;

import type { APIRoute } from 'astro';
import { getDeliveryCover } from '~/lib/deliveries';

export const GET: APIRoute = async ({ params }) => {
  const slug = (params.slug ?? '').trim();
  if (!slug) return new Response('Not found', { status: 404 });

  const cover = await getDeliveryCover(slug);
  if (!cover) return new Response('Not found', { status: 404 });

  return new Response(cover.image as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': cover.mime,
      'Cache-Control': 'public, max-age=86400, immutable',
      'Content-Length': String(cover.image.byteLength),
    },
  });
};
