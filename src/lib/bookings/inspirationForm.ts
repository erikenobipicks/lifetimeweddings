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

/** Admin-side field catalogue (Catalan), in display order. Grouped: first
 *  the "get to know you" answers (història, món, preboda), then the visual +
 *  music inspiration. The form at /formulari/<token> follows the same order. */
export const INSPIRATION_ADMIN_FIELDS: InspirationFieldDef[] = [
  // ── La seva història ──
  { key: 'how_met', label: 'Com es van conèixer' },
  { key: 'relationship_words', label: 'Tres paraules sobre la relació' },
  { key: 'proposal', label: 'La proposta' },
  { key: 'inside_world', label: 'Món interior (broma / mot / mania)' },
  // ── El seu món ──
  { key: 'perfect_plan', label: 'El seu pla perfecte junts' },
  { key: 'hobbies', label: 'Aficions' },
  { key: 'special_places', label: 'Llocs especials' },
  { key: 'personality', label: 'Personalitat davant la gent' },
  // ── La preboda ──
  { key: 'comfort_camera', label: 'Com es porten amb la càmera' },
  { key: 'prewedding_vibe', label: 'Idea per a la preboda' },
  // ── Estètica i inspiració visual ──
  { key: 'colors_mood', label: 'Colors / tons / ambient' },
  { key: 'pinterest', label: 'Pinterest d\'idees', asLink: true },
  { key: 'inspiration_video', label: 'Vídeo que inspira', asLink: true },
  { key: 'inspiration_notes', label: 'Notes' },
  // ── Música ──
  { key: 'couple_playlist', label: 'Playlist de la parella', asLink: true },
  { key: 'special_song', label: 'Cançó especial' },
];

/** Latest inspiration submission for a booking, or null. */
export function getLatestInspirationSubmission(bookingId: string) {
  return getLatestFormSubmission(bookingId, 'inspiration');
}
