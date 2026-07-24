import type { APIRoute } from 'astro';
import { destroySession } from '~/lib/auth';

// POST-only: the nav uses a POST form, and the middleware CSRF check covers
// non-GET admin requests. A GET handler would let a cross-site link/image
// (e.g. <img src="/admin/logout">) silently destroy the admin session.
export const POST: APIRoute = async ({ cookies, redirect }) => {
  await destroySession(cookies);
  return redirect('/admin/login');
};
