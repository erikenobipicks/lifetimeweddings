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

/** Violations we never want to alert on: they come from the visitor's own
 *  browser, not from anything the site loads, so they're not actionable and
 *  would otherwise spam the security channel.
 *   - Browser extensions injecting CSS/JS (chrome/moz/safari-extension://)
 *   - Chrome's built-in "Translate this page" pulling styles/scripts from
 *     gstatic.com/_/translate_http and translate.google(apis).com
 *   - AI browsers injecting their own UI assets (e.g. Perplexity's Comet
 *     pulling fonts from frontend-cdn.perplexity.ai/_agi_assets). We never
 *     load anything from perplexity.ai, so any such report is the visitor's
 *     browser, not us.
 *  Still logged (so they're visible in the logs); just no Telegram ping. */
function isNonActionable(blocked: string): boolean {
  // Chrome includes an explicit :port in blocked-uri for the translate
  // stylesheets (e.g. "gstatic.com:443/_/translate_http/…"), which broke
  // the substring matches below. Strip the ":<port>" from the authority so
  // the host+path rules match whether or not the port is present.
  const b = blocked.toLowerCase().replace(/:\d+\//, '/');
  if (/^(chrome|moz|safari|safari-web|ms-browser)-extension:/.test(b)) return true;
  if (b.includes('gstatic.com/_/translate')) return true;
  if (b.includes('translate.googleapis.com')) return true;
  if (b.includes('translate.google.com')) return true;
  if (b.includes('perplexity.ai')) return true;
  return false;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const raw = await request.text();
    if (raw) {
      // Truncate so a flood of large reports can't bloat the logs.
      const body = raw.length > 2000 ? `${raw.slice(0, 2000)}…` : raw;
      let summary = body;
      let blocked = '?';
      try {
        const r = extractViolation(JSON.parse(raw));
        if (r) {
          // Field names differ between the legacy (kebab) and Reporting API
          // (camel) shapes — accept either.
          const directive =
            r['violated-directive'] ?? r['effective-directive'] ?? r.effectiveDirective ?? '?';
          blocked = r['blocked-uri'] ?? r.blockedURL ?? r.blockedURI ?? '?';
          const doc = r['document-uri'] ?? r.documentURL ?? r.documentURI ?? '?';
          summary = `directive=${directive} blocked=${blocked} doc=${doc}`;
        }
      } catch {
        /* not JSON — fall back to the truncated raw body */
      }

      if (isNonActionable(blocked)) {
        // Browser-injected noise (extensions, in-page Google Translate).
        // Keep a log line for visibility but don't ping the security channel.
        console.warn('[csp-report] (ignored: browser-injected)', summary);
      } else {
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
    }
  } catch {
    /* swallow — never error back at the browser */
  }
  return new Response(null, { status: 204 });
};
