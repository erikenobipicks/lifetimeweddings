// POST /api/admin/sequences/seed-defaults
//
// Idempotently inserts the studio's starter email-sequence templates
// (currently just the 14-day second-payment reminder). Admin-guarded.
// Redirects back to /admin/sequences with a flag so the listing shows a
// success/no-op banner. Re-runnable: only fills in missing slugs.

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { seedDefaultSequences } from '~/lib/bookings/sequences';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  try {
    const { created, skipped } = await seedDefaultSequences();
    const flag = created.length > 0 ? 'seeded' : 'seed-noop';
    return redirect(`/admin/sequences?ok=${flag}&n=${created.length}`, 303);
  } catch (err) {
    console.error('[sequences.seed-defaults] failed', err);
    const msg = err instanceof Error ? err.message : 'error desconegut';
    return redirect(`/admin/sequences?error=${encodeURIComponent('No s\'han pogut crear: ' + msg)}`, 303);
  }
};
