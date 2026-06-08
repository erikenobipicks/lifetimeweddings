// Real-time security alerts over the studio's existing Telegram bot.
//
// Reuses sendTelegramNotification (src/lib/email.ts), which already no-ops
// cleanly when TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID aren't set — so this is
// safe in dev/staging and fail-soft everywhere (an alert never breaks a
// request). A per-key, in-memory throttle stops a sustained attack (or a
// noisy CSP rule) from flooding the chat: at most one message per key per
// window.

import { sendTelegramNotification } from './email';

const lastSent = new Map<string, number>();

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));
}

/**
 * Fire a throttled security alert to Telegram. Returns immediately if the
 * same `key` fired within `throttleMs`. Never throws.
 *
 * @param key        throttle bucket (e.g. 'cron-unauth', `login:${ip}`, 'csp')
 * @param message    HTML-safe-ish body; caller-supplied dynamic bits are escaped
 * @param throttleMs minimum gap between alerts for this key (default 10 min)
 */
export async function securityAlert(
  key: string,
  message: string,
  throttleMs = 10 * 60 * 1000,
): Promise<void> {
  const now = Date.now();
  const prev = lastSent.get(key) ?? 0;
  if (now - prev < throttleMs) return;
  lastSent.set(key, now);

  // Opportunistic prune so the Map can't grow unbounded across many keys.
  if (lastSent.size > 500) {
    for (const [k, t] of lastSent) {
      if (now - t > 24 * 60 * 60 * 1000) lastSent.delete(k);
    }
  }

  try {
    await sendTelegramNotification(`🚨 <b>Seguretat</b>\n${esc(message)}`);
  } catch {
    /* fail-soft: alerting must never break the calling request */
  }
}
