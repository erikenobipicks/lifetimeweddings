/**
 * Social proof for the /p/<token> quote page — shown just before the
 * configurator so it answers the "can I trust paying up front?" objection
 * right when the couple is about to commit.
 *
 * ⚠️ INTEGRITY: only REAL reviews go here. Never invent a testimonial.
 * These are genuine 5★ Google reviews, kept verbatim in their original
 * language (Spanish) regardless of the page language — translating a real
 * review would make it no longer a quote of what the couple actually
 * wrote. The section title around them is still localised via i18n.
 *
 * While this array is empty, the section renders nothing.
 */
export interface QuoteTestimonial {
  /** The review, verbatim in its original language. Not translated. */
  quote: string;
  /** Reviewer name as it appears on Google. Not translated. */
  author: string;
  /** Star rating out of 5 (all current reviews are 5★). */
  rating: number;
}

export const QUOTE_TESTIMONIALS: QuoteTestimonial[] = [
  {
    quote:
      'No podríamos estar más felices con el trabajo de Ferran. Capturó cada momento de nuestra boda con sensibilidad y un estilo preciosos, y nos hizo sentir muy cómodos delante de la cámara.',
    author: 'Luis Álvarez',
    rating: 5,
  },
  {
    quote:
      'El trabajo de Ferran ha sido simplemente perfecto. Supo hacernos sentir muy cómodos durante toda la boda y siempre se mantuvo discreto. El resultado son unos vídeos maravillosos que nos permiten revivir nuestra boda.',
    author: 'Marie B.',
    rating: 5,
  },
  {
    quote:
      'Encantados, tanto con el vídeo como con las fotos. Muy atentos y profesionales, no les falta detalle. Lo recomendamos a todo el mundo que quiera muy buenos recuerdos y un buen precio.',
    author: 'Elia G.',
    rating: 5,
  },
];
