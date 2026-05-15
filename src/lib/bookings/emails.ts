// Email + Telegram dispatch for booking form submissions.
//
// Two recipients, two intents:
//   1. Couple → confirmation + next-steps in their preferred_language.
//      Uses the customer-facing `hola@` from-address (mirroring the lead
//      auto-reply pattern). HTML + plaintext multipart for deliverability.
//   2. Internal → minimalist alert with just the action-relevant fields.
//      No PII overflow (DNI / addresses live ONLY in the DB to keep
//      data-minimisation tight). Subject + body + admin link, that's it.
//
// Telegram fires alongside the internal email — same content, even shorter,
// because it's the channel we'll read first from the phone.
//
// All three paths are fail-soft: if delivery fails (no API key, network,
// upstream error), we log and return; the request is NOT failed because
// the form data is already safely persisted.

import { SITE, WHATSAPP_BASE } from '~/data/site';
// Shared Resend client + Telegram helper — single instance per process,
// shared dev-mode fallback (logs instead of sending when RESEND_API_KEY
// isn't set). See src/lib/email.ts.
import { resend, sendTelegramNotification } from '~/lib/email';
import type { Booking, BookingFormResponse, Lang } from './types';
import { formatPrice, formatExpiresShort, formatWeddingDateLong } from './format';

const FROM_HELLO = process.env.EMAIL_FROM_HELLO ?? 'Lifetime Weddings <hola@lifetime.photo>';
const FROM_NOTIFY = process.env.EMAIL_FROM ?? 'Lifetime Weddings <notifications@lifetime.photo>';
const INTERNAL_TO = process.env.EMAIL_TO ?? 'hola@lifetime.photo';
const SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;

// ─── Couple confirmation ─────────────────────────────────────────────────
// Subject + body templated per locale. Variables resolved from booking +
// formResponse. Body intentionally short — purpose is "we got it, here's
// what's next, talk soon" — not a re-pitch.

interface CoupleEmail {
  subject: string;
  greeting: string;
  acknowledgment: string;
  nextSteps: string[];
  whatsappPrompt: string;
  signoff: string;
}

function coupleCopy(booking: Booking): CoupleEmail {
  const lang: Lang = booking.preferredLanguage;
  const n1 = booking.coupleName1;
  const n2 = booking.coupleName2;
  const dateLong = formatWeddingDateLong(booking.weddingDate, lang);
  const venue = booking.venueName;
  const deposit = formatPrice(booking.depositCents, lang);

  if (lang === 'es') {
    return {
      subject: `Hemos recibido vuestra reserva — siguientes pasos, ${n1}`,
      greeting: `Hola ${n1} y ${n2},`,
      acknowledgment: `Acabamos de recibir vuestros datos para la reserva de la boda del ${dateLong} en ${venue}.`,
      nextSteps: [
        'En menos de 24h os enviamos el contrato para firmar online (no hay que imprimir nada).',
        `Junto con el contrato recibiréis el enlace para el depósito de ${deposit}.`,
        'Cuando ambas cosas estén hechas, vuestra fecha queda formalmente bloqueada en nuestro calendario.',
      ],
      whatsappPrompt: 'Mientras tanto, si surge cualquier duda, escribidnos directamente al WhatsApp:',
      signoff: 'Estamos ya pensando en vuestra boda. Hablamos pronto.\n\nFerran y Eric\nLifetime',
    };
  }
  if (lang === 'en') {
    return {
      subject: `We've received your booking — next steps, ${n1}`,
      greeting: `Hi ${n1} and ${n2},`,
      acknowledgment: `We just received your details for the booking of the wedding on ${dateLong} at ${venue}.`,
      nextSteps: [
        "Within 24h we'll send you the contract to sign online (no printing required).",
        `Along with the contract, you'll receive the link to pay the deposit of ${deposit}.`,
        'Once both are done, your date is formally locked into our calendar.',
      ],
      whatsappPrompt: 'In the meantime, if any questions come up, message us directly on WhatsApp:',
      signoff: "We're already thinking about your wedding. Talk soon.\n\nFerran and Eric\nLifetime",
    };
  }
  // ca (default)
  return {
    subject: `Hem rebut la vostra reserva — següents passos, ${n1}`,
    greeting: `Hola ${n1} i ${n2},`,
    acknowledgment: `Acabem de rebre les vostres dades per la reserva de la boda del ${dateLong} a ${venue}.`,
    nextSteps: [
      "En menys de 24h us enviem el contracte per signar online (no cal imprimir res).",
      `Junt amb el contracte rebreu el link per al dipòsit de ${deposit}.`,
      'Quan totes dues coses estiguin fetes, la vostra data queda formalment bloquejada al nostre calendari.',
    ],
    whatsappPrompt: 'Mentrestant, si us sorgeix qualsevol dubte, escriviu-nos directament al WhatsApp:',
    signoff: 'Estem ja pensant en la vostra boda. Parlem aviat.\n\nFerran i Eric\nLifetime',
  };
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] as string));
}

