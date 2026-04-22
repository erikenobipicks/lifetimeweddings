// Contact form endpoint. Receives the form submission from <ContactForm>
// (home + /contacto), validates it, and relays the lead to hola@lifetime.photo
// via Resend (same infra as the quiz notifier and quote-view notifications).
//
// FROM: Lifetime Weddings <notifications@lifetime.photo>    (env: EMAIL_FROM)
// REPLY-TO: the lead's own email so we can reply straight from Gmail
// TO: hola@lifetime.photo                                   (env: EMAIL_TO)

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { sendNotification, sendTelegramNotification, sendAutoReplyToLead } from '~/lib/email';
import { createLead } from '~/lib/quotes';
import { verifyTurnstile, clientIp } from '~/lib/captcha';

// Coerce "" → undefined for optional fields so we don't persist empty strings
// and so zod's `.optional()` short-circuits length checks on blank inputs.
const blankToUndef = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? undefined : v);

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  wedding_date: z.preprocess(blankToUndef, z.string().max(40).optional()),
  venue: z.preprocess(blankToUndef, z.string().max(200).optional()),
  message: z.preprocess(blankToUndef, z.string().max(5000).optional()),
  consent: z.preprocess(blankToUndef, z.string().optional()),
  _language: z.preprocess(blankToUndef, z.enum(['ca', 'es', 'en']).optional()),
  captchaToken: z.preprocess(blankToUndef, z.string().optional()),
});

function esc(s: string | undefined | null): string {
  return (s ?? '').replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const ct = request.headers.get('content-type') ?? '';
    let raw: Record<string, string> = {};
    try {
      if (ct.includes('application/json')) {
        raw = (await request.json()) as Record<string, string>;
      } else {
        const fd = await request.formData();
        for (const [k, v] of fd.entries()) raw[k] = String(v);
      }
    } catch (err) {
      console.error('[contact] payload parse failed', err);
      return new Response(JSON.stringify({ error: 'Bad payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Honeypot FIRST — before schema validation. Bots (and some autofillers)
    // put content in `_gotcha`; drop silently with a 200 so they think it worked.
    if (typeof raw._gotcha === 'string' && raw._gotcha.length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Captcha (Turnstile) before the expensive work. No-op when the secret
    // key isn't configured — useful for local dev.
    const captchaOk = await verifyTurnstile(raw.captchaToken, clientIp(request));
    if (!captchaOk) {
      return new Response(JSON.stringify({ error: 'Captcha failed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      console.error('[contact] validation failed', parsed.error.flatten());
      return new Response(
        JSON.stringify({ error: 'Invalid data', details: parsed.error.flatten() }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const d = parsed.data;
    const lang = d._language ?? 'ca';
    const when = new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' });

    // Persist a lead for the admin dashboard. `quoteId` is null because no quote
    // has been generated yet — the couple just reached out. Non-fatal: even if
    // the DB is down, we still want the email to go through.
    try {
      await createLead({
        coupleName: d.name,
        email: d.email,
        weddingDate: d.wedding_date,
        location: d.venue,
      });
    } catch (err) {
      console.error('[contact] createLead failed (non-fatal)', err);
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
      `💌 <b>Nou contacte</b>\n${esc(d.name)}\n📧 ${esc(d.email)}${d.wedding_date ? `\n📅 ${esc(d.wedding_date)}` : ''}${d.venue ? `\n📍 ${esc(d.venue)}` : ''}`,
    );

    // Auto-reply to the lead. No ceremony/service captured in this form, so
    // `slugForLead(null, null)` returns null → the helper falls back to
    // /packs as a generic proposal link.
    await sendAutoReplyToLead({
      email: d.email,
      name: d.name,
      lang,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // Last-resort net: log with enough context to diagnose from Railway logs.
    console.error('[contact] unhandled error', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
