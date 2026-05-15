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
  /** Optional YouTube id (from src/data/videos.ts) to feature on the
   *  proposal page. null → hard-coded default fallback. */
  flagshipVideoId: string | null;

  // State
  status: BookingStatus;
  expiresAt: Date | null;

  // Tracking
  createdAt: Date;
  updatedAt: Date;
  firstViewedAt: Date | null;
  formSubmittedAt: Date | null;
  /** Set when the operator marks the deposit as received in /admin. Gates
   *  access to the public /contrato/[slug] form — couples without a paid
   *  deposit see the "esperando confirmación" placeholder. */
  depositPaidAt: Date | null;
  /** Set when the couple submits /contrato/[slug] with the GDPR-accepted
   *  contract data. Booking-level status stays at 'form_submitted' through
   *  the entire contrato cycle; this timestamp differentiates the sub-state
   *  without needing to extend the CHECK-constrained status enum. */
  contractReadyAt: Date | null;
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
  flagshipVideoId?: string;

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

  // ─── /contrato post-deposit fields (nullable) ──────────────────────────
  // Filled when the couple submits the second-step form at /contrato/[slug].
  // All NULL on rows that only completed /reserva.
  /** Free text: language the couple uses between themselves (e.g.
   *  "Catalán", "Català/Castellano", "English"). Operational info for the
   *  team's day-of communication, distinct from preferredLanguage which
   *  drives our outbound emails. */
  languageBetween: string | null;
  /** Exact ceremony venue text. The /reserva form's venueName captures
   *  the day's "main" venue; this field disambiguates when ceremony and
   *  reception happen at different places. */
  ceremonyLocationText: string | null;
  /** Exact reception (banquet) venue text. */
  receptionLocationText: string | null;
  /** Ceremony type — drives contract clauses. */
  ceremonyType: 'civil' | 'religious' | 'other' | null;
  /** Free text when ceremonyType = 'other'. */
  ceremonyTypeOther: string | null;
  /** Whether the couple wants a First Look session before the ceremony. */
  firstLook: 'yes' | 'no' | 'not_sure' | null;
  /** Image-rights consent: which publication channels the couple authorises.
   *  Stored as a JSON array of channel keys. Empty array = consented to
   *  nothing (still valid). NULL = consent step not yet completed. */
  publicationConsent: PublicationChannel[] | null;
  /** Timestamp of GDPR consent. Required to submit /contrato — the form
   *  cannot proceed without the checkbox ticked. */
  gdprAcceptedAt: Date | null;
}

export type PublicationChannel =
  | 'display'        // Aparador físic a l'estudi (C/ Mare Molas 26, Reus)
  | 'facebook'       // Facebook professional
  | 'website'        // lifetime.photo
  | 'instagram'      // @lifetime.weddings
  | 'private_video'; // Vídeo privat compartit només amb altres parelles
