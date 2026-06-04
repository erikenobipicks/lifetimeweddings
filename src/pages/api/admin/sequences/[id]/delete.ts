import type { APIRoute } from 'astro';
import { deleteSequence } from '~/lib/bookings/sequences';

export const POST: APIRoute = async ({ params, redirect }) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return redirect('/admin/sequences', 303);
  try {
    await deleteSequence(id);
    return redirect('/admin/sequences?ok=deleted', 303);
  } catch (err) {
    console.error('[admin.sequences.delete] failed', { id, err });
    const msg = err instanceof Error ? err.message : 'error';
    return redirect(`/admin/sequences/${id}?error=${encodeURIComponent(msg)}`, 303);
  }
};
