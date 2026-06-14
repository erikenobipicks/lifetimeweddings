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
import { getBankTransferDetails, transferReferenceFor, isStripeEnabled } from '~/lib/payments/config';

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

function coupleCopy(booking: Booking, cardAvailable: boolean): CoupleEmail {
  const lang: Lang = booking.preferredLanguage;
  const n1 = booking.coupleName1;
  const n2 = booking.coupleName2;
  const dateLong = formatWeddingDateLong(booking.weddingDate, lang);
  const venue = booking.venueName;
  const deposit = formatPrice(booking.depositCents, lang);

  // The "how to pay" sentence in the email — adapts to whether Stripe is
  // wired in this deploy so we don't promise card and then fail to deliver.
  const payChannels = {
    ca: cardAvailable ? 'per transferència o amb targeta' : 'per transferència bancària',
    es: cardAvailable ? 'por transferencia o con tarjeta' : 'por transferencia bancaria',
    en: cardAvailable ? 'by bank transfer or card' : 'by bank transfer',
  } as const;

  if (lang === 'es') {
    return {
      subject: `¡Qué ilusión, ${n1}! Ya tenemos vuestros datos`,
      greeting: `Hola ${n1} y ${n2},`,
      acknowledgment: `¡Qué alegría teneros a bordo! Ya hemos recibido todos vuestros datos para la boda del ${dateLong} en ${venue}, y estamos deseando formar parte de ese día.`,
      nextSteps: [
        `Para reservar la fecha en exclusiva solo falta el depósito de ${deposit}. Podéis hacerlo ahora mismo ${payChannels.es} — aquí abajo tenéis todos los datos.`,
        'En cuanto lo recibamos os enviamos el contrato para firmarlo cómodamente online (nada de papeleo ni impresoras).',
        'Y con eso hecho, vuestra fecha queda bloqueada en el calendario solo para vosotros.',
      ],
      whatsappPrompt: 'Cualquier duda, por pequeña que sea, escribidnos por WhatsApp y os respondemos enseguida:',
      signoff: 'Tenemos muchas ganas de empezar a imaginar vuestro día. ¡Hablamos muy pronto!\n\nFerran y Eric\nLifetime',
    };
  }
  if (lang === 'en') {
    return {
      subject: `So happy to have you, ${n1}! Here's what's next`,
      greeting: `Hi ${n1} and ${n2},`,
      acknowledgment: `What a joy to have you on board! We've received all your details for the wedding on ${dateLong} at ${venue}, and we can't wait to be part of that day.`,
      nextSteps: [
        `To lock in your date exclusively, all that's left is the ${deposit} deposit. You can pay it right now ${payChannels.en} — all the details are below.`,
        "As soon as it's in, we'll send you the contract to sign comfortably online (no paperwork, no printers).",
        'And with that done, your date is ours — blocked in the calendar just for you.',
      ],
      whatsappPrompt: 'Any question at all, however small, message us on WhatsApp and we\'ll get right back to you:',
      signoff: "We're really looking forward to start imagining your day. Talk very soon!\n\nFerran and Eric\nLifetime",
    };
  }
  // ca (default)
  return {
    subject: `Quina il·lusió, ${n1}! Ja tenim les vostres dades`,
    greeting: `Hola ${n1} i ${n2},`,
    acknowledgment: `Quina alegria tenir-vos a bord! Ja hem rebut totes les vostres dades per al casament del ${dateLong} a ${venue}, i tenim moltes ganes de formar part d'aquell dia.`,
    nextSteps: [
      `Per reservar la data en exclusiva només falta el dipòsit de ${deposit}. El podeu fer ara mateix ${payChannels.ca} — aquí sota teniu totes les dades.`,
      "Tan bon punt el rebem, us enviem el contracte per signar-lo còmodament online (res de paperassa ni impressores).",
      'I amb això fet, la vostra data queda nostra: bloquejada al calendari només per a vosaltres.',
    ],
    whatsappPrompt: 'Qualsevol dubte, per petit que sigui, escriviu-nos pel WhatsApp i us responem de seguida:',
    signoff: 'Tenim moltes ganes de començar a imaginar el vostre dia. Ben aviat parlem!\n\nFerran i Eric\nLifetime',
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
      secondPaymentNote: 'El segundo pago se hace hasta 15 días antes de la boda.',
      cashNote: 'El pago en efectivo se entrega el día de la boda, o en una visita previa si la concertamos.',
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
      secondPaymentNote: 'The second payment is due up to 15 days before the wedding.',
      cashNote: 'The cash payment is handed over on the wedding day, or at an earlier visit if we arrange one.',
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
    secondPaymentNote: 'El segon pagament es fa fins a 15 dies abans de la boda.',
    cashNote: 'El pagament en efectiu es lliura el dia de la boda, o en una visita prèvia si la concertem.',
  };
}

