// GET /api/admin/bookings/[id]/addendum?change=<changeId>
// Renders the addendum (date/price change) as a PDF for the operator to
// download/send. Admin-only (middleware guards /api/admin/*).

export const prerender = false;

import type { APIRoute } from 'astro';
import { getUser } from '~/lib/auth';
import { getBookingById, getBookingChange } from '~/lib/bookings/repository';
import { buildAddendumHtml } from '~/lib/contracts/addendum';
import { generateContractPdf } from '~/lib/contracts/pdf';

export const GET: APIRoute = async ({ params, url, cookies, redirect }) => {
  const user = await getUser(cookies);
  if (!user) return redirect('/admin/login', 303);

  const id = params.id!;
  const changeId = url.searchParams.get('change') ?? '';
  const booking = await getBookingById(id);
  if (!booking) return new Response('Not found', { status: 404 });
  const change = await getBookingChange(changeId, id);
  if (!change) return new Response('Not found', { status: 404 });

  const html = buildAddendumHtml(booking, change);
  const pdf = await generateContractPdf({ html });

  const safe =
    `${booking.coupleName1}-${booking.coupleName2}`
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50) || 'addendum';

  return new Response(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="addendum-${safe}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
};
