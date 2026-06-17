import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import { getUser } from '~/lib/auth';
import { SITE } from '~/data/site';

/** Explicit canonical-host override. When set, ANY request on a different host
 *  (e.g. the Railway-generated .up.railway.app subdomain) is 301-redirected to
 *  this host, preserving path + query. Leave unset in dev/staging.
 *  Example: CANONICAL_HOST=www.lifetime.photo */
const CANONICAL_HOST = process.env.CANONICAL_HOST;

/** Production host derived from the single source of truth (SITE.url), e.g.
 *  `www.lifetime.photo`, plus its apex (`lifetime.photo`). Even without
 *  CANONICAL_HOST set, we 301 the bare apex → www so the served host matches
 *  the canonical / sitemap / OG / hreflang URLs (which all use SITE.url = www)
 *  and Google doesn't index www and non-www as duplicates. Scoped to this
 *  exact apex so staging / *.up.railway.app hosts are left untouched. */
const SITE_HOST = new URL(SITE.url).host;
const SITE_APEX = SITE_HOST.replace(/^www\./, '');

// \u2500\u2500 Content-Security-Policy (Report-Only) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Built from the third-party origins actually loaded by the site:
//   - Turnstile (challenges.cloudflare.com): captcha script + iframe
//   - Cloudflare Web Analytics (static.cloudflareinsights.com beacon →
//     cloudflareinsights.com RUM endpoint)
//   - Google Analytics / Tag Manager: gtag script + beacons
//   - Meta Pixel (connect.facebook.net / facebook.com)
//   - YouTube (youtube-nocookie.com / youtube.com, i.ytimg.com thumbs)
//   - Stripe Checkout (js.stripe.com / hooks.stripe.com) \u2014 redirect + js
//   - Behold Instagram feed (feeds.behold.so + behold.so)
//   - FotoStudio external galleries (gallery.fotostudio.io) \u2014 iframe
//   - Google Places (places.googleapis.com) for venue ratings
// 'unsafe-inline' is required for now because of Astro `is:inline` +
// `define:vars` bootstrap scripts and the gtag/Tailwind inline blocks; a
// nonce-based tightening is a follow-up once Report-Only shows a clean run.
const CSP_REPORT_ONLY = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `frame-ancestors 'self'`,
  `form-action 'self'`,
  `img-src 'self' data: https:`,
  `font-src 'self' data:`,
  `style-src 'self' 'unsafe-inline'`,
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.youtube.com https://s.ytimg.com https://js.stripe.com`,
  `connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://connect.facebook.net https://www.facebook.com https://places.googleapis.com https://feeds.behold.so`,
  `frame-src 'self' https://challenges.cloudflare.com https://www.youtube-nocookie.com https://www.youtube.com https://js.stripe.com https://hooks.stripe.com https://gallery.fotostudio.io https://www.instagram.com https://behold.so`,
  `report-uri /api/csp-report`,
  `report-to csp-endpoint`,
].join('; ');

const DIACRITIC = new RegExp('[\u0300-\u036f]', 'g');

/** Strip accents and lowercase so /post/fotógrafos and /post/fotografos
 *  both resolve to the same legacy-slug entry. */
function normalizeSlug(s: string): string {
  return s.normalize('NFD').replace(DIACRITIC, '').toLowerCase();
}

/** Map from (legacy slug or its normalized form) → current blog post slug.
 *  Built once per process on first request that actually hits `/post/*`. */
