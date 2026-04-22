// Quiz submission endpoint. Saves a lead (no auto-quote) and notifies
// Eric/Ferran via Telegram + email with a deep-link to /admin/new?lead=<id>,
// so they can review, adjust packs and send the quote manually when ready.

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { createLead } from '~/lib/quotes';
import { recommendPacks } from '~/lib/matcher';
import { sendNotification, sendTelegramNotification, sendAutoReplyToLead } from '~/lib/email';
import { verifyTurnstile, clientIp } from '~/lib/captcha';

const schema = z.object({
  weddingDate: z.string().optional(),
  location: z.string().min(1),
  ceremonyType: z.string().min(1),
  serviceInterest: z.string().min(1),
  budgetRange: z.string().min(1),
  coupleName: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  lang: z.enum(['es', 'ca', 'en']).optional(),
  captchaToken: z.string().optional(),
});

const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

const LABELS: Record<string, string> = {
  tarragona: 'Tarragona/Reus',
  barcelona: 'Barcelona',
  lleida: 'Lleida/Girona',
  other_cat: 'Catalunya',
  international: 'Internacional',
  civil: 'Civil',
  religious: 'Religiosa',
  symbolic: 'Simbòlica',
  photo: 'Foto',
  video: 'Vídeo',
  both: 'Foto+Vídeo',
  low: '< 1.500 €',
  mid: '1.500-2.500 €',
  high: '2.500-3.500 €',
  premium: '> 3.500 €',
};

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Bad JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid data', details: parsed.error.flatten() }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Captcha (Turnstile). No-op when the secret key isn't configured.
  const captchaOk = await verifyTurnstile(parsed.data.captchaToken, clientIp(request));
  if (!captchaOk) {
    return new Response(JSON.stringify({ error: 'Captcha failed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const d = parsed.data;
  const answers = {
    weddingDate: d.weddingDate,
    location: d.location,
    ceremonyType: d.ceremonyType,
    serviceInterest: d.serviceInterest,
    budgetRange: d.budgetRange,
  };

  // Recommend packs up-front so Telegram/email can show them as a hint —
  // but DO NOT create a quote. Eric/Ferran decide when and what to send.
  const recommendedPacks = recommendPacks(answers);

  const lead = await createLead({
    coupleName: d.coupleName,
    email: d.email,
    phone: d.phone,
    weddingDate: d.weddingDate,
    location: d.location,
    ceremonyType: d.ceremonyType,
    serviceInterest: d.serviceInterest,
    budgetRange: d.budgetRange,
  });

  // Deep-link to /admin/new pre-filled with this lead's id. The admin page
  // reads ?lead=<id> and prepares the form with name/email/recommended packs.
  const reviewUrl = `${SITE_URL}/admin/new?lead=${lead.id}`;
  const hora = new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' });

  await sendNotification({
    subject: `🆕 Nou lead · ${d.coupleName}`,
    replyTo: d.email,
    html: `
      <h2>Nou lead des del quiz</h2>
      <ul>
        <li><strong>Parella:</strong> ${d.coupleName}</li>
        <li><strong>Email:</strong> <a href="mailto:${d.email}">${d.email}</a></li>
        ${d.phone ? `<li><strong>Telèfon:</strong> ${d.phone}</li>` : ''}
        ${d.weddingDate ? `<li><strong>Data boda:</strong> ${d.weddingDate}</li>` : ''}
        <li><strong>Lloc:</strong> ${LABELS[d.location] ?? d.location}</li>
        <li><strong>Cerimònia:</strong> ${LABELS[d.ceremonyType] ?? d.ceremonyType}</li>
        <li><strong>Servei:</strong> ${LABELS[d.serviceInterest] ?? d.serviceInterest}</li>
        <li><strong>Pressupost:</strong> ${LABELS[d.budgetRange] ?? d.budgetRange}</li>
        <li><strong>Hora:</strong> ${hora}</li>
      </ul>
      <p>🤖 <strong>Recomanació automàtica:</strong> ${recommendedPacks.join(', ')}</p>
      <p style="margin-top:20px">
        <a href="${reviewUrl}"
           style="display:inline-block;background:#1a1a1a;color:#fff;padding:12px 22px;text-decoration:none;font-weight:600;letter-spacing:.12em;text-transform:uppercase;font-size:13px">
          Revisar i crear pressupost
        </a>
      </p>
    `,
  });

  await sendTelegramNotification(
    [
      `🆕 <b>Nou lead</b>`,
      ``,
      `<b>${escapeHtml(d.coupleName)}</b>`,
      `📧 ${escapeHtml(d.email)}${d.phone ? ` · 📱 ${escapeHtml(d.phone)}` : ''}`,
      ``,
      `${d.weddingDate ? `📅 ${d.weddingDate}\n` : ''}📍 ${LABELS[d.location] ?? d.location} · ⛪ ${LABELS[d.ceremonyType] ?? d.ceremonyType}`,
      `📸 ${LABELS[d.serviceInterest] ?? d.serviceInterest} · 💰 ${LABELS[d.budgetRange] ?? d.budgetRange}`,
      ``,
      `🤖 Recomanació: <code>${recommendedPacks.join(', ')}</code>`,
      ``,
      `<a href="${reviewUrl}">▶ Revisar i crear pressupost</a>`,
    ].join('\n'),
  );

  // Auto-reply to the couple with a link to the typology-matched landing.
  await sendAutoReplyToLead({
    email: d.email,
    name: d.coupleName,
    lang: d.lang ?? 'ca',
    ceremonyType: d.ceremonyType,
    serviceInterest: d.serviceInterest,
    location: d.location,
  });

  return new Response(
    JSON.stringify({ ok: true, leadId: lead.id }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};

function escapeHtml(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}
