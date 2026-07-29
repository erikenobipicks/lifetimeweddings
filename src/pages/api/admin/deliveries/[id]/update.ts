// Admin endpoint: edit / archive / reactivate / delete a material-delivery
// landing page. Dispatched by `_action` on the form body, same pattern as
// /api/admin/bookings/[id]/update.

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import {
  getDeliveryById,
  updateDelivery,
  setDeliveryArchived,
  deleteDelivery,
  extractYoutubeId,
} from '~/lib/deliveries';

const updateSchema = z.object({
  coupleName1: z.string().min(1).max(60).optional(),
  coupleName2: z.string().min(1).max(60).optional(),
  weddingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  venueName: z.string().max(120).optional(),
  preferredLanguage: z.enum(['ca', 'es', 'en']).optional(),
  trailerVideoId: z.string().max(300).optional(),
  youtubeVideoId: z.string().max(300).optional(),
  swisstransferUrl: z.string().url().max(500).refine((v) => /^https?:\/\//i.test(v), 'Ha de ser un enllaç http(s)://').optional().or(z.literal('')),
  swisstransferExpiresAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
  galleryUrl: z.string().url().max(500).refine((v) => /^https?:\/\//i.test(v), 'Ha de ser un enllaç http(s)://').optional().or(z.literal('')),
});

export const POST: APIRoute = async ({ request, params, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const id = params.id!;
  const delivery = await getDeliveryById(id);
  if (!delivery) return new Response('Not found', { status: 404 });

  const form = await request.formData();
  const action = String(form.get('_action') ?? '');
  const back = (qs: string) => redirect(`/admin/deliveries/${id}${qs}`, 303);

  if (action === 'archive') {
    await setDeliveryArchived(id, true);
    return back('?ok=archived');
  }
  if (action === 'reactivate') {
    await setDeliveryArchived(id, false);
    return back('?ok=reactivated');
  }
  if (action === 'delete') {
    await deleteDelivery(id);
    return redirect('/admin/deliveries?ok=deleted', 303);
  }

  // Default: field update.
  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === 'string' && k !== '_action') raw[k] = v;
  }
  const parsed = updateSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' · ');
    return back(`?error=${encodeURIComponent(msg)}`);
  }
  const d = parsed.data;

  const resolveVideo = (input: string | undefined): string | null | undefined => {
    if (input === undefined) return undefined;
    if (input.trim() === '') return null;
    return extractYoutubeId(input) ?? '__invalid__';
  };
  const youtubeVideoId = resolveVideo(d.youtubeVideoId);
  const trailerYoutubeId = resolveVideo(d.trailerVideoId);
  if (youtubeVideoId === '__invalid__' || trailerYoutubeId === '__invalid__') {
    return back('?error=' + encodeURIComponent('ID o URL de YouTube no reconegut.'));
  }

  await updateDelivery(id, {
    coupleName1: d.coupleName1?.trim(),
    coupleName2: d.coupleName2?.trim(),
    weddingDate: d.weddingDate ? new Date(`${d.weddingDate}T00:00:00Z`) : undefined,
    venueName: d.venueName !== undefined ? d.venueName.trim() || null : undefined,
    preferredLanguage: d.preferredLanguage,
    trailerYoutubeId,
    youtubeVideoId,
    swisstransferUrl: d.swisstransferUrl !== undefined ? d.swisstransferUrl || null : undefined,
    swisstransferExpiresAt:
      d.swisstransferExpiresAt !== undefined
        ? (d.swisstransferExpiresAt ? new Date(`${d.swisstransferExpiresAt}T23:59:59Z`) : null)
        : undefined,
    galleryUrl: d.galleryUrl !== undefined ? d.galleryUrl || null : undefined,
  });

  return back('?ok=updated');
};
