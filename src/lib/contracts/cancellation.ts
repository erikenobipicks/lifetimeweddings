// Cancellation agreement (acord de cancel·lació) → HTML fed to
// generateContractPdf() and shown on /cancellacio/[slug] for e-signature.
// PLACEHOLDER legal wording — edit the clauses to match your real terms
// (this is not legal advice). Reflects the retained "paga i senyal".

import type { Booking } from '~/lib/bookings/types';
import { formatWeddingDateLong } from '~/lib/bookings/format';
import type { Lang } from '~/i18n/ui';

function eur(cents: number, lang: Lang): string {
  const locale = lang === 'es' ? 'es-ES' : lang === 'en' ? 'en-IE' : 'ca-ES';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Amount retained on cancellation: the snapshot if present, else the deposit. */
export function retainedCentsFor(booking: Booking): number {
  return booking.cancellationRetainedCents ?? booking.depositCents ?? 0;
}

const T = {
  ca: {
    title: 'Acord de cancel·lació',
    couple: 'Parella',
    intro: 'Les parts acorden donar per cancel·lat el contracte de prestació de serveis per a la cobertura del casament previst per al',
    reasonLabel: 'Motiu de la cancel·lació',
    retainLabel: 'Import retingut en concepte de paga i senyal',
    retainClause: 'En concepte d’indemnització per cancel·lació, Lifetime Weddings reté la paga i senyal abonada per import de',
    refundClause: 'La resta d’imports abonats, si n’hi ha, es retornaran a la parella. A partir de la signatura d’aquest document cap de les parts tindrà res més a reclamar.',
    disclaimer: 'Document pendent de revisió legal. Substituïu aquest text per les vostres condicions reals.',
    signParty: 'Signatura de la parella',
    signStudio: 'Signatura de Lifetime Weddings',
  },
  es: {
    title: 'Acuerdo de cancelación',
    couple: 'Pareja',
    intro: 'Las partes acuerdan dar por cancelado el contrato de prestación de servicios para la cobertura de la boda prevista para el',
    reasonLabel: 'Motivo de la cancelación',
    retainLabel: 'Importe retenido en concepto de señal',
    retainClause: 'En concepto de indemnización por cancelación, Lifetime Weddings retiene la señal abonada por importe de',
    refundClause: 'El resto de importes abonados, si los hubiera, se devolverán a la pareja. A partir de la firma de este documento ninguna de las partes tendrá nada más que reclamar.',
    disclaimer: 'Documento pendiente de revisión legal. Sustituye este texto por tus condiciones reales.',
    signParty: 'Firma de la pareja',
    signStudio: 'Firma de Lifetime Weddings',
  },
  en: {
    title: 'Cancellation agreement',
    couple: 'Couple',
    intro: 'The parties agree to cancel the services agreement for the wedding scheduled for',
    reasonLabel: 'Reason for cancellation',
    retainLabel: 'Amount retained as deposit',
    retainClause: 'As cancellation compensation, Lifetime Weddings retains the deposit paid, amounting to',
    refundClause: 'Any other amounts already paid will be refunded to the couple. Upon signing this document neither party shall have any further claim.',
    disclaimer: 'Document pending legal review. Replace this text with your real terms.',
    signParty: 'Couple signature',
    signStudio: 'Lifetime Weddings signature',
  },
} as const;

export function buildCancellationHtml(booking: Booking): string {
  const lang = booking.preferredLanguage;
  const t = T[lang] ?? T.ca;
  const couple = `${booking.coupleName1}${booking.coupleName2 ? ' & ' + booking.coupleName2 : ''}`;
  const dateLong = formatWeddingDateLong(booking.weddingDate, lang);
  const retained = retainedCentsFor(booking);

  const parts = [
    `<h1>${t.title}</h1>`,
    `<p><strong>${t.couple}:</strong> ${escapeHtml(couple)}</p>`,
    `<p>${t.intro} <strong>${dateLong}</strong>.</p>`,
  ];
  if (booking.cancellationReason) {
    parts.push(`<p><strong>${t.reasonLabel}:</strong> ${escapeHtml(booking.cancellationReason)}</p>`);
  }
  parts.push(`<p><strong>${t.retainLabel}:</strong> ${eur(retained, lang)}</p>`);
  parts.push(`<p>${t.retainClause} <strong>${eur(retained, lang)}</strong>. ${t.refundClause}</p>`);
  parts.push(`<p><em>${t.disclaimer}</em></p>`);
  parts.push(`<br/>`);
  parts.push(`<p>${t.signParty}: ________________________</p>`);
  parts.push(`<p>${t.signStudio}: ________________________</p>`);
  return parts.join('\n');
}
