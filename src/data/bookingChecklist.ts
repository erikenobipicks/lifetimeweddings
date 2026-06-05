// Catalogue of post-booking workflow checks shown on /admin/bookings/[id].
//
// Each item is something Eric ticks off as the wedding progresses. Most
// rely on photo/video being contracted (he doesn't deliver an album for a
// video-only booking, etc.), so the catalogue declares which "service" the
// item depends on; the UI hides items whose service isn't part of the
// booking's pack.
//
// Two checks are sourced from booking row columns (`depositPaidAt`,
// `contractAcceptedAt`) and rendered read-only on the same checklist for
// continuity — they're not stored in `checklist_state`.
//
// To detect which services a booking covers we inspect the `packName`
// snapshot stored on the booking. Heuristic: keywords for photo / video
// presence. Combos and packs that include both surface every item;
// photo-only packs hide video / SDE items; video-only packs hide
// album / album-parents items. Update the heuristic in `serviceFlags`
// below if the studio adds a new pack family.

export type ChecklistService = 'photo' | 'video' | 'both';

export interface ChecklistItem {
  /** Stable key — also the JSON property name in `checklist_state`. */
  key: string;
  label: string;
  /** Which side of the studio this belongs to. `both` always shown. */
  service: ChecklistService;
}

/** Order matters — the UI renders in this order. Grouped roughly by phase:
 *  pre-wedding (payment) → wedding day → post-wedding (delivery). */
export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Pre-wedding
  { key: 'second_payment_received', label: '2n pagament rebut',           service: 'both' },
  // Wedding day
  { key: 'wedding_done',            label: 'Boda feta',                   service: 'both' },
  // Photo post-production
  { key: 'photo_selection_edited',  label: 'Selecció de fotos editada',   service: 'photo' },
  { key: 'gallery_delivered',       label: 'Galeria entregada',           service: 'photo' },
  // Video post-production
  { key: 'video_delivered',         label: 'Vídeo entregat',              service: 'video' },
  // Album (photo only)
  { key: 'album_designed',          label: 'Àlbum dissenyat',             service: 'photo' },
  { key: 'album_delivered',         label: 'Àlbum entregat',              service: 'photo' },
];

export interface ServiceFlags {
  hasPhoto: boolean;
  hasVideo: boolean;
}

/** Heuristic over the pack name snapshot — combos and the LQSA / Cómo
 *  Conocí family count as photo, This Is Us / Outlander count as video.
 *  Both flags become true for combos and for any pack name that happens
 *  to mention both keywords.
 *
 *  This is intentionally generous: when in doubt we show the item rather
 *  than hide it (false positives → Eric just leaves the box unticked,
 *  false negatives → he can't tick something he actually delivered). */
export function serviceFlags(packName: string | null | undefined): ServiceFlags {
  const n = (packName ?? '').toLowerCase();
  const photoKeywords = ['foto', 'com vaig', 'cómo conocí', 'como conoci', 'how i met', 'lqsa', 'la que se avecina', 'combo'];
  const videoKeywords = ['vídeo', 'video', 'this is us', 'outlander', 'combo'];
  const hasPhoto = photoKeywords.some((k) => n.includes(k));
  const hasVideo = videoKeywords.some((k) => n.includes(k));
  // Default to showing everything when we can't decide — better visible
  // than hidden, see the comment block above.
  if (!hasPhoto && !hasVideo) return { hasPhoto: true, hasVideo: true };
  return { hasPhoto, hasVideo };
}

/** Filter the catalogue to items that apply to a booking's pack. */
export function filterChecklistForPack(packName: string | null | undefined): ChecklistItem[] {
  const { hasPhoto, hasVideo } = serviceFlags(packName);
  return CHECKLIST_ITEMS.filter((item) => {
    if (item.service === 'both') return true;
    if (item.service === 'photo') return hasPhoto;
    if (item.service === 'video') return hasVideo;
    return true;
  });
}

/** Parse the JSON column safely. Empty / malformed → empty object. */
export function parseChecklistState(json: string | null | undefined): Record<string, string> {
  if (!json) return {};
  try {
    const v = JSON.parse(json);
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const out: Record<string, string> = {};
      for (const [k, value] of Object.entries(v)) {
        if (typeof value === 'string') out[k] = value;
      }
      return out;
    }
  } catch { /* ignore */ }
  return {};
}
