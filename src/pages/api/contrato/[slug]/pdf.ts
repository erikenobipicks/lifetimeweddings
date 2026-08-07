// GET /api/contrato/[slug]/pdf
// Serves the couple their signed contract as a PDF, regenerated on demand from
// the stored data + e-signature. Public (slug-gated, same privacy posture as
// the /contrato page) and only available once the contract is accepted.

export const prerender = false;

import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import {
  getBookingBySlug,
  getFormResponseForBooking,
  getContractSignatureProof,
} from '~/lib/bookings/repository';
import { contractDataFromBooking } from '~/lib/contracts/fromBooking';
import { buildContractHtml } from '~/lib/contracts/generate';
import { generateContractPdf } from '~/lib/contracts/pdf';
import { acceptanceLine, SIGNED_BY_LABEL } from '~/lib/contracts/acceptance';

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug!;
  const booking = await getBookingBySlug(slug);
  if (!booking || booking.status === 'archived') return new Response('Not found', { status: 404 });
  // Only serve the document once it's been accepted — nothing to download before.
  if (!booking.contractAcceptedAt) return new Response('Contract not signed yet', { status: 404 });

  const fr = await getFormResponseForBooking(booking.id);
  if (!fr) return new Response('Not found', { status: 404 });
  const proof = await getContractSignatureProof(booking.id);
  if (!proof) return new Response('Not found', { status: 404 });

  const lang = booking.preferredLanguage;
  const { html } = buildContractHtml(contractDataFromBooking(booking, fr));
  const uaHash = proof.userAgent
    ? createHash('sha256').update(proof.userAgent).digest('hex').slice(0, 12)
    : '—';
  const line = acceptanceLine(
    lang,
    proof.name ?? '',
    booking.coupleName1,
    booking.coupleName2,
    proof.acceptedAt,
    proof.ip ?? '—',
    uaHash,
  );
  const pdf = await generateContractPdf({
    html,
    acceptanceLine: line,
    signatureImage: proof.signature ?? undefined,
    signerName: proof.name ?? undefined,
    signedByLabel: SIGNED_BY_LABEL[lang],
  });

  const safe =
    `${booking.coupleName1}-${booking.coupleName2}`
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50) || 'contracte';

  return new Response(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Contracte-${safe}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
};
