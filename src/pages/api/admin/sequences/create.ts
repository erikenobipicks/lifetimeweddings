import type { APIRoute } from 'astro';
import { z } from 'zod';
import { createSequence } from '~/lib/bookings/sequences';

const schema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9-]+$/).min(1).max(80),
  enabled: z.string().optional(),
  triggerKind: z.enum(['days_after_deposit', 'days_before_wedding', 'days_after_wedding']),
  triggerOffsetDays: z.string().regex(/^\d+$/).transform((s) => Number(s)),
  formKind: z.string().optional(),
  serviceScope: z.enum(['any', 'photo', 'video', 'combo']).optional(),
  subjectCa: z.string().min(1).max(200),
  subjectEs: z.string().min(1).max(200),
  subjectEn: z.string().min(1).max(200),
  bodyHtmlCa: z.string().min(1).max(50_000),
  bodyHtmlEs: z.string().min(1).max(50_000),
  bodyHtmlEn: z.string().min(1).max(50_000),
});

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === 'string') raw[k] = v;
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' · ');
    const params = new URLSearchParams({ error: msg });
    for (const [k, v] of Object.entries(raw)) params.set(`v_${k}`, v);
    return redirect(`/admin/sequences/new?${params}`, 303);
  }
  const d = parsed.data;
  const formKind = d.formKind && ['timeline', 'guest_list', 'music', 'wedding_details', 'inspiration'].includes(d.formKind)
    ? (d.formKind as 'timeline' | 'guest_list' | 'music' | 'wedding_details' | 'inspiration')
    : null;
  await createSequence({
    slug: d.slug,
    enabled: d.enabled === '1',
    triggerKind: d.triggerKind,
    triggerOffsetDays: d.triggerOffsetDays,
    formKind,
    serviceScope: d.serviceScope ?? 'any',
    subject: { ca: d.subjectCa, es: d.subjectEs, en: d.subjectEn },
    bodyHtml: { ca: d.bodyHtmlCa, es: d.bodyHtmlEs, en: d.bodyHtmlEn },
  });
  return redirect('/admin/sequences?ok=created', 303);
};