/** True when the payment plan text mentions cash — drives the cash-timing
 *  note so it only appears for couples who actually pay part in cash. */
function paymentPlanHasCash(paymentTerms: string | null): boolean {
  return !!paymentTerms && /efect|cash/i.test(paymentTerms);
}

function renderPaymentBlock(booking: Booking, cardAvailable: boolean): { html: string; text: string } {
  const lang = booking.preferredLanguage;
  const L = paymentBlockCopy(lang);
  const transfer = getBankTransferDetails();
  const reference = transferReferenceFor(booking);
  const total = formatPrice(booking.packPriceCents, lang);
  const deposit = formatPrice(booking.depositCents, lang);
  const payUrl = `${SITE_URL}/reserva/${booking.slug}#pagament`;

  const hasCash = paymentPlanHasCash(booking.paymentTerms);
  // Timing clarifications shown under the plan: the 2nd-payment deadline
  // always (their plan always has a staged 2nd payment), and the cash note
  // only when part is paid in cash.
  const planNotes: string[] = [];
  if (booking.paymentTerms) planNotes.push(L.secondPaymentNote);
  if (hasCash) planNotes.push(L.cashNote);

  const row = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:4px 0;color:#666;width:45%">${escapeHtml(label)}</td><td style="padding:4px 0;text-align:right;${strong ? 'font-weight:700;color:#c9a96e' : ''}">${escapeHtml(value)}</td></tr>`;

  const planNotesHtml = planNotes.length
    ? `<div style="margin-top:8px;font-size:12px;color:#666;line-height:1.5">${planNotes.map((n) => `• ${escapeHtml(n)}`).join('<br/>')}</div>`
    : '';

  const html = `
    <div style="margin:24px 0;padding:16px;background:#faf7f1;border:1px solid #eee">
      <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#1a1a1a;margin-bottom:10px">${escapeHtml(L.summaryHeading)}</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${row(L.pack, booking.packName)}
        ${row(L.total, total)}
        ${row(L.deposit, deposit, true)}
        ${booking.paymentTerms ? row(L.terms, booking.paymentTerms) : ''}
      </table>
      ${planNotesHtml}
      <div style="font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#1a1a1a;margin:18px 0 8px">${escapeHtml(L.payHeading)}</div>
      <div style="font-size:14px;line-height:1.6">
        <strong>${escapeHtml(L.transferHeading)}</strong><br/>
        ${escapeHtml(L.beneficiary)}: ${escapeHtml(transfer.beneficiary)}<br/>
        ${escapeHtml(L.iban)}: <span style="font-family:monospace">${escapeHtml(transfer.iban)}</span><br/>
        ${transfer.bank ? `${escapeHtml(L.bank)}: ${escapeHtml(transfer.bank)}<br/>` : ''}
        ${escapeHtml(L.amount)}: ${escapeHtml(deposit)}<br/>
        ${escapeHtml(L.reference)}: ${escapeHtml(reference)}
      </div>
      ${cardAvailable ? `
      <div style="margin-top:14px;font-size:14px">
        ${escapeHtml(L.cardLine)}<br/>
        <a href="${payUrl}" style="display:inline-block;margin-top:8px;background:#1a1a1a;color:#fff;padding:10px 20px;text-decoration:none;font-weight:600;letter-spacing:0.05em;font-size:13px">${escapeHtml(L.cardCta)} · ${escapeHtml(deposit)} →</a>
      </div>
      ` : ''}
    </div>
  `;

  const text = [
    L.summaryHeading,
    `${L.pack}: ${booking.packName}`,
    `${L.total}: ${total}`,
    `${L.deposit}: ${deposit}`,
    ...(booking.paymentTerms ? [`${L.terms}: ${booking.paymentTerms}`] : []),
    ...planNotes.map((n) => `  · ${n}`),
    '',
    L.payHeading,
    `${L.transferHeading}:`,
    `  ${L.beneficiary}: ${transfer.beneficiary}`,
    `  ${L.iban}: ${transfer.iban}`,
    ...(transfer.bank ? [`  ${L.bank}: ${transfer.bank}`] : []),
    `  ${L.amount}: ${deposit}`,
    `  ${L.reference}: ${reference}`,
    ...(cardAvailable ? ['', `${L.cardLine} ${payUrl}`] : []),
  ].join('\n');

  return { html, text };
}