function renderCoupleEmail(booking: Booking): { subject: string; html: string; text: string } {
  const c = coupleCopy(booking);
  const wa = WHATSAPP_BASE;

  const html = `
    <div style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
      <p style="margin:0 0 16px">${escapeHtml(c.greeting)}</p>
      <p style="margin:0 0 24px">${escapeHtml(c.acknowledgment)}</p>
      <ol style="padding-left:20px;margin:0 0 24px">
        ${c.nextSteps.map((s) => `<li style="margin-bottom:12px">${escapeHtml(s)}</li>`).join('')}
      </ol>
      <p style="margin:0 0 8px">${escapeHtml(c.whatsappPrompt)}</p>
      <p style="margin:0 0 24px">
        <a href="${wa}" style="color:#c9a96e;text-decoration:underline">${wa}</a>
      </p>
      <p style="margin:0;white-space:pre-line">${escapeHtml(c.signoff)}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px"/>
      <p style="color:#999;font-size:12px;margin:0">
        Lifetime Weddings · ${SITE.phoneDisplay} · ${SITE.email}<br/>
        ${SITE.address.street}, ${SITE.address.city} (${SITE.address.region})
      </p>
    </div>
  `;

  const text = [
    c.greeting,
    '',
    c.acknowledgment,
    '',
    ...c.nextSteps.map((s, i) => `${i + 1}. ${s}`),
    '',
    c.whatsappPrompt,
    wa,
    '',
    c.signoff,
    '',
    '—',
    `Lifetime Weddings · ${SITE.phoneDisplay} · ${SITE.email}`,
    `${SITE.address.street}, ${SITE.address.city} (${SITE.address.region})`,
  ].join('\n');

  return { subject: c.subject, html, text };
}

export async function sendCoupleConfirmation(
  booking: Booking,
  formResponse: BookingFormResponse,
): Promise<void> {
  // Compose the recipient list: primary email always, plus c1/c2 emails
  // if they differ. Dedupe (case-insensitive) so we don't double-send.
  const recipients = new Set<string>();
  recipients.add(booking.coupleEmailPrimary.toLowerCase());
  recipients.add(formResponse.c1Email.toLowerCase());
  recipients.add(formResponse.c2Email.toLowerCase());
  const to = Array.from(recipients);

  const { subject, html, text } = renderCoupleEmail(booking);

  if (!resend) {
    // eslint-disable-next-line no-console
    console.log('[booking-email] (dev) couple confirmation:', { to, subject });
    return;
  }
  try {
    await resend.emails.send({ from: FROM_HELLO, to, subject, html, text });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[booking-email] couple confirmation failed', err);
  }
}

// ─── Internal alert ──────────────────────────────────────────────────────
// Minimal subject + body. Reply-To intentionally NOT set to the couple's
// address — alerts stay clean, real conversation goes through hola@.
//
// Privacy by design: NO DNI, NO addresses, NO phone numbers in this body.
// Source of truth lives in the DB; the email is just an actionable alert
// that points to admin.

const NOTES_PREVIEW_CHARS = 200;

function truncateNotes(notes: string | null): { preview: string; truncated: boolean } | null {
  if (!notes || notes.trim() === '') return null;
  const clean = notes.trim();
  if (clean.length <= NOTES_PREVIEW_CHARS) {
    return { preview: clean, truncated: false };
  }
  // Truncate at word boundary near the limit.
  const slice = clean.slice(0, NOTES_PREVIEW_CHARS);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > 100 ? slice.slice(0, lastSpace) : slice;
  return { preview: `${cut}…`, truncated: true };
}

