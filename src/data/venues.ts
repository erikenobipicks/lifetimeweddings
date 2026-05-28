// Venue-specific landing pages. One per wedding venue we want to target
// for SEO ("fotògraf de boda + venue"). Each landing leans on a real
// wedding gallery we already have, plus venue-specific copy that
// captures the photographer's perspective on the space.
//
// Copy is in Catalan only for now. When we add /es/venues and
// /en/venues wrappers, mirror this structure with `copy.es` and
// `copy.en` blocks.

export interface VenueFaq {
  question: string;
  answer: string;
}

export interface Venue {
  /** URL slug — final route is /venues/<slug>. */
  slug: string;
  /** Display name as it appears in the H1 and meta. */
  name: string;
  /** City/region for SEO and breadcrumb context. */
  region: string;
  /** Slug of a real wedding from src/data/weddings.ts. Drives the
   *  gallery and the "una boda real a..." block. */
  realWeddingSlug: string;
  /** Pareja display name, free text — "Cristina & Daniel". */
  realWeddingCouple: string;
  /** When did the real wedding happen — used in FAQ copy. Free text. */
  realWeddingSeason?: string;
  /** Direct link to an extra resource (e.g. video trailer in /videos)
   *  if applicable. Renders an inline CTA in the "una boda real..."
   *  block. */
  extraResource?: { label: string; href: string };

  // ─── Copy (Catalan) ───────────────────────────────────────────────
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subtitle: string;

  realWeddingIntro: string;
  whatItOffersIntro: string;
  whatItOffersBullets: string[];
  whyChooseIntro: string;
  whyChoosePoints: string[];

  faqs: VenueFaq[];

  finalCtaH2: string;
  finalCtaBody: string;
}