function renderCoupleEmail(booking: Booking): { subject: string; html: string; text: string } {
  // Resolve once so the prose copy and the payment block stay in sync — if
  // we promised "card" in the lead sentence we must also surface the CTA,
  // and vice versa.
  const cardAvailable = isStripeEnabled();
  const c = coupleCopy(booking, cardAvailable);
  const wa = WHATSAPP_BASE;
  const pay = renderPaymentBlock(booking, cardAvailable);

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

  // Suggested WhatsApp group name: short names + venue. Eric copies this
  // straight into the group title when he creates it. Format kept consistent
  // with the existing one-shot booking row in the master Sheet.
  const groupName = `Boda ${booking.coupleName1} i ${booking.coupleName2} · ${booking.venueName}`;

  // Tappable wa.me links per partner. Eric taps from the phone, opens
  // WhatsApp, adds them to the group in two taps. Numbers come from the
  // /reserva form (c1Phone / c2Phone) which already validated against
  // PHONE_REGEX — we still strip non-digits defensively so a "+34 600 11 22 33"
  // becomes 34600112233 for the wa.me URL.
  const c1Phone = waNumber(formResponse.c1Phone);
  const c2Phone = waNumber(formResponse.c2Phone);
  const waBlock: string[] = [];
  if (c1Phone) {
    waBlock.push(`📱 ${escapeHtml(booking.coupleName1)}: <a href="https://wa.me/${c1Phone}">wa.me/${c1Phone}</a>`);
  }
  if (c2Phone) {
    waBlock.push(`📱 ${escapeHtml(booking.coupleName2)}: <a href="https://wa.me/${c2Phone}">wa.me/${c2Phone}</a>`);
  }

  const message = [
    '🔔 <b>Nueva reserva</b>',
    escapeHtml(couple),
    `${escapeHtml(formatExpiresShort(booking.weddingDate, 'ca'))} · ${escapeHtml(booking.venueName)}`,
    `→ <a href="${adminUrl}">${adminUrl}</a>`,
    '',
    '💬 <b>Grup WhatsApp suggerit:</b>',
    `<code>${escapeHtml(groupName)}</code>`,
    ...(waBlock.length ? ['', ...waBlock] : []),
  ].join('\n');
  await sendTelegramNotification(message);
}

/** Best-effort phone normaliser for wa.me URLs. Strips everything that
 *  isn't a digit (so "+34 600 11 22 33" → "34600112233"). Empty / nonsense
 *  inputs return null so we just skip the line instead of generating a
 *  broken link. */
