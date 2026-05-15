// POST /api/admin/bookings/[id]/confirm-offline
//
// Admin-only fast-track for bookings that didn't come through /reserva. In
// a single round-trip:
//   1. Insert a booking_form_responses row with the couple data captured
//      by the operator manually.
//   2. Transition booking.status → 'form_submitted' and stamp
//      form_submitted_at (handled inside createFormResponse).
//   3. Mark deposit_paid_at = now so /contrato/[slug] becomes accessible
//      to the couple immediately.
//
// Guards: requires admin session, booking must be in 'draft' status, and
// no prior form_response can exist (defensive — should be impossible if
// the page-level guard worked, but a determined refresh-double-submit
// would otherwise produce a duplicate row).

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getUser } from '~/lib/auth';
import {
  createFormResponse,
  getBookingById,
  getFormResponseForBooking,
  markDepositPaid,
} from '~/lib/bookings/repository';

const DNI_REGEX = /^([0-9]{8}[A-Za-z]|[XYZxyz][0-9]{7}[A-Za-z])$/;
const PHONE_REGEX = /^\+?[\d\s\-()]{6,20}$/;

const personSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  dni: z.string().trim().regex(DNI_REGEX, 'DNI/NIE invàlid').transform((s) => s.toUpperCase()),
  email: z.string().trim().toLowerCase().email().max(120),
  phone: z.string().trim().regex(PHONE_REGEX, 'Telèfon invàlid').max(40),
  address: z.string().trim().min(5).max(200),
});

export const POST: APIRoute = async ({ request, params, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const id = params.id!;
  const booking = await getBookingById(id);
  if (!booking) return new Response('Not found', { status: 404 });

  // Only fast-trackable from draft. Anything else and we'd risk clobbering
  // real /reserva data, so refuse explicitly.
  if (booking.status !== 'draft') {
    return redirect(
      `/admin/bookings/${id}?error=${encodeURIComponent("Només es pot confirmar offline un booking en draft")}`,
      303,
    );
  }
  if (await getFormResponseForBooking(id)) {
    return redirect(
      `/admin/bookings/${id}?error=${encodeURIComponent("Aquest booking ja té dades enviades")}`,
      303,
    );
  }

  const form = await request.formData();
  const raw = {
    c1: {
      fullName: String(form.get('c1FullName') ?? ''),
      dni: String(form.get('c1Dni') ?? ''),
      email: String(form.get('c1Email') ?? ''),
      phone: String(form.get('c1Phone') ?? ''),
      address: String(form.get('c1Address') ?? ''),
    },
    c2: {
      fullName: String(form.get('c2FullName') ?? ''),
      dni: String(form.get('c2Dni') ?? ''),
      email: String(form.get('c2Email') ?? ''),
      phone: String(form.get('c2Phone') ?? ''),
      address: String(form.get('c2Address') ?? ''),
    },
  };

  const parsed = z.object({ c1: personSchema, c2: personSchema }).safeParse(raw);
  if (!parsed.success) {
    // Round-trip the typed values so the admin doesn't lose what they
    // typed when one DNI is malformed. Same v_<name> convention as
    // /admin/bookings/new.
    const qs = new URLSearchParams();
    const msg = parsed.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join(' · ');
    qs.set('error', msg);
    for (const key of ['c1FullName','c1Dni','c1Email','c1Phone','c1Address','c2FullName','c2Dni','c2Email','c2Phone','c2Address']) {
      const val = form.get(key);
      if (typeof val === 'string' && val.length > 0) qs.set(`v_${key}`, val);
    }
    return redirect(`/admin/bookings/${id}/confirm-offline?${qs.toString()}`, 303);
  }
  const { c1, c2 } = parsed.data;

  // createFormResponse transitions status → form_submitted and stamps
  // form_submitted_at atomically. We then mark deposit_paid in a follow-up
  // call (idempotent UPDATE — negligible risk of partial state, and the
  // operator can always re-click "Marcar dipòsit rebut" if it fails).
  await createFormResponse({
    bookingId: id,
    c1FullName: c1.fullName,
    c1Dni: c1.dni,
    c1Address: c1.address,
    c1Email: c1.email,
    c1Phone: c1.phone,
    c2FullName: c2.fullName,
    c2Dni: c2.dni,
    c2Address: c2.address,
    c2Email: c2.email,
    c2Phone: c2.phone,
    // Sensible defaults — the offline-booked couple already agreed to the
    // date/venue (otherwise the booking wouldn't exist), and we don't have
    // a billing split to capture without asking more questions.
    billingAddressSame: true,
    weddingDateConfirmed: true,
    venueConfirmed: true,
    ipAddress: 'admin:confirm-offline',
    userAgent: `admin:${user}`,
  });
  await markDepositPaid(id);

  return redirect(`/admin/bookings/${id}?ok=offline_confirmed`, 303);
};
