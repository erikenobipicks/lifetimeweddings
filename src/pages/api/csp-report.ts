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

export const POST: APIRoute = async ({ request }) => {
  try {
    const raw = await request.text();
    if (raw) {
      // Truncate so a flood of large reports can't bloat the logs.
      const body = raw.length > 2000 ? `${raw.slice(0, 2000)}…` : raw;
      let summary = body;
      try {
        const parsed = JSON.parse(raw);
        const r = parsed['csp-report'] ?? (Array.isArray(parsed) ? parsed[0]?.body : parsed);
        if (r) {
          const directive = r['violated-directive'] ?? r.effectiveDirective ?? '?';
          const blocked = r['blocked-uri'] ?? r.blockedURL ?? '?';
          const doc = r['document-uri'] ?? r.documentURL ?? '?';
          summary = `directive=${directive} blocked=${blocked} doc=${doc}`;
        }
      } catch {
        /* not JSON — fall back to the truncated raw body */
      }
      console.warn('[csp-report]', summary);
    }
  } catch {
    /* swallow — never error back at the browser */
  }
  return new Response(null, { status: 204 });
};
