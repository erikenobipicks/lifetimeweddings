// Shared types for the booking system. Kept separate from repository.ts so
// they can be imported from both server (DB layer) and client/components
// (page rendering) without dragging in db dependencies.

export type Lang = 'ca' | 'es' | 'en';

/** Ownership of the booking:
 *  - 'own'      → LifeTime Weddings (default).
 *  - 'collab'   → LifeTime + an external collaborator (still LifeTime brand).
 *  - 'external' → white-label work for another studio (mailing disabled). */
export type BookingKind = 'own' | 'collab' | 'external';

/** Service covered. null when not set explicitly (infer from the pack). */
export type ServiceType = 'photo' | 'video' | 'combo';

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
  /** Operator-only context: referrer, custom arrangement, anything the
   *  team wants to remember. NEVER rendered on the public /reserva page
   *  and NEVER included in any email to the couple. */
  internalNotes: string | null;
  referenceTestimonial: ReferenceTestimonial | null;

  // Reservation incentive ("caramel") — an optional reward shown on the
  // public proposal to motivate booking. All three are independent and
  // optional; the callout renders when incentiveBody is set.
  /** The gift/discount described in the operator's own words. Presence of
   *  this string is what makes the incentive block appear on /reserva. */
  incentiveBody: string | null;
  /** Optional pre-discount price in cents. When set AND greater than
   *  packPriceCents, the proposal shows it struck through above the current
   *  price so the discount is visible. Null → no strikethrough. */
  incentiveOriginalPriceCents: number | null;
  /** Optional urgency date — "valid if you book before {date}". Null → the
   *  incentive shows without a deadline. */
  incentiveDeadline: Date | null;
  /** Optional YouTube id (from src/data/videos.ts) to feature on the
   *  proposal page. null → hard-coded default fallback. */
  flagshipVideoId: string | null;

  /** Discount applied to the pack price. 0 = no discount. The effective price
   *  shown to the couple on /reserva is packPriceCents - discountCents. */
  discountCents: number;

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
  /** Set when the couple electronically accepts the (own) contract on
   *  /contrato/[slug] — distinct from contractReadyAt (data submitted).
   *  contractAcceptedIp records where from, for the acceptance record. */
  contractAcceptedAt: Date | null;
  contractAcceptedIp: string | null;

  /** FacturaDirecta invoice id for the deposit (anticipo), set once the
   *  deposit is marked received and the invoice is issued. Doubles as the
   *  idempotency guard — a non-null value means "already invoiced". */
  facturadirectaInvoiceId: string | null;
  /** Human-readable invoice number returned by FacturaDirecta (display only). */
  facturadirectaInvoiceNumber: string | null;

  /** FotoStudio project id (numeric). Set when /reserva pushes the booking
   *  into the CRM; used by /contrato submit to update that project's
   *  description with the publication-consent text so the contract body
   *  reflects what the couple authorised. */
  fotostudioProjectId: number | null;

  /** Procedència / referral (free text, e.g. "Instagram", "Recomanació X"). */
  source: string | null;
  /** Ownership of the booking (see BookingKind). */
  kind: BookingKind;
  /** Name of the collaborator (kind='collab') or client studio (kind='external'). */
  collaboratorName: string | null;
  /** Explicit service type override; null → infer from the pack. */
  serviceType: ServiceType | null;

  /** Cancellation (Fase B). cancelledAt set → the booking is cancelled.
   *  cancellationSignedAt/Ip set once the couple e-signs the cancellation
   *  agreement. retainedCents = amount kept (paga i senyal), snapshotted. */
  cancelledAt: Date | null;
  cancellationReason: string | null;
  cancellationRetainedCents: number | null;
  cancellationSignedAt: Date | null;
  cancellationSignedIp: string | null;

  /** Post-booking checklist state. Map of catalogue key → ISO timestamp
   *  when the operator ticked it; key absent means not ticked. Catalogue
   *  lives in src/data/bookingChecklist.ts. Empty object on rows with no
   *  ticks yet (or pre-migration rows). */
  checklistState: Record<string, string>;
  /** When the pre-wedding Telegram digest (details + supplier instagrams)
   *  was sent, ~2 days before the wedding or manually. NULL = not sent. */
  preweddingTelegramSentAt: Date | null;
  /** Operator-authored wedding-day timeline ("horaris"). NULL until filled.
   *  Times are HH:MM strings; addresses optional with an optional explicit
   *  Google Maps link (else a search link is derived from the address). */
  dayTimeline: DayTimeline | null;
}

