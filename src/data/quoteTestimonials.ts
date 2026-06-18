import type { Lang } from '~/i18n/ui';

/**
 * Social proof for the /p/<token> quote page — shown just before the
 * configurator so it answers the "can I trust paying up front?" objection
 * right when the couple is about to commit.
 *
 * ⚠️ INTEGRITY: only REAL reviews go here. Never invent a testimonial.
 * Fill this array with genuine quotes from couples (Google, WhatsApp,
 * Instagram…). While it stays empty, the section renders nothing — the
 * page skips it cleanly rather than showing a placeholder.
 *
 * The copy that converts best touches the key objections directly:
 *   - "no sabíem posar i no es va notar"   (natural, unposed)
 *   - "ni ens vam adonar que hi eren"      (discreet, photojournalistic)
 *   - "el tracte va ser de família"        (trust / closeness)
 *   - "el vídeo és el nostre tresor"       (emotional value)
 */
export interface QuoteTestimonial {
  /** The review itself, per language. Keep it short and emotive. */
  quote: Record<Lang, string>;
  /** Couple names, e.g. "Elena i Jordi". Not translated. */
  author: string;
  /** Venue / location, e.g. "Masia San Antonio · Montferri". Not translated. */
  place: string;
}

export const QUOTE_TESTIMONIALS: QuoteTestimonial[] = [
  // Example shape (commented out — replace with real reviews and uncomment):
  // {
  //   quote: {
  //     ca: 'No sabíem posar davant la càmera i no es va notar gens: les fotos són nosaltres.',
  //     es: 'No sabíamos posar y no se notó nada: las fotos somos nosotros.',
  //     en: "We didn't know how to pose and it didn't show at all: the photos are just us.",
  //   },
  //   author: 'Elena i Jordi',
  //   place: 'Masia San Antonio · Montferri',
  // },
];
