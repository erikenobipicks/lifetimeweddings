// Shared types for the booking system. Kept separate from repository.ts so
// they can be imported from both server (DB layer) and client/components
// (page rendering) without dragging in db dependencies.

export type Lang = 'ca' | 'es' | 'en';

export type BookingStatus =
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'form_submitted'
  | 'archived';

export interface PackAddon {
  name: string;
  /** Stored in cents, EUR. */
  price_cents: number;
}

export interface ReferenceTestimonial {
  /** What the couple said (can include line breaks). */
  quote: string;
  /** Who said it, e.g. "Maria & Joan". */
  author: string;
  /** Where they got married, e.g. "Mas la Boella, Tarragona". */
  context?: string;
}

/** Hydrated booking — pack/JSON fields parsed, dates as Date. */
export interface Booking {
  id: string;
  slug: string;

  // Couple
  coupleName1: string;
  coupleName2: string;
  coupleEmailPrimary: string;
  couplePhonePrimary: string | null;
  preferredLanguage: Lang;

  // Wedding
  weddingDate: Date;
  venueName: string;
  venueCity: string | null;
  venueAddress: string | null;

  // Pack snapshot
  packName: string;
  packDescription: string | null;
  packIncludes: string[];
  packExcludes: string[];
  packAddons: PackAddon[];
  packPriceCents: number;
  depositCents: number;
  paymentTerms: string | null;

  // Personalisation
  customIntro: string | null;
  referenceTestimonial: ReferenceTestimonial | null;

  // State
  status: BookingStatus;
  expiresAt: Date | null;

  // Tracking
  createdAt: Date;
  updatedAt: Date;
  firstViewedAt: Date | null;
  formSubmittedAt: Date | null;
}

/** Input for creating a new booking from admin UI. Slug + id + timestamps
 *  are filled by the repository. */
export interface BookingCreateInput {
  coupleName1: string;
  coupleName2: string;
  coupleEmailPrimary: string;
  couplePhonePrimary?: string;
  preferredLanguage?: Lang;

  weddingDate: Date;
  venueName: string;
  venueCity?: string;
  venueAddress?: string;

  packName: string;
  packDescription?: string;
  packIncludes?: string[];
  packExcludes?: string[];
  packAddons?: PackAddon[];
  packPriceCents: number;
  depositCents: number;
  paymentTerms?: string;

  customIntro?: string;
  referenceTestimonial?: ReferenceTestimonial;

  expiresAt?: Date;
}

export interface BookingFormResponse {
  id: string;
  bookingId: string;

  c1FullName: string;
  c1Dni: string;
  c1BirthDate: Date | null;
  c1Address: string;
  c1Email: string;
  c1Phone: string;

  c2FullName: string;
  c2Dni: string;
  c2BirthDate: Date | null;
  c2Address: string;
  c2Email: string;
  c2Phone: string;

  billingAddressSame: boolean;
  billingName: string | null;
  billingDni: string | null;
  billingAddress: string | null;

  weddingDateConfirmed: boolean;
  weddingDateAlt: Date | null;
  venueConfirmed: boolean;
  venueAltName: string | null;
  ceremonyTime: string | null;
  serviceEndTime: string | null;
  guestCountEstimate: number | null;

  preferredCommunication: 'email' | 'whatsapp' | 'phone' | null;
  preferredLanguage: Lang | null;
  preferredPaymentMethod: 'card' | 'transfer' | null;

  howDidYouFindUs: string | null;
  importantNotes: string | null;

  submittedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
}
