import type { APIRoute } from 'astro';
import { z } from 'zod';
import { updateSequence } from '~/lib/bookings/sequences';

const schema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9-]+$/).min(1).max(80),
  enabled: z.string().optional(),
  triggerKind: z.enum(['days_after_deposit', 'days_before_wedding', 'days_after_wedding']),
  triggerOffsetDays: z.string().regex(/^\d+$/).transform((s) => Number(s)),
  formKind: z.string().optional(),
  subjectCa: z.string().min(1).max(200),
  subjectEs: z.string().min(1).max(200),
  subjectEn: z.string().min(1).max(200),
  bodyHtmlCa: z.string().min(1).max(50_000),
  bodyHtmlEs: z.string().min(1).max(50_000),
  bodyHtmlEn: z.string().min(1).max(50_000),
});

export const POST: APIRoute = async ({ request, params, redirect }) => {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return redirect('/admin/sequences', 303);

  const form = await request.formData();
  const raw: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === 'string') raw[k] = v;
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' · ');
    const qs = new URLSearchParams({ error: msg });
    for (const [k, v] of Object.entries(raw)) qs.set(`v_${k}`, v);
    return redirect(`/admin/sequences/${id}?${qs}`, 303);
  }
  const d = parsed.data;
  const formKind = d.formKind && ['timeline', 'guest_list', 'music', 'wedding_details', 'inspiration'].includes(d.formKind)
    ? (d.formKind as 'timeline' | 'guest_list' | 'music' | 'wedding_details' | 'inspiration')
    : null;
  await updateSequence(id, {
    slug: d.slug,
    enabled: d.enabled === '1',
    triggerKind: d.triggerKind,
    triggerOffsetDays: d.triggerOffsetDays,
    formKind,
    subject: { ca: d.subjectCa, es: d.subjectEs, en: d.subjectEn },
    bodyHtml: { ca: d.bodyHtmlCa, es: d.bodyHtmlEs, en: d.bodyHtmlEn },
  });
  return redirect(`/admin/sequences/${id}?ok=updated`, 303);
};
