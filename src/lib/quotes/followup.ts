// Follow-up email sent 7 days after Eric clicks "📧 Enviar" on a quote.
//
// Tone: deliberately natural, almost like a personal note from a friend
// who happens to also be a wedding photographer. NO marketing pitch,
// NO bullet lists, NO "looking forward to hearing from you" boilerplate.
// Couples have just spent an hour reading the proposal — they don't need
// a brochure, they need a soft nudge.
//
// One call site for the body so the manual button and the cron tick can't
// drift apart. Caller decides when to mark the row as follow-up-sent.

import { resend } from '~/lib/email';
import { SITE, WHATSAPP_BASE } from '~/data/site';
import type { Lang } from '~/i18n/ui';
import type { Quote } from '~/lib/quotes';

const FROM_HELLO = process.env.EMAIL_FROM_HELLO ?? 'Lifetime Weddings <hola@lifetime.photo>';
const SITE_URL = process.env.PUBLIC_SITE_URL ?? SITE.url;

interface FollowUpCopy {
  subject: string;
  body: string;
}

function copy(quote: Quote): FollowUpCopy {
  const couple = quote.coupleName;
  const lang: Lang = quote.preferredLanguage;
  const wa = WHATSAPP_BASE;
  const link = `${SITE_URL}/p/${quote.token}`;

  if (lang === 'es') {
    return {
      subject: `Una nota rápida, ${couple}`,
      body: [
        `Hola ${couple},`,
        '',
        'Os escribo porque hace unos días os enviamos la propuesta y quería saber cómo va. Sin prisa ni presión — solo por si os ha surgido alguna duda y no os ha dado por escribir.',
        '',
        'Sabemos que mirar presupuestos de boda puede ser un poco abrumador (es el día más importante, lógicamente da vueltas). Así que si queréis que os aclaremos cualquier cosa — precio, fechas, qué incluye, qué no — escribidnos sin problema. Por WhatsApp solemos responder rápido.',
        '',
        'Y si preferís una videollamada corta para poner cara y hablar con calma, también. Suele ser lo que más tranquiliza.',
        '',
        'Tengamos o no noticias vuestras — gracias por habernos considerado.',
        '',
        'Ferran y Eric',
        'Lifetime',
      ].join('\n'),
    };
  }
  if (lang === 'en') {
    return {
      subject: `A quick note, ${couple}`,
      body: [
        `Hi ${couple},`,
        '',
        "A quick note — we sent you the proposal a few days ago and wanted to see how things are going. No rush, no pressure — just in case something came up and you didn't get round to writing back.",
        '',
        "We know that going through wedding quotes can be a bit overwhelming (it's the most important day, so it's only natural to mull things over). So if you'd like us to clarify anything — price, dates, what's included, what isn't — drop us a line, no bother at all. We're usually quick to reply on WhatsApp.",
        '',
        "And if you'd rather have a short video call to put a face to the name and talk things through calmly, that works too. People often find it the most reassuring option.",
        '',
        'Whether we hear back from you or not — thanks for considering us.',
        '',
        'Ferran and Eric',
        'Lifetime',
      ].join('\n'),
    };
  }
  // ca (default)
  return {
    subject: `Una nota ràpida, ${couple}`,
    body: [
      `Hola ${couple},`,
      '',
      "Us escric perquè fa uns dies us vam enviar la proposta i volia saber com va. Sense pressa ni pressió — només per si us ha sorgit cap dubte i no us ha donat per escriure.",
      '',
      "Sabem que mirar pressupostos de boda pot ser una mica aclaparador (és el dia més important, lògicament dóna voltes). Així que si voleu que us aclarim qualsevol cosa — preu, dates, què inclou, què no — escriviu-nos sense problema. Pel WhatsApp acostumem a respondre ràpid.",
      '',
      "I si preferiu una videocall curta per posar cara i parlar amb calma, també. Sovint és el que més tranquil·litza.",
      '',
      'Tinguem o no notícies vostres — gràcies per haver-nos considerat.',
      '',
      'Ferran i Eric',
      'Lifetime',
    ].join('\n'),
  };
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}

/** Render the body as the same HTML/plain-text pair we'd send via Resend.
 *  The plain version preserves the line breaks; the HTML version wraps
 *  paragraphs in <p> so mail clients lay it out as prose. */
function renderEmail(quote: Quote): { subject: string; html: string; text: string } {
  const { subject, body } = copy(quote);
  const paragraphs = body.split('\n\n');
  const html = `
    <div style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.65;max-width:560px;margin:0 auto;padding:24px">
      ${paragraphs.map((p) => `<p style="margin:0 0 16px;white-space:pre-line">${escapeHtml(p)}</p>`).join('')}
      <p style="color:#999;font-size:12px;margin:24px 0 0">
        ${escapeHtml(SITE.email)} · ${escapeHtml(SITE.phoneDisplay)}
      </p>
    </div>
  `;
  return { subject, html, text: body };
}

export interface SendQuoteFollowUpResult {
  ok: boolean;
  reason?: 'no_email' | 'resend_unconfigured' | 'send_failed';
  detail?: string;
}

/** Fire the follow-up email for one quote. Returns ok=false (instead of
 *  throwing) so the cron loop keeps going on a single bad row. The
 *  caller decides whether to stamp `follow_up_sent_at` based on the
 *  return value. */
export async function sendQuoteFollowUp(quote: Quote): Promise<SendQuoteFollowUpResult> {
  const to = quote.coupleEmail;
  if (!to) return { ok: false, reason: 'no_email' };

  const { subject, html, text } = renderEmail(quote);

  if (!resend) {
    // Same dev-mode fallback the booking emails use: log and return ok
    // so the rest of the pipeline (mark as sent) treats it as success.
    // eslint-disable-next-line no-console
    console.log('[quote.followup] (dev) would send:', { to, subject });
    return { ok: true };
  }

  try {
    await resend.emails.send({
      from: FROM_HELLO,
      to: [to],
      subject,
      html,
      text,
      replyTo: SITE.email,
    });
    return { ok: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[quote.followup] send failed', err);
    return {
      ok: false,
      reason: 'send_failed',
      detail: (err as Error)?.message ?? String(err),
    };
  }
}