function renderInternalEmail(
  booking: Booking,
  formResponse: BookingFormResponse,
): { subject: string; html: string; text: string } {
  // ⚠ markers when couple disagrees with what we proposed.
  const dateConfirmed = formResponse.weddingDateConfirmed;
  const dateLong = formatWeddingDateLong(booking.weddingDate, 'ca');
  const dateAlt = formResponse.weddingDateAlt
    ? formatWeddingDateLong(formResponse.weddingDateAlt, 'ca')
    : null;
  const venueConfirmed = formResponse.venueConfirmed;

  const dateLine = dateConfirmed
    ? dateLong
    : `${dateLong} ⚠ propuesta de cambio a ${dateAlt ?? '(sin alternativa)'}`;
  const venueLine = venueConfirmed
    ? booking.venueName
    : `${booking.venueName} ⚠ propuesta de cambio a ${formResponse.venueAltName ?? '(sin alternativa)'}`;

  const total = formatPrice(booking.packPriceCents, 'ca');
  const dep = formatPrice(booking.depositCents, 'ca');

  const notes = truncateNotes(formResponse.importantNotes);
  const adminUrl = `${SITE_URL}/admin/bookings/${booking.id}`;
  const couple = `${formResponse.c1FullName} y ${formResponse.c2FullName}`;

  const subject = `[Reserva] ${couple} · ${formatExpiresShort(booking.weddingDate, 'ca')}`;

  // Lines built deterministically; pieces are toggled on/off by their
  // upstream optionality (the spec is strict about what goes in).
  type Line = { label: string; value: string; warning?: boolean };
  const rows: Line[] = [
    { label: 'Pareja', value: couple },
    { label: 'Fecha', value: dateLine, warning: !dateConfirmed },
    { label: 'Venue', value: venueLine, warning: !venueConfirmed },
    { label: 'Pack', value: `${booking.packName} — total ${total}, depósito ${dep}` },
    { label: 'Pago preferido', value: formResponse.preferredPaymentMethod ?? '—' },
    { label: 'Idioma comunicación', value: (formResponse.preferredLanguage ?? booking.preferredLanguage).toUpperCase() },
  ];
  if (formResponse.howDidYouFindUs?.trim()) {
    rows.push({ label: 'Cómo nos conocieron', value: formResponse.howDidYouFindUs.trim() });
  }

  const notesBlockHtml = notes
    ? `
      <div style="margin-top:16px;padding:12px;background:#fff8e6;border-left:4px solid #c9a96e">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#666;margin-bottom:6px">
          Notas importantes${notes.truncated ? ' (preview)' : ''}
        </div>
        <div style="white-space:pre-line">${escapeHtml(notes.preview)}</div>
        ${notes.truncated ? `<div style="margin-top:8px"><a href="${adminUrl}" style="color:#c9a96e">[ver completo en admin]</a></div>` : ''}
      </div>
    `
    : '';

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.5;max-width:560px;margin:0 auto;padding:20px">
      <h1 style="font-size:18px;margin:0 0 16px">Nueva reserva recibida</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            (r) => `
          <tr>
            <td style="padding:6px 0;color:#666;width:35%;vertical-align:top">${escapeHtml(r.label)}</td>
            <td style="padding:6px 0;${r.warning ? 'color:#b45309;font-weight:600' : ''}">${escapeHtml(r.value)}</td>
          </tr>
        `,
          )
          .join('')}
      </table>
      ${notesBlockHtml}
      <div style="margin-top:24px">
        <a href="${adminUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;padding:10px 20px;text-decoration:none;font-weight:600;letter-spacing:0.05em;font-size:13px">Ver en admin →</a>
      </div>
    </div>
  `;

  const textLines = [
    `Nueva reserva recibida`,
    '',
    ...rows.map((r) => `${r.label}: ${r.value}`),
  ];
  if (notes) {
    textLines.push('', `Notas importantes${notes.truncated ? ' (preview)' : ''}:`);
    textLines.push(notes.preview);
    if (notes.truncated) textLines.push('[ver completo en admin]');
  }
  textLines.push('', `→ ${adminUrl}`);

  return { subject, html, text: textLines.join('\n') };
}

export async function sendInternalAlert(
  booking: Booking,
  formResponse: BookingFormResponse,
): Promise<void> {
  const { subject, html, text } = renderInternalEmail(booking, formResponse);
  if (!resend) {
    // eslint-disable-next-line no-console
    console.log('[booking-email] (dev) internal alert:', { to: INTERNAL_TO, subject });
    return;
  }
  try {
    await resend.emails.send({ from: FROM_NOTIFY, to: [INTERNAL_TO], subject, html, text });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[booking-email] internal alert failed', err);
  }
}

// ─── Telegram (instant push) ─────────────────────────────────────────────
// Even shorter than the email. Just enough to triage from the phone before
// opening admin or the inbox.

export async function sendBookingTelegram(
  booking: Booking,
  formResponse: BookingFormResponse,
): Promise<void> {
  const couple = `${formResponse.c1FullName} y ${formResponse.c2FullName}`;
  const adminUrl = `${SITE_URL}/admin/bookings/${booking.id}`;
  const message = [
    '🔔 <b>Nueva reserva</b>',
    escapeHtml(couple),
    `${escapeHtml(formatExpiresShort(booking.weddingDate, 'ca'))} · ${escapeHtml(booking.venueName)}`,
    `→ <a href="${adminUrl}">${adminUrl}</a>`,
  ].join('\n');
  await sendTelegramNotification(message);
}

// ─── /contrato post-deposit notifications ────────────────────────────────
// Fired when the couple submits the second-step contract data form. Two
// recipients, like the /reserva pair, but simpler bodies — the data is
// already in admin; the email is just an "ack, we'll prepare the contract".

interface ContratoCoupleCopy {
  subject: string;
  greeting: string;
  body: string;
  signoff: string;
}

function contratoCoupleCopy(booking: Booking): ContratoCoupleCopy {
  const lang: Lang = booking.preferredLanguage;
  const n1 = booking.coupleName1;
  const n2 = booking.coupleName2;
  if (lang === 'es') {
    return {
      subject: `Datos recibidos — preparamos vuestro contrato, ${n1}`,
      greeting: `Hola ${n1} y ${n2},`,
      body: 'Hemos recibido vuestros datos para el contrato. Lo prepararemos en los próximos días y os llegará por email para firmar online. Si necesitáis modificar algo, escribidnos por WhatsApp.',
      signoff: 'Hablamos pronto.\n\nFerran y Eric\nLifetime',
    };
  }
  if (lang === 'en') {
    return {
      subject: `Details received — we'll prepare your contract, ${n1}`,
      greeting: `Hi ${n1} and ${n2},`,
      body: "We've received your details for the contract. We'll prepare it over the next few days and email it to you to sign online. If you need to change anything, message us on WhatsApp.",
      signoff: 'Talk soon.\n\nFerran and Eric\nLifetime',
    };
  }
  return {
    subject: `Dades rebudes — preparem el vostre contracte, ${n1}`,
    greeting: `Hola ${n1} i ${n2},`,
    body: "Hem rebut les vostres dades per al contracte. El prepararem en els pròxims dies i us arribarà per email per signar-lo online. Si heu de modificar alguna cosa, escriviu-nos pel WhatsApp.",
    signoff: 'Parlem aviat.\n\nFerran i Eric\nLifetime',
  };
}

