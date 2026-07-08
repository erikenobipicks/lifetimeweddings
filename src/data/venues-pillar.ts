import type { Lang } from '~/i18n/ui';

// Copy for the venues pillar page /venues. Ties together the real venue
// landings (with galleries) and the portfolio-only venues we cover — both
// read from VENUES in the component, so this file only carries the page copy.

export interface VenuesPillarCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; sub: string; heroAlt: string };
  intro: { title: string; paras: string[] };
  ourVenuesTitle: string;
  ourVenuesIntro: string;
  otherTitle: string;
  otherIntro: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  finalCta: { h2: string; body: string };
  formTitle: string;
  formIntro: string;
  whatsAppMessage: string;
  breadcrumbCurrent: string;
  seeVenue: string;
  coverHere: string;
}

export const VENUES_PILLAR: Record<Lang, VenuesPillarCopy> = {
  ca: {
    meta: { title: 'Millors venues per a bodes a Tarragona i Lleida | Lifetime Weddings', description: 'Guia dels millors espais per casar-se a Tarragona i Lleida: masies, castells, jardins i cellers. Amb reportatges reals i el nostre servei de foto i vídeo.' },
    hero: { eyebrow: 'Espais de boda · Tarragona i Lleida', h1: 'Els millors espais per a bodes a Tarragona i Lleida', sub: 'Masies, castells, jardins i cellers on hem treballat o que coneixem bé. Amb reportatges reals i el nostre servei de foto i vídeo per a cada espai.', heroAlt: 'Espai de boda al Camp de Tarragona fotografiat per Lifetime Weddings' },
    intro: { title: 'L’espai marca el dia', paras: ['Cada finca té la seva llum, els seus racons i el seu ritme. Nosaltres els coneixem de treballar-hi: sabem on i quan fer cada foto i cada pla de vídeo.', 'Aquí teniu els espais que hem documentat amb bodes reals i una selecció dels millors venues de la zona que cobrim.'] },
    ourVenuesTitle: 'Espais amb reportatge real',
    ourVenuesIntro: 'Bodes reals que hem documentat en aquests espais. Entreu a cada fitxa per veure’n el reportatge complet.',
    otherTitle: 'Altres espais top que cobrim',
    otherIntro: 'Venues destacats de Tarragona i Lleida on treballem. Toqueu per veure el nostre servei de foto i vídeo a la seva zona.',
    faqTitle: 'Preguntes freqüents',
    faqs: [
      { q: 'Treballeu a qualsevol espai?', a: 'Sí. Tenim fitxes dels espais que coneixem millor, però ens movem per tot Tarragona i Lleida, a la masia, castell o finca que trieu.' },
      { q: 'Feu foto i vídeo?', a: 'Sí, els dos germans: un a la foto, l’altre al vídeo. Un sol equip coordinat.' },
      { q: 'Ja teniu l’espai reservat?', a: 'Perfecte. Digueu-nos quin és i us expliquem com hi treballem i mirem disponibilitat.' },
    ],
    finalCta: { h2: 'Ja teniu espai?', body: 'Digueu-nos on us caseu i us expliquem com hi treballem. Sense compromís.' },
    formTitle: 'Consulteu disponibilitat',
    formIntro: 'Digueu-nos l’espai i la data i us responem amb disponibilitat i pressupost.',
    whatsAppMessage: 'Hola! Ens casem en un espai de Tarragona/Lleida i busquem foto i vídeo. En parlem?',
    breadcrumbCurrent: 'Millors venues a Tarragona i Lleida',
    seeVenue: 'Veure el reportatge',
    coverHere: 'El nostre servei aquí',
  },
  es: {
    meta: { title: 'Mejores venues para bodas en Tarragona y Lleida | Lifetime Weddings', description: 'Guía de los mejores espacios para casarse en Tarragona y Lleida: masías, castillos, jardines y bodegas. Con reportajes reales y nuestro servicio de foto y vídeo.' },
    hero: { eyebrow: 'Espacios de boda · Tarragona y Lleida', h1: 'Los mejores espacios para bodas en Tarragona y Lleida', sub: 'Masías, castillos, jardines y bodegas donde hemos trabajado o que conocemos bien. Con reportajes reales y nuestro servicio de foto y vídeo para cada espacio.', heroAlt: 'Espacio de boda en el Camp de Tarragona fotografiado por Lifetime Weddings' },
    intro: { title: 'El espacio marca el día', paras: ['Cada finca tiene su luz, sus rincones y su ritmo. Los conocemos de trabajar en ellos: sabemos dónde y cuándo hacer cada foto y cada plano de vídeo.', 'Aquí tenéis los espacios que hemos documentado con bodas reales y una selección de los mejores venues de la zona que cubrimos.'] },
    ourVenuesTitle: 'Espacios con reportaje real',
    ourVenuesIntro: 'Bodas reales que hemos documentado en estos espacios. Entrad en cada ficha para ver el reportaje completo.',
    otherTitle: 'Otros espacios top que cubrimos',
    otherIntro: 'Venues destacados de Tarragona y Lleida donde trabajamos. Tocad para ver nuestro servicio de foto y vídeo en su zona.',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Trabajáis en cualquier espacio?', a: 'Sí. Tenemos fichas de los espacios que conocemos mejor, pero nos movemos por todo Tarragona y Lleida, a la masía, castillo o finca que elijáis.' },
      { q: '¿Hacéis foto y vídeo?', a: 'Sí, los dos hermanos: uno en la foto, el otro en el vídeo. Un solo equipo coordinado.' },
      { q: '¿Ya tenéis el espacio reservado?', a: 'Perfecto. Decidnos cuál es y os contamos cómo trabajamos allí y miramos disponibilidad.' },
    ],
    finalCta: { h2: '¿Ya tenéis espacio?', body: 'Decidnos dónde os caséis y os contamos cómo trabajamos allí. Sin compromiso.' },
    formTitle: 'Consultad disponibilidad',
    formIntro: 'Decidnos el espacio y la fecha y os respondemos con disponibilidad y presupuesto.',
    whatsAppMessage: '¡Hola! Nos casamos en un espacio de Tarragona/Lleida y buscamos foto y vídeo. ¿Hablamos?',
    breadcrumbCurrent: 'Mejores venues en Tarragona y Lleida',
    seeVenue: 'Ver el reportaje',
    coverHere: 'Nuestro servicio aquí',
  },
  en: {
    meta: { title: 'Best wedding venues in Tarragona & Lleida | Lifetime Weddings', description: 'A guide to the best wedding venues in Tarragona and Lleida: country houses, castles, gardens and wineries. With real weddings and our photo and video service.' },
    hero: { eyebrow: 'Wedding venues · Tarragona & Lleida', h1: 'The best wedding venues in Tarragona & Lleida', sub: 'Country houses, castles, gardens and wineries where we have worked or that we know well. With real weddings and our photo and video service for each venue.', heroAlt: 'Wedding venue in the Camp de Tarragona photographed by Lifetime Weddings' },
    intro: { title: 'The venue shapes the day', paras: ['Every estate has its own light, its own corners and its own rhythm. We know them from working in them: we know where and when to make each photo and each video shot.', 'Here are the venues we’ve documented with real weddings, plus a selection of the best venues in the area we cover.'] },
    ourVenuesTitle: 'Venues with a real wedding',
    ourVenuesIntro: 'Real weddings we have documented at these venues. Open each one to see the full story.',
    otherTitle: 'Other top venues we cover',
    otherIntro: 'Standout venues across Tarragona and Lleida where we work. Tap to see our photo and video service in their area.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Do you work at any venue?', a: 'Yes. We have pages for the venues we know best, but we travel across all of Tarragona and Lleida, to whichever country house, castle or estate you choose.' },
      { q: 'Do you do photo and video?', a: 'Yes, both brothers: one on photo, the other on video. One coordinated team.' },
      { q: 'Have you booked your venue?', a: 'Great. Tell us which one and we’ll explain how we work there and check availability.' },
    ],
    finalCta: { h2: 'Already have a venue?', body: 'Tell us where you’re marrying and we’ll explain how we work there. No commitment.' },
    formTitle: 'Check availability',
    formIntro: 'Tell us the venue and date and we’ll reply with availability and a quote.',
    whatsAppMessage: 'Hi! We’re marrying at a venue in Tarragona/Lleida and are looking for photo and video. Can we chat?',
    breadcrumbCurrent: 'Best venues in Tarragona & Lleida',
    seeVenue: 'See the story',
    coverHere: 'Our service here',
  },
};
