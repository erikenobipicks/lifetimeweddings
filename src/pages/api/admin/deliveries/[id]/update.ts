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
  setDeliveryBalancePaid,
  clearDeliveryBalancePaid,
  setDeliveryGalleryCover,
  clearDeliveryGalleryCover,
} from '~/lib/deliveries';
import { eurosStringToCents } from '~/lib/payments/money';
import { issueBalanceInvoiceForDelivery } from '~/lib/deliveryInvoicing';
import { resizeCoverImage } from '~/lib/deliveryCover';

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20 MB raw upload ceiling

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
  balanceDueEuros: z.string().max(20).optional().or(z.literal('')),
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

  // Pending-balance: mark/unmark the payment manually (e.g. a bank transfer
  // that never hits the Stripe webhook).
  if (action === 'mark-balance-paid') {
    await setDeliveryBalancePaid(id);
    return back('?ok=balance_paid');
  }
  if (action === 'unmark-balance-paid') {
    await clearDeliveryBalancePaid(id);
    return back('?ok=balance_unpaid');
  }

  // Pending-balance: issue the FacturaDirecta invoice on demand.
  if (action === 'issue-balance-invoice') {
    const res = await issueBalanceInvoiceForDelivery(id);
    if (res.ok) {
      return back(`?ok=invoice_issued${res.number ? `&num=${encodeURIComponent(res.number)}` : ''}`);
    }
    return back(`?error=${encodeURIComponent(`No s'ha pogut crear la factura (${res.reason}).`)}`);
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

  // Pending balance: undefined field → leave as-is; empty → clear (null);
  // non-empty → parse (reject unparseable), 0 collapses to null.
  let balanceDueCents: number | null | undefined;
  if (d.balanceDueEuros !== undefined) {
    if (d.balanceDueEuros.trim() === '') {
      balanceDueCents = null;
    } else {
      const cents = eurosStringToCents(d.balanceDueEuros);
      if (!Number.isFinite(cents)) {
        return back('?error=' + encodeURIComponent('Import pendent no vàlid (ex: 1500 o 1.500,00).'));
      }
      balanceDueCents = cents > 0 ? cents : null;
    }
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
    balanceDueCents,
  });

  // Gallery cover photo. "Remove" wins over a new upload. A file input that
  // was left empty submits a zero-byte File, which we ignore.
  if (form.get('galleryCoverRemove') === 'on') {
    await clearDeliveryGalleryCover(id);
  } else {
    const file = form.get('galleryCoverFile');
    if (file && typeof file !== 'string' && file.size > 0) {
      if (file.size > MAX_UPLOAD_BYTES) {
        return back('?error=' + encodeURIComponent('La imatge és massa gran (màxim 20 MB).'));
      }
      try {
        const buf = new Uint8Array(await file.arrayBuffer());
        const resized = await resizeCoverImage(buf);
        await setDeliveryGalleryCover(id, resized.image, resized.mime);
      } catch (err) {
        console.error('[deliveries.update] cover resize failed', err);
        return back('?error=' + encodeURIComponent('No s\'ha pogut processar la imatge. Prova amb un JPG o PNG.'));
      }
    }
  }

  return back('?ok=updated');
};