let legacySlugMap: Map<string, string> | null = null;
async function getLegacySlugMap(): Promise<Map<string, string>> {
  if (legacySlugMap) return legacySlugMap;
  const map = new Map<string, string>();
  const posts = await getCollection('blog');
  for (const p of posts) {
    const slug = p.id;
    const legacy = p.data.legacySlug;
    // Always include the current slug (raw + normalized) so even
    // /post/<current-slug> redirects cleanly to /blog/<current-slug>.
    map.set(slug, slug);
    map.set(normalizeSlug(slug), slug);
    if (legacy) {
      map.set(legacy, slug);
      map.set(normalizeSlug(legacy), slug);
    }
  }
  legacySlugMap = map;
  return map;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;
  const method = context.request.method;
  const isApi = path.startsWith('/api/');

  // ── Legacy Wix /post/<slug> → /es/blog/<new-slug> redirects ─────────────
  // Old Wix URLs are still indexed by Google under /post/<accented-slug>.
  // Map them back via the `legacySlug` frontmatter on each blog post.
  // Unknown /post/* falls back to /es/blog so the visitor isn't stranded.
  if (path.startsWith('/post/')) {
    const raw = path.slice('/post/'.length).replace(/\/+$/, '');
    const decoded = decodeURIComponent(raw);
    const map = await getLegacySlugMap();
    const target = map.get(decoded) ?? map.get(normalizeSlug(decoded));
    if (target) return context.redirect(`/es/blog/${target}`, 301);
    return context.redirect('/es/blog', 301);
  }

  // ── Canonical host redirect (SEO + link hygiene) ────────────────────────
  // Skip for /api/* — a 301 on POST strips the body in most browsers and
  // breaks form submissions. APIs should work on whatever host they land on.
  if (!isApi) {
    const incomingHost = context.url.host;
    const pathAndQuery = context.url.pathname + context.url.search;
    if (CANONICAL_HOST) {
      // Explicit override: force every host onto CANONICAL_HOST.
      if (incomingHost && incomingHost !== CANONICAL_HOST) {
        const target = new URL(pathAndQuery, `https://${CANONICAL_HOST}`);
        return context.redirect(target.toString(), 301);
      }
    } else if (incomingHost === SITE_APEX) {
      // Default (no env needed): bare apex → www, matching SITE.url.
      const target = new URL(pathAndQuery, SITE.url);
      return context.redirect(target.toString(), 301);
    }
  }

  // ── CSRF defence for the admin area ─────────────────────────────────────
  // Astro's global origin check is intentionally disabled (astro.config.mjs)
  // because the PUBLIC forms must accept cross-edge multipart POSTs behind
  // Cloudflare. The authenticated admin surface has no such constraint, so we
  // re-introduce an Origin/Referer same-origin check here for any unsafe
  // method. Browsers always send `Origin` on admin fetch()/form POSTs, and the
  // admin UI is same-origin, so this never blocks legitimate use — but it does
  // stop a cross-site page from driving state changes against a logged-in
  // operator (defence-in-depth on top of the SameSite=Lax session cookie).
  const isAdminArea = path.startsWith('/admin') || path.startsWith('/api/admin/');
  if (isAdminArea && method !== 'GET' && method !== 'HEAD') {
    const expectedHost = context.url.host;
    const origin = context.request.headers.get('origin');
    const referer = context.request.headers.get('referer');
    let sameOrigin = false;
    try {
      if (origin) sameOrigin = new URL(origin).host === expectedHost;
      else if (referer) sameOrigin = new URL(referer).host === expectedHost;
    } catch {
      sameOrigin = false;
    }
    if (!sameOrigin) {
      return new Response(JSON.stringify({ error: 'cross_origin_forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // ── Admin auth guard ────────────────────────────────────────────────────
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const user = await getUser(context.cookies);
    if (!user) {
      return context.redirect('/admin/login');
    }
    context.locals.user = user;
  }
  // Admin API endpoints: same cookie guard, but return 401 JSON instead of
  // redirecting (the caller is fetch(), not a browser nav).
  if (path.startsWith('/api/admin/')) {
    const user = await getUser(context.cookies);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    context.locals.user = user;
  }

  // Log every /api/* request so we can see in Railway logs exactly what
  // content-type / host / method reached the server (vs. being blocked at
  // the edge by Cloudflare / Astro CSRF).
  if (isApi) {
    const ct = context.request.headers.get('content-type') ?? '';
    console.log(`[api] ${method} ${path} host=${context.url.host} ct=${ct}`);
  }

  const response = await next();

  // ── Baseline security headers ───────────────────────────────────────────
  // Applied to every response. These are framework-agnostic hardening
  // defaults. The Content-Security-Policy below ships in *Report-Only* mode
  // (see CSP_REPORT_ONLY) so it surfaces violations to /api/csp-report
  // without breaking the YouTube / Instagram / Turnstile / Stripe / analytics
  // integrations; once the reports are clean we flip it to enforcing.
  //   - nosniff:           stop MIME-type sniffing of responses.
  //   - frame SAMEORIGIN:  block clickjacking of our pages (esp. /admin).
  //   - Referrer-Policy:   don't leak full URLs (private /p, /reserva tokens)
  //                        to third parties.
  // HSTS is only emitted in production, where the site is always served over
  // HTTPS behind Cloudflare; emitting it in dev (plain http) would be wrong.
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    );
  }

  // Tell Cloudflare / browsers not to cache HTML. Static assets under /_astro
  // / /images etc. keep their long-lived cache headers (set elsewhere). This
  // prevents the "deploy shipped new JS but cached HTML still loads old JS"
  // failure mode.
  const respCt = response.headers.get('content-type') ?? '';
  if (respCt.includes('text/html')) {
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    // CSP only makes sense on HTML documents; skip it for JSON/asset
    // responses. Report-Only never blocks — it just reports to the endpoint.
    response.headers.set('Reporting-Endpoints', 'csp-endpoint="/api/csp-report"');
    response.headers.set('Content-Security-Policy-Report-Only', CSP_REPORT_ONLY);
  }

  return response;
});
