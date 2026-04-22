import { defineMiddleware } from 'astro:middleware';
import { getCollection } from 'astro:content';
import { getUser } from '~/lib/auth';

/** Canonical host for production. When set, any request coming in on a
 *  different host (e.g. the Railway-generated .up.railway.app subdomain or an
 *  apex/www mismatch) is 301-redirected to this host, preserving path + query.
 *  Leave unset in dev/staging. Example: CANONICAL_HOST=www.lifetime.photo */
const CANONICAL_HOST = process.env.CANONICAL_HOST;

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
  if (CANONICAL_HOST && !isApi) {
    const incomingHost = context.url.host;
    if (incomingHost && incomingHost !== CANONICAL_HOST) {
      const target = new URL(context.url.pathname + context.url.search, `https://${CANONICAL_HOST}`);
      return context.redirect(target.toString(), 301);
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

  // Tell Cloudflare / browsers not to cache HTML. Static assets under /_astro
  // / /images etc. keep their long-lived cache headers (set elsewhere). This
  // prevents the "deploy shipped new JS but cached HTML still loads old JS"
  // failure mode.
  const respCt = response.headers.get('content-type') ?? '';
  if (respCt.includes('text/html')) {
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
  }

  return response;
});
