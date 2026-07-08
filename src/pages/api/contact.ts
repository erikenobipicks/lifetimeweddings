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
import { pushLeadToFotostudio } from '~/lib/fotostudio';
import { sendMetaCapiLead } from '~/lib/meta-capi';
import { createRateLimiter, clientIpFrom } from '~/lib/rate-limit';

// Captcha + honeypot already gate this, but a per-IP cap adds a cheap layer
// against notification flooding (each accepted lead emails Eric + Telegram +
// an auto-reply to the lead). 10 / hour / IP is far above real-world contact.
const rateLimit = createRateLimiter({ limit: 10, windowMs: 60 * 60 * 1000 });

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
  // Lead-qualifying fields (optional — only the elopement/cluster landing
  // forms send them; the plain ContactForm omits them). Kept short + free-text
  // so the same endpoint stays backward-compatible.
  session_type: z.preprocess(blankToUndef, z.string().max(80).optional()),
  budget: z.preprocess(blankToUndef, z.string().max(80).optional()),
  guests: z.preprocess(blankToUndef, z.string().max(80).optional()),
  location_pref: z.preprocess(blankToUndef, z.string().max(200).optional()),
  source: z.preprocess(blankToUndef, z.string().max(120).optional()),
  _language: z.preprocess(blankToUndef, z.enum(['ca', 'es', 'en']).optional()),
  captchaToken: z.preprocess(blankToUndef, z.string().optional()),
  // Meta Conversions API deduplication + match quality. The browser Pixel
  // fires `Lead` with this same id as `{eventID}`; we forward it (+ the _fbp/
  // _fbc cookies and source URL) to the CAPI so Meta counts the lead once.
  // Only present when the visitor accepted cookies (pixel loaded) — so its
  // presence doubles as the consent signal for the server-side event.
  metaEventId: z.preprocess(blankToUndef, z.string().max(100).optional()),
  eventSourceUrl: z.preprocess(blankToUndef, z.string().max(500).optional()),
  fbp: z.preprocess(blankToUndef, z.string().max(200).optional()),
  fbc: z.preprocess(blankToUndef, z.string().max(400).optional()),
});

function esc(s: string | undefined | null): string {
  return (s ?? '').replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );
}

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!rateLimit(clientIpFrom(request.headers))) {
      return new Response(JSON.stringify({ error: 'rate_limited' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
    //
    // `deduplicated`: same email within 24h. We still return 200 (so the form
    // shows success) but skip the notification + auto-reply so the couple
    // doesn't get a flood when they double-tap submit.
    let deduplicated = false;
    try {
      const result = await createLead({
        coupleName: d.name,
        email: d.email,
        weddingDate: d.wedding_date,
        location: d.location_pref ?? d.venue,
        preferredLanguage: lang,
      });
      deduplicated = result.deduplicated;
    } catch (err) {
      console.error('[contact] createLead failed (non-fatal)', err);
    }

    if (deduplicated) {
      console.log('[contact] deduplicated, skipping notification + auto-reply', { email: d.email });
      return new Response(JSON.stringify({ ok: true, deduplicated: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await sendNotification({
      subject: `💌 Nou contacte · ${d.name}`,
      html: `
        <h2>Nou contacte des del formulari</h2>
        <ul>
          <li><strong>Nom:</strong> ${esc(d.name)}</li>
          <li><strong>Email:</strong> <a href="mailto:${esc(d.email)}">${esc(d.email)}</a></li>
          ${d.session_type ? `<li><strong>Tipus de sessió:</strong> ${esc(d.session_type)}</li>` : ''}
          ${d.wedding_date ? `<li><strong>Data boda:</strong> ${esc(d.wedding_date)}</li>` : ''}
          ${d.location_pref ? `<li><strong>Ubicació desitjada:</strong> ${esc(d.location_pref)}</li>` : ''}
          ${d.venue ? `<li><strong>Lloc / venue:</strong> ${esc(d.venue)}</li>` : ''}
          ${d.guests ? `<li><strong>Nº convidats:</strong> ${esc(d.guests)}</li>` : ''}
          ${d.budget ? `<li><strong>Pressupost:</strong> ${esc(d.budget)}</li>` : ''}
          ${d.source ? `<li><strong>Com ens ha trobat:</strong> ${esc(d.source)}</li>` : ''}
          <li><strong>Idioma:</strong> ${esc(lang)}</li>
          <li><strong>Hora:</strong> ${esc(when)}</li>
        </ul>
        ${d.message ? `<h3>Missatge</h3><p style="white-space:pre-wrap">${esc(d.message)}</p>` : '<p><em>(sense missatge personalitzat)</em></p>'}
        <p style="color:#666;font-size:12px">Podeu respondre directament a aquest correu — va cap a <strong>${esc(d.email)}</strong>.</p>
      `,
      replyTo: d.email,
    });

    const place = d.location_pref ?? d.venue;
    await sendTelegramNotification(
      `💌 <b>Nou contacte</b>\n${esc(d.name)}\n📧 ${esc(d.email)}${d.session_type ? `\n🎞️ ${esc(d.session_type)}` : ''}${d.wedding_date ? `\n📅 ${esc(d.wedding_date)}` : ''}${place ? `\n📍 ${esc(place)}` : ''}${d.guests ? `\n👥 ${esc(d.guests)}` : ''}${d.budget ? `\n💰 ${esc(d.budget)}` : ''}${d.source ? `\n🔎 ${esc(d.source)}` : ''}`,
    );

    // Auto-reply to the lead. No ceremony/service captured in this form, so
    // `slugForLead(null, null)` returns null → the helper falls back to
    // /packs as a generic proposal link.
    await sendAutoReplyToLead({
      email: d.email,
      name: d.name,
      lang,
    });

    // Push to fotostudio CRM as a prospect tagged "web-lead". No-op when
    // FOTOSTUDIO_API_TOKEN is unset; otherwise fail-soft inside the helper.
    await pushLeadToFotostudio({
      coupleName: d.name,
      email: d.email,
      weddingDate: d.wedding_date,
      venue: d.venue ?? d.location_pref,
      language: lang,
    });

    // Meta Conversions API (server-side Lead), deduped with the browser Pixel
    // via the shared `metaEventId`. Only fires when the client sent one (i.e.
    // the pixel was loaded → cookies accepted) and META_CAPI_TOKEN is set.
    // Fail-soft: the helper never throws, so tracking can't break the lead.
    if (d.metaEventId) {
      await sendMetaCapiLead({
        eventId: d.metaEventId,
        email: d.email,
        name: d.name,
        eventSourceUrl: d.eventSourceUrl,
        clientIp: clientIp(request),
        userAgent: request.headers.get('user-agent') ?? undefined,
        fbp: d.fbp,
        fbc: d.fbc,
      });
    }

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
