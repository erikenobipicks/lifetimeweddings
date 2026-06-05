// POST /api/admin/bookings/[id]/checklist
//
// Toggle one item of a booking's post-booking workflow checklist. The
// catalogue of valid keys lives in src/data/bookingChecklist.ts and is
// also enforced here (unknown keys → 400) so a stale UI can't pollute
// the JSON column with junk we'd later have to clean up.

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import { setBookingChecklistItem } from '~/lib/bookings/repository';
import { CHECKLIST_ITEMS } from '~/data/bookingChecklist';

const VALID_KEYS = new Set(CHECKLIST_ITEMS.map((i) => i.key));

const schema = z.object({
  key: z.string().refine((k) => VALID_KEYS.has(k), 'unknown_key'),
  checked: z.boolean(),
});

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, params, cookies }) => {
  const user = await getUser(cookies);
  if (!user) return json({ error: 'unauthorized' }, 401);

  const id = params.id!;
  let body: unknown;
  try { body = await request.json(); }
  catch { return json({ error: 'invalid_json' }, 400); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: 'validation', detail: parsed.error.flatten() }, 400);

  try {
    const state = await setBookingChecklistItem(id, parsed.data.key, parsed.data.checked);
    return json({ ok: true, state }, 200);
  } catch (err) {
    if ((err as Error).message === 'booking_not_found') {
      return json({ error: 'not_found' }, 404);
    }
    console.error('[admin.checklist] failed', err);
    return json({ error: 'server_error' }, 500);
  }
};
