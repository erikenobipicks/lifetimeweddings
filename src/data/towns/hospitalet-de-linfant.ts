import type { TownServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const HOSPITALET_TOWN: Record<Lang, TownServiceCopy> = {
  // ─── Català (veu principal) ────────────────────────────────────────
  ca: {
    meta: {
      title: "Fotògraf de boda a l'Hospitalet de l'Infant | Lifetime Weddings",
      description:
        "Fotògraf de boda a l'Hospitalet de l'Infant, al sud de la Costa Daurada. La Torre de Sant Jordi, cales verges cap a Vandellòs i mar tranquil. Som de Reus, sense recàrrec.",
    },
    hero: {
      eyebrow: 'Costa Daurada · Baix Camp',
      h1: "Fotògraf de boda a l'Hospitalet de l'Infant",
      sub: "La Torre de Sant Jordi al peu de la platja, cales verges cap a Vandellòs i un ambient tranquil de veritat. Som germans de Reus i cobrim l'Hospitalet sense recàrrec.",
      heroAlt: 'Parella el dia de la seva boda amb llum daurada de tarda vora una torre medieval a la platja',
      cta1: 'Mirem la vostra data',
    },
    cardTitle: "Fotografia de boda a l'Hospitalet de l'Infant",
    cardBlurb:
      "Una torre medieval a la sorra, cales verges i mar calmat. Un fotògraf de casa que sap on i quan cau la millor llum al sud de la Costa Daurada.",
    intro: {
      title: "L'Hospitalet de l'Infant, tal com la fotografiem nosaltres",
      paras: [
        `L'Hospitalet de l'Infant no és el sud massificat de la costa: és el sud tranquil, on el mar encara respira. Som en **Ferran** i l'**Eric**, dos germans de Reus, i baixem sovint fins aquí, on el Baix Camp toca el mar just abans de Vandellòs. Ho coneixem com a gent de casa, no com qui hi passa un cap de setmana d'estiu.`,
        `Aquesta vila té una cosa que no es fabrica: **calma**. La **Torre de Sant Jordi**, medieval, s'aixeca al peu mateix de la sorra —és el que queda de l'antic hospital que va donar nom al poble— i cap al sud s'obren cales verges que semblen d'un altre temps. Com a **fotògraf de boda a l'Hospitalet de l'Infant**, la meva feina —en Ferran a la càmera— és quedar-me amb aquesta veritat: la mà que tremola, la rialla que se t'escapa, la llum sobre l'aigua abans de sopar.`,
        `Som de **Reus** i cobrim l'Hospitalet **sense cap recàrrec de desplaçament**: per a nosaltres és casa. Moltes bodes les fem tots dos alhora —en Ferran la foto i l'Eric el vídeo—, colze a colze, sense trepitjar-nos, amb un únic relat del vostre dia.`,
      ],
    },
    nearbyVenues: {
      title: 'Espais de boda a prop',
      intro:
        "Llocs que coneixem o que cobrim de gust, entre el mar de l'Hospitalet i l'interior del Baix Camp. Si el vostre no hi és, digueu-nos-el: segurament hi hem estat.",
      items: [
        {
          name: 'Hotels vora el mar',
          body: "L'Hospitalet i el seu entorn tenen hotels i espais amb el Mediterrani com a fons: terrasses obertes, sopars a l'aire lliure i la posta de sol just davant. Per a un convit relaxat de peus a la sorra són una aposta segura, i coneixem la llum de cada hora.",
        },
        {
          name: 'Masies del Baix Camp sud',
          body: "Terra endins, entre camps i pins, les masies de pedra de la comarca donen una alternativa càlida al mar: llum de finestra, patis amb ombra i el silenci del camp. Perfectes si voleu recolliment i caràcter rural.",
        },
        {
          name: 'Termes de Montbrió',
          body: "A tocar, un resort balneari amb un jardí botànic centenari —palmeres, estanys i espècies rares— que és un dels espais més fotogènics del Baix Camp. Un dels nostres llocs preferits de la comarca per a retrats de parella.",
          internalSlug: 'termes-montbrio',
        },
        {
          name: 'Parc Samà',
          body: "Uns minuts amunt, els jardins colonials del segle XIX del Parc Samà —llac, palmeres i camins d'ombra— són un decorat de somni per a la sessió de parella. Val molt la pena l'escapada si us caseu per aquesta zona.",
          internalSlug: 'parc-sama',
        },
      ],
    },
    midCta: {
      title: "Ens caseu a l'Hospitalet de l'Infant?",
      body: "Expliqueu-nos la data i el lloc i us direm amb sinceritat com aprofitaríem la torre, les cales i la llum del sud per a vosaltres. Sense compromís i, com sempre, sense recàrrec per venir.",
      label: 'Demaneu-nos preu',
    },
    photoSpots: {
      title: "Els llocs que fem servir a l'Hospitalet",
      intro:
        'Cinc racons que coneixem de memòria, cadascun amb l\'hora on dona el millor. No són parades turístiques: són llocs on la fotografia respira.',
      items: [
        {
          name: 'La Torre de Sant Jordi',
          body: "El símbol del poble: una torre medieval al peu mateix de la platja, el que queda de l'antic hospital de camí que va batejar l'Hospitalet. A la posta, la pedra s'encén d'or i fa un fons únic per a un retrat que ningú més té.",
        },
        {
          name: "Cala de l'Àliga i les cales cap a Vandellòs",
          body: "Cap al sud s'obren cales de roca i aigua clara, verges i sovint buides. Un desviament curt per a mar salvatge i intimitat total: aquí un retrat de parella respira sense ningú a la vora.",
        },
        {
          name: 'El port',
          body: "El port esportiu i pesquer dona textura: pantalans, reflexos i barques. Un fons mariner i honest, amb olor de mar, per a retrats amb caràcter de vila.",
        },
        {
          name: 'El passeig marítim',
          body: 'Sorra ampla i un horitzó net. A primera hora o a l\'hora bona el passeig es calma i queda tot per a vosaltres: passes descalços i el Mediterrani de fons.',
        },
        {
          name: 'La platja del Torn',
          body: "Una platja llarga i salvatge, envoltada de pins, coneguda com a espai naturista. La mencionem amb respecte: és natura en estat pur i, ben treballada amb discreció, dona un fons de mar obert sense res construït al voltant.",
        },
      ],
    },
    valueExtra: {
      title: 'Per què el sud tranquil juga a favor vostre',
      paras: [
        `Les **cales verges** cap a Vandellòs no són només boniques: són **intimitat**. Mentre les platges grans del nord de la costa bullen a l'estiu, aquí trobem racons buits on podeu ser vosaltres, sense públic ni presses. Això es nota a les fotos: gent còmoda, sense la càmera al damunt.`,
        `La **Torre de Sant Jordi** és un regal per a qui es casa aquí: un símbol amb segles a sobre, al peu de la sorra, que dona a un retrat un fons que cap altre poble té. I la llum del sud, més neta i oberta que la del nord de la costa, pinta les millors imatges a l'**hora bona**, just abans de la posta. Saber-ho és la diferència entre una foto correcta i una que et fa un nus a la gola deu anys després.`,
      ],
    },
    gallery: {
      title: 'Feina real, no muntatges',
      intro:
        "Aquestes imatges són de la nostra feina real de boda. Quan encara no tenim una galeria sencera a l'Hospitalet ho diem clar i us mostrem treball autèntic d'altres bodes de la Costa Daurada.",
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: "Cobriu l'Hospitalet de l'Infant sense recàrrec?",
        a: "Sí. Som de Reus i per a nosaltres l'Hospitalet és casa: no hi ha cap recàrrec de desplaçament. El preu és el mateix que a qualsevol boda de la comarca.",
      },
      {
        q: 'Podem contractar foto i vídeo alhora?',
        a: "És el que més recomanem. En Ferran fa la foto i l'Eric el vídeo; ens coneixem tant que treballem sense trepitjar-nos, amb un únic relat del vostre dia i una sola coordinació per a vosaltres.",
      },
      {
        q: 'Quan rebem les fotos?',
        a: "L'entrega sol ser en una setmana aproximadament. Reps totes les imatges bones del dia, editades a mà una a una en una galeria privada, mai per lots.",
      },
      {
        q: 'Ens volem casar en una cala. Es pot?',
        a: "Es pot, però les platges i cales són espai públic i sovint cal permís de l'ajuntament o de Costes segons la data i l'aforament. Us ajudem a orientar-vos i, si cal, busquem l'hora on la cala queda més tranquil·la per a vosaltres.",
      },
      {
        q: 'Es pot volar dron a les platges?',
        a: "Depèn de la zona i del permís; ho gestiona l'Eric per a la part de vídeo, sempre dins de la normativa. Per a fotografia no cal: la torre, les cales i la llum de mar ja donen tot el que necessitem.",
      },
    ],
    finalCta: {
      h2: "Fem la vostra boda a l'Hospitalet de l'Infant",
      body: "Expliqueu-nos la vostra data i el vostre lloc. Us direm amb sinceritat com aprofitaríem la Torre de Sant Jordi i les cales del sud per a vosaltres, sense compromís.",
      label: 'Parlem del vostre dia',
    },
    formTitle: "Parlem de la vostra boda a l'Hospitalet",
    formIntro:
      'Deixeu-nos la data, el lloc i quatre paraules de com us imagineu el dia. Us responem aviat, sempre nosaltres dos.',
    whatsAppMessage:
      "Hola Ferran! Ens casem a l'Hospitalet de l'Infant i ens agradaria informació de fotografia de boda.",
    breadcrumbCurrent: "Fotògraf de boda a l'Hospitalet de l'Infant",
  },

  // ─── Español (peninsular) ──────────────────────────────────────────
  es: {
    meta: {
      title: "Fotógrafo de boda en l'Hospitalet de l'Infant | Lifetime Weddings",
      description:
        "Fotógrafo de boda en l'Hospitalet de l'Infant, en el sur de la Costa Daurada. La Torre de Sant Jordi, calas vírgenes hacia Vandellòs y mar tranquilo. Somos de Reus, sin recargo.",
    },
    hero: {
      eyebrow: 'Costa Daurada · Baix Camp',
      h1: "Fotógrafo de boda en l'Hospitalet de l'Infant",
      sub: "La Torre de Sant Jordi al pie de la playa, calas vírgenes hacia Vandellòs y un ambiente tranquilo de verdad. Somos hermanos de Reus y cubrimos l'Hospitalet sin recargo.",
      heroAlt: 'Pareja el día de su boda con luz dorada de tarde junto a una torre medieval en la playa',
      cta1: 'Miremos vuestra fecha',
    },
    cardTitle: "Fotografía de boda en l'Hospitalet de l'Infant",
    cardBlurb:
      'Una torre medieval en la arena, calas vírgenes y mar en calma. Un fotógrafo de casa que sabe dónde y cuándo cae la mejor luz en el sur de la Costa Daurada.',
    intro: {
      title: "L'Hospitalet de l'Infant, tal y como la fotografiamos nosotros",
      paras: [
        `L'Hospitalet de l'Infant no es el sur masificado de la costa: es el sur tranquilo, donde el mar todavía respira. Somos **Ferran** y **Eric**, dos hermanos de Reus, y bajamos a menudo hasta aquí, donde el Baix Camp toca el mar justo antes de Vandellòs. Lo conocemos como gente de casa, no como quien pasa un fin de semana de verano.`,
        `Este pueblo tiene algo que no se fabrica: **calma**. La **Torre de Sant Jordi**, medieval, se levanta al pie mismo de la arena —es lo que queda del antiguo hospital de camino que dio nombre al pueblo— y hacia el sur se abren calas vírgenes que parecen de otro tiempo. Como **fotógrafo de boda en l'Hospitalet de l'Infant**, mi trabajo —Ferran a la cámara— es quedarme con esa verdad: la mano que tiembla, la risa que se te escapa, la luz sobre el agua antes de la cena.`,
        `Somos de **Reus** y cubrimos l'Hospitalet **sin ningún recargo de desplazamiento**: para nosotros es casa. Muchas bodas las hacemos los dos a la vez —Ferran la foto y Eric el vídeo—, codo con codo, sin pisarnos, con un único relato de vuestro día.`,
      ],
    },
    nearbyVenues: {
      title: 'Espacios de boda cerca',
      intro:
        "Lugares que conocemos o que cubrimos con gusto, entre el mar de l'Hospitalet y el interior del Baix Camp. Si el vuestro no está, decídnoslo: seguramente hemos estado allí.",
      items: [
        {
          name: 'Hoteles frente al mar',
          body: "L'Hospitalet y su entorno tienen hoteles y espacios con el Mediterráneo como fondo: terrazas abiertas, cenas al aire libre y la puesta de sol justo delante. Para un convite relajado con los pies en la arena son una apuesta segura, y conocemos la luz de cada hora.",
        },
        {
          name: 'Masías del Baix Camp sur',
          body: 'Tierra adentro, entre campos y pinos, las masías de piedra de la comarca dan una alternativa cálida al mar: luz de ventana, patios con sombra y el silencio del campo. Perfectas si buscáis recogimiento y carácter rural.',
        },
        {
          name: 'Termes de Montbrió',
          body: 'Muy cerca, un resort balneario con un jardín botánico centenario —palmeras, estanques y especies raras— que es uno de los espacios más fotogénicos del Baix Camp. Uno de nuestros lugares favoritos de la comarca para retratos de pareja.',
          internalSlug: 'termes-montbrio',
        },
        {
          name: 'Parc Samà',
          body: 'Unos minutos subiendo, los jardines coloniales del siglo XIX del Parc Samà —lago, palmeras y caminos de sombra— son un decorado de ensueño para la sesión de pareja. Merece mucho la pena la escapada si os casáis por esta zona.',
          internalSlug: 'parc-sama',
        },
      ],
    },
    midCta: {
      title: "¿Os casáis en l'Hospitalet de l'Infant?",
      body: 'Contadnos la fecha y el lugar y os diremos con sinceridad cómo aprovecharíamos la torre, las calas y la luz del sur para vosotros. Sin compromiso y, como siempre, sin recargo por venir.',
      label: 'Pedidnos precio',
    },
    photoSpots: {
      title: "Los lugares que usamos en l'Hospitalet",
      intro:
        'Cinco rincones que conocemos de memoria, cada uno con la hora en la que da lo mejor. No son paradas turísticas: son sitios donde la fotografía respira.',
      items: [
        {
          name: 'La Torre de Sant Jordi',
          body: "El símbolo del pueblo: una torre medieval al pie mismo de la playa, lo que queda del antiguo hospital de camino que bautizó l'Hospitalet. Al atardecer, la piedra se enciende de oro y da un fondo único para un retrato que nadie más tiene.",
        },
        {
          name: "Cala de l'Àliga y las calas hacia Vandellòs",
          body: 'Hacia el sur se abren calas de roca y agua clara, vírgenes y a menudo vacías. Un desvío corto para mar salvaje e intimidad total: aquí un retrato de pareja respira sin nadie alrededor.',
        },
        {
          name: 'El puerto',
          body: 'El puerto deportivo y pesquero da textura: pantalanes, reflejos y barcas. Un fondo marinero y honesto, con olor a mar, para retratos con carácter de pueblo.',
        },
        {
          name: 'El paseo marítimo',
          body: 'Arena amplia y un horizonte limpio. A primera hora o en la hora buena el paseo se calma y queda entero para vosotros: pasos descalzos y el Mediterráneo de fondo.',
        },
        {
          name: 'La playa del Torn',
          body: 'Una playa larga y salvaje, rodeada de pinos, conocida como espacio naturista. La mencionamos con respeto: es naturaleza en estado puro y, bien trabajada con discreción, da un fondo de mar abierto sin nada construido alrededor.',
        },
      ],
    },
    valueExtra: {
      title: 'Por qué el sur tranquilo juega a vuestro favor',
      paras: [
        `Las **calas vírgenes** hacia Vandellòs no son solo bonitas: son **intimidad**. Mientras las playas grandes del norte de la costa hierven en verano, aquí encontramos rincones vacíos donde podéis ser vosotros, sin público ni prisas. Eso se nota en las fotos: gente cómoda, sin la cámara encima.`,
        `La **Torre de Sant Jordi** es un regalo para quien se casa aquí: un símbolo con siglos a la espalda, al pie de la arena, que da a un retrato un fondo que ningún otro pueblo tiene. Y la luz del sur, más limpia y abierta que la del norte de la costa, pinta las mejores imágenes en la **hora buena**, justo antes del ocaso. Saberlo es la diferencia entre una foto correcta y una que te hace un nudo en la garganta diez años después.`,
      ],
    },
    gallery: {
      title: 'Trabajo real, no montajes',
      intro:
        "Estas imágenes son de nuestro trabajo real de boda. Cuando todavía no tenemos una galería entera en l'Hospitalet lo decimos claro y os mostramos trabajo auténtico de otras bodas de la Costa Daurada.",
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: "¿Cubrís l'Hospitalet de l'Infant sin recargo?",
        a: "Sí. Somos de Reus y para nosotros l'Hospitalet es casa: no hay ningún recargo de desplazamiento. El precio es el mismo que en cualquier boda de la comarca.",
      },
      {
        q: '¿Podemos contratar foto y vídeo a la vez?',
        a: 'Es lo que más recomendamos. Ferran hace la foto y Eric el vídeo; nos conocemos tanto que trabajamos sin pisarnos, con un único relato de vuestro día y una sola coordinación para vosotros.',
      },
      {
        q: '¿Cuándo recibimos las fotos?',
        a: 'La entrega suele ser en una semana aproximadamente. Recibes todas las imágenes buenas del día, editadas a mano una a una en una galería privada, nunca por lotes.',
      },
      {
        q: '¿Queremos casarnos en una cala. Se puede?',
        a: 'Se puede, pero las playas y calas son espacio público y a menudo hace falta permiso del ayuntamiento o de Costas según la fecha y el aforo. Os ayudamos a orientaros y, si hace falta, buscamos la hora en la que la cala queda más tranquila para vosotros.',
      },
      {
        q: '¿Se puede volar dron en las playas?',
        a: 'Depende de la zona y del permiso; lo gestiona Eric para la parte de vídeo, siempre dentro de la normativa. Para fotografía no hace falta: la torre, las calas y la luz de mar ya dan todo lo que necesitamos.',
      },
    ],
    finalCta: {
      h2: "Hagamos vuestra boda en l'Hospitalet de l'Infant",
      body: 'Contadnos vuestra fecha y vuestro lugar. Os diremos con sinceridad cómo aprovecharíamos la Torre de Sant Jordi y las calas del sur para vosotros, sin compromiso.',
      label: 'Hablemos de vuestro día',
    },
    formTitle: "Hablemos de vuestra boda en l'Hospitalet",
    formIntro:
      'Dejadnos la fecha, el lugar y cuatro palabras de cómo os imagináis el día. Os respondemos pronto, siempre nosotros dos.',
    whatsAppMessage:
      "¡Hola Ferran! Nos casamos en l'Hospitalet de l'Infant y nos gustaría información de fotografía de boda.",
    breadcrumbCurrent: "Fotógrafo de boda en l'Hospitalet de l'Infant",
  },

  // ─── English (editorial) ───────────────────────────────────────────
  en: {
    meta: {
      title: "Wedding photographer in l'Hospitalet de l'Infant | Lifetime Weddings",
      description:
        "Wedding photographer in l'Hospitalet de l'Infant, on the southern Costa Daurada. The Torre de Sant Jordi, wild coves towards Vandellòs and a calm, honest sea. Brothers from Reus, no travel fee.",
    },
    hero: {
      eyebrow: 'Costa Daurada · Baix Camp',
      h1: "Wedding photographer in l'Hospitalet de l'Infant",
      sub: "The Torre de Sant Jordi at the edge of the sand, wild coves towards Vandellòs and a truly quiet mood. We are brothers from Reus and we cover l'Hospitalet with no travel fee.",
      heroAlt: 'Couple on their wedding day in golden afternoon light beside a medieval tower on the beach',
      cta1: 'Let\'s check your date',
    },
    cardTitle: "Wedding photography in l'Hospitalet de l'Infant",
    cardBlurb:
      'A medieval tower on the sand, wild coves and a calm sea. A local photographer who knows where and when the best light falls on the southern Costa Daurada.',
    intro: {
      title: "L'Hospitalet de l'Infant, the way we photograph it",
      paras: [
        `L'Hospitalet de l'Infant is not the crowded south of the coast: it is the quiet south, where the sea still breathes. We are **Ferran** and **Eric**, two brothers from Reus, and we come down here often, where the Baix Camp meets the sea just before Vandellòs. We know it as locals, not as people passing through for a summer weekend.`,
        `This town has something you cannot manufacture: **calm**. The **Torre de Sant Jordi**, medieval, rises at the very edge of the sand — it is what remains of the old waystation hospital that gave the town its name — and to the south open wild coves that feel like another age. As a **wedding photographer in l'Hospitalet de l'Infant**, my job — Ferran, behind the camera — is to keep what is true: the hand that trembles, the laugh that slips out, the light on the water before dinner.`,
        `We are from **Reus** and we cover l'Hospitalet with **no travel fee at all**: to us it is home. Many weddings we shoot together — Ferran the photography, Eric the film — side by side, without getting in each other's way, telling one coherent story of your day.`,
      ],
    },
    nearbyVenues: {
      title: 'Wedding venues nearby',
      intro:
        "Places we know, or gladly cover, between the sea at l'Hospitalet and the inland Baix Camp. If yours isn't listed, tell us — we've probably been there.",
      items: [
        {
          name: 'Seafront hotels',
          body: "L'Hospitalet and its surroundings have hotels and spaces with the Mediterranean as their backdrop: open terraces, dinners in the open air and the sunset right in front. For a relaxed reception with your feet in the sand they are a safe bet, and we know the light of every hour.",
        },
        {
          name: 'Masies of the southern Baix Camp',
          body: 'Inland, among fields and pines, the region\'s stone farmhouses give a warm alternative to the sea: window light, shaded courtyards and the quiet of the countryside. Perfect if you want seclusion and rural character.',
        },
        {
          name: 'Termes de Montbrió',
          body: 'Close by, a spa resort with a century-old botanical garden — palms, ponds and rare species — that is one of the most photogenic settings in the Baix Camp. One of our favourite spots in the region for couple portraits.',
          internalSlug: 'termes-montbrio',
        },
        {
          name: 'Parc Samà',
          body: 'A few minutes up the road, the nineteenth-century colonial gardens of Parc Samà — a lake, palms and shaded paths — are a dream setting for the couple session. Well worth the short trip if you marry around here.',
          internalSlug: 'parc-sama',
        },
      ],
    },
    midCta: {
      title: "Marrying in l'Hospitalet de l'Infant?",
      body: "Tell us the date and the place and we'll say honestly how we'd use the tower, the coves and the southern light for you. No obligation and, as always, no fee for coming.",
      label: 'Ask us for a quote',
    },
    photoSpots: {
      title: "The places we use in l'Hospitalet",
      intro:
        'Five corners we know by heart, each with the hour it gives its best. These are not tourist stops: they are places where photography can breathe.',
      items: [
        {
          name: 'The Torre de Sant Jordi',
          body: "The town's emblem: a medieval tower at the very edge of the beach, all that remains of the old waystation hospital that named l'Hospitalet. At sunset the stone glows gold and gives a backdrop for a portrait no one else has.",
        },
        {
          name: "Cala de l'Àliga and the coves towards Vandellòs",
          body: 'To the south open rocky coves of clear water, wild and often empty. A short detour for wild sea and complete privacy: here a couple portrait can breathe with no one nearby.',
        },
        {
          name: 'The port',
          body: 'The marina and fishing port bring texture: jetties, reflections and boats. An honest maritime backdrop, with the smell of the sea, for portraits with a town\'s character.',
        },
        {
          name: 'The seafront promenade',
          body: 'Broad sand and a clean horizon. Early or in the golden hour the promenade quiets and is yours alone: bare footsteps and the Mediterranean behind you.',
        },
        {
          name: 'Platja del Torn',
          body: 'A long, wild beach ringed by pines, known as a naturist stretch. We mention it with respect: it is nature at its purest and, worked with discretion, it gives an open-sea backdrop with nothing built around it.',
        },
      ],
    },
    valueExtra: {
      title: 'Why the quiet south works in your favour',
      paras: [
        `The **wild coves** towards Vandellòs are not just beautiful: they are **privacy**. While the big beaches to the north of the coast boil over in summer, here we find empty corners where you can simply be yourselves, with no crowd and no rush. It shows in the photos: people at ease, with no camera bearing down on them.`,
        `The **Torre de Sant Jordi** is a gift for anyone marrying here: an emblem with centuries behind it, at the edge of the sand, giving a portrait a backdrop no other town can offer. And the southern light, cleaner and more open than the northern coast's, paints the best images in the **golden hour**, just before sunset. Knowing this is the difference between a correct photo and one that catches in your throat ten years later.`,
      ],
    },
    gallery: {
      title: 'Real work, not mock-ups',
      intro:
        "These images are from our real wedding work. When we don't yet have a full gallery shot in l'Hospitalet we say so plainly and show you genuine work from other Costa Daurada weddings.",
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: "Do you cover l'Hospitalet de l'Infant with no surcharge?",
        a: "Yes. We are from Reus and l'Hospitalet is home to us: there is no travel surcharge. The price is the same as for any wedding in the region.",
      },
      {
        q: 'Can we book photo and video together?',
        a: 'It is what we most recommend. Ferran shoots the photography and Eric the film; we know each other so well that we work without clashing, with one coherent story of your day and a single point of coordination for you.',
      },
      {
        q: 'When do we get the photos?',
        a: 'Delivery is usually within about a week. You receive every good image from the day, hand-edited one by one in a private gallery, never batched.',
      },
      {
        q: 'We want to marry on a cove. Is that possible?',
        a: 'It is, but the beaches and coves are public land and often need a permit from the town hall or the coastal authority, depending on the date and the number of guests. We help you find your way through it and, if needed, pick the hour when the cove is quietest for you.',
      },
      {
        q: 'Can a drone be flown over the beaches?',
        a: "It depends on the zone and the permit; Eric handles that for the video, always within the rules. For photography it isn't needed: the tower, the coves and the sea light already give everything we want.",
      },
    ],
    finalCta: {
      h2: "Let's make your l'Hospitalet de l'Infant wedding",
      body: "Tell us your date and your place. We'll tell you honestly how we'd use the Torre de Sant Jordi and the southern coves for you — no obligation.",
      label: 'Let\'s talk about your day',
    },
    formTitle: "Let's talk about your l'Hospitalet wedding",
    formIntro:
      'Leave us the date, the place and a few words on how you picture the day. We reply soon, always the two of us.',
    whatsAppMessage:
      "Hi Ferran! We're getting married in l'Hospitalet de l'Infant and would love information about wedding photography.",
    breadcrumbCurrent: "Wedding photographer in l'Hospitalet de l'Infant",
  },
};
