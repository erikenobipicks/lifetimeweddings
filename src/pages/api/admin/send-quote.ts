// Admin-only: send the quote link by email to the couple.
// Protected via the admin session cookie (same guard as /admin/* pages).

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import { getQuoteById, markQuoteSent } from '~/lib/quotes';
import { sendNotification } from '~/lib/email';
import { generateQuotePdf } from '~/lib/quotes/pdf';
import { SITE } from '~/data/site';
import type { Lang } from '~/i18n/ui';

const schema = z.object({
  quoteId: z.number().int().positive(),
  /** Optional override — defaults to the couple email stored on the quote. */
  to: z.string().email().optional(),
});

const SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;

// Localised copy for the manual "📧 Enviar" email. Bodies stay short and
// personal — the visual pitch lives on the /p/<token> landing the link
// opens, this is just the cover note that gets the couple there.
interface MailCopy {
  subject: string;
  hello: string;
  intro: string;
  cta: string;
  fallbackLine: string;
  question: string;
  signoff: string;
  pdfFilename: string;
}
function copyFor(lang: Lang, greet: string): MailCopy {
  if (lang === 'es') {
    return {
      subject: 'Vuestra propuesta · Lifetime Weddings',
      hello: `Hola ${greet},`,
      intro: 'Como hemos quedado, aquí tenéis la propuesta personalizada para vuestra boda:',
      cta: 'Ver la propuesta',
      fallbackLine: 'O copiad el enlace:',
      question: 'Cualquier duda, responded este correo.',
      signoff: '— Eric y Ferran',
      pdfFilename: 'Propuesta',
    };
  }
  if (lang === 'en') {
    return {
      subject: 'Your proposal · Lifetime Weddings',
      hello: `Hi ${greet},`,
      intro: 'As discussed, here is your personalised wedding proposal:',
      cta: 'View the proposal',
      fallbackLine: 'Or copy the link:',
      question: 'Any questions, just reply to this email.',
      signoff: '— Eric and Ferran',
      pdfFilename: 'Proposal',
    };
  }
  // ca (default)
  return {
    subject: 'La vostra proposta · Lifetime Weddings',
    hello: `Hola ${greet},`,
    intro: 'Com hem quedat, aquí teniu la proposta personalitzada per a la vostra boda:',
    cta: 'Veure la proposta',
    fallbackLine: "O copia l'enllaç:",
    question: 'Qualsevol dubte, responeu aquest correu.',
    signoff: '— Eric i Ferran',
    pdfFilename: 'Proposta',
  };
}

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
  const L = copyFor(quote.preferredLanguage, greet);

  // Build the branded quote PDF to attach. Fail-soft: if generation throws
  // (bad data, missing asset), we still send the email with the link —
  // losing the attachment is better than not sending the proposal.
  let attachments: { filename: string; content: Buffer }[] | undefined;
  try {
    if (quote.packIds.length > 0) {
      const pdf = await generateQuotePdf({
        coupleName: quote.coupleName,
        packIds: quote.packIds,
        notes: quote.notes,
        lang: quote.preferredLanguage,
      });
      const safeName = quote.coupleName.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 40) || L.pdfFilename.toLowerCase();
      attachments = [{ filename: `${L.pdfFilename}-${safeName}.pdf`, content: pdf }];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[send-quote] PDF generation failed, sending without attachment', err);
  }

  await sendNotification({
    to,
    attachments,
    subject: L.subject,
    html: `
      <p>${escapeHtml(L.hello)}</p>
      <p>${escapeHtml(L.intro)}</p>
      <p style="margin:24px 0">
        <a href="${link}"
           style="display:inline-block;background:#c9a96e;color:#fff;padding:14px 28px;text-decoration:none;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-size:14px;border-radius:2px">
          ${escapeHtml(L.cta)}
        </a>
      </p>
      <p style="color:#666;font-size:14px">${escapeHtml(L.fallbackLine)} <a href="${link}">${link}</a></p>
      <p>${escapeHtml(L.question)}</p>
      <p>${escapeHtml(L.signoff)}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
      <p style="color:#999;font-size:12px">
        Lifetime Weddings · ${SITE.phoneDisplay} · ${SITE.email}<br/>
        ${SITE.address.street}, ${SITE.address.city} (${SITE.address.region})
      </p>
    `,
    replyTo: SITE.email,
  });

  // Stamp the "sent" timestamp so the 7-day follow-up clock starts.
  // Fail-soft: a DB blip here mustn't reverse the successful email send.
  try {
    await markQuoteSent(quote.id);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[send-quote] markQuoteSent failed (non-fatal)', err);
  }

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
