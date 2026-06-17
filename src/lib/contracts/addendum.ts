// Addendum (canvi de data i/o preu) — builds the HTML fed to
// generateContractPdf(). PLACEHOLDER legal wording: edit the clauses here to
// match your real terms (this is not legal advice). One row per change is
// stored in `booking_changes`; this renders a single addendum from one row.

import type { Booking } from '~/lib/bookings/types';
import type { BookingChange } from '~/lib/bookings/repository';
import { formatWeddingDateLong } from '~/lib/bookings/format';
import type { Lang } from '~/i18n/ui';

function eur(cents: number, lang: Lang): string {
  const locale = lang === 'es' ? 'es-ES' : lang === 'en' ? 'en-IE' : 'ca-ES';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

function dateLong(iso: string, lang: Lang): string {
  // iso = YYYY-MM-DD → noon UTC to avoid timezone shift.
  return formatWeddingDateLong(new Date(`${iso}T12:00:00Z`), lang);
}

const T = {
  ca: {
    title: 'Addendum al contracte de prestació de serveis',
    intro: 'Les parts acorden modificar el contracte original signat per a la cobertura del casament en els termes següents:',
    dateLabel: 'Nova data del casament',
    priceLabel: 'Nou import total',
    from: 'abans',
    to: 'ara',
    noteLabel: 'Observacions',
    keep: 'La resta de clàusules i condicions del contracte original es mantenen vigents i sense cap altra modificació.',
    disclaimer: 'Document pendent de revisió legal. Substituïu aquest text per les vostres condicions reals.',
    couple: 'Parella',
    studio: 'Lifetime Weddings',
    signParty: 'Signatura de la parella',
    signStudio: 'Signatura de Lifetime Weddings',
    place: 'Lloc i data',
  },
  es: {
    title: 'Adenda al contrato de prestación de servicios',
    intro: 'Las partes acuerdan modificar el contrato original firmado para la cobertura de la boda en los siguientes términos:',
    dateLabel: 'Nueva fecha de la boda',
    priceLabel: 'Nuevo importe total',
    from: 'antes',
    to: 'ahora',
    noteLabel: 'Observaciones',
    keep: 'El resto de cláusulas y condiciones del contrato original se mantienen vigentes y sin ninguna otra modificación.',
    disclaimer: 'Documento pendiente de revisión legal. Sustituye este texto por tus condiciones reales.',
    couple: 'Pareja',
    studio: 'Lifetime Weddings',
    signParty: 'Firma de la pareja',
    signStudio: 'Firma de Lifetime Weddings',
    place: 'Lugar y fecha',
  },
  en: {
    title: 'Addendum to the services agreement',
    intro: 'The parties agree to amend the original wedding-coverage agreement as follows:',
    dateLabel: 'New wedding date',
    priceLabel: 'New total amount',
    from: 'before',
    to: 'now',
    noteLabel: 'Notes',
    keep: 'All other clauses and conditions of the original agreement remain in force with no further changes.',
    disclaimer: 'Document pending legal review. Replace this text with your real terms.',
    couple: 'Couple',
    studio: 'Lifetime Weddings',
    signParty: 'Couple signature',
    signStudio: 'Lifetime Weddings signature',
    place: 'Place and date',
  },
} as const;

export function buildAddendumHtml(booking: Booking, change: BookingChange): string {
  const lang = booking.preferredLanguage;
  const t = T[lang] ?? T.ca;
  const couple = `${booking.coupleName1}${booking.coupleName2 ? ' & ' + booking.coupleName2 : ''}`;

  const rows: string[] = [];
  if (change.newWeddingDate) {
    const before = change.oldWeddingDate ? dateLong(change.oldWeddingDate, lang) : '—';
    rows.push(
      `<p><strong>${t.dateLabel}:</strong> ${dateLong(change.newWeddingDate, lang)} ` +
        `<em>(${t.from}: ${before})</em></p>`,
    );
  }
  if (change.newPriceCents != null) {
    const before = change.oldPriceCents != null ? eur(change.oldPriceCents, lang) : '—';
    rows.push(
      `<p><strong>${t.priceLabel}:</strong> ${eur(change.newPriceCents, lang)} ` +
        `<em>(${t.from}: ${before})</em></p>`,
    );
  }
  const noteHtml = change.note ? `<p><strong>${t.noteLabel}:</strong> ${escapeHtml(change.note)}</p>` : '';

  return [
    `<h1>${t.title}</h1>`,
    `<p><strong>${t.couple}:</strong> ${escapeHtml(couple)}</p>`,
    `<p>${t.intro}</p>`,
    ...rows,
    noteHtml,
    `<p>${t.keep}</p>`,
    `<p><em>${t.disclaimer}</em></p>`,
    `<br/>`,
    `<p>${t.signParty}: ________________________</p>`,
    `<p>${t.signStudio}: ________________________</p>`,
    `<p>${t.place}: ________________________</p>`,
  ].join('\n');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