function waNumber(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D+/g, '');
  if (digits.length < 6) return null;
  return digits;
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
        "We've received your deposit — your date is officially booked! All that's left is the last set of details for the contract: where each of you will get ready, ceremony type, and the photo-publication permissions. About 5 minutes.\n\nA heads-up: the contract itself is written in Spanish — that's a legal requirement in Spain for wedding-services agreements. If anything is unclear when you read it, just reply to this email and we'll walk you through it before you sign.",
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
  // Body can contain multiple paragraphs separated by blank lines (the EN
  // variant adds a "contract is in Spanish" note as a second paragraph).
  // Split + wrap so mail clients lay them out properly instead of cramming
  // everything into a single <p>.
  const bodyParagraphs = c.body
    .split(/\n\s*\n/)
    .map((p) => `<p style="margin:0 0 16px">${escapeHtml(p)}</p>`)
    .join('');

  const html = `
    <div style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
      <p style="margin:0 0 16px">${escapeHtml(c.greeting)}</p>
      ${bodyParagraphs}
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

// ─── Signed-contract copy ────────────────────────────────────────────────
// Sent once the couple electronically accepts the contract. The filled
// contract PDF is attached. Goes to the couple (primary + both partners'
// emails) and, separately, an internal copy to the studio. Fail-soft.

function contractCopyCopy(lang: Lang, n1: string, n2: string) {
  if (lang === 'es') {
    return {
      subject: `Vuestro contrato · Lifetime Weddings`,
      body: `Hola ${n1} y ${n2},\n\nGracias por aceptar el contrato. Adjuntamos vuestra copia en PDF. Cualquier duda, respondednos sin problema.\n\nFerran y Eric\nLifetime`,
    };
  }
  if (lang === 'en') {
    return {
      subject: `Your contract · Lifetime Weddings`,
      body: `Hi ${n1} and ${n2},\n\nThank you for accepting the contract. Your PDF copy is attached. Any questions, just reply.\n\nFerran and Eric\nLifetime`,
    };
  }
  return {
    subject: `El vostre contracte · Lifetime Weddings`,
    body: `Hola ${n1} i ${n2},\n\nGràcies per acceptar el contracte. Us adjuntem la vostra còpia en PDF. Qualsevol dubte, responeu-nos sense problema.\n\nFerran i Eric\nLifetime`,
  };
}

export async function sendContractAcceptedCopy(
  booking: Booking,
  formResponse: BookingFormResponse,
  pdf: Buffer,
): Promise<void> {
  const lang = booking.preferredLanguage;
  const c = contractCopyCopy(lang, booking.coupleName1, booking.coupleName2);

  const recipients = new Set<string>();
  if (booking.coupleEmailPrimary) recipients.add(booking.coupleEmailPrimary.toLowerCase());
  if (formResponse.c1Email) recipients.add(formResponse.c1Email.toLowerCase());
  if (formResponse.c2Email) recipients.add(formResponse.c2Email.toLowerCase());
  const to = Array.from(recipients);

  const filename = `Contracte-${booking.coupleName1}-${booking.coupleName2}`
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50) || 'Contracte';
  const attachment = { filename: `${filename}.pdf`, content: pdf };

  const html = `<div style="font-family:-apple-system,sans-serif;color:#1a1a1a;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;white-space:pre-line">${escapeHtml(c.body)}</div>`;

  if (!resend) {
    // eslint-disable-next-line no-console
    console.log('[booking-email] (dev) contract copy:', { to, internal: INTERNAL_TO, subject: c.subject, attachment: attachment.filename });
    return;
  }
  // Couple copy.
  try {
    if (to.length > 0) {
      await resend.emails.send({ from: FROM_HELLO, to, subject: c.subject, html, text: c.body, attachments: [attachment] });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[booking-email] contract copy to couple failed (non-fatal)', err);
  }
  // Internal copy for the studio's records.
  try {
    const adminUrl = `${SITE_URL}/admin/bookings/${booking.id}`;
    await resend.emails.send({
      from: FROM_NOTIFY,
      to: [INTERNAL_TO],
      subject: `[Contracte acceptat] ${booking.coupleName1} & ${booking.coupleName2}`,
      html: `<p>Contracte acceptat electrònicament.</p><p><a href="${adminUrl}">Veure a admin</a></p>`,
      text: `Contracte acceptat electrònicament. ${adminUrl}`,
      attachments: [attachment],
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[booking-email] contract copy to studio failed (non-fatal)', err);
  }
}

// ─── /reserva invite (operator → couple) ────────────────────────────────
// Sent when Eric flips a booking from draft → sent in /admin. Gives the
// couple the URL to fill in their data on /reserva/<slug>. The data
// submission itself triggers sendCoupleConfirmation; this one is the
// first contact the couple has from the studio.

interface ReservaInviteCopy {
  subject: string;
  greeting: string;
  body: string;
  ctaLabel: string;
  signoff: string;
}

function reservaInviteCopy(booking: Booking): ReservaInviteCopy {
  const lang: Lang = booking.preferredLanguage;
  const n1 = booking.coupleName1;
  const n2 = booking.coupleName2;
  if (lang === 'es') {
    return {
      subject: `Vuestra propuesta de reserva, ${n1}`,
      greeting: `Hola ${n1} y ${n2},`,
      body:
        "Como hemos hablado, aquí tenéis vuestra propuesta de reserva con todos los detalles. Cuando podáis, rellenad el formulario con vuestros datos y la confirmación del día. Os tomará unos 5 minutos.",
      ctaLabel: 'Ver la propuesta y rellenar los datos',
      signoff: 'Hablamos pronto.\n\nFerran y Eric\nLifetime',
    };
  }
  if (lang === 'en') {
    return {
      subject: `Your booking proposal, ${n1}`,
      greeting: `Hi ${n1} and ${n2},`,
      body:
        "As we discussed, here's your booking proposal with all the details. Whenever you can, fill in the form with your information and confirm the day. It'll take about 5 minutes.",
      ctaLabel: 'View the proposal and fill in your details',
      signoff: 'Talk soon.\n\nFerran and Eric\nLifetime',
    };
  }
  return {
    subject: `La vostra proposta de reserva, ${n1}`,
    greeting: `Hola ${n1} i ${n2},`,
    body:
      "Tal com hem parlat, aquí teniu la vostra proposta de reserva amb tots els detalls. Quan pugueu, ompliu el formulari amb les vostres dades i la confirmació del dia. Us prendrà uns 5 minuts.",
    ctaLabel: 'Veure la proposta i omplir les dades',
    signoff: 'Parlem aviat.\n\nFerran i Eric\nLifetime',
  };
}

export async function sendReservaInvite(booking: Booking): Promise<void> {
  const c = reservaInviteCopy(booking);
  const langPrefix = booking.preferredLanguage === 'ca' ? '' : `/${booking.preferredLanguage}`;
  const url = `${SITE.url}${langPrefix}/reserva/${booking.slug}`;
  const html = `
    <div style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
      <p style="margin:0 0 16px">${escapeHtml(c.greeting)}</p>
      <p style="margin:0 0 24px">${escapeHtml(c.body)}</p>
      <p style="margin:0 0 32px">
        <a href="${url}" style="display:inline-block;background:#c9a96e;color:#1a1a1a;text-decoration:none;padding:14px 28px;font-weight:700;letter-spacing:0.05em">${escapeHtml(c.ctaLabel)}</a>
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
    console.log('[booking-email] (dev) reserva invite:', { to: booking.coupleEmailPrimary, subject: c.subject, url });
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
    console.error('[booking-email] reserva invite failed (non-fatal)', err);
  }
}

