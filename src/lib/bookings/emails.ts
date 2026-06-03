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
import { getBankTransferDetails, transferReferenceFor } from '~/lib/payments/config';

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
        `Podéis pagar el depósito de ${deposit} ahora mismo por transferencia o tarjeta — lo tenéis todo detallado aquí abajo.`,
        'En cuanto recibamos el depósito os enviamos el contrato para firmar online (no hay que imprimir nada).',
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
        `You can pay the ${deposit} deposit right now by bank transfer or card — all the details are below.`,
        "As soon as we receive the deposit we'll send you the contract to sign online (no printing required).",
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
      `Podeu pagar el dipòsit de ${deposit} ara mateix per transferència o targeta — ho teniu tot detallat aquí sota.`,
      "Així que rebem el dipòsit us enviem el contracte per signar online (no cal imprimir res).",
      'Quan totes dues coses estiguin fetes, la vostra data queda formalment bloquejada al nostre calendari.',
    ],
    whatsappPrompt: 'Mentrestant, si us sorgeix qualsevol dubte, escriviu-nos directament al WhatsApp:',
    signoff: 'Estem ja pensant en la vostra boda. Parlem aviat.\n\nFerran i Eric\nLifetime',
  };
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] as string));
}

// Localised labels for the quote-summary + payment block in the couple
// email. Kept inline (not in ui.ts) because the email layer renders its
// own HTML and never touches the page-level translator.
function paymentBlockCopy(lang: Lang) {
  if (lang === 'es') {
    return {
      summaryHeading: 'Resumen de vuestro presupuesto',
      pack: 'Pack', total: 'Inversión total', deposit: 'Depósito de reserva', terms: 'Plan de pago',
      payHeading: 'Cómo pagar el depósito',
      transferHeading: 'Transferencia bancaria',
      beneficiary: 'Beneficiario', iban: 'IBAN', bank: 'Banco', amount: 'Importe', reference: 'Concepto',
      cardLine: 'O pagad con tarjeta de forma segura desde vuestra página:',
      cardCta: 'Pagar el depósito',
    };
  }
  if (lang === 'en') {
    return {
      summaryHeading: 'Your quote summary',
      pack: 'Pack', total: 'Total investment', deposit: 'Booking deposit', terms: 'Payment plan',
      payHeading: 'How to pay the deposit',
      transferHeading: 'Bank transfer',
      beneficiary: 'Beneficiary', iban: 'IBAN', bank: 'Bank', amount: 'Amount', reference: 'Reference',
      cardLine: 'Or pay securely by card from your page:',
      cardCta: 'Pay the deposit',
    };
  }
  return {
    summaryHeading: 'Resum del vostre pressupost',
    pack: 'Pack', total: 'Inversió total', deposit: 'Dipòsit de reserva', terms: 'Pla de pagament',
    payHeading: 'Com pagar el dipòsit',
    transferHeading: 'Transferència bancària',
    beneficiary: 'Beneficiari', iban: 'IBAN', bank: 'Banc', amount: 'Import', reference: 'Concepte',
    cardLine: 'O pagueu amb targeta de forma segura des de la vostra pàgina:',
    cardCta: 'Pagar el dipòsit',
  };
}

function renderPaymentBlock(booking: Booking): { html: string; text: string } {
  const lang = booking.preferredLanguage;
  const L = paymentBlockCopy(lang);
  const transfer = getBankTransferDetails();
  const reference = transferReferenceFor(booking);
  const total = formatPrice(booking.packPriceCents, lang);
  const deposit = formatPrice(booking.depositCents, lang);
  const payUrl = `${SITE_URL}/reserva/${booking.slug}#pagament`;

  const row = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:4px 0;color:#666;width:45%">${escapeHtml(label)}</td><td style="padding:4px 0;text-align:right;${strong ? 'font-weight:700;color:#c9a96e' : ''}">${escapeHtml(value)}</td></tr>`;

  const html = `
    <div style="margin:24px 0;padding:16px;background:#faf7f1;border:1px solid #eee">
      <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#1a1a1a;margin-bottom:10px">${escapeHtml(L.summaryHeading)}</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${row(L.pack, booking.packName)}
        ${row(L.total, total)}
        ${row(L.deposit, deposit, true)}
        ${booking.paymentTerms ? row(L.terms, booking.paymentTerms) : ''}
      </table>
      <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#1a1a1a;margin:18px 0 8px">${escapeHtml(L.payHeading)}</div>
      <div style="font-size:14px;line-height:1.6">
        <strong>${escapeHtml(L.transferHeading)}</strong><br/>
        ${escapeHtml(L.beneficiary)}: ${escapeHtml(transfer.beneficiary)}<br/>
        ${escapeHtml(L.iban)}: <span style="font-family:monospace">${escapeHtml(transfer.iban)}</span><br/>
        ${transfer.bank ? `${escapeHtml(L.bank)}: ${escapeHtml(transfer.bank)}<br/>` : ''}
        ${escapeHtml(L.amount)}: ${escapeHtml(deposit)}<br/>
        ${escapeHtml(L.reference)}: ${escapeHtml(reference)}
      </div>
      <div style="margin-top:14px;font-size:14px">
        ${escapeHtml(L.cardLine)}<br/>
        <a href="${payUrl}" style="display:inline-block;margin-top:8px;background:#1a1a1a;color:#fff;padding:10px 20px;text-decoration:none;font-weight:600;letter-spacing:0.05em;font-size:13px">${escapeHtml(L.cardCta)} · ${escapeHtml(deposit)} →</a>
      </div>
    </div>
  `;

  const text = [
    L.summaryHeading,
    `${L.pack}: ${booking.packName}`,
    `${L.total}: ${total}`,
    `${L.deposit}: ${deposit}`,
    ...(booking.paymentTerms ? [`${L.terms}: ${booking.paymentTerms}`] : []),
    '',
    L.payHeading,
    `${L.transferHeading}:`,
    `  ${L.beneficiary}: ${transfer.beneficiary}`,
    `  ${L.iban}: ${transfer.iban}`,
    ...(transfer.bank ? [`  ${L.bank}: ${transfer.bank}`] : []),
    `  ${L.amount}: ${deposit}`,
    `  ${L.reference}: ${reference}`,
    '',
    `${L.cardLine} ${payUrl}`,
  ].join('\n');

  return { html, text };
}

