// Admin-only: send the quote link by email to the couple.
// Protected via the admin session cookie (same guard as /admin/* pages).

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import { getQuoteById } from '~/lib/quotes';
import { sendNotification } from '~/lib/email';
import { SITE } from '~/data/site';

const schema = z.object({
  quoteId: z.number().int().positive(),
  /** Optional override — defaults to the couple email stored on the quote. */
  to: z.string().email().optional(),
});

const SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = await getUser(cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: unknown;
  try { body = await request.json(); }
  catch { return json({ error: 'Bad JSON' }, 400); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: 'Invalid data' }, 400);

  const quote = await getQuoteById(parsed.data.quoteId);
  if (!quote) return json({ error: 'Quote not found' }, 404);

  const to = parsed.data.to ?? quote.coupleEmail;
  if (!to) return json({ error: 'No recipient email on quote' }, 400);

  const link = `${SITE_URL}/p/${quote.token}`;
  const greet = quote.coupleName.split('&')[0].trim(); // "Anna & Marc" → "Anna"

  await sendNotification({
    to,
    subject: `La vostra proposta · Lifetime Weddings`,
    html: `
      <p>Hola ${escapeHtml(greet)},</p>
      <p>Com hem quedat, aquí teniu la proposta personalitzada per a la vostra boda:</p>
      <p style="margin:24px 0">
        <a href="${link}"
           style="display:inline-block;background:#c9a96e;color:#fff;padding:14px 28px;text-decoration:none;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-size:14px;border-radius:2px">
          Veure la proposta
        </a>
      </p>
      <p style="color:#666;font-size:14px">O copia l'enllaç: <a href="${link}">${link}</a></p>
      <p>Qualsevol dubte, responeu aquest correu.</p>
      <p>— Eric i Ferran</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
      <p style="color:#999;font-size:12px">
        Lifetime Weddings · ${SITE.phoneDisplay} · ${SITE.email}<br/>
        ${SITE.address.street}, ${SITE.address.city} (${SITE.address.region})
      </p>
    `,
    replyTo: SITE.email,
  });

  return json({ ok: true, sentTo: to }, 200);
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}