// ─── Form-submission notification (internal) ─────────────────────────────
// Fires when a couple submits any follow-up form. Quick "Eric, X has
// answered Y" so we don't have to keep refreshing admin. Includes a link
// to the booking's admin page where the submission will surface.

export async function sendFormSubmissionNotification(args: {
  booking: Booking;
  formKind: string;
  sequenceSlug: string;
  dataPreview?: string;
}): Promise<void> {
  const adminUrl = `${SITE_URL}/admin/bookings/${args.booking.id}`;
  const couple = `${args.booking.coupleName1} & ${args.booking.coupleName2}`;
  const subject = `[Formulari] ${args.formKind} · ${couple}`;
  const html = `
    <div style="font-family:-apple-system,sans-serif;color:#1a1a1a;line-height:1.5;max-width:560px;margin:0 auto;padding:20px">
      <h1 style="font-size:18px;margin:0 0 16px">Nou formulari rebut</h1>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#666;width:35%">Parella</td><td style="padding:6px 0">${escapeHtml(couple)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Tipus de formulari</td><td style="padding:6px 0"><code>${escapeHtml(args.formKind)}</code></td></tr>
        <tr><td style="padding:6px 0;color:#666">Plantilla</td><td style="padding:6px 0"><code>${escapeHtml(args.sequenceSlug)}</code></td></tr>
      </table>
      ${args.dataPreview ? `<div style="margin-top:16px;padding:12px;background:#faf7f1;border-left:4px solid #c9a96e;font-size:13px;white-space:pre-line">${escapeHtml(args.dataPreview)}</div>` : ''}
      <div style="margin-top:24px">
        <a href="${adminUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;padding:10px 20px;text-decoration:none;font-weight:600;letter-spacing:0.05em;font-size:13px">Veure a admin →</a>
      </div>
    </div>
  `;
  const text = [
    `Nou formulari rebut`,
    `Parella: ${couple}`,
    `Tipus: ${args.formKind}`,
    `Plantilla: ${args.sequenceSlug}`,
    args.dataPreview ? `\n${args.dataPreview}` : '',
    `\n→ ${adminUrl}`,
  ].filter(Boolean).join('\n');

  // Telegram ping too, so Eric finds out on his phone the moment a couple
  // submits any follow-up form. Fail-soft + independent of email/Resend.
  try {
    const tgMessage = [
      '✅ <b>Formulari rebut</b>',
      escapeHtml(FORM_KIND_LABELS[args.formKind] ?? args.formKind),
      `${escapeHtml(couple)} · ${escapeHtml(formatExpiresShort(args.booking.weddingDate, 'ca'))} · ${escapeHtml(args.booking.venueName)}`,
      ...(args.dataPreview ? ['', escapeHtml(args.dataPreview)] : []),
      '',
      `→ <a href="${adminUrl}">Veure les respostes a admin</a>`,
    ].join('\n');
    await sendTelegramNotification(tgMessage);
  } catch (err) {
    console.error('[booking-email] form-submission Telegram failed (non-fatal)', err);
  }

  if (!resend) {
    console.log('[booking-email] (dev) form submission alert:', { to: INTERNAL_TO, subject });
    return;
  }
  try {
    await resend.emails.send({ from: FROM_NOTIFY, to: [INTERNAL_TO], subject, html, text });
  } catch (err) {
    console.error('[booking-email] form-submission notification failed (non-fatal)', err);
  }
}

/** Friendly labels for the follow-up form kinds, used in notifications. */
const FORM_KIND_LABELS: Record<string, string> = {
  wedding_details: 'Informació de la boda',
  inspiration: 'Inspiració i música',
  timeline: 'Timeline del dia',
  guest_list: 'Llista de convidats',
  music: 'Música',
};
