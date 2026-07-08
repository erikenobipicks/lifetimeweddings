import type { CityPillarCopy } from './types';
import type { Lang } from '~/i18n/ui';

// Pillar copy for the two city clusters:
//  - PHOTO_PILLAR  -> /fotograf-boda-tarragona-lleida
//  - VIDEO_PILLAR  -> /videograf-boda-tarragona-lleida
// Each links out to every city child of its service and cross-links to the
// sister cluster (foto <-> vídeo).

export const PHOTO_PILLAR: Record<Lang, CityPillarCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Tarragona i Lleida | Lifetime Weddings',
      description:
        'Fotògrafs de boda a Tarragona i Lleida. Dos germans amb base a Reus, foto documental sense pressa i sense recàrrec de desplaçament per tota la zona.',
    },
    hero: {
      eyebrow: 'Fotografia de boda · Tarragona i Lleida',
      h1: 'Fotògraf de boda a Tarragona i Lleida',
      sub: 'Som l’Eric i en Ferran, dos germans amb base a Reus. Fotografia documental de boda per tot el Camp de Tarragona, la Costa Daurada i les Terres de Lleida.',
      heroAlt: 'Fotografia documental de boda a Tarragona per Lifetime Weddings',
    },
    intro: {
      title: 'La vostra boda, allà on us caseu',
      paras: [
        'Fa anys que documentem bodes per tota la província de Tarragona i les Terres de Lleida. Coneixem les masies, els pobles, la llum de cada hora i com es mou una boda a cada lloc.',
        'Trieu la vostra ciutat i us expliquem com hi treballem: els racons, els millors moments de llum i el que fa especial casar-s’hi.',
      ],
    },
    why: {
      title: 'Per què un fotògraf local',
      intro: 'Tres motius pràctics:',
      bullets: [
        '**Coneixem el terreny** — sabem on i quan hi ha la millor llum a cada poble i finca.',
        '**Sense recàrrec de desplaçament** a tota la zona: la nostra base és Reus.',
        '**Foto i vídeo en un sol equip** — dos germans coordinats, sense fer-vos repetir res.',
      ],
    },
    childrenTitle: 'Trieu la vostra ciutat',
    childrenIntro: 'Una pàgina per ciutat, amb els llocs concrets on fem el reportatge i l’estil de la zona.',
    process: {
      title: 'Com treballem',
      bullets: [
        'Reportatge documental: us seguim el dia sense dirigir-lo.',
        'Galeria privada online amb totes les fotos editades, **en una setmana**.',
        'Opció de **foto + vídeo** amb els dos germans, un sol equip.',
        'Ens movem per tot Tarragona i Lleida sense recàrrec.',
      ],
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      { q: 'Cobriu tota la província?', a: 'Sí: tot el Camp de Tarragona, la Costa Daurada, la Conca de Barberà, les Terres de l’Ebre i les Terres de Lleida. Base a Reus, sense recàrrec a la zona.' },
      { q: 'Feu foto i vídeo alhora?', a: 'Sí. Som dos germans: un a la foto, l’altre al vídeo. Un sol equip coordinat.' },
      { q: 'Quan rebem les fotos?', a: 'La galeria completa editada en una setmana.' },
    ],
    finalCta: { h2: 'Ens expliquem la vostra boda?', body: 'Digueu-nos on us caseu i mirem dates. Sense compromís.' },
    formTitle: 'Consulteu disponibilitat',
    formIntro: 'Quatre dades i us responem amb disponibilitat i pressupost real.',
    whatsAppMessage: 'Hola! Ens casem a Tarragona/Lleida i busquem fotògraf. En parlem?',
    breadcrumbCurrent: 'Fotògraf de boda a Tarragona i Lleida',
  },
  es: {
    meta: {
      title: 'Fotógrafo de boda en Tarragona y Lleida | Lifetime Weddings',
      description:
        'Fotógrafos de boda en Tarragona y Lleida. Dos hermanos con base en Reus, foto documental sin prisas y sin recargo de desplazamiento por toda la zona.',
    },
    hero: {
      eyebrow: 'Fotografía de boda · Tarragona y Lleida',
      h1: 'Fotógrafo de boda en Tarragona y Lleida',
      sub: 'Somos Eric y Ferran, dos hermanos con base en Reus. Fotografía documental de boda por todo el Camp de Tarragona, la Costa Daurada y las Tierras de Lleida.',
      heroAlt: 'Fotografía documental de boda en Tarragona por Lifetime Weddings',
    },
    intro: {
      title: 'Vuestra boda, donde os caséis',
      paras: [
        'Llevamos años documentando bodas por toda la provincia de Tarragona y las Tierras de Lleida. Conocemos las masías, los pueblos, la luz de cada hora y cómo se mueve una boda en cada lugar.',
        'Elegid vuestra ciudad y os contamos cómo trabajamos allí: los rincones, los mejores momentos de luz y lo que hace especial casarse en ella.',
      ],
    },
    why: {
      title: 'Por qué un fotógrafo local',
      intro: 'Tres motivos prácticos:',
      bullets: [
        '**Conocemos el terreno** — sabemos dónde y cuándo hay la mejor luz en cada pueblo y finca.',
        '**Sin recargo de desplazamiento** en toda la zona: nuestra base es Reus.',
        '**Foto y vídeo en un solo equipo** — dos hermanos coordinados, sin haceros repetir nada.',
      ],
    },
    childrenTitle: 'Elegid vuestra ciudad',
    childrenIntro: 'Una página por ciudad, con los lugares concretos donde hacemos el reportaje y el estilo de la zona.',
    process: {
      title: 'Cómo trabajamos',
      bullets: [
        'Reportaje documental: os seguimos el día sin dirigirlo.',
        'Galería privada online con todas las fotos editadas, **en una semana**.',
        'Opción de **foto + vídeo** con los dos hermanos, un solo equipo.',
        'Nos movemos por todo Tarragona y Lleida sin recargo.',
      ],
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cubrís toda la provincia?', a: 'Sí: todo el Camp de Tarragona, la Costa Daurada, la Conca de Barberà, las Tierras del Ebro y las Tierras de Lleida. Base en Reus, sin recargo en la zona.' },
      { q: '¿Hacéis foto y vídeo a la vez?', a: 'Sí. Somos dos hermanos: uno en la foto, el otro en el vídeo. Un solo equipo coordinado.' },
      { q: '¿Cuándo recibimos las fotos?', a: 'La galería completa editada en una semana.' },
    ],
    finalCta: { h2: '¿Nos contáis vuestra boda?', body: 'Decidnos dónde os caséis y miramos fechas. Sin compromiso.' },
    formTitle: 'Consultad disponibilidad',
    formIntro: 'Cuatro datos y os respondemos con disponibilidad y presupuesto real.',
    whatsAppMessage: '¡Hola! Nos casamos en Tarragona/Lleida y buscamos fotógrafo. ¿Hablamos?',
    breadcrumbCurrent: 'Fotógrafo de boda en Tarragona y Lleida',
  },
  en: {
    meta: {
      title: 'Wedding photographer in Tarragona & Lleida | Lifetime Weddings',
      description:
        'Wedding photographers in Tarragona and Lleida. Two brothers based in Reus — unhurried documentary photography with no travel surcharge across the region.',
    },
    hero: {
      eyebrow: 'Wedding photography · Tarragona & Lleida',
      h1: 'Wedding photographer in Tarragona & Lleida',
      sub: 'We are Eric and Ferran, two brothers based in Reus. Documentary wedding photography across the Camp de Tarragona, the Costa Daurada and the Lleida region.',
      heroAlt: 'Documentary wedding photography in Tarragona by Lifetime Weddings',
    },
    intro: {
      title: 'Your wedding, wherever you marry',
      paras: [
        'We have spent years documenting weddings across the whole province of Tarragona and the Lleida region. We know the country houses, the towns, the light at every hour and how a wedding moves in each place.',
        'Choose your town and we’ll tell you how we work there: the spots, the best light and what makes marrying there special.',
      ],
    },
    why: {
      title: 'Why a local photographer',
      intro: 'Three practical reasons:',
      bullets: [
        '**We know the ground** — where and when the best light falls in each town and estate.',
        '**No travel surcharge** across the whole region: our base is Reus.',
        '**Photo and video, one team** — two coordinated brothers, without making you repeat anything.',
      ],
    },
    childrenTitle: 'Choose your town',
    childrenIntro: 'One page per town, with the concrete places we shoot and the style of the area.',
    process: {
      title: 'How we work',
      bullets: [
        'Documentary coverage: we follow your day without directing it.',
        'Private online gallery with every edited photo, **within a week**.',
        'Optional **photo + video** with both brothers, one team.',
        'We travel across all of Tarragona and Lleida with no surcharge.',
      ],
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Do you cover the whole province?', a: 'Yes: the entire Camp de Tarragona, the Costa Daurada, the Conca de Barberà, the Ebro lands and the Lleida region. Based in Reus, no surcharge in the area.' },
      { q: 'Do you shoot photo and video together?', a: 'Yes. We are two brothers: one on photo, the other on video. One coordinated team.' },
      { q: 'When do we get the photos?', a: 'The full edited gallery within a week.' },
    ],
    finalCta: { h2: 'Tell us about your wedding?', body: 'Tell us where you’re marrying and we’ll check dates. No commitment.' },
    formTitle: 'Check availability',
    formIntro: 'A few details and we reply with availability and a real quote.',
    whatsAppMessage: 'Hi! We’re getting married in Tarragona/Lleida and are looking for a photographer. Can we chat?',
    breadcrumbCurrent: 'Wedding photographer in Tarragona & Lleida',
  },
};

