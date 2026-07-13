// Admin endpoint: create a new /videograf/<slug> collaboration link from
// /admin/videograf/new. On success redirects to the list with the new slug
// flagged; on validation error redirects back with the error + preserved
// values (same pattern as /api/admin/deliveries/create).

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import { createVideoLink } from '~/lib/videoLinks';
import { videos } from '~/data/videos';

const KNOWN_IDS = new Set(videos.map((v) => v.youtubeId));

const formSchema = z.object({
  label: z.string().max(80).optional(),
  lang: z.enum(['ca', 'es', 'en']).default('ca'),
  showQuote: z.string().optional(), // checkbox: "1" when ticked, absent otherwise
  trailerId: z.string().max(20).optional().or(z.literal('')),
  fullId: z.string().max(20).optional().or(z.literal('')),
  photographerName: z.string().max(80).optional(),
  photographerContactType: z.enum(['whatsapp', 'email', 'web']).optional().or(z.literal('')),
  photographerContactValue: z.string().max(300).optional(),
});

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const form = await request.formData();
  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === 'string') raw[k] = v;
  }

  const back = (error: string) => {
    const params = new URLSearchParams({ error });
    for (const [k, v] of Object.entries(raw)) params.set(`v_${k}`, v);
    return redirect(`/admin/videograf/new?${params}`, 303);
  };

  const parsed = formSchema.safeParse(raw);
  if (!parsed.success) {
    return back(parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' · '));
  }
  const d = parsed.data;

  // Featured videos must exist in the catalog when provided (else the link
  // would silently fall back). Empty = use the default.
  if (d.trailerId && !KNOWN_IDS.has(d.trailerId)) return back('El tràiler triat no és al catàleg de vídeos.');
  if (d.fullId && !KNOWN_IDS.has(d.fullId)) return back('La pel·lícula triada no és al catàleg de vídeos.');

  // Photographer contact: type and value go together, or neither.
  const type = d.photographerContactType || '';
  const value = (d.photographerContactValue ?? '').trim();
  if ((type && !value) || (!type && value)) {
    return back('Per enllaçar el fotògraf, omple tant el tipus com el valor del contacte (o deixa’ls tots dos buits).');
  }

  const link = await createVideoLink({
    label: d.label?.trim() || d.photographerName?.trim() || null,
    lang: d.lang,
    showQuote: d.showQuote === '1' || d.showQuote === 'on',
    trailerId: d.trailerId || null,
    fullId: d.fullId || null,
    photographerName: d.photographerName?.trim() || null,
    photographerContactType: type || null,
    photographerContactValue: value || null,
  });

  return redirect(`/admin/videograf?ok=created&nou=${link.slug}`, 303);
};
