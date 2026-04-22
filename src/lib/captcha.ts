// Cloudflare Turnstile verification helper.
//
// If TURNSTILE_SECRET_KEY is not set (dev / staging), verification is
// skipped so forms keep working locally without config. Set both keys in
// production to actually block bots.
//
// Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

import './env';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const SECRET = process.env.TURNSTILE_SECRET_KEY ?? '';

export function captchaEnabled(): boolean {
  return SECRET.length > 0;
}

export async function verifyTurnstile(token: unknown, remoteIp?: string): Promise<boolean> {
  if (!SECRET) {
    // eslint-disable-next-line no-console
    console.warn('[captcha] TURNSTILE_SECRET_KEY not set — skipping verification');
    return true;
  }
  if (typeof token !== 'string' || token.length === 0) return false;
  try {
    const body = new URLSearchParams({ secret: SECRET, response: token });
    if (remoteIp) body.set('remoteip', remoteIp);
    const res = await fetch(VERIFY_URL, { method: 'POST', body });
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!data.success) {
      // eslint-disable-next-line no-console
      console.warn('[captcha] verification failed', data['error-codes']);
    }
    return Boolean(data.success);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[captcha] verify error', err);
    return false;
  }
}

/** Extract the best-effort client IP from Cloudflare / standard proxy headers. */
export function clientIp(request: Request): string | undefined {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    undefined
  );
}
