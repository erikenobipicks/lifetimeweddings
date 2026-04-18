import { defineMiddleware } from 'astro:middleware';
import { getUser } from '~/lib/auth';

/** Canonical host for production. When set, any request coming in on a
 *  different host (e.g. the Railway-generated .up.railway.app subdomain or an
 *  apex/www mismatch) is 301-redirected to this host, preserving path + query.
 *  Leave unset in dev/staging. Example: CANONICAL_HOST=www.lifetime.photo */
const CANONICAL_HOST = process.env.CANONICAL_HOST;

export const onRequest = defineMiddleware(async (context, next) => {
  // ── Canonical host redirect (SEO + link hygiene) ────────────────────────
  if (CANONICAL_HOST) {
    const incomingHost = context.url.host;
    if (incomingHost && incomingHost !== CANONICAL_HOST) {
      const target = new URL(context.url.pathname + context.url.search, `https://${CANONICAL_HOST}`);
      return context.redirect(target.toString(), 301);
    }
  }

  // ── Admin auth guard ────────────────────────────────────────────────────
  const path = context.url.pathname;
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const user = await getUser(context.cookies);
    if (!user) {
      return context.redirect('/admin/login');
    }
    context.locals.user = user;
  }
  return next();
});
