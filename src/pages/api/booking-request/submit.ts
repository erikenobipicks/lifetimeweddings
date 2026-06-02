// POST /api/booking-request/submit
//
// Public booking-request endpoint. Receives the form submission from
// <BookingRequestForm /> (CA/ES/EN /sol-licitar-reserva pages), validates
// it, persists the lead, sends notifications, and pushes the contact into
// FotoStudio as a prospect.
//
// Same downstream pipeline as /api/contact.ts but with richer fields
// (couple = two names, phone required, wedding date as ISO, guest count,
// notes). The Booking record itself is NOT created here — that's still
// the operator's job from admin, where they decide pack + price before
// sending the personalised /reserva/<slug> link to the couple.
//
// Flow:
//   1. honeypot → silent 200 on hit
//   2. Turnstile verification
//   3. zod schema validation (coerce empty strings to undefined)
//   4. createLead() — persists to leads table, dedupes per email/24h
//   5. sendNotification() — full-detail email to Eric
//   6. sendTelegramNotification() — concise mobile ping
//   7. sendAutoReplyToLead() — "we got it, response in 24h" to the couple
//   8. pushLeadToFotostudio() — FotoStudio prospect contact tagged web-lead

import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  sendNotification,
  sendTelegramNotification,
  sendAutoReplyToLead,
} from '~/lib/email';
import { createLead } from '~/lib/quotes';
import { verifyTurnstile, clientIp } from '~/lib/captcha';
import { pushLeadToFotostudio } from '~/lib/fotostudio';

const blankToUndef = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? undefined : v);

const schema = z.object({
  couple_name_1: z.string().min(1).max(120),
  couple_name_2: z.preprocess(blankToUndef, z.string().min(1).max(120).optional()),
  email: z.string().email().max(200),
  phone: z.preprocess(blankToUndef, z.string().min(6).max(40).optional()),
  wedding_date: z.preprocess(blankToUndef, z.string().max(40).optional()),
  venue: z.preprocess(blankToUndef, z.string().max(200).optional()),
  location: z.preprocess(blankToUndef, z.string().max(200).optional()),
  guest_count: z.preprocess(
    blankToUndef,
    z.coerce.number().int().positive().max(2000).optional(),
  ),
  how_found_us: z.preprocess(blankToUndef, z.string().max(500).optional()),
  notes: z.preprocess(blankToUndef, z.string().max(5000).optional()),
  consent: z.preprocess(blankToUndef, z.string().optional()),
  _language: z.preprocess(blankToUndef, z.enum(['ca', 'es', 'en']).optional()),
  captchaToken: z.preprocess(blankToUndef, z.string().optional()),
});

function esc(s: string | undefined | null | number): string {
  return String(s ?? '').replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );
}

function coupleDisplayName(c1: string, c2?: string): string {
  return c2 ? `${c1.trim()} & ${c2.trim()}` : c1.trim();
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // ─── Parse payload (JSON or form-encoded) ─────────────────────────
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
      console.error('[booking-request] payload parse failed', err);
      return new Response(JSON.stringify({ error: 'Bad payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Honeypot — silent 200 so bots think it worked.
    if (typeof raw._gotcha === 'string' && raw._gotcha.length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Captcha (no-op if TURNSTILE_SECRET_KEY isn't configured).
    const captchaOk = await verifyTurnstile(raw.captchaToken, clientIp(request));
    if (!captchaOk) {
      return new Response(JSON.stringify({ error: 'Captcha failed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      console.error('[booking-request] validation failed', parsed.error.flatten());
      return new Response(
        JSON.stringify({ error: 'Invalid data', details: parsed.error.flatten() }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const d = parsed.data;
    const lang = d._language ?? 'ca';
    const when = new Date().toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' });
    const fullName = coupleDisplayName(d.couple_name_1, d.couple_name_2);

    // Persist a lead. Dedupe per email/24h; same email in 24h still gets 200
    // but skips notification + auto-reply.
    let deduplicated = false;
    try {
      const result = await createLead({
        coupleName: fullName,
        email: d.email,
        phone: d.phone,
        weddingDate: d.wedding_date,
        location: d.location,
        venueName: d.venue,
        preferredLanguage: lang,
      });
      deduplicated = result.deduplicated;
    } catch (err) {
      console.error('[booking-request] createLead failed (non-fatal)', err);
    }

    if (deduplicated) {
      console.log('[booking-request] deduplicated, skipping notifications', { email: d.email });
      return new Response(JSON.stringify({ ok: true, deduplicated: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Internal alert — richer than /api/contact because we have more fields.
    await sendNotification({
      subject: `📋 Sol·licitud de reserva · ${fullName}`,
      html: `
        <h2>Nova sol·licitud de reserva des de la web</h2>
        <ul>
          <li><strong>Parella:</strong> ${esc(fullName)}</li>
          <li><strong>Email:</strong> <a href="mailto:${esc(d.email)}">${esc(d.email)}</a></li>
          ${d.phone ? `<li><strong>Telèfon:</strong> <a href="tel:${esc(d.phone)}">${esc(d.phone)}</a></li>` : ''}
          ${d.wedding_date ? `<li><strong>Data boda:</strong> ${esc(d.wedding_date)}</li>` : ''}
          ${d.venue ? `<li><strong>Lloc / venue:</strong> ${esc(d.venue)}</li>` : ''}
          ${d.location ? `<li><strong>Població:</strong> ${esc(d.location)}</li>` : ''}
          ${d.guest_count ? `<li><strong>Convidats (estimat):</strong> ${esc(d.guest_count)}</li>` : ''}
          ${d.how_found_us ? `<li><strong>Com ens han conegut:</strong> ${esc(d.how_found_us)}</li>` : ''}
          <li><strong>Idioma:</strong> ${esc(lang)}</li>
          <li><strong>Hora:</strong> ${esc(when)}</li>
        </ul>
        ${d.notes ? `<h3>Notes</h3><p style="white-space:pre-wrap">${esc(d.notes)}</p>` : ''}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
        <p style="color:#444">
          <strong>Següent pas:</strong> obre <a href="https://www.lifetime.photo/admin/bookings/new?email=${encodeURIComponent(d.email)}">l'admin</a>,
          revisa les dades i envia el link de <code>/reserva/&lt;slug&gt;</code> a la parella.
        </p>
        <p style="color:#666;font-size:12px">Podeu respondre directament — va cap a <strong>${esc(d.email)}</strong>.</p>
      `,
      replyTo: d.email,
    });

    // Telegram — concise, mobile-friendly.
    await sendTelegramNotification(
      `📋 <b>Sol·licitud de reserva</b>\n${esc(fullName)}\n📧 ${esc(d.email)}` +
        `${d.phone ? `\n📞 ${esc(d.phone)}` : ''}` +
        `${d.wedding_date ? `\n📅 ${esc(d.wedding_date)}` : ''}` +
        `${d.venue ? `\n📍 ${esc(d.venue)}` : ''}` +
        `${d.guest_count ? `\n👥 ~${esc(d.guest_count)} convidats` : ''}`,
    );

    // Couple-side confirmation. Uses the same template as /api/contact's
    // auto-reply (sets expectation: response in 24h, gives them /packs as
    // a parking lot until we send the personalised /reserva/<slug>).
    await sendAutoReplyToLead({
      email: d.email,
      name: d.couple_name_1,
      lang,
    });

    // FotoStudio prospect upsert.
    await pushLeadToFotostudio({
      coupleName: fullName,
      email: d.email,
      weddingDate: d.wedding_date,
      venue: d.venue,
      language: lang,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[booking-request] unhandled error', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
