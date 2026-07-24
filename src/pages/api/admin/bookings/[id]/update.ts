// Admin endpoint: edit an existing booking. Two distinct intents are
// handled, dispatched by the `_action` field on the form body:
//
//   _action=update  → partial update of editable fields (uses the same
//                     form schema as create, all fields optional)
//   _action=status  → transition booking.status. Allowed transitions:
//                       draft → sent
//                       any   → archived
//                       (other transitions kept simple — admins can already
//                        get any status by hand if needed)
//
// In both cases we redirect back to the detail page on success or with an
// `?error=...` on failure.

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import {
  addBookingChange,
  addPayment,
  cancelBooking,
  deleteBooking,
  deletePayment,
  getBookingById,
  uncancelBooking,
  markDepositPaid,
  saveDayTimeline,
  setBookingStatus,
  unmarkDepositPaid,
  updateBooking,
  type BookingUpdate,
} from '~/lib/bookings/repository';
import type { DayTimeline } from '~/lib/bookings/types';
import { issueDepositInvoiceForBooking } from '~/lib/bookings/invoicing';
import { sendContratoInvite, sendReservaInvite } from '~/lib/bookings/emails';
import { cancelPendingSchedules, materialiseSchedulesForBooking, listSequences, manualSendSequence, sendDueEmails } from '~/lib/bookings/sequences';
import { SECOND_PAYMENT_REMINDER } from '~/lib/bookings/defaultSequences';
import type { BookingStatus } from '~/lib/bookings/types';
import {
  SPANISH_EUROS_RE,
  eurosStringToCents,
  computeDiscountCents,
  parseLines,
  parseAddons,
} from '~/lib/payments/money';

// Euro parsing, the price format and the discount/add-on parsers live in
// ~/lib/payments/money (single source of truth shared with create.ts).

const updateSchema = z.object({
  coupleName1: z.string().min(1).max(60).optional(),
  coupleName2: z.string().min(1).max(60).optional(),
  // Optional on PATCH (only validated if present), but if present must be
  // a valid email — empty string is rejected so a stray edit can't blank
  // the email and break every downstream notification.
  coupleEmailPrimary: z.string().email().max(120).optional(),
  // (See create.ts: primary email is required at booking creation.)
  couplePhonePrimary: z.string().max(40).optional(),
  preferredLanguage: z.enum(['ca', 'es', 'en']).optional(),

  source: z.string().max(120).optional(),
  kind: z.enum(['own', 'collab', 'external']).optional(),
  collaboratorName: z.string().max(120).optional(),
  serviceType: z.enum(['photo', 'video', 'combo']).optional().or(z.literal('')),

  weddingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  venueName: z.string().min(1).max(120).optional(),
  venueCity: z.string().max(80).optional(),
  venueAddress: z.string().max(200).optional(),

  packName: z.string().min(1).max(80).optional(),
  packDescription: z.string().max(2000).optional(),
  packIncludes: z.string().optional(),
  packExcludes: z.string().optional(),
  packAddons: z.string().optional(),
  packPriceEuros: z.string().regex(SPANISH_EUROS_RE).optional(),
  depositEuros: z.string().regex(SPANISH_EUROS_RE).optional(),
  paymentTerms: z.string().max(200).optional(),

  customIntro: z.string().max(2000).optional(),
  internalNotes: z.string().max(4000).optional(),
  testimonialQuote: z.string().max(2000).optional(),
  testimonialAuthor: z.string().max(120).optional(),
  testimonialContext: z.string().max(120).optional(),

  flagshipVideoId: z.string().max(40).optional(),

  discountType: z.enum(['percent', 'amount']).optional().or(z.literal('')),
  discountValue: z.string().optional(),

  incentiveBody: z.string().max(1000).optional(),
  incentiveOriginalPriceEuros: z.string().regex(SPANISH_EUROS_RE).optional().or(z.literal('')),
  incentiveDeadline: z.string().optional(),

  expiresAt: z.string().optional(),
});

const statusSchema = z.object({
  status: z.enum(['draft', 'sent', 'viewed', 'form_submitted', 'archived']),
});

