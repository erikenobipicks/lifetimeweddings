import type { APIRoute } from 'astro';
import { z } from 'zod';
import { recordHeartbeat } from '~/lib/quotes';

const schema = z.object({
  token: z.string().min(4).max(32),
  sessionId: z.string().min(8).max(64),
  timeOnPage: z.number().int().min(0).max(86400),
  maxScroll: z.number().int().min(0).max(100),
});

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('Bad JSON', { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return new Response('Invalid', { status: 400 });
  const ok = await recordHeartbeat(parsed.data.token, {
    sessionId: parsed.data.sessionId,
    timeOnPage: parsed.data.timeOnPage,
    maxScroll: parsed.data.maxScroll,
  });
  return ok
    ? new Response(null, { status: 204 })
    : new Response('not found', { status: 404 });
};
