// Publication-consent helpers: classify a booking's image-rights consent
// into a single at-a-glance state for the admin (badge + filter on the
// bookings list). The raw data is a PublicationChannel[] captured on
// /contrato (null until the couple completes that step).
//
// "Publishes" criterion (agreed with the studio): authorises at least one
// PUBLIC channel. The private video (shared only with other couples, never a
// public link) does NOT count as publishing.

import type { PublicationChannel } from '~/lib/bookings/types';

/** Channels that count as "publishing" — everything except private_video. */
export const PUBLIC_CHANNELS: readonly PublicationChannel[] = [
  'display',
  'facebook',
  'website',
  'instagram',
  'instagram_reel',
  'instagram_stories',
  'blog_real_wedding',
  'paid_ads',
  'venue_partners',
];

/** Short, human-readable labels (the raw keys are stored in the DB). */
export const CHANNEL_LABEL: Record<PublicationChannel, string> = {
  website: 'Web',
  blog_real_wedding: 'Blog (real wedding)',
  instagram: 'Instagram',
  instagram_reel: 'Reel',
  instagram_stories: 'Stories',
  facebook: 'Facebook',
  paid_ads: 'Anuncis pagats',
  venue_partners: 'Venue / planner',
  display: 'Aparador estudi',
  private_video: 'Vídeo privat',
};

export type ConsentState = 'publishes' | 'no' | 'pending';

/** Classify a booking's consent value:
 *   - 'pending'   → consent step not completed yet (null/undefined; couple
 *                   hasn't filled /contrato).
 *   - 'publishes' → authorises ≥ 1 public channel.
 *   - 'no'        → completed but authorises no public channel (empty, or
 *                   only the private video). */
export function classifyConsent(consent: PublicationChannel[] | null | undefined): ConsentState {
  if (consent == null) return 'pending';
  return consent.some((c) => PUBLIC_CHANNELS.includes(c)) ? 'publishes' : 'no';
}

export interface ConsentBadge {
  state: ConsentState;
  label: string;
  classes: string;
  /** Tooltip detail: the authorised channels (readable) or why it's not. */
  title: string;
}

/** Everything the UI needs to render a consent badge for a booking. */
export function consentBadge(consent: PublicationChannel[] | null | undefined): ConsentBadge {
  const state = classifyConsent(consent);
  if (state === 'pending') {
    return {
      state,
      label: '⏳ Pendent',
      classes: 'bg-gray-100 text-gray-600',
      title: 'Encara no ha completat /contrato',
    };
  }
  const readable = (consent ?? []).map((c) => CHANNEL_LABEL[c] ?? c);
  if (state === 'publishes') {
    return {
      state,
      label: '✓ Publica',
      classes: 'bg-emerald-100 text-emerald-800',
      title: `Autoritza: ${readable.join(', ')}`,
    };
  }
  return {
    state,
    label: '⛔ No publica',
    classes: 'bg-red-100 text-red-700',
    title: readable.length > 0 ? `Només: ${readable.join(', ')}` : 'No autoritza cap canal',
  };
}