export const POST: APIRoute = async ({ request, params, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const id = params.id!;
  const booking = await getBookingById(id);
  if (!booking) return new Response('Not found', { status: 404 });

  const form = await request.formData();
  const action = String(form.get('_action') ?? '');
  const back = (qs: string) => redirect(`/admin/bookings/${id}${qs}`, 303);

  // Hard-delete: irreversible. For cleanup of test/demo bookings only.
  // Confirm dialog is on the client form; we trust the admin session.
  // deleteBooking removes booking_form_responses explicitly so it works
  // even when the SQLite CASCADE isn't enforced on older databases.
  if (action === 'delete') {
    try {
      await deleteBooking(id);
      return redirect('/admin/bookings?ok=deleted', 303);
    } catch (err) {
      // Surface in the logs and tell the admin instead of silently 500'ing.
      console.error('[admin.bookings.delete] failed', { bookingId: id, err });
      const msg = err instanceof Error ? err.message : 'error desconegut';
      return back(`?error=No+s%27ha+pogut+eliminar%3A+${encodeURIComponent(msg)}`);
    }
  }

  if (action === 'status') {
    const next = statusSchema.safeParse({ status: form.get('status') });
    if (!next.success) return back('?error=Estat+invàlid');

    // Light transition guard: admins shouldn't accidentally clobber a real
    // 'form_submitted' or 'viewed' back to 'draft'. Allow any → archived
    // explicitly, and any archived → * (un-archive), which archiving otherwise
    // presents as recoverable but the rank guard would block; otherwise only
    // forward transitions.
    const target = next.data.status;
    if (target !== 'archived' && booking.status !== 'archived' && rank(target) < rank(booking.status)) {
      return back('?error=Transició+no+permesa');
    }
    await setBookingStatus(id, target);

    // First time a booking is flipped 'draft' → 'sent', invite the couple
    // by email IF the operator left the checkbox ticked (default). The
    // form field is "send_email" with value "1" — absent when unticked.
    // Fail-soft inside sendReservaInvite; never blocks the redirect.
    const firstSend = booking.status === 'draft' && target === 'sent';
    const wantsEmail = form.get('send_email') === '1';
    if (firstSend && wantsEmail) {
      const fresh = await getBookingById(id);
      if (fresh) await sendReservaInvite(fresh);
      return back(`?ok=status:${target}+%C2%B7+email+enviat`);
    }
    return back(`?ok=status:${target}`);
  }

  // Mark / unmark the deposit as received. Gates the public /contrato/[slug]
  // form — only callable on bookings that already have a form_response row
  // (i.e. couple has submitted /reserva).
  if (action === 'deposit_paid') {
    if (booking.status !== 'form_submitted') {
      return back('?error=Cal+haver+enviat+/reserva+primer');
    }
    // Guard against a re-click / Stripe-webhook race: only do the side
    // effects (invoice, /contrato invite email) the FIRST time. The DB
    // helpers are already idempotent on their own, but `sendContratoInvite`
    // is not — without this guard a re-click sends a second identical
    // "Dipòsit rebut, omple /contrato" email to the couple.
    const alreadyPaid = booking.depositPaidAt instanceof Date;
    await markDepositPaid(id);
    if (!alreadyPaid) {
      // Issue the deposit invoice in FacturaDirecta. Idempotent + fail-soft:
      // no-op when unconfigured / already invoiced, never blocks the redirect.
      await issueDepositInvoiceForBooking(id);
      // Send the couple their /contrato/<slug> link. Re-read so the helper
      // sees the deposit_paid_at stamp. Fail-soft inside sendContratoInvite.
      const fresh = await getBookingById(id);
      if (fresh) await sendContratoInvite(fresh);
      // Materialise the email-sequence queue for this booking now that the
      // deposit-paid trigger has fired. Idempotent (UNIQUE constraint).
      try {
        await materialiseSchedulesForBooking(id);
      } catch (err) {
        console.error('[admin.deposit_paid] materialise schedules failed (non-fatal)', err);
      }
    }
    return back('?ok=deposit:paid');
  }
  if (action === 'deposit_unpaid') {
    await unmarkDepositPaid(id);
    // Cancel the pending follow-up emails too — the deposit-paid trigger
    // is being rolled back. Sent rows stay (history).
    try {
      await cancelPendingSchedules(id);
    } catch (err) {
      console.error('[admin.deposit_unpaid] cancelPendingSchedules failed (non-fatal)', err);
    }
    return back('?ok=deposit:unpaid');
  }

  // ── Manual "send the second-payment reminder now" ────────────────────────
  // Fires the second-payment reminder sequence to the couple immediately,
  // regardless of its 14-days-before-wedding trigger and regardless of
  // whether the schedule queue was ever materialised (manualSendSequence
  // creates the row if it's missing). Use when the operator wants to nudge
  // a couple about the pending payment ahead of the automatic date.
  if (action === 'send_payment_reminder') {
    if (!booking.coupleEmailPrimary) {
      return back('?error=Aquesta+reserva+no+t%C3%A9+email+de+la+parella#pagaments');
    }
    try {
      const sequences = await listSequences(true);
      const seq = sequences.find((s) => s.slug === SECOND_PAYMENT_REMINDER.slug);
      if (!seq) {
        // The starter template hasn't been seeded yet → point the operator
        // to the one-click seeder on /admin/sequences.
        return back('?error=Falta+la+seq%C3%BC%C3%A8ncia+de+pagament.+Crea-la+a+/admin/sequences#pagaments');
      }
      const scheduleId = await manualSendSequence(id, seq.id);
      const result = await sendDueEmails();
      if (result.sent > 0) return back('?ok=reminder:sent#pagaments');
      // manualSendSequence set scheduled_for=today, so a 0-sent result means
      // the dispatch hit an error (recorded on the schedule's last_error).
      console.error('[admin.send_payment_reminder] dispatch sent 0', { bookingId: id, scheduleId, result });
      return back('?error=No+s%27ha+pogut+enviar+el+recordatori.+Revisa+Comunicacions#pagaments');
    } catch (err) {
      console.error('[admin.send_payment_reminder] failed', { bookingId: id, err });
      return back('?error=No+s%27ha+pogut+enviar+el+recordatori#pagaments');
    }
  }

  // ── Wedding-day timeline (horaris) ────────────────────────────────────────
  if (action === 'save_timeline') {
    const s = (k: string) => {
      const v = form.get(k);
      return typeof v === 'string' ? v.trim() : '';
    };
    const t: DayTimeline = {
      photographer: s('photographer'),
      videographer: s('videographer'),
      ceremonyLocation: s('ceremonyLocation'),
      ceremonyMapsUrl: s('ceremonyMapsUrl'),
      ceremonyTime: s('ceremonyTime'),
      arrivalTime: s('arrivalTime'),
      prepStartTime: s('prepStartTime'),
      prepSameVenue: form.get('prepSameVenue') === '1',
      prep1Address: s('prep1Address'),
      prep1MapsUrl: s('prep1MapsUrl'),
      prep1Time: s('prep1Time'),
      prep2Address: s('prep2Address'),
      prep2MapsUrl: s('prep2MapsUrl'),
      prep2Time: s('prep2Time'),
      notes: s('notes'),
    };
    await saveDayTimeline(id, t);
    return back('?ok=timeline:saved#horaris');
  }

  // Quick team assignment from the ficha summary card. Patches ONLY the two
  // team fields into the existing timeline (unlike save_timeline, which
  // rewrites the whole object from its form) so the rest survives.
  if (action === 'save_team') {
    const s = (k: string) => {
      const v = form.get(k);
      return typeof v === 'string' ? v.trim().slice(0, 80) : '';
    };
    const t: DayTimeline = {
      ...(booking.dayTimeline ?? {}),
      photographer: s('photographer'),
      videographer: s('videographer'),
    };
    await saveDayTimeline(id, t);
    return back('?ok=team:saved');
  }

  // ── Payments ledger ──────────────────────────────────────────────────────
  if (action === 'payment_add') {
    const cents = eurosStringToCents(String(form.get('amountEuros') ?? ''));
    if (Number.isNaN(cents) || cents <= 0) {
      return back('?error=Import+de+pagament+no+vàlid');
    }
    const paidOnRaw = String(form.get('paidOn') ?? '').trim();
    const paidOn = /^\d{4}-\d{2}-\d{2}$/.test(paidOnRaw) ? paidOnRaw : null;
    const methodRaw = String(form.get('method') ?? '').trim();
    const method = methodRaw ? methodRaw.slice(0, 40) : null;
    const noteRaw = String(form.get('note') ?? '').trim();
    const note = noteRaw ? noteRaw.slice(0, 200) : null;
    await addPayment({ bookingId: id, amountCents: cents, paidOn, method, note });
    return back('?ok=payment:added#pagaments');
  }
  if (action === 'payment_delete') {
    const paymentId = String(form.get('paymentId') ?? '').trim();
    if (paymentId) await deletePayment(paymentId, id);
    return back('?ok=payment:deleted#pagaments');
  }

  // ── Date / price change → addendum ───────────────────────────────────────
  if (action === 'change_addendum') {
    const newDateRaw = String(form.get('newWeddingDate') ?? '').trim();
    const newPriceRaw = String(form.get('newPriceEuros') ?? '').trim();
    const note = String(form.get('note') ?? '').trim().slice(0, 500) || null;

    const oldDateIso = booking.weddingDate.toISOString().slice(0, 10);
    const wantsDate = !!newDateRaw && newDateRaw !== oldDateIso && /^\d{4}-\d{2}-\d{2}$/.test(newDateRaw);
    let wantsPrice = false;
    let newPriceCents = NaN;
    if (newPriceRaw) {
      newPriceCents = eurosStringToCents(newPriceRaw);
      if (Number.isNaN(newPriceCents)) return back('?error=Import+no+vàlid#addendum');
      wantsPrice = newPriceCents !== booking.packPriceCents;
    }
    if (!wantsDate && !wantsPrice) {
      return back('?error=Indica+una+nova+data+o+un+nou+import#addendum');
    }

    const patch: BookingUpdate = {};
    if (wantsDate) patch.weddingDate = new Date(`${newDateRaw}T12:00:00Z`);
    if (wantsPrice) patch.packPriceCents = newPriceCents;
    await updateBooking(id, patch);

    await addBookingChange({
      bookingId: id,
      oldWeddingDate: wantsDate ? oldDateIso : null,
      newWeddingDate: wantsDate ? newDateRaw : null,
      oldPriceCents: wantsPrice ? booking.packPriceCents : null,
      newPriceCents: wantsPrice ? newPriceCents : null,
      note,
    });
    return back('?ok=change:saved#addendum');
  }

  // ── Cancellation (Fase B) ────────────────────────────────────────────────
  if (action === 'cancel_booking') {
    const reason = String(form.get('reason') ?? '').trim().slice(0, 1000) || null;
    const retainedRaw = String(form.get('retainedEuros') ?? '').trim();
    let retainedCents = booking.depositCents;
    if (retainedRaw) {
      const c = eurosStringToCents(retainedRaw);
      if (!Number.isNaN(c)) retainedCents = c;
    }
    await cancelBooking(id, { reason, retainedCents });
    // Stop the scheduled follow-up emails for a cancelled wedding. Fail-soft.
    try {
      await cancelPendingSchedules(id);
    } catch (err) {
      console.error('[admin.cancel_booking] cancelPendingSchedules failed (non-fatal)', err);
    }
    return back('?ok=cancelled#cancellacio');
  }
  if (action === 'uncancel_booking') {
    await uncancelBooking(id);
    return back('?ok=uncancelled#cancellacio');
  }

  // Default: content update.
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
  const patch: BookingUpdate = {};

  // Strings — empty string clears the field except for required ones.
  if (d.coupleName1 !== undefined) patch.coupleName1 = d.coupleName1.trim();
  if (d.coupleName2 !== undefined) patch.coupleName2 = d.coupleName2.trim();
  if (d.coupleEmailPrimary !== undefined) patch.coupleEmailPrimary = d.coupleEmailPrimary.trim();
  if (d.couplePhonePrimary !== undefined)
    patch.couplePhonePrimary = d.couplePhonePrimary.trim() || null;
  if (d.preferredLanguage !== undefined) patch.preferredLanguage = d.preferredLanguage;
  if (d.source !== undefined) patch.source = d.source.trim() || null;
  if (d.kind !== undefined) patch.kind = d.kind;
  if (d.collaboratorName !== undefined) patch.collaboratorName = d.collaboratorName.trim() || null;
  if (d.serviceType !== undefined) patch.serviceType = d.serviceType ? d.serviceType : null;

  if (d.weddingDate !== undefined) patch.weddingDate = new Date(`${d.weddingDate}T00:00:00Z`);
  if (d.venueName !== undefined) patch.venueName = d.venueName.trim();
  if (d.venueCity !== undefined) patch.venueCity = d.venueCity.trim() || null;
  if (d.venueAddress !== undefined) patch.venueAddress = d.venueAddress.trim() || null;

  if (d.packName !== undefined) patch.packName = d.packName.trim();
  if (d.packDescription !== undefined) patch.packDescription = d.packDescription.trim() || null;
  if (d.packIncludes !== undefined) patch.packIncludes = parseLines(d.packIncludes);
  if (d.packExcludes !== undefined) patch.packExcludes = parseLines(d.packExcludes);
  if (d.packAddons !== undefined) patch.packAddons = parseAddons(d.packAddons);
  if (d.packPriceEuros !== undefined)
    patch.packPriceCents = eurosStringToCents(d.packPriceEuros);
  if (d.depositEuros !== undefined)
    patch.depositCents = eurosStringToCents(d.depositEuros);
  if (d.paymentTerms !== undefined) patch.paymentTerms = d.paymentTerms.trim() || null;

  if (d.customIntro !== undefined) patch.customIntro = d.customIntro.trim() || null;
  if (d.internalNotes !== undefined) patch.internalNotes = d.internalNotes.trim() || null;

  // Flagship video: empty string means "go back to default" → null.
  if (d.flagshipVideoId !== undefined) patch.flagshipVideoId = d.flagshipVideoId.trim() || null;

  // Testimonial: any of the three fields touching → rebuild the object.
  // A single empty `testimonialQuote` field clears it.
  if (
    d.testimonialQuote !== undefined ||
    d.testimonialAuthor !== undefined ||
    d.testimonialContext !== undefined
  ) {
    const q = (d.testimonialQuote ?? '').trim();
    const a = (d.testimonialAuthor ?? '').trim();
    if (!q && !a) patch.referenceTestimonial = null;
    else if (q && a)
      patch.referenceTestimonial = {
        quote: q,
        author: a,
        context: (d.testimonialContext ?? '').trim() || undefined,
      };
    // partial input → ignore (don't half-update)
  }

  // Discount: recalculate whenever either field is present in the form.
  if (d.discountType !== undefined || d.discountValue !== undefined) {
    const effectivePriceCents = d.packPriceEuros !== undefined
      ? (patch.packPriceCents ?? 0)
      : booking.packPriceCents;
    patch.discountCents = computeDiscountCents(
      d.discountType ?? '',
      d.discountValue ?? '',
      effectivePriceCents,
    );
  }

  // Incentive ("caramel"): each field clears with an empty value.
  if (d.incentiveBody !== undefined) patch.incentiveBody = d.incentiveBody.trim() || null;
  if (d.incentiveOriginalPriceEuros !== undefined) {
    patch.incentiveOriginalPriceCents =
      d.incentiveOriginalPriceEuros.length > 0
        ? eurosStringToCents(d.incentiveOriginalPriceEuros)
        : null;
  }
  if (d.incentiveDeadline !== undefined) {
    patch.incentiveDeadline =
      d.incentiveDeadline.length > 0 ? new Date(`${d.incentiveDeadline}T23:59:59Z`) : null;
  }

  if (d.expiresAt !== undefined) {
    patch.expiresAt = d.expiresAt.length > 0 ? new Date(`${d.expiresAt}T23:59:59Z`) : null;
  }

  await updateBooking(id, patch);
  return back('?ok=updated');
};

const RANK: Record<BookingStatus, number> = {
  draft: 0,
  sent: 1,
  viewed: 2,
  form_submitted: 3,
  archived: 99,
};
function rank(s: BookingStatus): number {
  return RANK[s];
}
