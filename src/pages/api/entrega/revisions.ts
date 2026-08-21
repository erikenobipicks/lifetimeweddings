// POST /api/entrega/revisions
//
// Behind the "Sol·licitar canvis" form on /entrega/<slug>. The couple sends a
// list of tweaks (typically for the video); we persist each item and ping Eric
// (email + Telegram). No rounds limit — Eric manages them from the admin.

export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getDeliveryBySlug, createDeliveryRevisions } from '~/lib/deliveries';
import { sendNotification, sendTelegramNotification } from '~/lib/email';
import { createRateLimiter, clientIpFrom } from '~/lib/rate-limit';

// Persists rows + fans out notifications → an amplification target. 10 batches
// / hour / IP is well above a couple listing their changes.
const rateLimit = createRateLimiter({ limit: 10, windowMs: 60 * 60 * 1000 });

const schema = z.object({
  slug: z.string().trim().min(1).max(120),
  items: z
    .array(
      z.object({
        text: z.string().trim().min(1).max(1000),
        timecode: z.string().trim().max(40).optional(),
      }),
    )
    .min(1)
    .max(50),
});

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function esc(s: string | undefined | null): string {
  return (s ?? '').replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );
}

const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export const POST: APIRoute = async ({ request }) => {
  if (!rateLimit(clientIpFrom(request.headers))) {
    return json({ error: 'rate_limited' }, 429);
  }

  let body: unknown;
  try { body = await request.json(); }
  catch { return json({ error: 'invalid_json' }, 400); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: 'validation' }, 400);
  const { slug, items } = parsed.data;

  const delivery = await getDeliveryBySlug(slug);
  if (!delivery || delivery.archived) return json({ error: 'not_found' }, 404);

  const count = await createDeliveryRevisions(
    delivery.id,
    items.map((i) => ({ text: i.text, timecode: i.timecode })),
    {
      ipAddress: clientIpFrom(request.headers),
      userAgent: request.headers.get('user-agent') ?? undefined,
    },
  );
  if (count === 0) return json({ error: 'empty' }, 400);

  const couple = `${delivery.coupleName1} & ${delivery.coupleName2}`;
  const adminUrl = `${SITE_URL}/admin/deliveries/${delivery.id}`;
  const listHtml = items
    .map((i) => `<li>${i.timecode ? `<strong>${esc(i.timecode)}</strong> — ` : ''}${esc(i.text)}</li>`)
    .join('');

  // Fail-soft: the rows are saved, so notifications are best-effort.
  try {
    await sendNotification({
      subject: `🎬 ${couple} han demanat canvis (${count})`,
      html:
        `<p><strong>${esc(couple)}</strong> han enviat una llista de canvis des de la seva entrega:</p>` +
        `<ul>${listHtml}</ul>` +
        `<p><a href="${adminUrl}">Revisa-ho a l'admin →</a></p>`,
    });
  } catch (err) {
    console.error('[entrega.revisions] email notification failed (non-fatal)', err);
  }
  try {
    const lines = [
      `🎬 <b>${esc(couple)}</b> han demanat <b>${count}</b> canvi(s) a l'entrega`,
      ...items.slice(0, 6).map((i) => `• ${i.timecode ? `[${esc(i.timecode)}] ` : ''}${esc(i.text).slice(0, 160)}`),
    ];
    if (items.length > 6) lines.push(`… i ${items.length - 6} més`);
    await sendTelegramNotification(lines.join('\n'));
  } catch (err) {
    console.error('[entrega.revisions] telegram notification failed (non-fatal)', err);
  }

  return json({ ok: true, count }, 200);
};