export const VENUES: Venue[] = [
  // ─── Mas La Boella ──────────────────────────────────────────────────
  {
    slug: 'mas-la-boella',
    name: 'Mas La Boella',
    region: 'Tarragona',
    realWeddingSlug: 'cristina-daniel-mas-la-boella',
    realWeddingCouple: 'Cristina & Daniel',
    metaTitle: 'Fotògrafs de boda a Mas La Boella | Lifetime Weddings',
    metaDescription:
      "Fotografia i vídeo documental de boda a Mas La Boella, Tarragona. Veieu el reportatge real d'una boda allà i parleu-nos pel WhatsApp.",
    eyebrow: 'Reus · Tarragona · des de 2020',
    h1: 'Fotografia i vídeo de boda a Mas La Boella',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera i càmera de vídeo. Hem documentat la boda de la Cristina i en Daniel a Mas La Boella i sabem com es mou una boda en aquesta finca: les hores, els racons, com canvia la llum al jardí abans de sopar.",
    realWeddingIntro:
      'La Cristina i en Daniel ens van confiar el seu dia. Cap pressa, cap "mira aquí". Vam ser-hi des dels preparatius del matí fins al ball. El que vam captar és el que veureu si decidiu treballar amb nosaltres: la naturalitat, la complicitat dels familiars, la llum del Mas a cada moment del dia.',
    whatItOffersIntro:
      "Mas La Boella és un dels venues més polits de la zona, però també és un repte tècnic: la barreja de pedra, vegetació i ombres profundes demana ull. Aquests anys ens hi hem trobat amb suficients llums com per conèixer els seus moments clau:",
    whatItOffersBullets: [
      "La cerimònia al jardí amb el contrast de la pèrgola — necessita exposició al límit per no perdre el blanc del vestit",
      'Els preparatius en una de les habitacions superiors — llum lateral preciosa, ideal per a un retrat íntim',
      'El banquet a la sala — il·luminació càlida, perfecta per al vídeo documental sense flash',
      'El cocktail al pati interior — un dels millors moments per a la fotografia de família en grup',
      "El ball — millor amb un parell de focus addicionals si la festa s'allarga",
    ],
    whyChooseIntro: 'Dos motius senzills:',
    whyChoosePoints: [
      'Som dos germans amb dos formats. Un de nosaltres filma, l\'altre fotografia. La parella surt amb tot el dia documentat en foto i vídeo, sense haver de coordinar dos equips externs.',
      'No fem la boda tipus. Cada parella és diferent, cada Mas La Boella és diferent — depèn del temps, dels convidats, de com us aneu sentint. Treballem en clau documental: si voleu posats, en farem alguns. Si no, no us obligarem a res.',
    ],
    faqs: [
      {
        question: 'Coneixeu Mas La Boella?',
        answer:
          "Sí. Hi vam fotografiar i filmar la boda de la Cristina i en Daniel. Coneixem els temps, els racons i les zones de millor llum a cada hora del dia.",
      },
      {
        question: 'Quina franja horària recomaneu per a la cerimònia?',
        answer:
          "A Mas La Boella, idealment entre les 17:30 i les 18:30 a l'estiu, i sobre les 16:30 al setembre/octubre. La llum del jardí als capvespres és la més afavoridora.",
      },
      {
        question: 'Quantes hores de cobertura necessito per a una boda a Mas La Boella?',
        answer:
          "Per cobrir des dels preparatius fins al ball, recomanem 10-12 hores. Si voleu només cerimònia i cocktail, 6-7 hores n'hi ha prou.",
      },
      {
        question: 'Hi ha algun racó del Mas que recomaneu aprofitar per als retrats de parella?',
        answer:
          "Sí, n'hi ha tres especialment bonics: el jardí de l'oliveda al capvespre, la pèrgola lateral per a un retrat més íntim, i un racó del pati interior que té una llum molt cinematogràfica al matí. T'ho ensenyem quan parlem.",
      },
      {
        question: 'Quant costa la cobertura de boda a Mas La Boella?',
        answer:
          'Cada boda té un pressupost personalitzat segons la data, el pack i les necessitats. Us en passem un de concret en menys de 24h després d\'una breu conversa per WhatsApp.',
      },
    ],
    finalCtaH2: 'La vostra boda mereix algú que ja conegui Mas La Boella',
    finalCtaBody:
      'Mireu si tenim la vostra data lliure. Resposta en menys d\'un dia. Sense compromís, sense formularis llargs — només una conversa per WhatsApp.',
  },

  // ─── L'Orangerie Clos Barenys ──────────────────────────────────────
  {
    slug: 'orangerie-clos-barenys',
    name: "L'Orangerie Clos Barenys",
    region: 'Tarragona',
    realWeddingSlug: 'elisabet-josep-orangerie-clos-barenys',
    realWeddingCouple: 'Elisabet & Josep',
    metaTitle: "Fotògrafs de boda a l'Orangerie Clos Barenys",
    metaDescription:
      "Fotografia i vídeo documental de boda a l'Orangerie Clos Barenys, Tarragona. Veieu un reportatge real i parleu-nos pel WhatsApp. Resposta en 24h.",
    eyebrow: 'Reus · Tarragona · des de 2020',
    h1: "Fotografia i vídeo de boda a l'Orangerie Clos Barenys",
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera i càmera de vídeo. Hem documentat la boda de l'Elisabet i en Josep a l'Orangerie i sabem com treballar la llum d'aquest espai: el cristall, la vegetació, els reflexos del jardí al capvespre.",
    realWeddingIntro:
      "L'Elisabet i en Josep van triar Clos Barenys per la sensació d'estar en un jardí botànic íntim. Vam ser-hi des dels preparatius fins al ball. El que vam captar és el que veureu si decidiu treballar amb nosaltres: la naturalitat, la calidesa del menjador, la llum filtrada per la teulada de l'orangerie.",
    whatItOffersIntro:
      "Aquest venue té una característica fotogràfica única a tot el camp de Tarragona: la teulada de cristall de l'orangerie filtra la llum del migdia en una difusió natural que és pràcticament impossible de recrear amb modificadors. Això vol dir:",
    whatItOffersBullets: [
      'Banquet i cocktail amb llum natural fins ben entrada la tarda — sense necessitat de flash agressiu, sense la llum dura habitual dels banquets a interior',
      "Els retrats de parella sota el cristall són els nostres preferits d'aquest venue",
      'El jardí exterior dona una segona localització molt diferent per al cocktail — variarem entre interior i exterior per donar ritme al reportatge',
      'La cerimònia al jardí a primera hora de la tarda té una llum especialment afavoridora — recomanem programar-la entre les 17h i les 18h en temporada càlida',
    ],
    whyChooseIntro: 'Dos motius:',
    whyChoosePoints: [
      'Som dos germans amb dos formats. Un de nosaltres filma, l\'altre fotografia. La parella surt amb el dia documentat en foto i vídeo, sense coordinar dos equips separats.',
      "Coneixem l'espai. La llum de l'orangerie es comporta diferent al migdia, a la tarda, i amb dies ennuvolats. Saber-ho et permet estar al lloc correcte al moment correcte, sense improvisar.",
    ],
    faqs: [
      {
        question: "Coneixeu l'Orangerie Clos Barenys?",
        answer:
          "Sí. Hi vam fotografiar i filmar la boda de l'Elisabet i en Josep. Coneixem els espais interiors, el jardí i com canvia la llum al llarg del dia.",
      },
      {
        question: "Quina és la millor hora per a la cerimònia a l'Orangerie?",
        answer:
          "Entre les 17h i les 18h en mesos càlids (juny-setembre), i sobre les 16h al maig i octubre. És quan la llum del jardí queda més afavoridora i té contrast.",
      },
      {
        question: 'Quantes hores recomaneu per a una boda a Clos Barenys?',
        answer:
          "Per cobrir des dels preparatius fins al ball recomanem 10-12 hores. Si voleu només cerimònia i cocktail, 6-7 hores n'hi ha prou.",
      },
      {
        question: "Es pot fer la sessió de retrats sota el cristall de l'orangerie?",
        answer:
          'Sí, és un dels nostres racons preferits. Si plou no és cap problema — és coberta — i si fa sol, la llum filtrada és perfecta.',
      },
      {
        question: "Quant costa la cobertura de boda a l'Orangerie Clos Barenys?",
        answer:
          'Cada boda té un pressupost personalitzat segons la data, el pack i les necessitats. Us en passem un de concret en menys de 24h després d\'una conversa per WhatsApp.',
      },
    ],
    finalCtaH2: "La vostra boda mereix algú que ja conegui l'Orangerie",
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia. Sense compromís, sense formularis llargs — només una conversa per WhatsApp.",
  },

  // ─── Masia Can Martí ───────────────────────────────────────────────
  {
    slug: 'masia-can-marti',
    name: 'Masia Can Martí',
    region: 'Tarragona',
    realWeddingSlug: 'jennifer-albert-can-marti',
    realWeddingCouple: 'Jennifer & Albert',
    metaTitle: 'Fotògrafs de boda a Masia Can Martí | Lifetime',
    metaDescription:
      'Fotografia i vídeo documental de boda a Masia Can Martí, Tarragona. Veieu un reportatge real, parleu-nos pel WhatsApp. Resposta en 24h.',
    eyebrow: 'Reus · Tarragona · des de 2020',
    h1: 'Fotografia i vídeo de boda a Masia Can Martí',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera i càmera de vídeo. Hem documentat la boda de la Jennifer i l'Albert a Can Martí i sabem com es viu una boda en una masia catalana: la pedra, els espais oberts, l'energia diferent de cada moment del dia.",
    realWeddingIntro:
      "La Jennifer i l'Albert ens van confiar el seu dia. Cap pressa, cap posat forçat. Vam ser-hi des dels preparatius fins al ball. El reportatge que veureu és exactament el que captem: la complicitat amb la família, els racons de pedra de la masia, la llum del capvespre a l'era.",
    whatItOffersIntro:
      'Les masies catalanes tenen una cosa que els hotels de boda no tenen: caràcter. Cada paret de pedra, cada finestra petita, cada racó del pati interior té història. Això per a un fotògraf vol dir un reportatge que mai serà igual que un altre — i per a una parella vol dir un dia amb personalitat.',
    whatItOffersBullets: [
      'Els preparatius en una de les habitacions tradicionals — pedra, vigues de fusta, llum natural que entra per les finestres petites. Composicions impossibles en un hotel.',
      "La cerimònia al pati interior o a l'era — atmosfera íntima, acústica especial, sensació de complicitat",
      "Els retrats de parella entre les pedres i la vegetació — la barreja de textures dóna una varietat enorme d'imatges",
      'El banquet i el ball — l\'ambient de masia s\'amplifica de nit amb la il·luminació càlida',
    ],
    whyChooseIntro: 'Dos motius:',
    whyChoosePoints: [
      'Som dos germans amb dos formats. Un filma, l\'altre fotografia. La parella surt amb el dia complet en foto i vídeo, sense haver de coordinar dos equips externs.',
      'Treballem en documental. A les masies, els intents de "boda instagram" trenquen l\'autenticitat del lloc. Nosaltres us deixem viure el dia. La intervenció és mínima — el reportatge ressona amb la calidesa de l\'espai.',
    ],
    faqs: [
      {
        question: 'Coneixeu Masia Can Martí?',
        answer:
          "Sí. Hi vam fotografiar i filmar la boda de la Jennifer i l'Albert. Coneixem els racons, els temps i com es comporta la llum durant el dia.",
      },
      {
        question: 'Hi ha bona llum a Can Martí per als retrats?',
        answer:
          'Sí, però hi ha hores millors que d\'altres. El millor moment per als retrats de parella és l\'última hora abans del sopar — quan la llum es torna daurada i les pedres prenen color.',
      },
      {
        question: 'Quantes hores recomaneu per a una boda a Can Martí?',
        answer:
          'Per cobrir des dels preparatius fins al ball, 10-12 hores. Per només cerimònia i cocktail, 6-7 hores.',
      },
      {
        question: 'Es pot fer una sessió de "First Look" abans de la cerimònia?',
        answer:
          "Sí, ho recomanem si voleu un moment íntim només per a vosaltres abans de l'energia de la cerimònia. A Can Martí hi ha racons ideals per a aquest moment.",
      },
      {
        question: 'Quant costa la cobertura de boda a Masia Can Martí?',
        answer:
          'Cada boda té un pressupost personalitzat segons la data, el pack i les necessitats. Us en passem un de concret en menys de 24h després d\'una conversa per WhatsApp.',
      },
    ],
    finalCtaH2: 'La vostra boda mereix algú que ja conegui Can Martí',
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia. Sense compromís, sense formularis llargs — només una conversa per WhatsApp.",
  },

  // ─── Dosterras Wine Garden ─────────────────────────────────────────
  {
    slug: 'dosterras-wine-garden',
    name: 'Dosterras Wine Garden',
    region: 'Tarragona',
    realWeddingSlug: 'idoya-pau-dosterras',
    realWeddingCouple: 'Idoya & Pau',
    metaTitle: 'Fotògrafs de boda a Dosterras Wine Garden | Lifetime',
    metaDescription:
      'Fotografia i vídeo documental de boda a Dosterras Wine Garden, Tarragona. Veieu el reportatge real d\'una boda allà i parleu-nos pel WhatsApp.',
    eyebrow: 'Reus · Tarragona · des de 2020',
    h1: 'Fotografia i vídeo de boda a Dosterras Wine Garden',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera i càmera de vídeo. Hem documentat la boda de la Idoya i en Pau a Dosterras i sabem com es viu una boda en un wine garden: la barreja de vinya, sostre obert i atmosfera mediterrània.",
    realWeddingIntro:
      "La Idoya i en Pau ens van confiar el seu dia. Vam ser-hi des dels preparatius fins al ball. El que vam captar és el que veureu si decidiu treballar amb nosaltres: la naturalitat, l'energia que dóna casar-se entre vinyes, els moments de calma del cocktail al jardí.",
    whatItOffersIntro:
      "Dosterras té una identitat molt clara: és un wine garden, no un saló convencional. Això vol dir que la boda flueix d'una manera diferent — més oberta, més lluminosa, més vinculada al paisatge. Per a un fotògraf, això són les claus:",
    whatItOffersBullets: [
      'Els espais exteriors entre la vinya — exteriors únics per als retrats sense haver de moure els convidats',
      'La cerimònia a l\'aire lliure amb el camp de fons — un dels racons amb millor llum del Camp de Tarragona al capvespre',
      'El cocktail i el banquet enllacen sense desplaçament — l\'energia del dia no es trenca',
      'L\'ambient nocturn amb il·luminació càlida i el cel obert dóna una atmosfera cinematogràfica per al vídeo',
      'La temàtica vinícola permet detalls fotogràfics naturals — copes, ampolles, textures de fusta i pedra',
    ],
    whyChooseIntro: 'Dos motius:',
    whyChoosePoints: [
      "Som dos germans amb dos formats. Un de nosaltres filma, l'altre fotografia. La parella surt amb el dia complet en foto i vídeo, sense haver de coordinar dos equips externs.",
      "Coneixem Dosterras i la seva atmosfera. Sabem on i quan està la millor llum, on fer els retrats sense interrompre el flux del dia, com aprofitar les transicions cap a la nit.",
    ],
    faqs: [
      {
        question: 'Coneixeu Dosterras Wine Garden?',
        answer:
          "Sí. Hi vam fotografiar i filmar la boda de la Idoya i en Pau. Coneixem els espais, els racons amb millor llum i el ritme natural d'una boda en aquest wine garden.",
      },
      {
        question: 'Quina és la millor hora per a la cerimònia a Dosterras?',
        answer:
          'Entre les 18h i les 19h en mesos càlids. La llum del capvespre sobre la vinya és el moment estrella, especialment al juny-setembre.',
      },
      {
        question: 'Quantes hores recomaneu per a una boda a Dosterras?',
        answer:
          'Per cobrir des dels preparatius fins al ball, 10-12 hores. Per a només cerimònia i cocktail, 6-7 hores.',
      },
      {
        question: 'Es pot fer la cerimònia a la mateixa finca?',
        answer:
          "Sí, i és el que recomanem. Dosterras té espais exteriors preciosos per a una cerimònia civil al capvespre, sense haver de desplaçar els convidats per al banquet. És la fluïdesa que defineix bé el dia.",
      },
      {
        question: 'Quant costa la cobertura de boda a Dosterras Wine Garden?',
        answer:
          'Cada boda té un pressupost personalitzat segons la data, el pack i les necessitats. Us en passem un de concret en menys de 24h després d\'una conversa per WhatsApp.',
      },
    ],
    finalCtaH2: 'La vostra boda mereix algú que ja conegui Dosterras',
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia. Sense compromís, sense formularis llargs — només una conversa per WhatsApp.",
  },

  // ─── Masia San Antonio ─────────────────────────────────────────────
  {
    slug: 'masia-san-antonio',
    name: 'Masia San Antonio',
    region: 'Tarragona · Penedès',
    realWeddingSlug: 'elena-jordi-masia-san-antonio',
    realWeddingCouple: 'Elena & Jordi',
    realWeddingSeason: "estiu del 2025",
    extraResource: {
      label: "Veure el tràiler complet d'Elena i Jordi",
      href: '/videos',
    },
    metaTitle: 'Fotògrafs de boda a Masia San Antonio',
    metaDescription:
      'Fotografia i vídeo documental de boda a Masia San Antonio, Tarragona. Veieu el reportatge i el tràiler reals. WhatsApp directe.',
    eyebrow: 'Tarragona · Penedès · des de 2020',
    h1: 'Fotografia i vídeo de boda a Masia San Antonio',
    subtitle:
      "Som l'Eric i en Ferran, dos germans amb càmera i càmera de vídeo. Hem documentat la boda de l'Elena i en Jordi a Masia San Antonio i tenim publicat el tràiler complet del seu dia. Coneixem l'energia del lloc: la masia, els espais oberts, la llum del Penedès al capvespre.",
    realWeddingIntro:
      "L'Elena i en Jordi van triar Masia San Antonio perquè volien una boda sense haver de moure els convidats: cerimònia, cocktail, banquet i ball, tot al mateix lloc. Vam ser-hi des dels preparatius fins al ball. Quan acabeu de veure aquest reportatge, mireu també el tràiler complet a /videos — és el que el vídeo pot fer per la vostra boda.",
    whatItOffersIntro:
      'Masia San Antonio és el venue ideal per a parelles que volen un sol lloc per a tot el dia. Ni desplaçaments de convidats entre cerimònia i banquet, ni perdre invitats pel camí, ni perdre temps. Tot el dia flueix en el mateix espai.',
    whatItOffersBullets: [
      'La cerimònia es pot fer a l\'exterior amb el camp com a fons — un dels racons amb millor llum del Penedès al capvespre',
      'Els preparatius en habitacions de la masia mateixa — pedra, fusta, llum natural per les finestres. Composicions impossibles a un hotel',
      "El cocktail i el banquet enllacen sense desplaçament — l'energia del dia no es trenca",
      'El ball a l\'era amb il·luminació càlida i el cel obert té una atmosfera cinematogràfica',
      'Els retrats de parella es poden fer entre vinya, camp i espais interiors — una varietat enorme en pocs metres',
    ],
    whyChooseIntro: 'Dos motius:',
    whyChoosePoints: [
      "Som dos germans amb dos formats. Un filma, l'altre fotografia. Sortireu amb un reportatge complet en foto i un tràiler que us emocionarà cada vegada que el mireu.",
      "Coneixem la zona. Masia San Antonio entra dins la nostra zona de cobertura habitual — això vol dir que podem dedicar més temps al vostre dia sense pressa.",
    ],
    faqs: [
      {
        question: 'Coneixeu Masia San Antonio?',
        answer:
          "Sí. Hi vam fotografiar i filmar la boda de l'Elena i en Jordi l'estiu del 2025 — el tràiler està publicat a la nostra pàgina de vídeos i podeu veure el reportatge complet més amunt.",
      },
      {
        question: 'Cobriu Masia San Antonio sense recàrrec de desplaçament?',
        answer:
          'Sí. Treballem tota la zona de Tarragona i el Penedès sense costos addicionals. Masia San Antonio entra en aquesta zona.',
      },
      {
        question: 'Es pot fer la cerimònia a la mateixa masia?',
        answer:
          "Sí, i és el que recomanem. La masia té espais exteriors preciosos per a una cerimònia civil al capvespre, sense haver de desplaçar els convidats per al banquet. És la fluïdesa que defineix bé el dia.",
      },
      {
        question: 'Quina és la millor hora per a la cerimònia al Penedès en estiu?',
        answer:
          "Idealment entre les 18h i les 19h al juliol-agost. La llum del capvespre sobre el camp és el moment estrella — no us el voleu perdre.",
      },
      {
        question: 'Quantes hores recomaneu per a una boda a Masia San Antonio?',
        answer:
          '10-12 hores per cobrir des dels preparatius fins al ball. Per a només cerimònia i cocktail, 6-7 hores.',
      },
      {
        question: 'Quant costa la cobertura de boda a Masia San Antonio?',
        answer:
          'Cada boda té un pressupost personalitzat segons la data, el pack i les necessitats. Us en passem un de concret en menys de 24h després d\'una conversa per WhatsApp.',
      },
    ],
    finalCtaH2: 'La vostra boda mereix algú que ja conegui Masia San Antonio',
    finalCtaBody:
      "Mireu si tenim la vostra data lliure. Resposta en menys d'un dia. Sense compromís, sense formularis llargs — només una conversa per WhatsApp.",
  },
];

/** Find a venue by slug, or null if not registered. */
export function venueBySlug(slug: string): Venue | null {
  return VENUES.find((v) => v.slug === slug) ?? null;
}
