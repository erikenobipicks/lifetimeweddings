// Build a Google Calendar "Add event" URL pre-filled with the booking
// data. No OAuth, no API key — this opens the operator's logged-in
// Google Calendar with the event composer ready to save. Format:
// https://calendar.google.com/calendar/render?action=TEMPLATE&...
//
// If the form_response carries a ceremonyTime (and optionally
// serviceEndTime), the event is a timed block in Europe/Madrid so it
// shows correctly on the day. Otherwise we fall back to an ALL-DAY
// event so the date is at least blocked on the calendar.

import type { Booking, BookingFormResponse } from './types';

const TIMEZONE = 'Europe/Madrid';

/** YYYYMMDDTHHMMSS — Google Calendar's "ctz" param wants naive local time
 *  paired with `ctz=Europe/Madrid` (no Z suffix). */
function gcalLocal(date: Date, hour: number, minute: number): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(hour).padStart(2, '0');
  const mm = String(minute).padStart(2, '0');
  return `${y}${m}${d}T${hh}${mm}00`;
}

/** YYYYMMDD — for all-day events. Google's "dates" param expects the END
 *  date to be the day AFTER the event (exclusive end). */
function gcalDate(date: Date, offsetDays = 0): string {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + offsetDays);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

/** Parse "HH:MM" → { hour, minute } or null when invalid. */
function parseHm(s: string | null | undefined): { hour: number; minute: number } | null {
  if (!s) return null;
  const m = s.match(/^([01]?\d|2[0-3]):([0-5]\d)/);
  if (!m) return null;
  return { hour: Number(m[1]), minute: Number(m[2]) };
}

export interface GoogleCalendarLinkInput {
  booking: Pick<Booking, 'coupleName1' | 'coupleName2' | 'weddingDate' | 'venueName' | 'venueCity' | 'venueAddress' | 'packName'>;
  /** Optional — when present and has ceremonyTime/serviceEndTime, the event
   *  becomes a timed block rather than all-day. */
  formResponse?: Pick<BookingFormResponse, 'ceremonyTime' | 'serviceEndTime'> | null;
  /** Absolute URL to the admin detail page (we put it in the description so
   *  one click from the event jumps to the booking record). */
  adminUrl: string;
}

export function googleCalendarAddUrl(input: GoogleCalendarLinkInput): string {
  const { booking, formResponse, adminUrl } = input;

  const title = `Boda ${booking.coupleName1} & ${booking.coupleName2}`;
  const locationBits = [booking.venueName, booking.venueAddress, booking.venueCity].filter(Boolean);
  const location = locationBits.join(', ');

  // Description: a short, scannable summary + the link to the admin record.
  // \n is fine in Google Calendar's `details` param.
  const descLines = [
    `Pareja: ${booking.coupleName1} & ${booking.coupleName2}`,
    `Pack: ${booking.packName}`,
    `Lugar: ${booking.venueName}`,
    ...(formResponse?.ceremonyTime ? [`Cerimònia: ${formResponse.ceremonyTime}`] : []),
    ...(formResponse?.serviceEndTime ? [`Fi servei: ${formResponse.serviceEndTime}`] : []),
    '',
    `Detall complet a admin: ${adminUrl}`,
  ];
  const details = descLines.join('\n');

  // Date param. Prefer timed block if we know the hours.
  const ceremony = parseHm(formResponse?.ceremonyTime);
  const end = parseHm(formResponse?.serviceEndTime);

  const params = new URLSearchParams();
  params.set('action', 'TEMPLATE');
  params.set('text', title);
  params.set('details', details);
  if (location) params.set('location', location);

  if (ceremony) {
    // Timed event — start 1h before the ceremony (prep time), end at the
    // declared service end + 1h (post-baile editing usually), or 6h after
    // the ceremony as a safe default when end time isn't set yet.
    const startMin = ceremony.hour * 60 + ceremony.minute - 60;
    const endMin = end
      ? end.hour * 60 + end.minute + 60
      : ceremony.hour * 60 + ceremony.minute + 360;
    const sH = Math.max(0, Math.floor(startMin / 60));
    const sM = ((startMin % 60) + 60) % 60;
    const eH = Math.min(23, Math.floor(endMin / 60));
    const eM = ((endMin % 60) + 60) % 60;
    params.set(
      'dates',
      `${gcalLocal(booking.weddingDate, sH, sM)}/${gcalLocal(booking.weddingDate, eH, eM)}`,
    );
    params.set('ctz', TIMEZONE);
  } else {
    // All-day. End date is exclusive in Google's API.
    params.set('dates', `${gcalDate(booking.weddingDate)}/${gcalDate(booking.weddingDate, 1)}`);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
