// Email delivery for admin magic-link login.
//
// Separate from src/lib/email.ts (which targets the public-facing lead
// flow) so admin email config can evolve independently — different
// from-address, different subject conventions, no link to landing
// matchers. We share Resend + EMAIL_FROM (notifications@) here.
//
// Fail-soft contract: if Resend isn't configured (no API key), the
// helper resolves successfully and logs the link to console. This is
// what makes local dev work without a real API key — the link the
// admin would have received is printed in the terminal AND surfaced
// inline on the "check your inbox" page (handled by the caller).

import './env';
import { Resend } from 'resend';
import { SITE } from '~/data/site';

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM ?? 'Lifetime Weddings <notifications@lifetime.photo>';
const resend = apiKey ? new Resend(apiKey) : null;

const SUBJECT = "Enllaç per entrar a l'admin de Lifetime";

function htmlBody(url: string): string {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1a1a1a;line-height:1.6;max-width:480px;margin:0 auto;padding:24px">
      <p style="margin:0 0 16px">Hola,</p>
      <p style="margin:0 0 24px">Aquí teniu l'enllaç per entrar a l'admin de Lifetime:</p>
      <p style="margin:0 0 24px">
        <a href="${url}"
           style="display:inline-block;background:#c9a96e;color:#1a1a1a;padding:12px 24px;text-decoration:none;font-weight:700;letter-spacing:.05em;font-size:14px">
          Entrar
        </a>
      </p>
      <p style="margin:0 0 16px;color:#666;font-size:13px">
        L'enllaç caduca en 15 minuts i només es pot fer servir un cop.<br/>
        Si no heu demanat aquest correu, podeu ignorar-lo.
      </p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0 12px"/>
      <p style="color:#999;font-size:11px;margin:0">${SITE.name}</p>
    </div>
  `;
}

function textBody(url: string): string {
  return [
    'Hola,',
    '',
    "Aquí teniu l'enllaç per entrar a l'admin de Lifetime:",
    '',
    url,
    '',
    "L'enllaç caduca en 15 minuts i només es pot fer servir un cop.",
    'Si no heu demanat aquest correu, podeu ignorar-lo.',
    '',
    SITE.name,
  ].join('\n');
}

export interface SendMagicLinkResult {
  /** True if Resend handled it. False means dev-mode (no API key) — the
   *  caller should surface the link inline so dev workflow isn't broken. */
  delivered: boolean;
  /** Always echoed back for dev convenience. */
  url: string;
}

export async function sendMagicLink(email: string, url: string): Promise<SendMagicLinkResult> {
  if (!resend) {
    // Dev / unconfigured. Log loudly and let the caller decide what to do.
    // eslint-disable-next-line no-console
    console.log(`[auth] (dev) magic link for ${email}: ${url}`);
    return { delivered: false, url };
  }
  try {
    await resend.emails.send({
      from: FROM,
      to: [email],
      subject: SUBJECT,
      html: htmlBody(url),
      text: textBody(url),
    });
    return { delivered: true, url };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[auth] magic link send failed', err);
    return { delivered: false, url };
  }
}
