// Cambrils — PHOTO service copy (ca / es / en).
//
// Lifetime Weddings: two brothers from Reus, minutes from Cambrils. Ferran
// shoots the photography, Eric films. This block is the trilingual PHOTO copy
// for the Cambrils city page (/fotograf-boda-cambrils). It cross-references the
// video cluster (/videograf-boda-cambrils) once, per house style.

import type { Lang } from '~/i18n/ui';
import type { CityServiceCopy } from './types';

export const CAMBRILS_PHOTO: Record<Lang, CityServiceCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Cambrils | Lifetime Weddings',
      description:
        'Fotògraf de boda a Cambrils, a la Costa Daurada. Llum de mar, retrats al Parc Samà i la textura del port pesquer. Som de Reus, a deu minuts. Mirem-ho junts.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Baix Camp',
      h1: 'Fotògraf de boda a Cambrils',
      sub: 'Retrats amb llum de mar, els jardins del Parc Samà i el batec del port. Som germans de Reus, a deu minuts de Cambrils, i coneixem cada racó a l\'hora bona.',
      heroAlt: 'Parella el dia de la seva boda amb llum daurada de tarda vora el mar',
    },
    cardTitle: 'Fotografia de boda a Cambrils',
    cardBlurb:
      'Llum de Mediterrani, jardins històrics i port pesquer. Un fotògraf de casa que sap on i quan cau la millor llum a Cambrils.',
    intro: {
      title: 'Cambrils, tal com la fotografiem nosaltres',
      paras: [
        `Cambrils no és un decorat de postal: és una vila de mar viva, amb un port pesquer que encara treballa, uns jardins d\'una altra època i una llum que canvia cada hora. Som en **Ferran** i l\'**Eric**, dos germans de Reus, a deu minuts amunt. Hem crescut baixant a aquestes platges i coneixem Cambrils com a gent de casa, no com a visitants.`,
        `Com a **fotògraf de boda a Cambrils**, la meva feina —en Ferran a la càmera— és mirar el dia amb calma i quedar-me amb el que és de veritat: la mà del teu pare al primer ball, la rialla que se t\'escapa, la llum sobre l\'aigua abans de sopar. No dirigeixo una sessió de moda; acompanyo una boda.`,
        `Aquesta pàgina és sobre **fotografia**. Si busques també el moviment i el so del mar en vídeo, l\'Eric ho explica a **[vídeo de boda a Cambrils](/videograf-boda-cambrils)**. Moltes bodes les cobrim tots dos, colze a colze, sense trepitjar-nos.`,
      ],
    },
    spots: {
      title: 'Els llocs que fem servir a Cambrils',
      intro:
        'Sis racons que coneixem de memòria, cadascun amb l\'hora on dona el millor. No són parades turístiques: són llocs on la fotografia respira.',
      items: [
        {
          name: 'Parc Samà',
          body: 'Jardins colonials del segle XIX amb llac i palmeres, un dels espais de boda més bonics del Baix Camp. És privat i es reserva; per a retrats de parella no té rival, amb la llum filtrada entre les palmeres.',
        },
        {
          name: 'El port pesquer',
          body: 'On Cambrils batega de veritat: xarxes, buscs de colors i reflexos a l\'aigua. Hi busco textura i veritat, un retrat amb olor de mar i història de vila.',
        },
        {
          name: 'El passeig marítim i les platges',
          body: 'Sorra fina i daurada i un horitzó net. A primera hora o a la posta la platja es buida i queda tota per a vosaltres: passes descalços i el Mediterrani de fons.',
        },
        {
          name: 'La Torre de l\'Ereta i el nucli antic',
          body: 'Pedra vella i carrerons amb caràcter, lluny del brogit del passeig. Perfecte per a retrats íntims amb un fons que explica els segles de Cambrils.',
        },
        {
          name: 'Cap de Salou i les cales',
          body: 'A tocar de Cambrils, pins que baixen fins a l\'aigua i cales de roca amagades. Un desviament de deu minuts per a mar salvatge i intimitat total.',
        },
        {
          name: 'Les masies del Baix Camp',
          body: 'Terra endins, entre vinyes i avellaners, les masies de pedra donen una alternativa càlida al mar: llum de finestra i el silenci del camp.',
        },
      ],
    },
    style: {
      title: 'La llum i l\'ambient de Cambrils',
      paras: [
        `Cambrils té una llum de mar generosa. Al matí és clara i fresca; a l\'**hora bona** abans de la posta ho pinta tot d\'or vell. Saber-ho és la diferència entre una foto correcta i una que et fa un nus a la gola deu anys després.`,
        `L\'ambient és relaxat, mediterrani, de vila de pescadors que sap acollir. Aquesta calma es cola a les fotos: la gent està còmoda, riu, s\'oblida de la càmera. Jo treballo així, sense poses impostades, quedant-me amb el que val.`,
      ],
    },
    approach: {
      title: 'Com fotografio una boda a Cambrils',
      bullets: [
        '**Documental, amb ànima:** t\'acompanyo tot el dia sense dirigir-ho tot. Els millors moments passen sols.',
        '**Retrats amb la llum de casa:** planifico la sessió de parella a l\'hora daurada, al Parc Samà, al port o a la platja.',
        '**Discret a la cerimònia:** teleobjectiu, silenci i respecte. Les llàgrimes són vostres, no meves.',
        '**Coneixement local real:** sé on aparcar, on cau l\'ombra al migdia i a quina hora es buida cada platja.',
        '**Entrega cuidada:** galeria privada amb totes les fotos editades a mà, una a una, mai per lots.',
      ],
    },
    gallery: {
      title: 'Feina real, no muntatges',
      intro:
        'Aquestes imatges són de la nostra feina real de boda. Quan encara no tenim una galeria sencera a Cambrils ho diem clar i et mostrem treball autèntic d\'altres bodes de la Costa Daurada.',
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Es pot fer la sessió de parella al Parc Samà?',
        a: 'Sí, però el Parc Samà és un espai privat que es reserva a part. T\'ajudem amb els tràmits i quadrem l\'hora amb la llum. Si no entra al vostre pla, el port i les platges donen retrats igual de bonics sense reserva.',
      },
      {
        q: 'Sou de Cambrils?',
        a: 'Som de Reus, a deu minuts, i hi treballem des de sempre. Coneixem la vila, la seva llum i la seva gent com a gent de casa, no com a fotògrafs que hi passen un dia.',
      },
      {
        q: 'Quantes fotos rebem i quan?',
        a: 'Reps totes les imatges bones del dia, editades a mà en una galeria privada. El nombre depèn de les hores de cobertura; la selecció es fa per qualitat. L\'entrega sol ser en poques setmanes.',
      },
      {
        q: 'Podem contractar foto i vídeo alhora?',
        a: 'És el que més recomanem. En Ferran fa la foto i l\'Eric el **[vídeo de boda a Cambrils](/videograf-boda-cambrils)**; ens coneixem tant que treballem sense trepitjar-nos, amb un únic relat del vostre dia.',
      },
      {
        q: 'Es pot volar dron a les platges de Cambrils?',
        a: 'Depèn de la zona i del permís; ho gestiona l\'Eric per a la part de vídeo, sempre dins de la normativa. Per a fotografia no cal: la llum de mar i els jardins ja donen tot el que necessitem.',
      },
    ],
    finalCta: {
      h2: 'Fem la vostra boda a Cambrils',
      body: 'Expliqueu-nos la vostra data i el vostre lloc. Us direm amb sinceritat com aprofitaríem la llum de Cambrils per a vosaltres, sense compromís.',
    },
    formTitle: 'Parlem de la vostra boda a Cambrils',
    formIntro:
      'Deixeu-nos la data, el lloc i quatre paraules de com us imagineu el dia. Us responem aviat, sempre nosaltres dos.',
    whatsAppMessage:
      'Hola Ferran! Ens casem a Cambrils i ens agradaria informació de fotografia de boda.',
    breadcrumbCurrent: 'Fotògraf de boda a Cambrils',
  },

  es: {
    meta: {
      title: 'Fotógrafo de boda en Cambrils | Lifetime Weddings',
      description:
        'Fotógrafo de boda en Cambrils, en la Costa Daurada. Luz de mar, retratos en el Parc Samà y la textura del puerto pesquero. Somos de Reus, a diez minutos.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Baix Camp',
      h1: 'Fotógrafo de boda en Cambrils',
      sub: 'Retratos con luz de mar, los jardines del Parc Samà y el pulso del puerto. Somos hermanos de Reus, a diez minutos de Cambrils, y conocemos cada rincón a la hora buena.',
      heroAlt: 'Pareja el día de su boda con luz dorada de tarde junto al mar',
    },
    cardTitle: 'Fotografía de boda en Cambrils',
    cardBlurb:
      'Luz de Mediterráneo, jardines históricos y puerto pesquero. Un fotógrafo de casa que sabe dónde y cuándo cae la mejor luz en Cambrils.',
    intro: {
      title: 'Cambrils, tal y como la fotografiamos nosotros',
      paras: [
        `Cambrils no es un decorado de postal: es un pueblo de mar vivo, con un puerto pesquero que aún trabaja, unos jardines de otra época y una luz que cambia cada hora. Somos **Ferran** y **Eric**, dos hermanos de Reus, a diez minutos subiendo. Hemos crecido bajando a estas playas y conocemos Cambrils como gente de casa, no como visitantes.`,
        `Como **fotógrafo de boda en Cambrils**, mi trabajo —Ferran a la cámara— es mirar el día con calma y quedarme con lo verdadero: la mano de tu padre en el primer baile, la risa que se te escapa, la luz sobre el agua antes de la cena. No dirijo una sesión de moda; acompaño una boda.`,
        `Esta página va de **fotografía**. Si buscas también el movimiento y el sonido del mar en vídeo, Eric lo cuenta en **[vídeo de boda en Cambrils](/videograf-boda-cambrils)**. Muchas bodas las cubrimos los dos, codo con codo, sin pisarnos.`,
      ],
    },
    spots: {
      title: 'Los lugares que usamos en Cambrils',
      intro:
        'Seis rincones que conocemos de memoria, cada uno con la hora en la que da lo mejor. No son paradas turísticas: son sitios donde la fotografía respira.',
      items: [
        {
          name: 'Parc Samà',
          body: 'Jardines coloniales del siglo XIX con lago y palmeras, uno de los espacios de boda más bonitos del Baix Camp. Es privado y se reserva; para retratos de pareja no tiene rival, con la luz filtrada entre las palmeras.',
        },
        {
          name: 'El puerto pesquero',
          body: 'Donde Cambrils late de verdad: redes, barcas de colores y reflejos en el agua. Aquí busco textura y verdad, un retrato con olor a mar e historia de pueblo.',
        },
        {
          name: 'El paseo marítimo y las playas',
          body: 'Arena fina y dorada y un horizonte limpio. A primera hora o al atardecer la playa se vacía y queda entera para vosotros: pasos descalzos y el Mediterráneo de fondo.',
        },
        {
          name: 'La Torre de l\'Ereta y el casco antiguo',
          body: 'Piedra vieja y callejones con carácter, lejos del bullicio del paseo. Perfecto para retratos íntimos con un fondo que cuenta los siglos de Cambrils.',
        },
        {
          name: 'Cap de Salou y las calas',
          body: 'Pegado a Cambrils, pinos que bajan hasta el agua y calas de roca escondidas. Un desvío de diez minutos para mar salvaje e intimidad total.',
        },
        {
          name: 'Las masías del Baix Camp',
          body: 'Tierra adentro, entre viñas y avellanos, las masías de piedra dan una alternativa cálida al mar: luz de ventana y el silencio del campo.',
        },
      ],
    },
    style: {
      title: 'La luz y el ambiente de Cambrils',
      paras: [
        `Cambrils tiene una luz de mar generosa. Por la mañana es clara y fresca; en la **hora buena** antes del ocaso lo pinta todo de oro viejo. Saberlo es la diferencia entre una foto correcta y una que te hace un nudo en la garganta diez años después.`,
        `El ambiente es relajado, mediterráneo, de pueblo pesquero que sabe acoger. Esa calma se cuela en las fotos: la gente está cómoda, ríe, se olvida de la cámara. Yo trabajo así, sin poses impostadas, quedándome con lo que vale.`,
      ],
    },
    approach: {
      title: 'Cómo fotografío una boda en Cambrils',
      bullets: [
        '**Documental, con alma:** te acompaño todo el día sin dirigirlo todo. Los mejores momentos pasan solos.',
        '**Retratos con la luz de casa:** planifico la sesión de pareja a la hora dorada, en el Parc Samà, el puerto o la playa.',
        '**Discreto en la ceremonia:** teleobjetivo, silencio y respeto. Las lágrimas son vuestras, no mías.',
        '**Conocimiento local real:** sé dónde aparcar, dónde cae la sombra al mediodía y a qué hora se vacía cada playa.',
        '**Entrega cuidada:** galería privada con todas las fotos editadas a mano, una a una, nunca por lotes.',
      ],
    },
    gallery: {
      title: 'Trabajo real, no montajes',
      intro:
        'Estas imágenes son de nuestro trabajo real de boda. Cuando todavía no tenemos una galería entera en Cambrils lo decimos claro y te mostramos trabajo auténtico de otras bodas de la Costa Daurada.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Se puede hacer la sesión de pareja en el Parc Samà?',
        a: 'Sí, pero el Parc Samà es un espacio privado que se reserva aparte. Te ayudamos con los trámites y cuadramos la hora con la luz. Si no entra en vuestro plan, el puerto y las playas dan retratos igual de bonitos sin reserva.',
      },
      {
        q: '¿Sois de Cambrils?',
        a: 'Somos de Reus, a diez minutos, y trabajamos aquí desde siempre. Conocemos el pueblo, su luz y su gente como gente de casa, no como fotógrafos que pasan un día.',
      },
      {
        q: '¿Cuántas fotos recibimos y cuándo?',
        a: 'Recibes todas las imágenes buenas del día, editadas a mano en una galería privada. El número depende de las horas de cobertura; la selección es por calidad. La entrega suele ser en pocas semanas.',
      },
      {
        q: '¿Podemos contratar foto y vídeo a la vez?',
        a: 'Es lo que más recomendamos. Ferran hace la foto y Eric el **[vídeo de boda en Cambrils](/videograf-boda-cambrils)**; nos conocemos tanto que trabajamos sin pisarnos, con un único relato de vuestro día.',
      },
      {
        q: '¿Se puede volar dron en las playas de Cambrils?',
        a: 'Depende de la zona y del permiso; lo gestiona Eric para la parte de vídeo, siempre dentro de la normativa. Para fotografía no hace falta: la luz de mar y los jardines ya dan todo lo que necesitamos.',
      },
    ],
    finalCta: {
      h2: 'Hagamos vuestra boda en Cambrils',
      body: 'Contadnos vuestra fecha y vuestro lugar. Os diremos con sinceridad cómo aprovecharíamos la luz de Cambrils para vosotros, sin compromiso.',
    },
    formTitle: 'Hablemos de vuestra boda en Cambrils',
    formIntro:
      'Dejadnos la fecha, el lugar y cuatro palabras de cómo os imagináis el día. Os respondemos pronto, siempre nosotros dos.',
    whatsAppMessage:
      '¡Hola Ferran! Nos casamos en Cambrils y nos gustaría información de fotografía de boda.',
    breadcrumbCurrent: 'Fotógrafo de boda en Cambrils',
  },

  en: {
    meta: {
      title: 'Wedding photographer in Cambrils | Lifetime Weddings',
      description:
        'Wedding photographer in Cambrils, on the Costa Daurada. Sea light, portraits in the Parc Samà gardens and the fishing port. Brothers from Reus nearby.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Baix Camp',
      h1: 'Wedding photographer in Cambrils',
      sub: 'Portraits in sea light, the gardens of Parc Samà and the pulse of the old port. We are brothers from Reus, ten minutes from Cambrils, and we know every corner at the right hour.',
      heroAlt: 'Couple on their wedding day in golden afternoon light beside the sea',
    },
    cardTitle: 'Wedding photography in Cambrils',
    cardBlurb:
      'Mediterranean light, historic gardens and a working fishing port. A local photographer who knows where and when the best light falls in Cambrils.',
    intro: {
      title: 'Cambrils, the way we photograph it',
      paras: [
        `Cambrils is no postcard set: it is a living sea town, with a fishing port that still works, gardens from another century and a light that shifts every hour. We are **Ferran** and **Eric**, two brothers from Reus, ten minutes up the road. We grew up coming down to these beaches, and we know Cambrils as locals, not as visitors.`,
        `As a **wedding photographer in Cambrils**, my job — Ferran, behind the camera — is to watch the day calmly and keep what is real: your father's hand in the first dance, the laugh that slips out, the light on the water before dinner. I don't direct a fashion shoot; I accompany a wedding.`,
        `This page is about **photography**. If you also want movement and the sound of the sea on film, Eric tells that story on our **[wedding videographer in Cambrils](/videograf-boda-cambrils)** page. Many weddings we cover together, side by side, without getting in each other's way.`,
      ],
    },
    spots: {
      title: 'The places we use in Cambrils',
      intro:
        'Six corners we know by heart, each with the hour it gives its best. These are not tourist stops: they are places where photography can breathe.',
      items: [
        {
          name: 'Parc Samà',
          body: 'Nineteenth-century colonial gardens with a lake and palms, one of the loveliest wedding venues in the Baix Camp. It is private and bookable; for couple portraits it has no rival, with light filtered through the palms.',
        },
        {
          name: 'The fishing port',
          body: 'Where Cambrils truly beats: nets, painted boats and reflections on the water. Here I look for texture and truth, a portrait that smells of the sea and the town\'s history.',
        },
        {
          name: 'The seafront promenade and the beaches',
          body: 'Fine golden sand and a clean horizon. Early or at sunset the beach empties and is yours alone: bare footsteps and the Mediterranean behind you.',
        },
        {
          name: 'Torre de l\'Ereta and the old town',
          body: 'Old stone and lanes with character, away from the bustle of the promenade. Perfect for intimate portraits against a backdrop that tells Cambrils\' centuries.',
        },
        {
          name: 'Cap de Salou and the coves',
          body: 'Right next to Cambrils, pines running down to the water and hidden rocky coves. A ten-minute detour for wild sea and complete privacy.',
        },
        {
          name: 'The masies of the Baix Camp',
          body: 'Inland, among vines and hazel groves, the stone farmhouses give a warm alternative to the sea: window light and the quiet of the countryside.',
        },
      ],
    },
    style: {
      title: 'The light and mood of Cambrils',
      paras: [
        `Cambrils has a generous sea light. In the morning it is clear and cool; in the **golden hour** before sunset it paints everything in old gold. Knowing this is the difference between a correct photo and one that catches in your throat ten years later.`,
        `The mood is relaxed, Mediterranean, a fishing town that knows how to make you welcome. That calm slips into the pictures: people are at ease, they laugh, they forget the camera. I work that way — no forced poses — keeping what matters.`,
      ],
    },
    approach: {
      title: 'How I photograph a wedding in Cambrils',
      bullets: [
        '**Documentary, with soul:** I stay with you all day without staging everything. The best moments happen on their own.',
        '**Portraits in home light:** I plan the couple session for golden hour — at Parc Samà, the port or the beach.',
        '**Discreet in the ceremony:** long lens, silence and respect. The tears are yours, not mine.',
        '**Real local knowledge:** I know where to park, where the shade falls at noon and when each beach empties.',
        '**Careful delivery:** a private gallery with every photo hand-edited, one by one, never batched.',
      ],
    },
    gallery: {
      title: 'Real work, not mock-ups',
      intro:
        'These images are from our real wedding work. When we don\'t yet have a full gallery shot in Cambrils we say so plainly and show you genuine work from other Costa Daurada weddings.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Can the couple session be at Parc Samà?',
        a: 'Yes, but Parc Samà is a private venue booked separately. We help with the arrangements and match the hour to the light. If it doesn\'t fit your plan, the port and beaches give portraits every bit as lovely with no booking needed.',
      },
      {
        q: 'Are you from Cambrils?',
        a: 'We are from Reus, ten minutes away, and we have always worked here. We know the town, its light and its people as locals, not as photographers passing through for a day.',
      },
      {
        q: 'How many photos do we get, and when?',
        a: 'You receive every good image from the day, hand-edited in a private gallery. The number depends on the hours of coverage; the edit is chosen for quality. Delivery is usually within a few weeks.',
      },
      {
        q: 'Can we book photo and video together?',
        a: 'It is what we most recommend. Ferran shoots the photography and Eric the **[wedding videographer in Cambrils](/videograf-boda-cambrils)** film; we know each other so well that we work without clashing, with one coherent story of your day.',
      },
      {
        q: 'Can a drone be flown over the Cambrils beaches?',
        a: 'It depends on the zone and the permit; Eric handles that for the video, always within the rules. For photography it isn\'t needed: the sea light and the gardens already give everything we want.',
      },
    ],
    finalCta: {
      h2: 'Let\'s make your Cambrils wedding',
      body: 'Tell us your date and your venue. We\'ll tell you honestly how we\'d use the Cambrils light for you — no obligation.',
    },
    formTitle: 'Let\'s talk about your Cambrils wedding',
    formIntro:
      'Leave us the date, the place and a few words on how you picture the day. We reply soon, always the two of us.',
    whatsAppMessage:
      'Hi Ferran! We\'re getting married in Cambrils and would love information about wedding photography.',
    breadcrumbCurrent: 'Wedding photographer in Cambrils',
  },
};