export async function sendContratoCoupleConfirmation(booking: Booking): Promise<void> {
  const c = contratoCoupleCopy(booking);
  const wa = WHATSAPP_BASE;
  const html = `
    <div style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
      <p style="margin:0 0 16px">${escapeHtml(c.greeting)}</p>
      <p style="margin:0 0 24px">${escapeHtml(c.body)}</p>
      <p style="margin:0 0 24px">
        <a href="${wa}" style="color:#c9a96e;text-decoration:underline">${wa}</a>
      </p>
      <p style="margin:0;white-space:pre-line">${escapeHtml(c.signoff)}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px"/>
      <p style="color:#999;font-size:12px;margin:0">
        Lifetime Weddings · ${SITE.phoneDisplay} · ${SITE.email}<br/>
        ${SITE.address.street}, ${SITE.address.city} (${SITE.address.region})
      </p>
    </div>
  `;
  const text = [c.greeting, '', c.body, '', wa, '', c.signoff].join('\n');

  if (!resend) {
    // eslint-disable-next-line no-console
    console.log('[booking-email] (dev) contrato couple confirmation:', {
      to: booking.coupleEmailPrimary,
      subject: c.subject,
    });
    return;
  }
  try {
    await resend.emails.send({
      from: FROM_HELLO,
      to: [booking.coupleEmailPrimary],
      subject: c.subject,
      html,
      text,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[booking-email] contrato couple confirmation failed', err);
  }
}

export async function sendContratoInternalAlert(
  booking: Booking,
  formResponse: BookingFormResponse,
): Promise<void> {
  const couple = `${formResponse.c1FullName} y ${formResponse.c2FullName}`;
  const adminUrl = `${SITE_URL}/admin/bookings/${booking.id}`;
  const subject = `[Contrato] ${couple} · ${formatExpiresShort(booking.weddingDate, 'ca')}`;

  const consentLabels: Record<string, string> = {
    display: 'Escaparate físico',
    facebook: 'Facebook',
    website: 'Web',
    instagram: 'Instagram',
    private_video: 'Vídeo privado',
  };
  const consentList = (formResponse.publicationConsent ?? [])
    .map((c) => consentLabels[c] ?? c)
    .join(', ') || '— ninguno —';

  const ceremonyTypeLabel = (() => {
    const v = formResponse.ceremonyType;
    if (v === 'civil') return 'Civil';
    if (v === 'religious') return 'Religiosa';
    if (v === 'other') return `Otro: ${formResponse.ceremonyTypeOther ?? '?'}`;
    return '—';
  })();
  const firstLookLabel = (() => {
    const v = formResponse.firstLook;
    if (v === 'yes') return 'Sí';
    if (v === 'no') return 'No';
    if (v === 'not_sure') return 'No lo tiene claro';
    return '—';
  })();

  const rows: Array<[string, string]> = [
    ['Pareja', couple],
    ['Boda', `${formatExpiresShort(booking.weddingDate, 'ca')} · ${booking.venueName}`],
    ['Ceremonia (lugar)', formResponse.ceremonyLocationText ?? '—'],
    ['Banquete (lugar)', formResponse.receptionLocationText ?? '—'],
    ['Tipo ceremonia', ceremonyTypeLabel],
    ['First Look', firstLookLabel],
    ['Idioma entre la pareja', formResponse.languageBetween ?? '—'],
    ['Consentimiento publicación', consentList],
    ['RGPD', formResponse.gdprAcceptedAt ? formResponse.gdprAcceptedAt.toISOString() : '—'],
  ];

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.5;max-width:560px;margin:0 auto;padding:20px">
      <h1 style="font-size:18px;margin:0 0 16px">Datos para el contrato recibidos</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 0;color:#666;width:40%;vertical-align:top">${escapeHtml(label)}</td>
            <td style="padding:6px 0">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
      <div style="margin-top:24px">
        <a href="${adminUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;padding:10px 20px;text-decoration:none;font-weight:600;letter-spacing:0.05em;font-size:13px">Ver en admin →</a>
      </div>
    </div>
  `;
  const text = [
    'Datos para el contrato recibidos',
    '',
    ...rows.map(([l, v]) => `${l}: ${v}`),
    '',
    `→ ${adminUrl}`,
  ].join('\n');

  if (!resend) {
    // eslint-disable-next-line no-console
    console.log('[booking-email] (dev) contrato internal alert:', { to: INTERNAL_TO, subject });
    return;
  }
  try {
    await resend.emails.send({ from: FROM_NOTIFY, to: [INTERNAL_TO], subject, html, text });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[booking-email] contrato internal alert failed', err);
  }

  // Telegram ping — minimal, just enough to triage from phone.
  const tgMessage = [
    '📝 <b>Datos contrato</b>',
    escapeHtml(couple),
    `${escapeHtml(formatExpiresShort(booking.weddingDate, 'ca'))} · ${escapeHtml(booking.venueName)}`,
    `→ <a href="${adminUrl}">${adminUrl}</a>`,
  ].join('\n');
  await sendTelegramNotification(tgMessage);
}
