// Contact form endpoint. Receives the form submission from <ContactForm>
// (home + /contacto), validates it, and relays the lead to hola@lifetime.photo
// via Resend (same infra as the quiz notifier and quote-view notifications).
//
// FROM: Lifetime Weddings <notifications@lifetime.photo>    (env: EMAIL_FROM)
// REPLY-TO: the lead's own email so we can reply straight from Gmail
// TO: hola@lifetime.photo                                   (env: EMAIL_TO)

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { sendNotification, sendTelegramNotification } from '~/lib/email';
import { createLead } from '~/lib/quotes';

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  wedding_date: z.string().max(40).optional(),
  venue: z.string().max(200).optional(),
  message: z.string().max(5000).optional(),
  consent: z.union([z.string(), z.literal('on')]).optional(),
  _language: z.enum(['ca', 'es', 'en']).optional(),
  _gotcha: z.string().max(0).optional(), // honeypot — must stay empty
});

function esc(s: string | undefined | null): string {
  return (s ?? '').replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );
}

export const POST: APIRoute = async ({ request }) => {
  const ct = request.headers.get('content-type') ?? '';
  let raw: Record<string, string> = {};
  try {
    if (ct.includes('application/json')) {
      raw = await request.json();
    } else {
      const fd = await request.formData();
      for (const [k, v] of fd.entries()) raw[k] = String(v);
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Bad payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Honeypot: if `_gotcha` has any content, drop silently (bots fill hidden fields).
  if (parsed.data._gotcha) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  const d = parsed.data;
  const lang = d._language ?? 'ca';
  const when = new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' });

  // Persist a lead for the admin dashboard. `quoteId` is null because no quote
  // has been generated yet — the couple just reached out.
  try {
    await createLead({
      coupleName: d.name,
      email: d.email,
      weddingDate: d.wedding_date,
      location: d.venue,
      ceremonyType: null as any,
      serviceInterest: null as any,
      budgetRange: null as any,
    } as any);
  } catch {
    /* non-fatal */
  }

  await sendNotification({
    subject: `💌 Nou contacte · ${d.name}`,
    html: `
      <h2>Nou contacte des del formulari</h2>
      <ul>
        <li><strong>Nom:</strong> ${esc(d.name)}</li>
        <li><strong>Email:</strong> <a href="mailto:${esc(d.email)}">${esc(d.email)}</a></li>
        ${d.wedding_date ? `<li><strong>Data boda:</strong> ${esc(d.wedding_date)}</li>` : ''}
        ${d.venue ? `<li><strong>Lloc:</strong> ${esc(d.venue)}</li>` : ''}
        <li><strong>Idioma:</strong> ${esc(lang)}</li>
        <li><strong>Hora:</strong> ${esc(when)}</li>
      </ul>
      ${d.message ? `<h3>Missatge</h3><p style="white-space:pre-wrap">${esc(d.message)}</p>` : '<p><em>(sense missatge personalitzat)</em></p>'}
      <p style="color:#666;font-size:12px">Podeu respondre directament a aquest correu — va cap a <strong>${esc(d.email)}</strong>.</p>
    `,
    replyTo: d.email,
  });

  await sendTelegramNotification(
    `💌 <b>Nou contacte</b>\n${d.name}\n📧 ${d.email}${d.wedding_date ? `\n📅 ${d.wedding_date}` : ''}${d.venue ? `\n📍 ${d.venue}` : ''}`,
  );

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