/** Operator-editable wedding-day schedule. All fields optional so a partly
 *  filled plan still saves. Times are "HH:MM"; the photographer/videographer
 *  are free text (names). `prepSameVenue` = both partners get ready at the
 *  same place (different times). */
export interface DayTimeline {
  photographer?: string;
  videographer?: string;
  ceremonyLocation?: string;
  ceremonyMapsUrl?: string;
  ceremonyTime?: string;
  arrivalTime?: string; // crew arrival (default ceremony − 30 min)
  prepStartTime?: string; // prep coverage start (default ceremony − 3 h)
  prepSameVenue?: boolean;
  prep1Address?: string;
  prep1MapsUrl?: string;
  prep1Time?: string;
  prep2Address?: string;
  prep2MapsUrl?: string;
  prep2Time?: string;
  notes?: string; // free-form extra timeline (aperitiu, fotos família, ball…)
}

/** Input for creating a new booking from admin UI. Slug + id + timestamps
 *  are filled by the repository. */
export interface BookingCreateInput {
  coupleName1: string;
  coupleName2: string;
  coupleEmailPrimary: string;
  couplePhonePrimary?: string;
  preferredLanguage?: Lang;

  source?: string | null;
  kind?: BookingKind;
  collaboratorName?: string | null;
  serviceType?: ServiceType | null;

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
  internalNotes?: string;
  referenceTestimonial?: ReferenceTestimonial;
  flagshipVideoId?: string;

  discountCents?: number;

  incentiveBody?: string;
  incentiveOriginalPriceCents?: number;
  incentiveDeadline?: Date;

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
  /** Which of the two contraents the contract + invoice are addressed to.
   *  NULL on pre-existing rows → treat as 'c1' at read time. */
  billingContact: 'c1' | 'c2' | null;

  weddingDateConfirmed: boolean;
  weddingDateAlt: Date | null;
  venueConfirmed: boolean;
  venueAltName: string | null;
  ceremonyTime: string | null;
  serviceEndTime: string | null;
  guestCountEstimate: number | null;
  /** Half-day slot — collected on /reserva step 1 since the exact
   *  ceremony time often isn't known months out. Either NULL (couple
   *  skipped it) or 'morning' / 'afternoon'. */
  weddingTimeSlot: 'morning' | 'afternoon' | null;

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
  /** Address where partner 1 will get ready on the day. Operational info for
   *  the photographer's morning route — distinct from c1Address (tax/billing). */
  c1PrepAddress: string | null;
  /** Address where partner 2 will get ready on the day. */
  c2PrepAddress: string | null;
  /** Image-rights consent: which publication channels the couple authorises.
   *  Stored as a JSON array of channel keys. Empty array = consented to
   *  nothing (still valid). NULL = consent step not yet completed. */
  publicationConsent: PublicationChannel[] | null;
  /** Timestamp of GDPR consent. Required to submit /contrato — the form
   *  cannot proceed without the checkbox ticked. */
  gdprAcceptedAt: Date | null;
}

export type PublicationChannel =
  | 'display'           // Aparador físic a l'estudi (C/ Mare Molas 26, Reus)
  | 'facebook'          // Facebook professional
  | 'website'           // lifetime.photo
  | 'instagram'         // @lifetime.weddings (post permanent)
  | 'instagram_reel'    // Reel a @lifetime.weddings
  | 'instagram_stories' // Stories el mateix dia de la boda
  | 'blog_real_wedding' // Article a lifetime.photo/bodes (real wedding)
  | 'paid_ads'          // Anuncis pagats (Meta / Google)
  | 'venue_partners'    // Compartir amb el venue / wedding planner
  | 'private_video';    // Vídeo privat compartit només amb altres parelles
