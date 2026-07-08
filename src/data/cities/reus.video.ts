// Reus — VIDEO copy (ca / es / en).
//
// Video counterpart to reus.photo.ts. Eric films, Ferran shoots stills; Reus
// is home turf, no travel surcharge across the Baix Camp. The angle here is
// cinematic film, live ceremony sound and movement through the modernist
// architecture — distinct from the photo page, cross-referenced once per lang.

import type { CityServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const REUS_VIDEO: Record<Lang, CityServiceCopy> = {
  ca: {
    meta: {
      title: 'Vídeo de boda a Reus | Lifetime Weddings',
      description:
        'Vídeo de boda a Reus. Dos germans de Reus: cinema documental, so real de la cerimònia i moviment per l’arquitectura modernista, sense recàrrec al Baix Camp.',
    },
    hero: {
      eyebrow: 'Vídeo de boda · Reus · Baix Camp',
      h1: 'Vídeo de boda a Reus',
      sub: 'Som de Reus. Filmem la vostra boda com una pel·lícula: el so real dels vots, el moviment de càmera per la Casa Navàs i el Pere Mata, la vostra història editada per emocionar.',
      heroAlt: 'Càmera de vídeo filmant uns nuvis en un espai modernista de Reus',
    },
    cardTitle: 'Vídeo de boda a Reus',
    cardBlurb:
      'Cinema documental a la capital del modernisme, casa nostra. So real, moviment i emoció, sense recàrrec de desplaçament.',
    intro: {
      title: 'Filmar a Reus, la nostra ciutat',
      paras: [
        `Som en **Ferran** i l’**Eric**, dos germans de Reus. L’Eric es posa darrere de la càmera per convertir el vostre dia en una **pel·lícula de boda** amb so, moviment i ritme. Ser de Reus vol dir que no venim a descobrir la ciutat: sabem per on entra la llum a la Casa Navàs a mitja tarda i quins carrers queden silenciosos per gravar un pla net.`,
        `El vídeo és una altra manera d’explicar el mateix dia. Mentre la fotografia atura l’instant, el **cinema captura el temps**: la respiració abans del «sí», el tremolor de la veu als vots, l’aplaudiment, la música que us fa ballar. Filmem amb estil documental —sense recrear escenes— i editem amb l’emoció com a fil conductor.`,
        `Com que Reus és casa nostra, **no cobrem recàrrec de desplaçament** a la ciutat ni al Baix Camp. Tant si filmem al Pere Mata com en una masia de Riudoms, a les Termes de Montbrió o en un celler del Priorat, és territori conegut.`,
      ],
    },
    spots: {
      title: 'On filmem a Reus',
      intro:
        'El modernisme de Reus no només és bonic de mirar: és cinematogràfic. Aquests escenaris donen moviment, profunditat i so a la vostra pel·lícula.',
      items: [
        {
          name: 'Institut Pere Mata — Pavelló dels Distingits',
          body: 'L’obra mestra de Domènech i Montaner és un plató de somni per al vídeo. Les arcades i els passadissos permeten plans de càmera en moviment —travellings, gimbal— amb una dimensió cinematogràfica impossible amb una foto fixa. Espai privat i reservable.',
        },
        {
          name: 'Casa Navàs — Plaça del Mercadal',
          body: 'Els finestrals i els mosaics són perfectes per a plans íntims amb llum natural en moviment. Filmem el tram de parella amb calma, deixant que la càmera segueixi el vostre pas per les sales sense trencar la màgia del lloc.',
        },
        {
          name: 'Plaça del Mercadal i la Ruta del Modernisme',
          body: 'El Mercadal ens dona vida, so ambient i profunditat. Filmem el passeig per la ruta modernista amb la ciutat com a banda sonora: campanes, gent, el batec de Reus. Ideal per als plans de transició.',
        },
        {
          name: 'Gaudí Centre i el centre històric',
          body: 'Els carrerons del nucli antic —bressol de Gaudí— són perfectes per a plans nets, sense multituds, on la parella avança cap a la càmera. Textures de pedra i llum tamisada.',
        },
        {
          name: 'Jardins de les Termes de Montbrió',
          body: 'A un quart d’hora, els jardins del balneari són ideals per als plans aeris i de moviment ampli durant el banquet. Estanys i arbrat que aporten reflexos i profunditat al vídeo de la festa.',
        },
        {
          name: 'Masies del Baix Camp i cellers del Priorat',
          body: 'Les masies de pedra i les vinyes del Baix Camp, i els cellers del Priorat a mitja hora, ofereixen paisatges amplis per obrir o tancar la pel·lícula amb un pla que respira. Llum de licorella i horitzons que emocionen.',
        },
      ],
    },
    style: {
      title: 'El so i el moviment de Reus',
      paras: [
        `Un bon vídeo de boda es fa tant amb les orelles com amb els ulls. Per això cuidem el **so real**: micròfons discrets als vots, gravació neta de la cerimònia i la música, i so ambient. A Reus, l’acústica dels espais modernistes —sales amb volta, patis de pedra— fa que la vostra pel·lícula soni a lloc de veritat.`,
        `El **moviment** és l’altra meitat. Amb gimbal i càmera a l’espatlla filmem plans que respiren i acompanyen l’acció per l’arquitectura de Domènech i Montaner, aprofitant arcs i passadissos per donar profunditat. No busquem el pla espectacular buit, sinó el que serveix l’emoció.`,
        `Com a la fotografia, filmem **una sola boda al dia**. Arribem d’hora, escoltem l’espai i deixem que la pel·lícula es construeixi a partir del que passa de veritat.`,
      ],
    },
    approach: {
      title: 'Com filmem la vostra boda',
      bullets: [
        '**Cinema documental**: filmem el dia real, sense recrear escenes ni fer-vos actuar.',
        '**So real capturat bé**: micros als vots i a la cerimònia, música i so ambient nets.',
        '**Moviment amb sentit**: gimbal i travellings per moure’ns amb elegància per l’arquitectura modernista.',
        '**Muntatge emotiu**: un film curt que emociona i, si voleu, la versió llarga amb la cerimònia sencera.',
        '**Entrega en alta**: vídeo en qualitat i enllaç privat per compartir amb qui vulgueu.',
      ],
    },
    gallery: {
      title: 'Films de boda',
      intro:
        'Una mostra de les nostres pel·lícules al Camp de Tarragona. Si voleu veure el to d’un vídeo filmat en un escenari com el de Reus, escriviu-nos i us passem exemples.',
    },
    faqTitle: 'Preguntes freqüents — vídeo a Reus',
    faqs: [
      {
        q: 'Cobreu recàrrec per filmar a Reus?',
        a: 'No. Som de Reus, així que no hi ha recàrrec a la ciutat ni a cap poble del Baix Camp, ni als cellers del Priorat ni a les Termes de Montbrió.',
      },
      {
        q: 'Com captureu el so de la cerimònia?',
        a: 'Amb micròfons discrets a l’oficiant i, quan cal, als nuvis, més enregistradors independents. Així els vots sonen nets al muntatge final, sense soroll de fons.',
      },
      {
        q: 'Podem tenir foto i vídeo del mateix equip?',
        a: 'Sí: l’Eric filma i en Ferran fa la fotografia, coordinats perquè no es trepitgin. Podeu veure la part de foto a la pàgina de **fotògraf de boda a Reus**.',
      },
      {
        q: 'Quant dura el vídeo i quan l’entregueu?',
        a: 'Fem un film curt d’uns minuts pensat per emocionar, i podem afegir la versió llarga amb la cerimònia i els parlaments. L’entrega és en poques setmanes, en alta qualitat.',
      },
      {
        q: 'Es pot fer servir un dron?',
        a: 'On la normativa ho permet, sí. A les masies del Baix Camp i als cellers del Priorat els plans aeris queden molt bé; al centre de Reus depèn de la zona i ho consultem abans.',
      },
    ],
    finalCta: {
      h2: 'Voleu el vídeo de la vostra boda a Reus?',
      body: 'Digueu-nos on i quan us caseu i us expliquem com seria la vostra pel·lícula. Sense compromís, des de casa.',
    },
    formTitle: 'Consulteu disponibilitat de vídeo a Reus',
    formIntro:
      'Indiqueu-nos la data i l’escenari (Pere Mata, Casa Navàs, una masia del Baix Camp…) i us responem amb disponibilitat i pressupost de vídeo.',
    whatsAppMessage:
      'Hola! Ens casem a Reus i voldríem informació sobre el vídeo de boda.',
    breadcrumbCurrent: 'Vídeo de boda a Reus',
  },

  es: {
    meta: {
      title: 'Vídeo de boda en Reus | Lifetime Weddings',
      description:
        'Vídeo de boda en Reus. Dos hermanos de Reus: cine documental, sonido real de la ceremonia y movimiento por la arquitectura, sin recargo en el Baix Camp.',
    },
    hero: {
      eyebrow: 'Vídeo de boda · Reus · Baix Camp',
      h1: 'Vídeo de boda en Reus',
      sub: 'Somos de Reus. Filmamos vuestra boda como una película: el sonido real de los votos, el movimiento de cámara por la Casa Navàs y el Pere Mata, vuestra historia editada para emocionar.',
      heroAlt: 'Cámara de vídeo filmando a unos novios en un espacio modernista de Reus',
    },
    cardTitle: 'Vídeo de boda en Reus',
    cardBlurb:
      'Cine documental en la capital del modernismo, nuestra ciudad. Sonido real, movimiento y emoción, sin recargo de desplazamiento.',
    intro: {
      title: 'Filmar en Reus, nuestra ciudad',
      paras: [
        `Somos **Ferran** y **Eric**, dos hermanos de Reus. Eric se pone detrás de la cámara para convertir vuestro día en una **película de boda** con sonido, movimiento y ritmo. Ser de Reus significa que no venimos a descubrir la ciudad: sabemos por dónde entra la luz en la Casa Navàs a media tarde y qué calles quedan silenciosas para grabar un plano limpio.`,
        `El vídeo es otra manera de contar el mismo día. Mientras la fotografía detiene el instante, el **cine captura el tiempo**: la respiración antes del «sí», el temblor de la voz en los votos, el aplauso, la música que os hace bailar. Filmamos con estilo documental —sin recrear escenas— y editamos con la emoción como hilo conductor.`,
        `Como Reus es nuestra casa, **no cobramos recargo de desplazamiento** en la ciudad ni en el Baix Camp. Tanto si filmamos en el Pere Mata como en una masía de Riudoms, en las Termes de Montbrió o en una bodega del Priorat, es territorio conocido.`,
      ],
    },
    spots: {
      title: 'Dónde filmamos en Reus',
      intro:
        'El modernismo de Reus no solo es bonito de mirar: es cinematográfico. Estos escenarios dan movimiento, profundidad y sonido a vuestra película.',
      items: [
        {
          name: 'Institut Pere Mata — Pabellón de los Distinguidos',
          body: 'La obra maestra de Domènech i Montaner es un plató de ensueño para el vídeo. Las arcadas y los pasillos permiten planos de cámara en movimiento —travellings, gimbal— con una dimensión cinematográfica imposible con una foto fija. Espacio privado y reservable.',
        },
        {
          name: 'Casa Navàs — Plaça del Mercadal',
          body: 'Los ventanales y los mosaicos son perfectos para planos íntimos con luz natural en movimiento. Filmamos el tramo de pareja con calma, dejando que la cámara siga vuestro paso por las salas sin romper la magia del lugar.',
        },
        {
          name: 'Plaça del Mercadal y la Ruta del Modernisme',
          body: 'El Mercadal nos da vida, sonido ambiente y profundidad. Filmamos el paseo por la ruta modernista con la ciudad como banda sonora: campanas, gente, el latido de Reus. Ideal para los planos de transición.',
        },
        {
          name: 'Gaudí Centre y el centro histórico',
          body: 'Los callejones del casco antiguo —cuna de Gaudí— son perfectos para planos limpios, sin multitudes, donde la pareja avanza hacia la cámara. Texturas de piedra y luz tamizada.',
        },
        {
          name: 'Jardines de las Termes de Montbrió',
          body: 'A un cuarto de hora, los jardines del balneario son ideales para los planos aéreos y de movimiento amplio durante el banquete. Estanques y arbolado que aportan reflejos y profundidad al vídeo de la fiesta.',
        },
        {
          name: 'Masías del Baix Camp y bodegas del Priorat',
          body: 'Las masías de piedra y las viñas del Baix Camp, y las bodegas del Priorat a media hora, ofrecen paisajes amplios para abrir o cerrar la película con un plano que respira. Luz de licorella y horizontes que emocionan.',
        },
      ],
    },
    style: {
      title: 'El sonido y el movimiento de Reus',
      paras: [
        `Un buen vídeo de boda se hace tanto con los oídos como con los ojos. Por eso cuidamos el **sonido real**: micrófonos discretos en los votos, grabación limpia de la ceremonia y la música, y sonido ambiente. En Reus, la acústica de los espacios modernistas —salas abovedadas, patios de piedra— hace que vuestra película suene a lugar de verdad.`,
        `El **movimiento** es la otra mitad. Con gimbal y cámara al hombro filmamos planos que respiran y acompañan la acción por la arquitectura de Domènech i Montaner, aprovechando arcos y pasillos para dar profundidad. No buscamos el plano espectacular vacío, sino el que sirve a la emoción.`,
        `Como en la fotografía, filmamos **una sola boda al día**. Llegamos temprano, escuchamos el espacio y dejamos que la película se construya a partir de lo que ocurre de verdad.`,
      ],
    },
    approach: {
      title: 'Cómo filmamos vuestra boda',
      bullets: [
        '**Cine documental**: filmamos el día real, sin recrear escenas ni haceros actuar.',
        '**Sonido real bien capturado**: micros en los votos y en la ceremonia, música y sonido ambiente limpios.',
        '**Movimiento con sentido**: gimbal y travellings para movernos con elegancia por la arquitectura modernista.',
        '**Montaje emotivo**: un film corto que emociona y, si queréis, la versión larga con la ceremonia entera.',
        '**Entrega en alta**: vídeo en calidad y enlace privado para compartir con quien queráis.',
      ],
    },
    gallery: {
      title: 'Películas de boda',
      intro:
        'Una muestra de nuestras películas en el Camp de Tarragona. Si queréis ver el tono de un vídeo filmado en un escenario como el de Reus, escribidnos y os pasamos ejemplos.',
    },
    faqTitle: 'Preguntas frecuentes — vídeo en Reus',
    faqs: [
      {
        q: '¿Cobráis recargo por filmar en Reus?',
        a: 'No. Somos de Reus, así que no hay recargo en la ciudad ni en ningún pueblo del Baix Camp, ni en las bodegas del Priorat ni en las Termes de Montbrió.',
      },
      {
        q: '¿Cómo capturáis el sonido de la ceremonia?',
        a: 'Con micrófonos discretos en el oficiante y, cuando hace falta, en los novios, más grabadoras independientes. Así los votos suenan limpios en el montaje final, sin ruido de fondo.',
      },
      {
        q: '¿Podemos tener foto y vídeo del mismo equipo?',
        a: 'Sí: Eric filma y Ferran hace la fotografía, coordinados para no pisarse. Podéis ver la parte de foto en la página de **fotógrafo de boda en Reus**.',
      },
      {
        q: '¿Cuánto dura el vídeo y cuándo lo entregáis?',
        a: 'Hacemos un film corto de unos minutos pensado para emocionar, y podemos añadir la versión larga con la ceremonia y los discursos. La entrega es en pocas semanas, en alta calidad.',
      },
      {
        q: '¿Se puede usar un dron?',
        a: 'Donde la normativa lo permite, sí. En las masías del Baix Camp y en las bodegas del Priorat los planos aéreos quedan muy bien; en el centro de Reus depende de la zona y lo consultamos antes.',
      },
    ],
    finalCta: {
      h2: '¿Queréis el vídeo de vuestra boda en Reus?',
      body: 'Decidnos dónde y cuándo os casáis y os contamos cómo sería vuestra película. Sin compromiso, desde casa.',
    },
    formTitle: 'Consultad disponibilidad de vídeo en Reus',
    formIntro:
      'Indicadnos la fecha y el escenario (Pere Mata, Casa Navàs, una masía del Baix Camp…) y os respondemos con disponibilidad y presupuesto de vídeo.',
    whatsAppMessage:
      '¡Hola! Nos casamos en Reus y querríamos información sobre el vídeo de boda.',
    breadcrumbCurrent: 'Vídeo de boda en Reus',
  },

  en: {
    meta: {
      title: 'Wedding videographer in Reus | Lifetime Weddings',
      description:
        'Wedding videographer in Reus. Two brothers from here: documentary film, real sound and movement through Modernista Reus, no travel fee in the Baix Camp.',
    },
    hero: {
      eyebrow: 'Wedding film · Reus · Baix Camp',
      h1: 'Wedding videographer in Reus',
      sub: 'We are from Reus. We film your wedding like a film: the real sound of your vows, the camera moving through Casa Navàs and Pere Mata, your story edited to move you.',
      heroAlt: 'Video camera filming a couple in a Modernista space in Reus',
    },
    cardTitle: 'Wedding videographer in Reus',
    cardBlurb:
      'Documentary film in the capital of Modernisme — our own city. Real sound, movement and emotion, with no travel fee.',
    intro: {
      title: 'Filming in Reus, our city',
      paras: [
        `We are **Ferran** and **Eric**, two brothers from Reus. Eric is the one behind the camera, turning your day into a **wedding film** with sound, movement and rhythm. Being from Reus means we do not arrive to discover the city: we know where the light falls in Casa Navàs in mid-afternoon and which streets stay quiet enough for a clean shot.`,
        `Film is another way of telling the same day. Where photography stops the instant, **cinema captures time**: the breath before the "I do", the tremor in a voice during the vows, the applause, the music that pulls you onto the floor. We film in a documentary style — no staged scenes — and edit with emotion as the thread.`,
        `Because Reus is home, **we charge no travel fee** in the city or across the Baix Camp. Whether we film at Pere Mata, a farmhouse in Riudoms, Termes de Montbrió or a Priorat winery, it is familiar ground.`,
      ],
    },
    spots: {
      title: 'Where we film in Reus',
      intro:
        'The Modernisme of Reus is not only beautiful to look at — it is cinematic. These settings bring movement, depth and sound to your film.',
      items: [
        {
          name: 'Institut Pere Mata — Pavilion of the Distinguished',
          body: 'Domènech i Montaner’s masterpiece is a dream set for film. The arcades and corridors allow moving-camera shots — travellings, gimbal — with a cinematic dimension impossible to reach with a still. A private, bookable venue.',
        },
        {
          name: 'Casa Navàs — Plaça del Mercadal',
          body: 'The tall windows and mosaics are perfect for intimate shots with natural light in motion. We film the couple session calmly, letting the camera follow your steps through the rooms without breaking the magic of the place.',
        },
        {
          name: 'Plaça del Mercadal and the Modernisme Route',
          body: 'The Mercadal gives us life, ambient sound and depth. We film the walk along the Modernisme route with the city as a soundtrack: bells, people, the pulse of Reus. Ideal for the transition shots.',
        },
        {
          name: 'Gaudí Centre and the old town',
          body: 'The narrow lanes of the historic centre — Gaudí’s cradle — are perfect for clean, crowd-free shots where the couple walks toward the camera. Stone textures and filtered light.',
        },
        {
          name: 'Gardens of Termes de Montbrió',
          body: 'A quarter of an hour away, the spa gardens are ideal for aerial and wide-movement shots during the reception. Ponds and mature trees that add reflections and depth to the film of the party.',
        },
        {
          name: 'Baix Camp farmhouses and Priorat wineries',
          body: 'The stone masies and vineyards of the Baix Camp, and the Priorat wineries half an hour away, offer wide landscapes to open or close the film with a shot that breathes. Slate light and horizons that stir emotion.',
        },
      ],
    },
    style: {
      title: 'The sound and movement of Reus',
      paras: [
        `A good wedding film is made with the ears as much as the eyes. That is why we care about **real sound**: discreet microphones on the vows, a clean recording of the ceremony and the music, and ambient sound. In Reus, the acoustics of the Modernista spaces — vaulted halls, stone courtyards — make your film sound truly rooted in place.`,
        `**Movement** is the other half. With gimbal and shoulder-mounted camera we film shots that breathe and follow the action through the architecture of Domènech i Montaner, using arches and corridors to build depth. We do not chase the empty spectacular shot, but the one that serves the emotion.`,
        `As with the photography, we film **one wedding a day**. We arrive early, listen to the space and let the film build from what genuinely happens.`,
      ],
    },
    approach: {
      title: 'How we film your wedding',
      bullets: [
        '**Documentary cinema**: we film the real day, no staged scenes, no asking you to act.',
        '**Real sound, captured well**: mics on the vows and ceremony, clean music and ambient sound.',
        '**Movement with purpose**: gimbal and travellings to move elegantly through the Modernista architecture.',
        '**An emotional edit**: a short film that moves you and, if you wish, the long version with the full ceremony.',
        '**High-quality delivery**: your film in full quality with a private link to share with whoever you like.',
      ],
    },
    gallery: {
      title: 'Wedding films',
      intro:
        'A sample of our films across the Camp de Tarragona. If you want to see the tone of a film shot in a setting like Reus, write to us and we will send examples.',
    },
    faqTitle: 'FAQ — video in Reus',
    faqs: [
      {
        q: 'Do you charge a travel fee to film in Reus?',
        a: 'No. We are from Reus, so there is no travel fee in the city or anywhere in the Baix Camp, nor at the Priorat wineries or Termes de Montbrió.',
      },
      {
        q: 'How do you capture the sound of the ceremony?',
        a: 'With discreet microphones on the officiant and, when needed, on the couple, plus independent recorders. That way the vows sound clean in the final edit, free of background noise.',
      },
      {
        q: 'Can we have photo and video from the same team?',
        a: 'Yes: Eric films and Ferran shoots the photography, coordinated so they never get in each other’s way. You can see the photo side on our **wedding photographer in Reus** page.',
      },
      {
        q: 'How long is the film, and when do you deliver it?',
        a: 'We make a short film of a few minutes designed to move you, and we can add the long version with the ceremony and the speeches. Delivery is within a few weeks, in high quality.',
      },
      {
        q: 'Can you use a drone?',
        a: 'Where regulations allow, yes. Aerial shots work beautifully at the Baix Camp farmhouses and the Priorat wineries; in central Reus it depends on the area, and we check beforehand.',
      },
    ],
    finalCta: {
      h2: 'Want the film of your wedding in Reus?',
      body: 'Tell us where and when you are marrying and we will describe how your film would look. No obligation, from home.',
    },
    formTitle: 'Check video availability in Reus',
    formIntro:
      'Tell us the date and the setting (Pere Mata, Casa Navàs, a Baix Camp farmhouse…) and we will reply with availability and a video quote.',
    whatsAppMessage:
      'Hi! We are getting married in Reus and would like information about wedding video.',
    breadcrumbCurrent: 'Wedding videographer in Reus',
  },
};
