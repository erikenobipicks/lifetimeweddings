// Tiny in-memory, per-process fixed-window rate limiter.
//
// Mirrors the inline limiter already used in /api/reserva/submit and
// /api/contrato/submit, extracted so the lighter public endpoints
// (track / quote respond / contact) can share one battle-tested shape
// instead of each re-implementing it. For Railway's single-instance Node
// deployment this is sufficient; if we ever scale out to N instances,
// swap the Map for a DB-backed `rate_limits` table keyed by ip+window.

interface RateRecord {
  count: number;
  resetAt: number;
}

/** Best-effort client IP from Cloudflare / standard proxy headers, with a
 *  synthetic fallback so the limiter still applies when headers are stripped. */
export function clientIpFrom(headers: Headers): string {
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf;
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

/** Create an isolated limiter. Each call owns its own Map, so different
 *  endpoints keep independent budgets. Returns `check(ip)` → true when the
 *  request is allowed, false when the IP is over its budget for the window. */
export function createRateLimiter(opts: { limit: number; windowMs: number }) {
  const attempts = new Map<string, RateRecord>();
  let lastPrune = 0;

  function maybePrune(now: number) {
    if (now - lastPrune < 5 * 60 * 1000) return;
    lastPrune = now;
    for (const [ip, rec] of attempts) {
      if (rec.resetAt <= now) attempts.delete(ip);
    }
  }

  return function check(ip: string): boolean {
    const now = Date.now();
    maybePrune(now);
    const rec = attempts.get(ip);
    if (!rec || rec.resetAt <= now) {
      attempts.set(ip, { count: 1, resetAt: now + opts.windowMs });
      return true;
    }
    if (rec.count >= opts.limit) return false;
    rec.count += 1;
    return true;
  };
}
