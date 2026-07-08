import type { CityServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

// Video cluster copy for Tarragona city. Written from the videographer's POV
// (Eric on the camera). Voice: warm first-person plural, editorial, honest,
// local. Emphasis differs from the photo page: film, movement, the real sound
// of the vows, cinematic wide shots, drone where allowed, trailer + full film.
// Cross-references the photo service once. Same real facts as the photo file,
// including the MHT authorization note for ticketed Roman monuments and drone.

export const TARRAGONA_VIDEO: Record<Lang, CityServiceCopy> = {
  ca: {
    meta: {
      title: 'Vídeo de boda a Tarragona | Lifetime Weddings',
      description:
        'Vídeo de boda a Tarragona: cinema honest, moviment i so real a la Part Alta, el Balcó del Mediterrani i el Serrallo, amb dron on es pot. Tràiler i film.',
    },
    hero: {
      eyebrow: 'Vídeo de boda · Tarragona',
      h1: 'Vídeo de boda a Tarragona',
      sub: 'Una pel·lícula, no un resum. El so real dels vots, plans amplis de mar i pedra, i el moviment que la foto no pot capturar. Som dos germans de Reus.',
      heroAlt: 'Càmera de vídeo enregistrant una cerimònia de boda a la Part Alta de Tarragona',
    },
    cardTitle: 'Vídeo de boda a Tarragona',
    cardBlurb:
      'Film de boda a Tarragona amb so real i mirada de cinema: la Part Alta, el Balcó del Mediterrani i el Serrallo, amb tràiler i pel·lícula completa.',
    intro: {
      title: 'La vostra boda a Tarragona, convertida en pel·lícula',
      paras: [
        `Som en **Ferran i l’Eric**, dos germans de **Reus**. L’Eric fa el vídeo i en Ferran la fotografia, i entre els dos cobrim el **Camp de Tarragona** cada temporada. Un vídeo de boda no és un àlbum que es mou: és una **pel·lícula**. Ens importa el ritme, el so i el moviment tant com la imatge, perquè d’aquí a deu anys torneu a sentir el dia, no només a mirar-lo.`,
        `El que fa únic un film és el **so real**: la veu que et tremola als vots, el silenci abans del "sí", el riure d’una tia al pati, les onades sota el Balcó. Gravem àudio net amb micròfons discrets i muntem la pel·lícula sobre aquestes veus de veritat, no sobre una cançó qualsevol tapant-ho tot. A Tarragona, a més, tenim un escenari de cinema: pedra romana, mar i capvespres llargs.`,
        `Ser d’aquí ens deixa rodar amb cap: sabem per on moure la càmera a la Part Alta sense sortir a cap pla i a quina hora el mar del Balcó fa de fons daurat. I si voleu el dia complet, en Ferran **us fa la fotografia de la boda a Tarragona** el mateix dia; treballem coordinats i mai ens creuem davant de l’objectiu.`,
      ],
    },
    spots: {
      title: 'Racons de Tarragona que rodem com el cinema',
      intro:
        'Llocs reals que fem servir de veritat, pensats per al moviment i el so: on un pla ampli respira, on un travelling llisca i on la ciutat sona bé.',
      items: [
        {
          name: 'Part Alta i Catedral',
          body: 'Els carrerons medievals demanen moviment: seguim la parella amb estabilitzador mentre caminen i deixem que la pedra i les campanes de la Catedral posin la banda sonora. És on gravem els plans més íntims i els passos que després obren el tràiler.',
        },
        {
          name: 'Balcó del Mediterrani',
          body: 'La barana de ferro sobre el mar és el pla ampli per excel·lència al capvespre. Hi fem un travelling lent cap a l’horitzó amb el so real de les onades i el vent: pura obertura o tancament de pel·lícula, amb el blau fonent-se darrere.',
        },
        {
          name: 'Amfiteatre i muralles romanes',
          body: 'Pedra romana sobre el mar, imponent en pla ampli i encara més des de l’aire. Honestos: l’Amfiteatre i els monuments amb entrada els gestiona el MHT i tant per rodar dins com per volar el dron cal autorització; el dron, a més, depèn de l’espai aeri de la zona. Ho tramitem amb temps o rodem des de fora.',
        },
        {
          name: 'Passeig Arqueològic',
          body: 'El passeig entre les dues muralles és un corredor perfecte per a travellings: la parella avança, la pedra passa als costats i la profunditat fa un pla molt cinematogràfic sense necessitat d’entrar en cap recinte amb entrada.',
        },
        {
          name: 'El Serrallo',
          body: 'El barri de pescadors sona a moll: barques, gavines, aigua. Gravem-hi el so ambient i plans de textura —xarxes, reflexos, llum baixa sobre l’aigua— que donen ànima al muntatge i porten el film cap a un final càlid de tarda.',
        },
        {
          name: 'Castell de Tamarit',
          body: 'A tocar de Tarragona, sobre la platja, un castell medieval amb el mar als peus: un dels pocs llocs on, amb permís, el dron fa un pla aeri d’obertura espectacular sobre pedra, església i onades alhora.',
        },
      ],
    },
    style: {
      title: 'El ritme i el so de Tarragona',
      paras: [
        `Tarragona és una ciutat molt **cinematogràfica**: la pedra daurada, el mar sempre a prop i uns capvespres llargs que a l’estiu allarguen l’hora màgica. Aprofitem aquesta llum per als plans amplis i els travellings, i la barregem amb el so real del lloc —campanes, onades, el brogit de la Part Alta— perquè el film tingui textura i no soni a plantilla.`,
        `El contrast romà-medieval-mar en cinc minuts ens dona molt de joc per al **muntatge**: alternem la intimitat d’un carreró amb l’amplitud d’un balcó sobre el Mediterrani sense cap trasllat. I al voltant, el **Camp de Tarragona** ofereix masies com **Mas La Boella**, entre oliveres, on el dron i els plans oberts de camp donen un altre aire a la pel·lícula.`,
      ],
    },
    approach: {
      title: 'Com filmem una boda a Tarragona',
      bullets: [
        '**Cinema, no resum**: construïm una pel·lícula amb ritme i narrativa, no un recopilatori de clips.',
        '**So real primer**: gravem els vots, els discursos i l’ambient amb micròfons discrets i muntem sobre aquestes veus.',
        '**Moviment**: estabilitzador i travellings per als plans amplis de mar i pedra que la foto no pot donar.',
        '**Dron on es pot**: plans aeris de la costa i el castell quan l’espai aeri i els permisos ho permeten.',
        '**Permisos amb temps**: dins de monuments amb entrada o per volar, ho gestionem amb el MHT abans del dia.',
        '**Tràiler i film complet**: un tràiler curt per compartir de seguida i la pel·lícula llarga amb la cerimònia sencera.',
      ],
    },
    gallery: {
      title: 'Vídeos de boda al Camp de Tarragona',
      intro:
        'Una mostra de la nostra feina en vídeo a la zona. Quan encara no tenim un film públic lligat a aquesta ciutat, us ensenyem pel·lícules reals d’altres bodes del Camp de Tarragona perquè sentiu el nostre ritme i el nostre tracte del so.',
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Teniu data lliure per al vídeo de la nostra boda a Tarragona?',
        a: 'Agafem un nombre limitat de bodes per temporada per cuidar cada film. Escriviu-nos amb la data com abans millor i us confirmem disponibilitat de seguida; primavera i tardor s’omplen aviat.',
      },
      {
        q: 'Us heu de desplaçar? Cobreu quilometratge?',
        a: 'Som de Reus, a un quart de Tarragona, i la ciutat és zona nostra: no hi ha suplement de desplaçament per a bodes al Camp de Tarragona. Per a destinacions més lluny ho parlem obertament abans de tancar res.',
      },
      {
        q: 'Quan tindrem el vídeo?',
        a: 'Primer rebeu el **tràiler** poques setmanes després de la boda i, més endavant, la **pel·lícula completa** amb la cerimònia sencera. Us diem els terminis exactes quan tanquem l’agenda de l’any.',
      },
      {
        q: 'Podem contractar vídeo i foto alhora?',
        a: 'Sí, i és el que recomanem. L’Eric fa el vídeo i en Ferran la foto, som germans i treballem coordinats: no ens creuem davant de la càmera i el dia us surt més rodó i sovint més ajustat de preu que amb dos equips separats.',
      },
      {
        q: 'Podeu volar el dron o rodar dins de l’Amfiteatre?',
        a: 'Els monuments romans amb entrada els gestiona el MHT i cal autorització tant per rodar dins com per volar; el dron també depèn de l’espai aeri de la zona. Ho tramitem amb temps quan es pot; si no, aconseguim plans espectaculars des del Passeig Arqueològic i des de fora.',
      },
    ],
    finalCta: {
      h2: 'Fem el vídeo de la vostra boda a Tarragona',
      body: 'Expliqueu-nos com us imagineu el dia i quins racons de Tarragona voleu veure a la pel·lícula. Us responem ràpid, sense compromís, i us diem de seguida si tenim la data lliure.',
    },
    formTitle: 'Demaneu disponibilitat i pressupost',
    formIntro:
      'Digueu-nos la data, el lloc de la cerimònia i si voleu només vídeo o també fotografia. Us contestem en persona, mai amb un formulari automàtic.',
    whatsAppMessage:
      'Hola Lifetime Weddings! Ens casem a Tarragona i volem informació de vídeo de boda.',
    breadcrumbCurrent: 'Vídeo de boda a Tarragona',
  },
  es: {
    meta: {
      title: 'Vídeo de boda en Tarragona | Lifetime Weddings',
      description:
        'Vídeo de boda en Tarragona: cine honesto, movimiento y sonido en la Part Alta, el Balcó del Mediterrani y el Serrallo, con dron si se puede. Tráiler y film.',
    },
    hero: {
      eyebrow: 'Vídeo de boda · Tarragona',
      h1: 'Vídeo de boda en Tarragona',
      sub: 'Una película, no un resumen. El sonido real de los votos, planos amplios de mar y piedra, y el movimiento que la foto no puede capturar. Somos dos hermanos de Reus.',
      heroAlt: 'Cámara de vídeo grabando una ceremonia de boda en la Part Alta de Tarragona',
    },
    cardTitle: 'Vídeo de boda en Tarragona',
    cardBlurb:
      'Película de boda en Tarragona con sonido real y mirada de cine: la Part Alta, el Balcó del Mediterrani y el Serrallo, con tráiler y película completa.',
    intro: {
      title: 'Vuestra boda en Tarragona, convertida en película',
      paras: [
        `Somos **Ferran y Eric**, dos hermanos de **Reus**. Eric hace el vídeo y Ferran la fotografía, y entre los dos cubrimos el **Camp de Tarragona** cada temporada. Un vídeo de boda no es un álbum que se mueve: es una **película**. Nos importan el ritmo, el sonido y el movimiento tanto como la imagen: dentro de diez años queremos que sintáis el día, no solo que lo miréis.`,
        `Lo que hace único a un film es el **sonido real**: la voz que te tiembla en los votos, el silencio antes del "sí", la risa de una tía en el patio, las olas bajo el Balcó. Grabamos audio limpio con micrófonos discretos y montamos la película sobre esas voces de verdad, no sobre una canción cualquiera tapándolo todo. En Tarragona, además, tenemos un escenario de cine: piedra romana, mar y atardeceres largos.`,
        `Ser de aquí nos deja rodar con cabeza: sabemos por dónde mover la cámara en la Part Alta sin colarnos en ningún plano y a qué hora el mar del Balcó hace de fondo dorado. Y si queréis el día completo, Ferran **os hace la fotografía de la boda en Tarragona** el mismo día; trabajamos coordinados y nunca nos cruzamos delante del objetivo.`,
      ],
    },
    spots: {
      title: 'Rincones de Tarragona que rodamos como el cine',
      intro:
        'Lugares reales que usamos de verdad, pensados para el movimiento y el sonido: donde un plano amplio respira, donde un travelling desliza y donde la ciudad suena bien.',
      items: [
        {
          name: 'Part Alta y Catedral',
          body: 'Los callejones medievales piden movimiento: seguimos a la pareja con estabilizador mientras caminan y dejamos que la piedra y las campanas de la Catedral pongan la banda sonora. Aquí grabamos los planos más íntimos y los pasos que luego abren el tráiler.',
        },
        {
          name: 'Balcó del Mediterrani',
          body: 'La barandilla de hierro sobre el mar es el plano amplio por excelencia al atardecer. Hacemos un travelling lento hacia el horizonte con el sonido real de las olas y el viento: puro arranque o cierre de película, con el azul fundiéndose detrás.',
        },
        {
          name: 'Anfiteatro y murallas romanas',
          body: 'Piedra romana sobre el mar, imponente en plano amplio y aún más desde el aire. Honestos: el Anfiteatro y los monumentos con entrada los gestiona el MHT y tanto para rodar dentro como para volar el dron hace falta autorización; el dron, además, depende del espacio aéreo de la zona. Lo tramitamos con tiempo o rodamos desde fuera.',
        },
        {
          name: 'Passeig Arqueològic',
          body: 'El paseo entre las dos murallas es un corredor perfecto para travellings: la pareja avanza, la piedra pasa a los lados y la profundidad da un plano muy cinematográfico sin entrar en ningún recinto con entrada.',
        },
        {
          name: 'El Serrallo',
          body: 'El barrio pesquero suena a muelle: barcas, gaviotas, agua. Grabamos el sonido ambiente y planos de textura —redes, reflejos, luz baja sobre el agua— que dan alma al montaje y llevan la película hacia un final cálido de tarde.',
        },
        {
          name: 'Castillo de Tamarit',
          body: 'A un paso de Tarragona, sobre la playa, un castillo medieval con el mar a sus pies: uno de los pocos sitios donde, con permiso, el dron da un plano aéreo de apertura espectacular sobre piedra, iglesia y olas a la vez.',
        },
      ],
    },
    style: {
      title: 'El ritmo y el sonido de Tarragona',
      paras: [
        `Tarragona es una ciudad muy **cinematográfica**: la piedra dorada, el mar siempre cerca y unos atardeceres largos que en verano estiran la hora mágica. Aprovechamos esa luz para los planos amplios y los travellings, y la mezclamos con el sonido real del lugar —campanas, olas, el bullicio de la Part Alta— para que el film tenga textura y no suene a plantilla.`,
        `El contraste romano-medieval-mar en cinco minutos nos da mucho juego para el **montaje**: alternamos la intimidad de un callejón con la amplitud de un balcón sobre el Mediterráneo sin ningún traslado. Y alrededor, el **Camp de Tarragona** ofrece masías como **Mas La Boella**, entre olivos, donde el dron y los planos abiertos de campo dan otro aire a la película.`,
      ],
    },
    approach: {
      title: 'Cómo filmamos una boda en Tarragona',
      bullets: [
        '**Cine, no resumen**: construimos una película con ritmo y narrativa, no un recopilatorio de clips.',
        '**Sonido real primero**: grabamos los votos, los discursos y el ambiente con micrófonos discretos y montamos sobre esas voces.',
        '**Movimiento**: estabilizador y travellings para los planos amplios de mar y piedra que la foto no puede dar.',
        '**Dron donde se puede**: planos aéreos de la costa y el castillo cuando el espacio aéreo y los permisos lo permiten.',
        '**Permisos con tiempo**: dentro de monumentos con entrada o para volar, lo gestionamos con el MHT antes del día.',
        '**Tráiler y película completa**: un tráiler corto para compartir enseguida y la película larga con la ceremonia entera.',
      ],
    },
    gallery: {
      title: 'Vídeos de boda en el Camp de Tarragona',
      intro:
        'Una muestra de nuestro trabajo en vídeo en la zona. Cuando todavía no tenemos un film público ligado a esta ciudad, os enseñamos películas reales de otras bodas del Camp de Tarragona para que sintáis nuestro ritmo y nuestro trato del sonido.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Tenéis fecha libre para el vídeo de nuestra boda en Tarragona?',
        a: 'Cogemos un número limitado de bodas por temporada para cuidar cada film. Escribidnos con la fecha cuanto antes y os confirmamos disponibilidad enseguida; primavera y otoño se llenan pronto.',
      },
      {
        q: '¿Tenéis que desplazaros? ¿Cobráis kilometraje?',
        a: 'Somos de Reus, a un cuarto de hora de Tarragona, y la ciudad es zona nuestra: no hay suplemento de desplazamiento para bodas en el Camp de Tarragona. Para destinos más lejanos lo hablamos abiertamente antes de cerrar nada.',
      },
      {
        q: '¿Cuándo tendremos el vídeo?',
        a: 'Primero recibís el **tráiler** pocas semanas después de la boda y, más adelante, la **película completa** con la ceremonia entera. Os damos los plazos exactos cuando cerramos la agenda del año.',
      },
      {
        q: '¿Podemos contratar vídeo y foto a la vez?',
        a: 'Sí, y es lo que recomendamos. Eric hace el vídeo y Ferran la foto, somos hermanos y trabajamos coordinados: no nos cruzamos delante de la cámara y el día os sale más redondo y a menudo más ajustado de precio que con dos equipos separados.',
      },
      {
        q: '¿Podéis volar el dron o rodar dentro del Anfiteatro?',
        a: 'Los monumentos romanos con entrada los gestiona el MHT y hace falta autorización tanto para rodar dentro como para volar; el dron también depende del espacio aéreo de la zona. Lo tramitamos con tiempo cuando se puede; si no, conseguimos planos espectaculares desde el Passeig Arqueològic y desde fuera.',
      },
    ],
    finalCta: {
      h2: 'Hacemos el vídeo de vuestra boda en Tarragona',
      body: 'Contadnos cómo os imagináis el día y qué rincones de Tarragona queréis ver en la película. Os respondemos rápido, sin compromiso, y os decimos enseguida si tenemos la fecha libre.',
    },
    formTitle: 'Pedid disponibilidad y presupuesto',
    formIntro:
      'Decidnos la fecha, el lugar de la ceremonia y si queréis solo vídeo o también fotografía. Os contestamos en persona, nunca con un formulario automático.',
    whatsAppMessage:
      '¡Hola Lifetime Weddings! Nos casamos en Tarragona y queremos información de vídeo de boda.',
    breadcrumbCurrent: 'Vídeo de boda en Tarragona',
  },
  en: {
    meta: {
      title: 'Wedding videographer in Tarragona | Lifetime Weddings',
      description:
        'Wedding videographer in Tarragona: honest cinema, movement and real sound in the Old Town, Mediterranean Balcony and El Serrallo. Trailer and full film.',
    },
    hero: {
      eyebrow: 'Wedding film · Tarragona',
      h1: 'Wedding videographer in Tarragona',
      sub: 'A film, not a recap. The real sound of the vows, wide shots of sea and stone, and the movement a photograph can’t hold. We are two brothers from Reus.',
      heroAlt: 'Video camera filming a wedding ceremony in Tarragona’s medieval Old Town',
    },
    cardTitle: 'Wedding videographer in Tarragona',
    cardBlurb:
      'A Tarragona wedding film with real sound and a cinematic eye: the Old Town, the Mediterranean Balcony and El Serrallo, with a trailer and a full film.',
    intro: {
      title: 'Your Tarragona wedding, turned into a film',
      paras: [
        `We are **Ferran and Eric**, two brothers from **Reus**. Eric shoots the film and Ferran the photography, and between us we cover the **Camp de Tarragona** every season. A wedding video is not an album that moves: it is a **film**. Rhythm, sound and movement matter to us as much as the image: ten years from now we want you to feel the day, not just look at it.`,
        `What makes a film unique is the **real sound**: the voice that trembles during the vows, the silence before the "I do", an aunt’s laugh in the courtyard, the waves below the Balcony. We record clean audio with discreet microphones and build the film on those true voices, not on some song drowning everything out. Tarragona, on top of that, hands us a cinematic set: Roman stone, the sea and long dusks.`,
        `Being local lets us shoot with our heads: we know how to move the camera through the Old Town without stepping into a frame and at what hour the Balcony sea becomes a golden backdrop. And if you want the full day, Ferran **photographs your Tarragona wedding** on the same date; we work in sync and never cross in front of the lens.`,
      ],
    },
    spots: {
      title: 'Corners of Tarragona we film like cinema',
      intro:
        'Real places we genuinely use, built for movement and sound: where a wide shot can breathe, where a tracking shot glides and where the city sounds right.',
      items: [
        {
          name: 'Old Town & Cathedral',
          body: 'The medieval lanes ask for movement: we follow the couple on a gimbal as they walk and let the stone and the Cathedral bells set the soundtrack. This is where we film the most intimate shots and the footsteps that later open the trailer.',
        },
        {
          name: 'Mediterranean Balcony (Balcó del Mediterrani)',
          body: 'The iron balustrade over the sea is the wide shot of the day at dusk. We do a slow tracking shot toward the horizon with the real sound of waves and wind: a pure opening or closing to the film, the blue dissolving behind you.',
        },
        {
          name: 'Amphitheatre & Roman walls',
          body: 'Roman stone above the sea, imposing in a wide shot and more so from the air. Honestly: the Amphitheatre and ticketed monuments are run by the MHT, and both filming inside and flying a drone need authorisation; the drone also depends on the area’s airspace. We arrange it in advance or film from outside.',
        },
        {
          name: 'Passeig Arqueològic',
          body: 'The walkway between the two walls is a perfect corridor for tracking shots: the couple moves forward, the stone slides past on either side and the depth makes a very cinematic frame without entering any ticketed enclosure.',
        },
        {
          name: 'El Serrallo',
          body: 'The fishing quarter sounds like a harbour: boats, gulls, water. We record the ambient sound and texture shots —nets, reflections, low light on the water— that give the edit its soul and carry the film toward a warm late-afternoon close.',
        },
        {
          name: 'Tamarit Castle',
          body: 'A step from Tarragona, above the beach, a medieval castle with the sea at its feet: one of the few places where, with a permit, the drone delivers a spectacular aerial opening over stone, church and waves at once.',
        },
      ],
    },
    style: {
      title: 'The rhythm and sound of Tarragona',
      paras: [
        `Tarragona is a deeply **cinematic** city: golden stone, the sea always close and long dusks that in summer stretch the magic hour. We use that light for the wide shots and tracking shots, and blend it with the real sound of the place —bells, waves, the buzz of an Old Town street— so the film has texture and never sounds like a template.`,
        `The Roman-medieval-sea contrast within a five-minute walk gives us a lot to work with in the **edit**: we alternate the intimacy of a lane with the openness of a balcony over the Mediterranean without any transfer. And all around, the **Camp de Tarragona** offers country estates like **Mas La Boella**, set among olive trees, where the drone and open country shots give the film another mood.`,
      ],
    },
    approach: {
      title: 'How we film a Tarragona wedding',
      bullets: [
        '**Cinema, not a recap**: we build a film with rhythm and narrative, not a montage of clips.',
        '**Real sound first**: we record the vows, the speeches and the ambience with discreet microphones and edit on those voices.',
        '**Movement**: gimbal and tracking shots for the wide sea-and-stone frames a photograph can’t give.',
        '**Drone where allowed**: aerials of the coast and the castle when airspace and permits allow.',
        '**Permits in advance**: inside ticketed monuments or to fly, we arrange it with the MHT before the day.',
        '**Trailer and full film**: a short trailer to share right away and the long film with the whole ceremony.',
      ],
    },
    gallery: {
      title: 'Wedding films across the Camp de Tarragona',
      intro:
        'A sample of our video work in the area. Where we don’t yet have a public film tied to this city, we show real films from other Camp de Tarragona weddings so you can feel our rhythm and how we handle sound.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Do you have our Tarragona date free for the film?',
        a: 'We take a limited number of weddings each season so we can look after every film. Write to us with your date as early as you can and we confirm availability right away; spring and autumn fill up fast.',
      },
      {
        q: 'Do you have to travel? Is there a mileage surcharge?',
        a: 'We are from Reus, fifteen minutes from Tarragona, and the city is our home ground: there is no travel surcharge for weddings in the Camp de Tarragona. For destinations further afield we talk it through openly before anything is agreed.',
      },
      {
        q: 'When will we get the video?',
        a: 'You first receive the **trailer** a few weeks after the wedding and, later, the **full film** with the whole ceremony. We give you the exact timings when we lock the year’s schedule.',
      },
      {
        q: 'Can we book video and photo together?',
        a: 'Yes, and it is what we recommend. Eric shoots the film and Ferran the photos, we are brothers and work in sync: we don’t cross in front of the camera, and the day comes out more complete and often better value than with two separate teams.',
      },
      {
        q: 'Can you fly the drone or film inside the Amphitheatre?',
        a: 'The ticketed Roman monuments are run by the MHT and authorisation is needed both to film inside and to fly; the drone also depends on the area’s airspace. We arrange it in advance when possible; if not, we get striking shots from the Passeig Arqueològic and from outside.',
      },
    ],
    finalCta: {
      h2: 'We’ll film your Tarragona wedding',
      body: 'Tell us how you picture the day and which corners of Tarragona you want in the film. We reply quickly, with no obligation, and let you know straight away if your date is free.',
    },
    formTitle: 'Ask about availability and pricing',
    formIntro:
      'Tell us the date, the ceremony venue and whether you want video only or video and photo. We answer in person, never with an automated form.',
    whatsAppMessage:
      'Hello Lifetime Weddings! We are getting married in Tarragona and would like information about wedding video.',
    breadcrumbCurrent: 'Wedding videographer in Tarragona',
  },
};
