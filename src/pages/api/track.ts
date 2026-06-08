import type { APIRoute } from 'astro';
import { z } from 'zod';
import { recordHeartbeat } from '~/lib/quotes';
import { createRateLimiter, clientIpFrom } from '~/lib/rate-limit';

const schema = z.object({
  token: z.string().min(4).max(32),
  sessionId: z.string().min(8).max(64),
  timeOnPage: z.number().int().min(0).max(86400),
  maxScroll: z.number().int().min(0).max(100),
});

// Heartbeats fire periodically per open page; allow a generous budget so
// legitimate viewers (and NAT'd IPs) aren't blocked, while still capping a
// script that tries to flood the events table.
const rateLimit = createRateLimiter({ limit: 300, windowMs: 5 * 60 * 1000 });

export const POST: APIRoute = async ({ request }) => {
  if (!rateLimit(clientIpFrom(request.headers))) {
    return new Response('Too Many Requests', { status: 429 });
  }
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