function renderCoupleEmail(booking: Booking): { subject: string; html: string; text: string } {
  const c = coupleCopy(booking);
  const wa = WHATSAPP_BASE;
  const pay = renderPaymentBlock(booking);

  const html = `
    <div style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
      <p style="margin:0 0 16px">${escapeHtml(c.greeting)}</p>
      <p style="margin:0 0 24px">${escapeHtml(c.acknowledgment)}</p>
      <ol style="padding-left:20px;margin:0 0 24px">
        ${c.nextSteps.map((s) => `<li style="margin-bottom:12px">${escapeHtml(s)}</li>`).join('')}
      </ol>
      ${pay.html}
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
    pay.text,
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

// ─── Deposit-paid → /contrato invite ─────────────────────────────────────
// Triggered when the operator marks the deposit as received from /admin.
// Tells the couple "great, deposit received, now please fill in the
// last details via this link" — avoids the operator having to send the
// /contrato/<slug> URL manually each time.

interface ContratoInviteCopy {
  subject: string;
  greeting: string;
  body: string;
  ctaLabel: string;
  signoff: string;
}

function contratoInviteCopy(booking: Booking): ContratoInviteCopy {
  const lang: Lang = booking.preferredLanguage;
  const n1 = booking.coupleName1;
  const n2 = booking.coupleName2;
  if (lang === 'es') {
    return {
      subject: `Depósito recibido — últimos detalles para el contrato, ${n1}`,
      greeting: `Hola ${n1} y ${n2},`,
      body:
        '¡Hemos recibido vuestro depósito! Vuestra fecha está oficialmente reservada. Ahora solo nos faltan los últimos detalles para preparar el contrato: direcciones de los preparativos del día D, tipo de ceremonia y los permisos para publicar las fotos. Tardareis unos 5 minutos.',
      ctaLabel: 'Rellenar los últimos detalles',
      signoff: 'Hablamos pronto.\n\nFerran y Eric\nLifetime',
    };
  }
  if (lang === 'en') {
    return {
      subject: `Deposit received — last details for the contract, ${n1}`,
      greeting: `Hi ${n1} and ${n2},`,
      body:
        "We've received your deposit — your date is officially booked! All that's left is the last set of details for the contract: where each of you will get ready, ceremony type, and the photo-publication permissions. About 5 minutes.",
      ctaLabel: 'Fill in the last details',
      signoff: 'Talk soon.\n\nFerran and Eric\nLifetime',
    };
  }
  return {
    subject: `Dipòsit rebut — últims detalls per al contracte, ${n1}`,
    greeting: `Hola ${n1} i ${n2},`,
    body:
      "Hem rebut el vostre dipòsit! La vostra data ja està oficialment reservada. Només ens falten els últims detalls per preparar el contracte: adreces dels preparatius del dia D, tipus de cerimònia i els permisos per publicar les fotos. Trigareu uns 5 minuts.",
    ctaLabel: 'Omplir els últims detalls',
    signoff: 'Parlem aviat.\n\nFerran i Eric\nLifetime',
  };
}

export async function sendContratoInvite(booking: Booking): Promise<void> {
  const c = contratoInviteCopy(booking);
  const langPrefix = booking.preferredLanguage === 'ca' ? '' : `/${booking.preferredLanguage}`;
  const url = `${SITE.url}${langPrefix}/contrato/${booking.slug}`;
  const html = `
    <div style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
      <p style="margin:0 0 16px">${escapeHtml(c.greeting)}</p>
      <p style="margin:0 0 24px">${escapeHtml(c.body)}</p>
      <p style="margin:0 0 32px">
        <a href="${url}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 28px;font-weight:600;letter-spacing:0.05em">${escapeHtml(c.ctaLabel)}</a>
      </p>
      <p style="margin:0 0 24px;color:#666;font-size:13px">
        <a href="${url}" style="color:#666">${url}</a>
      </p>
      <p style="margin:0;white-space:pre-line">${escapeHtml(c.signoff)}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px"/>
      <p style="color:#999;font-size:12px;margin:0">
        Lifetime Weddings · ${SITE.phoneDisplay} · ${SITE.email}<br/>
        ${SITE.address.street}, ${SITE.address.city} (${SITE.address.region})
      </p>
    </div>
  `;
  const text = [c.greeting, '', c.body, '', `→ ${url}`, '', c.signoff].join('\n');

  if (!resend) {
    // eslint-disable-next-line no-console
    console.log('[booking-email] (dev) contrato invite:', { to: booking.coupleEmailPrimary, subject: c.subject, url });
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
    console.error('[booking-email] contrato invite failed (non-fatal)', err);
  }
}
