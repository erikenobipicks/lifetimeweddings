// Showcase pages: curated collections of photos + video linked to ceremony types.
// Each showcase is a hidden page (/showcase/[slug]) with noindex, shown to leads
// via the quote page as "See similar work".
// TODO: Replace placeholder images/videos with real content.

export interface Showcase {
  slug: string;
  title: Record<'es' | 'ca' | 'en', string>;
  description: Record<'es' | 'ca' | 'en', string>;
  videoId: string; // YouTube video ID
  galleryImages: string[]; // URLs
  testimonialId?: string; // links to TESTIMONIALS[].id
}

export const SHOWCASES: Showcase[] = [
  {
    slug: 'boda-civil-platja',
    title: {
      es: 'Boda civil en la playa',
      ca: 'Boda civil a la platja',
      en: 'Civil beach wedding',
    },
    description: {
      es: 'Bodas al aire libre con la brisa del mar, luz natural y una atmósfera relajada y auténtica.',
      ca: `Bodes a l'aire lliure amb la brisa del mar, llum natural i una atmosfera relaxada i autèntica.`,
      en: 'Outdoor weddings with the sea breeze, natural light and a relaxed, authentic atmosphere.',
    },
    videoId: 'dQw4w9WgXcQ', // TODO: replace with real video
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606216794079-73b9d4bbf9d6?w=800&auto=format&fit=crop',
    ],
    testimonialId: 'luis-craig',
  },
  {
    slug: 'boda-civil-masia',
    title: { es: 'Boda civil en masía', ca: 'Boda civil en una masia', en: 'Civil wedding at a farmhouse' },
    description: {
      es: 'Celebraciones íntimas en masías con encanto, entre viñedos y olivos.',
      ca: 'Celebracions íntimes a masies amb encant, entre vinyes i oliveres.',
      en: 'Intimate celebrations in charming farmhouses, among vineyards and olive groves.',
    },
    videoId: 'dQw4w9WgXcQ',
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534081333815-ae5019106622?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=800&auto=format&fit=crop',
    ],
    testimonialId: 'jose-jordina',
  },
  {
    slug: 'boda-religiosa',
    title: { es: 'Boda religiosa', ca: 'Boda religiosa', en: 'Religious wedding' },
    description: {
      es: 'Ceremonias emotivas en iglesias y santuarios, respetando la tradición con un toque moderno.',
      ca: 'Cerimònies emotives a esglésies i santuaris, respectant la tradició amb un toc modern.',
      en: 'Emotional ceremonies in churches and sanctuaries, respecting tradition with a modern touch.',
    },
    videoId: 'dQw4w9WgXcQ',
    galleryImages: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606216794079-73b9d4bbf9d6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop',
    ],
    testimonialId: 'laura-joel',
  },
  {
    slug: 'boda-simbolica',
    title: { es: 'Boda simbólica', ca: 'Boda simbòlica', en: 'Symbolic wedding' },
    description: {
      es: 'Ceremonias libres y personalizadas, donde vosotros decidís cada detalle del ritual.',
      ca: 'Cerimònies lliures i personalitzades, on vosaltres decidiu cada detall del ritual.',
      en: 'Free-form personalised ceremonies where you decide every detail of the ritual.',
    },
    videoId: 'dQw4w9WgXcQ',
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534081333815-ae5019106622?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=800&auto=format&fit=crop',
    ],
  },
  {
    slug: 'destination-wedding',
    title: { es: 'Destination wedding', ca: 'Destination wedding', en: 'Destination wedding' },
    description: {
      es: 'Nos encanta viajar y llevar nuestras cámaras a cualquier rincón del mundo.',
      ca: 'Ens encanta viatjar i portar les nostres càmeres a qualsevol racó del món.',
      en: 'We love travelling and bringing our cameras to any corner of the world.',
    },
    videoId: 'dQw4w9WgXcQ',
    galleryImages: [
      'https://images.unsplash.com/photo-1534081333815-ae5019106622?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606216794079-73b9d4bbf9d6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
    ],
  },
];
