// GET /api/admin/bookings/[id]/cancellation
// Cancellation agreement as a PDF (with an e-signature footer once signed).
// Admin-only (middleware guards /api/admin/*).

export const prerender = false;

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { getBookingById } from '~/lib/bookings/repository';
import { buildCancellationHtml } from '~/lib/contracts/cancellation';
import { generateContractPdf } from '~/lib/contracts/pdf';

function signedLine(lang: string, when: Date, ip: string | null): string {
  const d = when.toLocaleString(lang === 'es' ? 'es-ES' : lang === 'en' ? 'en-IE' : 'ca-ES', {
    timeZone: 'Europe/Madrid',
  });
  const where = ip ? ` · IP ${ip}` : '';
  if (lang === 'es') return `Firmado electrónicamente el ${d}${where}.`;
  if (lang === 'en') return `Electronically signed on ${d}${where}.`;
  return `Signat electrònicament el ${d}${where}.`;
}

export const GET: APIRoute = async ({ params, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const id = params.id!;
  const booking = await getBookingById(id);
  if (!booking || !booking.cancelledAt) return new Response('Not found', { status: 404 });

  const html = buildCancellationHtml(booking);
  const acceptanceLine = booking.cancellationSignedAt
    ? signedLine(booking.preferredLanguage, booking.cancellationSignedAt, booking.cancellationSignedIp)
    : undefined;
  const pdf = await generateContractPdf({ html, acceptanceLine });

  const safe =
    `${booking.coupleName1}-${booking.coupleName2}`
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50) || 'cancellacio';

  return new Response(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="cancellacio-${safe}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
};
