// Auto-reply email template sent to the lead as soon as they submit the
// contact form or the quiz. Keep tone warm, light, a bit marketing-y —
// NOT a generic corporate "we've received your message" confirmation.
//
// The template is built as inline-styled HTML (email clients strip <style>)
// plus a matching plain-text fallback for deliverability / accessibility.

import type { Lang } from '~/i18n/ui';

export interface AutoReplyCopy {
  subject: string;
  greeting: (name: string) => string;
  p1: string;
  p2: string;
  ctaLabel: string;
  p3: string;
  signoff: string;
}

const COPY: Record<Lang, AutoReplyCopy> = {
  ca: {
    subject: 'Ja us tenim a l’agenda',
    greeting: (name) => `Hola ${name}!`,
    p1: 'Gràcies per escriure’ns — ja hem rebut el vostre missatge i ens hem posat a mirar la vostra data.',
    p2:
      'Us contestarem en menys de 24h (dl.–dv.) amb la disponibilitat i una proposta feta a mida. Mentrestant, us passem una proposta base pensada específicament per a la vostra boda — així us feu una idea del que podem fer junts:',
    ctaLabel: 'Veure proposta',
    p3: 'Si teniu pressa o voleu parlar directament, podeu contestar aquest correu o escriure’ns per WhatsApp.',
    signoff: 'Una abraçada,',
  },
  es: {
    subject: 'Ya os tenemos en la agenda',
    greeting: (name) => `¡Hola ${name}!`,
    p1: 'Gracias por escribirnos — ya hemos recibido el mensaje y nos hemos puesto a mirar vuestra fecha.',
    p2:
      'Os contestaremos en menos de 24h (l.–v.) con la disponibilidad y una propuesta hecha a medida. Mientras tanto, os pasamos una propuesta base pensada específicamente para vuestra boda — así os hacéis una idea de lo que podemos hacer juntos:',
    ctaLabel: 'Ver propuesta',
    p3: 'Si tenéis prisa o queréis hablar directamente, podéis contestar este correo o escribirnos por WhatsApp.',
    signoff: 'Un abrazo,',
  },
  en: {
    subject: 'You’re on our calendar',
    greeting: (name) => `Hi ${name}!`,
    p1: 'Thanks for reaching out — we’ve got your message and started looking at your date.',
    p2:
      'We’ll get back to you within 24h (Mon–Fri) with availability and a tailored proposal. In the meantime, here’s a base proposal we put together specifically for your wedding — so you can get a sense of what we do together:',
    ctaLabel: 'See the proposal',
    p3: 'If you’re in a hurry or want to chat directly, just reply to this email or message us on WhatsApp.',
    signoff: 'Warmly,',
  },
};

export function autoReplyCopy(lang: Lang): AutoReplyCopy {
  return COPY[lang] ?? COPY.ca;
}

function esc(s: string): string {
  return s.replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );
}

export interface AutoReplyRender {
  subject: string;
  html: string;
  text: string;
}

export function renderAutoReply(args: {
  lang: Lang;
  name: string;
  /** Absolute URL the CTA button points to. */
  ctaUrl: string;
}): AutoReplyRender {
  const c = autoReplyCopy(args.lang);
  const subject = c.subject;
  const greeting = esc(c.greeting(args.name));
  const ctaUrl = args.ctaUrl;
  const ctaLabel = c.ctaLabel;

  const html = `<!DOCTYPE html>
<html lang="${args.lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${esc(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f9f5f0;font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9f5f0;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:#ffffff;">
            <tr>
              <td style="padding:40px 32px 8px;">
                <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;font-weight:700;margin:0 0 12px;">Lifetime Weddings</p>
                <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;margin:0 0 20px;line-height:1.2;">${greeting}</h1>
                <p style="font-size:16px;line-height:1.6;margin:0 0 18px;color:#1a1a1a;">${esc(c.p1)}</p>
                <p style="font-size:16px;line-height:1.6;margin:0 0 28px;color:#1a1a1a;">${esc(c.p2)}</p>
                <p style="text-align:center;margin:20px 0 32px;">
                  <a href="${ctaUrl}" style="display:inline-block;background:#1a1a1a;color:#ffffff;padding:14px 32px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${esc(ctaLabel)} &rarr;</a>
                </p>
                <p style="font-size:15px;line-height:1.6;margin:0 0 24px;color:#3a3a3a;">${esc(c.p3)}</p>
                <p style="font-size:16px;line-height:1.6;margin:0;color:#1a1a1a;">${esc(c.signoff)}<br><strong>Eric i Ferran</strong><br><span style="color:#666;">Lifetime Weddings</span></p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f9f5f0;text-align:center;border-top:1px solid #e5e5e5;">
                <p style="font-size:12px;color:#666;margin:0;line-height:1.7;">
                  <a href="https://www.lifetime.photo" style="color:#c9a96e;text-decoration:none;">lifetime.photo</a>
                  &nbsp;·&nbsp;
                  <a href="mailto:hola@lifetime.photo" style="color:#c9a96e;text-decoration:none;">hola@lifetime.photo</a>
                  &nbsp;·&nbsp;
                  <a href="https://www.instagram.com/lifetime.weddings/" style="color:#c9a96e;text-decoration:none;">@lifetime.weddings</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    c.greeting(args.name),
    '',
    c.p1,
    '',
    c.p2,
    '',
    `${ctaLabel}: ${ctaUrl}`,
    '',
    c.p3,
    '',
    c.signoff,
    'Eric i Ferran',
    'Lifetime Weddings',
    '',
    'lifetime.photo · hola@lifetime.photo · @lifetime.weddings',
  ].join('\n');

  return { subject, html, text };
}
