// Single source of truth for the "inspiration" follow-up form (sent ~2
// months before the wedding). The couple shares their music + visual
// inspiration. Both the public form at /formulari/<token> and the admin
// view on the booking detail page read field keys from here.
//
// Storage: a flat Record<string,string> in form_submissions.data_json.

import { getLatestFormSubmission } from './formSubmissions';

export interface InspirationFieldDef {
  key: string;
  /** Catalan label for the admin view. */
  label: string;
  /** Render the value as a clickable link (playlist / Pinterest / video). */
  asLink?: boolean;
}

/** Admin-side field catalogue (Catalan), in display order. */
export const INSPIRATION_ADMIN_FIELDS: InspirationFieldDef[] = [
  { key: 'couple_playlist', label: 'Playlist de la parella', asLink: true },
  { key: 'special_song', label: 'Cançó especial' },
  { key: 'pinterest', label: 'Pinterest d\'idees', asLink: true },
  { key: 'inspiration_video', label: 'Vídeo que inspira', asLink: true },
  { key: 'inspiration_notes', label: 'Notes' },
];

/** Latest inspiration submission for a booking, or null. */
export function getLatestInspirationSubmission(bookingId: string) {
  return getLatestFormSubmission(bookingId, 'inspiration');
}
