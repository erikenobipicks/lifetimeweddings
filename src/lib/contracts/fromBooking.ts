// Map a Booking + its form response into the ContractData the contract
// engine expects. Centralised so the /contrato page (render) and the
// accept endpoint (PDF) build identical data.

import type { Booking, BookingFormResponse } from '~/lib/bookings/types';
import { formatPrice, formatWeddingDateLong } from '~/lib/bookings/format';
import type { ContractData } from '~/lib/contracts/generate';

const PHOTOGRAPHER_NAME = 'Ferran i Eric · Lifetime Weddings';

function splitName(full: string): { firstname: string; lastname: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length <= 1) return { firstname: parts[0] ?? '', lastname: '' };
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') };
}

export function contractDataFromBooking(
  booking: Booking,
  fr: BookingFormResponse,
): ContractData {
  // The signatory is the billing contraent (the one the invoice goes to);
  // the OTHER one figures alongside in the contract header so both
  // contraents are parties to the agreement. Default to c1 for pre-
  // existing rows.
  const billing = fr.billingContact === 'c2' ? 'c2' : 'c1';
  const signatory =
    billing === 'c2'
      ? { full: fr.c2FullName, dni: fr.c2Dni, address: fr.c2Address }
      : { full: fr.c1FullName, dni: fr.c1Dni, address: fr.c1Address };
  const coParty =
    billing === 'c2'
      ? { full: fr.c1FullName, dni: fr.c1Dni, address: fr.c1Address }
      : { full: fr.c2FullName, dni: fr.c2Dni, address: fr.c2Address };
  const { firstname, lastname } = splitName(signatory.full);
  const co = splitName(coParty.full);

  // Wedding date: the confirmed one, or the couple's proposed alternative.
  const weddingDate =
    !fr.weddingDateConfirmed && fr.weddingDateAlt ? fr.weddingDateAlt : booking.weddingDate;

  // Ceremony time: exact time from /contrato if given, else the half-day
  // slot, else a dash so the clause still reads.
  const slotLabel =
    fr.weddingTimeSlot === 'morning'
      ? 'matí'
      : fr.weddingTimeSlot === 'afternoon'
        ? 'tarda'
        : null;
  const shootTime = fr.ceremonyTime || slotLabel || '—';

  const shootPlace = fr.ceremonyLocationText?.trim() || booking.venueName;

  return {
    lang: booking.preferredLanguage,
    packName: booking.packName,
    packIncludes: booking.packIncludes,
    firstname,
    lastname,
    dni: signatory.dni,
    address: signatory.address,
    partner2Firstname: co.firstname,
    partner2Lastname: co.lastname,
    partner2Dni: coParty.dni,
    partner2Address: coParty.address,
    shootDescription: `Boda de ${fr.c1FullName} i ${fr.c2FullName}`,
    shootDateLong: formatWeddingDateLong(weddingDate, booking.preferredLanguage),
    shootTime,
    shootPlace,
    shootPrice: formatPrice(booking.packPriceCents, booking.preferredLanguage),
    paymentPlan: booking.paymentTerms,
    photographerName: PHOTOGRAPHER_NAME,
  };
}
