// POST /api/csp-report
//
// Collector for Content-Security-Policy violation reports while the policy
// runs in Report-Only mode. Browsers POST a small JSON document here for
// every would-be violation; we log a compact line so we can tune the policy
// from the Railway logs before flipping it to enforcing. Always 204 — a
// report endpoint must never error back at the browser.
//
// Accepts both the legacy `application/csp-report` body ({ "csp-report": {…} })
// and the newer Reporting API batch (`application/reports+json`, an array).

export const prerender = false;

import type { APIRoute } from 'astro';
import { securityAlert } from '~/lib/security-alerts';

/** Pull the violation object out of whichever report shape arrived:
 *   - legacy report-uri:        { "csp-report": { … } }            (Firefox/Safari)
 *   - Reporting API batch:      [ { type, body: { … } }, … ]       (Chrome report-to)
 *   - Reporting API single obj: { type, body: { … } }
 *   - already-unwrapped object: { … } */
function extractViolation(parsed: any): Record<string, any> | null {
  if (!parsed || typeof parsed !== 'object') return null;
  if (parsed['csp-report']) return parsed['csp-report'];
  if (Array.isArray(parsed)) {
    const first = parsed[0];
    return first?.body ?? first ?? null;
  }
  if (parsed.body) return parsed.body;
  return parsed;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const raw = await request.text();
    if (raw) {
      // Truncate so a flood of large reports can't bloat the logs.
      const body = raw.length > 2000 ? `${raw.slice(0, 2000)}…` : raw;
      let summary = body;
      try {
        const r = extractViolation(JSON.parse(raw));
        if (r) {
          // Field names differ between the legacy (kebab) and Reporting API
          // (camel) shapes — accept either.
          const directive =
            r['violated-directive'] ?? r['effective-directive'] ?? r.effectiveDirective ?? '?';
          const blocked = r['blocked-uri'] ?? r.blockedURL ?? r.blockedURI ?? '?';
          const doc = r['document-uri'] ?? r.documentURL ?? r.documentURI ?? '?';
          summary = `directive=${directive} blocked=${blocked} doc=${doc}`;
        }
      } catch {
        /* not JSON — fall back to the truncated raw body */
      }
      console.warn('[csp-report]', summary);
      // Heads-up to Telegram, heavily throttled (≤ 1/hour) so a chatty rule
      // can't flood the chat. While the CSP is Report-Only this is just a
      // signal to review; once enforcing it flags real blocked resources.
      await securityAlert(
        'csp',
        `Violació(ns) de CSP detectada(es).\n${summary}\n(report-only; revisa /api/csp-report als logs)`,
        60 * 60 * 1000,
      );
    }
  } catch {
    /* swallow — never error back at the browser */
  }
  return new Response(null, { status: 204 });
};