export const VIDEO_PILLAR: Record<Lang, CityPillarCopy> = {
  ca: {
    meta: {
      title: 'Vídeo de boda a Tarragona i Lleida | Lifetime Weddings',
      description:
        'Vídeo de boda a Tarragona i Lleida. Films de boda amb el so real del dia, per dos germans amb base a Reus. Sense recàrrec de desplaçament per tota la zona.',
    },
    hero: {
      eyebrow: 'Vídeo de boda · Tarragona i Lleida',
      h1: 'Vídeo de boda a Tarragona i Lleida',
      sub: 'Films de boda que us tornen el so i el moviment del dia. Dos germans amb base a Reus, per tot el Camp de Tarragona, la Costa Daurada i les Terres de Lleida.',
      heroAlt: 'Vídeo de boda a Tarragona per Lifetime Weddings',
    },
    intro: {
      title: 'La vostra boda, com una pel·lícula',
      paras: [
        'Un vídeo no és només imatge: és la vostra veu als vots, el riure, el silenci abans del sí. Fa anys que filmem bodes per tota la província de Tarragona i les Terres de Lleida.',
        'Trieu la vostra ciutat i us expliquem com hi filmem: els plans, la llum i el que fa especial casar-s’hi.',
      ],
    },
    why: {
      title: 'Per què un videògraf local',
      intro: 'Tres motius pràctics:',
      bullets: [
        '**Coneixem el terreny** — sabem els millors plans i la llum de cada finca i poble.',
        '**Sense recàrrec de desplaçament** a tota la zona: base a Reus.',
        '**Foto i vídeo en un sol equip** — dos germans coordinats.',
      ],
    },
    childrenTitle: 'Trieu la vostra ciutat',
    childrenIntro: 'Una pàgina per ciutat, amb els llocs on filmem i l’estil cinematogràfic de la zona.',
    process: {
      title: 'Com treballem',
      bullets: [
        'Film documental amb el so real del dia (vots, discursos, ambient).',
        'Tràiler curt + film complet editats com una pel·lícula.',
        'Opció de **foto + vídeo** amb els dos germans, un sol equip.',
        'Dron on està permès; ens movem per tot Tarragona i Lleida.',
      ],
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      { q: 'Què inclou el vídeo?', a: 'Un tràiler curt i un film més llarg amb el so real del dia. Us ho lliurem en línia en alta qualitat.' },
      { q: 'Feu foto i vídeo alhora?', a: 'Sí. Som dos germans: un a la foto, l’altre al vídeo. Un sol equip coordinat.' },
      { q: 'Cobriu tota la província?', a: 'Sí, tot Tarragona i Lleida. Base a Reus, sense recàrrec a la zona.' },
    ],
    finalCta: { h2: 'Ens expliquem la vostra boda?', body: 'Digueu-nos on us caseu i mirem dates. Sense compromís.' },
    formTitle: 'Consulteu disponibilitat',
    formIntro: 'Quatre dades i us responem amb disponibilitat i pressupost real.',
    whatsAppMessage: 'Hola! Ens casem a Tarragona/Lleida i busquem videògraf. En parlem?',
    breadcrumbCurrent: 'Vídeo de boda a Tarragona i Lleida',
  },
  es: {
    meta: {
      title: 'Vídeo de boda en Tarragona y Lleida | Lifetime Weddings',
      description:
        'Vídeo de boda en Tarragona y Lleida. Películas de boda con el sonido real del día, por dos hermanos con base en Reus. Sin recargo de desplazamiento por la zona.',
    },
    hero: {
      eyebrow: 'Vídeo de boda · Tarragona y Lleida',
      h1: 'Vídeo de boda en Tarragona y Lleida',
      sub: 'Películas de boda que os devuelven el sonido y el movimiento del día. Dos hermanos con base en Reus, por todo el Camp de Tarragona, la Costa Daurada y las Tierras de Lleida.',
      heroAlt: 'Vídeo de boda en Tarragona por Lifetime Weddings',
    },
    intro: {
      title: 'Vuestra boda, como una película',
      paras: [
        'Un vídeo no es solo imagen: es vuestra voz en los votos, la risa, el silencio antes del sí. Llevamos años filmando bodas por toda la provincia de Tarragona y las Tierras de Lleida.',
        'Elegid vuestra ciudad y os contamos cómo filmamos allí: los planos, la luz y lo que hace especial casarse en ella.',
      ],
    },
    why: {
      title: 'Por qué un videógrafo local',
      intro: 'Tres motivos prácticos:',
      bullets: [
        '**Conocemos el terreno** — los mejores planos y la luz de cada finca y pueblo.',
        '**Sin recargo de desplazamiento** en toda la zona: base en Reus.',
        '**Foto y vídeo en un solo equipo** — dos hermanos coordinados.',
      ],
    },
    childrenTitle: 'Elegid vuestra ciudad',
    childrenIntro: 'Una página por ciudad, con los lugares donde filmamos y el estilo cinematográfico de la zona.',
    process: {
      title: 'Cómo trabajamos',
      bullets: [
        'Película documental con el sonido real del día (votos, discursos, ambiente).',
        'Tráiler corto + película completa editados como un film.',
        'Opción de **foto + vídeo** con los dos hermanos, un solo equipo.',
        'Dron donde está permitido; nos movemos por todo Tarragona y Lleida.',
      ],
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Qué incluye el vídeo?', a: 'Un tráiler corto y una película más larga con el sonido real del día. Se entrega online en alta calidad.' },
      { q: '¿Hacéis foto y vídeo a la vez?', a: 'Sí. Somos dos hermanos: uno en la foto, el otro en el vídeo. Un solo equipo coordinado.' },
      { q: '¿Cubrís toda la provincia?', a: 'Sí, todo Tarragona y Lleida. Base en Reus, sin recargo en la zona.' },
    ],
    finalCta: { h2: '¿Nos contáis vuestra boda?', body: 'Decidnos dónde os caséis y miramos fechas. Sin compromiso.' },
    formTitle: 'Consultad disponibilidad',
    formIntro: 'Cuatro datos y os respondemos con disponibilidad y presupuesto real.',
    whatsAppMessage: '¡Hola! Nos casamos en Tarragona/Lleida y buscamos videógrafo. ¿Hablamos?',
    breadcrumbCurrent: 'Vídeo de boda en Tarragona y Lleida',
  },
  en: {
    meta: {
      title: 'Wedding videographer in Tarragona & Lleida | Lifetime Weddings',
      description:
        'Wedding video in Tarragona and Lleida. Wedding films with the real sound of the day, by two brothers based in Reus. No travel surcharge across the region.',
    },
    hero: {
      eyebrow: 'Wedding video · Tarragona & Lleida',
      h1: 'Wedding videographer in Tarragona & Lleida',
      sub: 'Wedding films that give you back the sound and movement of the day. Two brothers based in Reus, across the Camp de Tarragona, the Costa Daurada and the Lleida region.',
      heroAlt: 'Wedding video in Tarragona by Lifetime Weddings',
    },
    intro: {
      title: 'Your wedding, like a film',
      paras: [
        'A film is not just image: it’s your voice in the vows, the laughter, the silence before the "yes". We’ve spent years filming weddings across the whole province of Tarragona and the Lleida region.',
        'Choose your town and we’ll tell you how we film there: the shots, the light and what makes marrying there special.',
      ],
    },
    why: {
      title: 'Why a local videographer',
      intro: 'Three practical reasons:',
      bullets: [
        '**We know the ground** — the best shots and light of each estate and town.',
        '**No travel surcharge** across the whole region: based in Reus.',
        '**Photo and video, one team** — two coordinated brothers.',
      ],
    },
    childrenTitle: 'Choose your town',
    childrenIntro: 'One page per town, with the places we film and the cinematic style of the area.',
    process: {
      title: 'How we work',
      bullets: [
        'Documentary film with the real sound of the day (vows, speeches, atmosphere).',
        'Short trailer + full film edited like a movie.',
        'Optional **photo + video** with both brothers, one team.',
        'Drone where permitted; we travel across all of Tarragona and Lleida.',
      ],
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'What does the video include?', a: 'A short trailer and a longer film with the real sound of the day. Delivered online in high quality.' },
      { q: 'Do you shoot photo and video together?', a: 'Yes. We are two brothers: one on photo, the other on video. One coordinated team.' },
      { q: 'Do you cover the whole province?', a: 'Yes, all of Tarragona and Lleida. Based in Reus, no surcharge in the area.' },
    ],
    finalCta: { h2: 'Tell us about your wedding?', body: 'Tell us where you’re marrying and we’ll check dates. No commitment.' },
    formTitle: 'Check availability',
    formIntro: 'A few details and we reply with availability and a real quote.',
    whatsAppMessage: 'Hi! We’re getting married in Tarragona/Lleida and are looking for a videographer. Can we chat?',
    breadcrumbCurrent: 'Wedding videographer in Tarragona & Lleida',
  },
};
