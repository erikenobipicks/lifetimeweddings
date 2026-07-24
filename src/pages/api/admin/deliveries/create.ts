// Admin endpoint: create a new material-delivery landing page from
// /admin/deliveries/new. On success redirects to the new delivery's edit
// page; on validation error redirects back with the error + preserved
// values (same pattern as /api/admin/bookings/create).

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import { createDelivery, extractYoutubeId } from '~/lib/deliveries';

const formSchema = z.object({
  bookingId: z.string().max(60).optional(),
  coupleName1: z.string().min(1).max(60),
  coupleName2: z.string().min(1).max(60),
  weddingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format: YYYY-MM-DD'),
  venueName: z.string().max(120).optional(),
  preferredLanguage: z.enum(['ca', 'es', 'en']).default('ca'),
  youtubeVideoId: z.string().max(300).optional(),
  swisstransferUrl: z.string().url().max(500).refine((v) => /^https?:\/\//i.test(v), 'Ha de ser un enllaç http(s)://').optional().or(z.literal('')),
  swisstransferExpiresAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format: YYYY-MM-DD')
    .optional()
    .or(z.literal('')),
  galleryUrl: z.string().url().max(500).refine((v) => /^https?:\/\//i.test(v), 'Ha de ser un enllaç http(s)://').optional().or(z.literal('')),
});

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const form = await request.formData();
  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === 'string') raw[k] = v;
  }

  const parsed = formSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' · ');
    const params = new URLSearchParams({ error: msg });
    for (const [k, v] of Object.entries(raw)) params.set(`v_${k}`, v);
    return redirect(`/admin/deliveries/new?${params}`, 303);
  }

  const d = parsed.data;
  const youtubeVideoId = d.youtubeVideoId ? extractYoutubeId(d.youtubeVideoId) : null;
  if (d.youtubeVideoId && !youtubeVideoId) {
    const params = new URLSearchParams({ error: 'ID o URL de YouTube no reconegut.' });
    for (const [k, v] of Object.entries(raw)) params.set(`v_${k}`, v);
    return redirect(`/admin/deliveries/new?${params}`, 303);
  }

  const delivery = await createDelivery({
    bookingId: d.bookingId || null,
    coupleName1: d.coupleName1.trim(),
    coupleName2: d.coupleName2.trim(),
    weddingDate: new Date(`${d.weddingDate}T00:00:00Z`),
    venueName: d.venueName?.trim() || null,
    preferredLanguage: d.preferredLanguage,
    youtubeVideoId,
    swisstransferUrl: d.swisstransferUrl || null,
    swisstransferExpiresAt: d.swisstransferExpiresAt ? new Date(`${d.swisstransferExpiresAt}T23:59:59Z`) : null,
    galleryUrl: d.galleryUrl || null,
  });

  return redirect(`/admin/deliveries/${delivery.id}?ok=created`, 303);
};
