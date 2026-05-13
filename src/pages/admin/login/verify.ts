// GET /admin/login/verify?token=<token>
//
// Consumes a single-use magic-link token. On success creates a session
// (existing cookie + DB row mechanism) and redirects to /admin. On
// failure redirects back to /admin/login?err=<reason> so the form
// can render a user-facing message.

import type { APIRoute } from 'astro';
import { consumeMagicLinkToken, createSession } from '~/lib/auth';

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const token = url.searchParams.get('token') ?? '';
  const result = await consumeMagicLinkToken(token);

  if (!result.ok) {
    return redirect(`/admin/login?err=${result.reason}`, 303);
  }

  // The "user" recorded on the session row is the email — useful for the
  // logout button label and for any future audit of who's logged in.
  await createSession(cookies, result.email);
  return redirect('/admin', 303);
};
