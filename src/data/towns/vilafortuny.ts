// Vilafortuny — TOWN service copy (ca / es / en).
//
// Vilafortuny is the quiet, residential beach neighbourhood of Cambrils
// (Baix Camp, Costa Daurada): family sand, the medieval Castell de
// Vilafortuny by the sea, and a calmer, more intimate mood than the
// centre of Cambrils. This block is deliberately DISTINCT from the
// Cambrils city page — it leans on the tower + the tranquil beach, not
// the fishing port. Honesty rule: no faked real weddings; nearby venues
// are described from public knowledge and linked internally when we have
// our own fiche (Parc Samà → /venues/parc-sama).

import type { TownServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const VILAFORTUNY_TOWN: Record<Lang, TownServiceCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Vilafortuny | Lifetime Weddings',
      description:
        'Fotògraf de boda a Vilafortuny, la platja tranquil·la de Cambrils, a la Costa Daurada. El castell medieval vora el mar i una sorra familiar per a retrats íntims. Som de Reus, a prop, sense recàrrec.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Cambrils · Baix Camp',
      h1: 'Fotògraf de boda a Vilafortuny',
      sub: 'La platja més calmada de Cambrils i un castell medieval a tocar de l\'aigua. Som germans de Reus, a pocs minuts, i fotografiem bodes aquí sense recàrrec de desplaçament.',
      heroAlt: 'Parella el dia de la seva boda amb llum daurada de tarda en una platja tranquil·la',
      cta1: 'Mira si tenim la teva data',
    },
    cardTitle: 'Fotografia de boda a Vilafortuny',
    cardBlurb:
      'La cara íntima de Cambrils: sorra familiar, poca gent i una torre medieval vora el mar. Retrats amb calma i llum de casa.',
    intro: {
      title: 'Vilafortuny, la platja tranquil·la de Cambrils',
      paras: [
        `Vilafortuny és el barri de mar de **Cambrils** que la majoria de guies no expliquen: una zona residencial de segones residències, jardins i xalets, amb una platja llarga i familiar on al matí només hi ha qui passeja el gos. No té el brogit del centre ni la cua de restaurants del port. Té una altra cosa, més difícil de trobar un dia de boda: **calma**. I aquí, la calma és or.`,
        `Som en **Ferran** i l\'**Eric**, dos germans de **Reus**, a un quart d\'hora curt de Vilafortuny. Hem baixat a aquestes platges tota la vida i les coneixem quan són buides, no només quan surten a les fotos d\'estiu. Aquesta pàgina va de **fotografia** —jo, en Ferran, a la càmera— i del que fa especial casar-se en aquest tros de costa i no en un altre.`,
        `El que ven Vilafortuny és el contrast: una **sorra tranquil·la** per als retrats íntims i, a pocs metres, el **Castell de Vilafortuny**, una torre medieval que mira el Mediterrani des de fa segles. Pedra i mar en la mateixa passejada. Per a una parella que vol fotos serenes, sense multituds al fons, és un dels racons més agraïts de tota la Costa Daurada.`,
      ],
    },
    nearbyVenues: {
      title: 'On et pots casar a prop de Vilafortuny',
      intro:
        'Espais reals de l\'entorn immediat, descrits pel que són. Quan en coneixem un de primera mà t\'ho diem; quan no, també.',
      items: [
        {
          name: 'Castell de Vilafortuny',
          body: 'Una **torre de defensa medieval** reconvertida i ampliada al llarg dels segles, plantada literalment davant del mar. No és un saló de convidats a l\'ús, però la seva silueta de pedra és el teló de fons que defineix el barri: dona als retrats un pòsit d\'història que la platja sola no té.',
        },
        {
          name: 'Parc Samà',
          body: 'A pocs minuts terra endins, el jardí històric del segle XIX amb llac, palmeres i torre neomedieval. Si la teva cerimònia és a la zona i vols retrats amb vegetació tropical, és la millor parada verda del voltant.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'Les masies del Baix Camp',
          body: 'Entre Cambrils i Reus, les masies de pedra amb pati i vinya donen l\'alternativa càlida al mar: llum de finestra, ombra de figuera i el silenci del camp per a un convit recollit.',
        },
        {
          name: 'Hotels i xalets de primera línia',
          body: 'Vilafortuny és zona d\'allotjaments vora la sorra. Molts casaments d\'aquí barregen un àpat a l\'hotel o a una casa llogada amb els retrats a la platja de davant. Còmode, discret i amb el mar sempre a mà.',
        },
      ],
    },
    midCta: {
      title: 'Encara tens la data lliure?',
      body: 'Nomes cobrim un nombre limitat de bodes l\'any per poder-les viure de veritat. Si et cases a Vilafortuny o a Cambrils, val la pena mirar l\'agenda aviat.',
      label: 'Consulta la teva data per WhatsApp',
    },
    photoSpots: {
      title: 'Els nostres racons a Vilafortuny',
      intro:
        'Quatre llocs a pocs passos l\'un de l\'altre, cadascun amb la seva millor hora. No són parades turístiques: són on la fotografia respira sense gent al fons.',
      items: [
        {
          name: 'La platja de Vilafortuny',
          body: 'Sorra ampla i tranquil·la, molt més buida que la del centre de Cambrils. A primera hora i a la posta és tota vostra: passes descalços, horitzó net i cap ombrel·la de lloguer per enmig. La platja per a retrats **íntims** de la zona.',
        },
        {
          name: 'El Castell de Vilafortuny',
          body: 'La torre medieval vora el mar. La seva pedra fosca contra el cel de tarda dona un contrast poderós; un parell de retrats aquí i la resta a la sorra, i ja tens història i mar en la mateixa sèrie.',
        },
        {
          name: 'La Llosa',
          body: 'El tram de costa baixa i rocosa que trenca la línia d\'arena. Les roques planes i els bassals que deixa la marea baixa fan primers plans i reflexos que una platja llisa no et dona. Compte amb el relliscós; s\'hi treballa amb calma.',
        },
        {
          name: 'El passeig cap a Salou al capvespre',
          body: 'La vorera de mar que enllaça Vilafortuny amb Cambrils i, més enllà, amb Salou. A l\'hora daurada el sol baix ho pinta tot d\'or vell i es camina sense presses, l\'estona perfecta per als retrats de parella lluny de la gent.',
        },
      ],
    },
    valueExtra: {
      title: 'Per què una platja tranquil·la et dona millors fotos',
      paras: [
        `Una platja buida no és només més bonica: és tècnicament millor. Sense multituds al fons no cal amagar caps ni retallar l\'enquadrament, i pots posar-te a la distància justa per als **retrats de cos sencer** amb el mar net darrere. A Vilafortuny això passa de manera natural gairebé cada matí i cada capvespre; al centre de Cambrils, en plena temporada, has de lluitar-hi.`,
        `La millor hora aquí és clara: la **posta**. La costa mira de cara al ponent obert, i l\'última mitja hora de sol regala una llum càlida i baixa que embolcalla la pell sense encegar. Si la teva cerimònia acaba a mitja tarda, reservem quinze o vint minuts a l\'hora daurada per baixar a la sorra —és el tram de fotos que després mires més vegades.`,
        `I el joc que fa única la zona: **combinar el castell i el mar** en la mateixa sessió. Comencem amb la pedra medieval per a un parell de retrats amb caràcter i acabem descalços a l\'aigua, tot en un passeig de cinc minuts. Història i Mediterrani sense agafar el cotxe, una cosa que ben poques platges de la Costa Daurada et poden oferir.`,
      ],
    },
    gallery: {
      title: 'Feina real, no muntatges',
      intro:
        'Aquestes imatges són de la nostra feina real de boda. Quan encara no tenim una galeria sencera feta a Vilafortuny ho diem clar i et mostrem treball autèntic d\'altres bodes de la Costa Daurada.',
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Vilafortuny és el mateix que Cambrils?',
        a: 'És el barri de mar residencial de Cambrils, a la banda de Salou. El municipi és el mateix, però l\'ambient no: Vilafortuny és més tranquil, familiar i buit, sobretot fora dels mesos forts. Per a fotos serenes, aquesta diferència ho és tot.',
      },
      {
        q: 'Es pot fer la sessió de parella al Castell de Vilafortuny?',
        a: 'La torre és un edifici privat, així que no entrem a dins ni prometem accessos que no depenen de nosaltres. El que sí fem és aprofitar la seva silueta de pedra des de fora com a teló de fons, combinada amb la platja del davant. Amb un parell de retrats n\'hi ha prou perquè el castell surti a la sèrie.',
      },
      {
        q: 'Cobreu Vilafortuny sense recàrrec?',
        a: 'Sí. Som de Reus, a pocs minuts, i Vilafortuny i tot Cambrils entren dins la nostra zona habitual de cobertura, sense recàrrec de desplaçament. La distància curta és, de fet, part del que ens deixa treballar amb calma el vostre dia.',
      },
      {
        q: 'Quina és la millor hora per als retrats a la platja?',
        a: 'La posta, sense dubte. La costa mira al ponent i l\'última llum del dia és càlida i baixa. Si la cerimònia ho permet, quadrem quinze o vint minuts a l\'hora daurada; és quan la platja es buida i la llum fa la feina sola.',
      },
      {
        q: 'Podem contractar foto i vídeo alhora?',
        a: 'És el que més recomanem. En Ferran fa la fotografia i l\'Eric el vídeo; ens coneixem tant que treballem colze a colze sense trepitjar-nos, amb un únic relat del vostre dia. Digueu-nos-ho i us expliquem com ho plantejaríem a Vilafortuny.',
      },
    ],
    finalCta: {
      h2: 'Fem la vostra boda a Vilafortuny',
      body: 'Expliqueu-nos la data i on us caseu. Us direm amb sinceritat com aprofitaríem la platja tranquil·la i el castell per a vosaltres, sense compromís.',
      label: 'Escriviu-nos i ho mirem junts',
    },
    formTitle: 'Parlem de la vostra boda a Vilafortuny',
    formIntro:
      'Deixeu-nos la data, el lloc i quatre paraules de com us imagineu el dia. Us responem aviat, sempre nosaltres dos.',
    whatsAppMessage:
      'Hola Ferran! Ens casem a Vilafortuny i ens agradaria informació de fotografia de boda.',
    breadcrumbCurrent: 'Fotògraf de boda a Vilafortuny',
  },

  es: {
    meta: {
      title: 'Fotógrafo de boda en Vilafortuny | Lifetime Weddings',
      description:
        'Fotógrafo de boda en Vilafortuny, la playa tranquila de Cambrils, en la Costa Daurada. El castillo medieval junto al mar y una arena familiar para retratos íntimos. Somos de Reus, cerca, sin recargo.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Cambrils · Baix Camp',
      h1: 'Fotógrafo de boda en Vilafortuny',
      sub: 'La playa más calmada de Cambrils y un castillo medieval a un paso del agua. Somos hermanos de Reus, a pocos minutos, y fotografiamos bodas aquí sin recargo de desplazamiento.',
      heroAlt: 'Pareja el día de su boda con luz dorada de tarde en una playa tranquila',
      cta1: 'Mira si tenemos tu fecha',
    },
    cardTitle: 'Fotografía de boda en Vilafortuny',
    cardBlurb:
      'La cara íntima de Cambrils: arena familiar, poca gente y una torre medieval junto al mar. Retratos con calma y luz de casa.',
    intro: {
      title: 'Vilafortuny, la playa tranquila de Cambrils',
      paras: [
        `Vilafortuny es el barrio de mar de **Cambrils** que casi ninguna guía cuenta: una zona residencial de segundas residencias, jardines y chalets, con una playa larga y familiar donde por la mañana solo hay quien pasea al perro. No tiene el bullicio del centro ni la cola de restaurantes del puerto. Tiene otra cosa, más difícil de encontrar un día de boda: **calma**. Y aquí la calma vale oro.`,
        `Somos **Ferran** y **Eric**, dos hermanos de **Reus**, a un cuarto de hora escaso de Vilafortuny. Hemos bajado a estas playas toda la vida y las conocemos cuando están vacías, no solo cuando salen en las fotos de verano. Esta página va de **fotografía** —yo, Ferran, a la cámara— y de lo que hace especial casarse en este trozo de costa y no en otro.`,
        `Lo que vende Vilafortuny es el contraste: una **arena tranquila** para los retratos íntimos y, a pocos metros, el **Castillo de Vilafortuny**, una torre medieval que mira al Mediterráneo desde hace siglos. Piedra y mar en el mismo paseo. Para una pareja que quiere fotos serenas, sin multitudes al fondo, es uno de los rincones más agradecidos de toda la Costa Daurada.`,
      ],
    },
    nearbyVenues: {
      title: 'Dónde casarte cerca de Vilafortuny',
      intro:
        'Espacios reales del entorno inmediato, descritos por lo que son. Cuando conocemos uno de primera mano te lo decimos; cuando no, también.',
      items: [
        {
          name: 'Castillo de Vilafortuny',
          body: 'Una **torre de defensa medieval** reconvertida y ampliada a lo largo de los siglos, plantada literalmente frente al mar. No es un salón de invitados al uso, pero su silueta de piedra es el telón de fondo que define el barrio: da a los retratos un poso de historia que la playa sola no tiene.',
        },
        {
          name: 'Parc Samà',
          body: 'A pocos minutos tierra adentro, el jardín histórico del siglo XIX con lago, palmeras y torre neomedieval. Si tu ceremonia es en la zona y quieres retratos con vegetación tropical, es la mejor parada verde de los alrededores.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'Las masías del Baix Camp',
          body: 'Entre Cambrils y Reus, las masías de piedra con patio y viña dan la alternativa cálida al mar: luz de ventana, sombra de higuera y el silencio del campo para un convite recogido.',
        },
        {
          name: 'Hoteles y chalets de primera línea',
          body: 'Vilafortuny es zona de alojamientos junto a la arena. Muchas bodas de aquí mezclan una comida en el hotel o en una casa alquilada con los retratos en la playa de enfrente. Cómodo, discreto y con el mar siempre a mano.',
        },
      ],
    },
    midCta: {
      title: '¿Aún tienes la fecha libre?',
      body: 'Solo cubrimos un número limitado de bodas al año para poder vivirlas de verdad. Si te casas en Vilafortuny o en Cambrils, vale la pena mirar la agenda pronto.',
      label: 'Consulta tu fecha por WhatsApp',
    },
    photoSpots: {
      title: 'Nuestros rincones en Vilafortuny',
      intro:
        'Cuatro lugares a pocos pasos uno de otro, cada uno con su mejor hora. No son paradas turísticas: son donde la fotografía respira sin gente al fondo.',
      items: [
        {
          name: 'La playa de Vilafortuny',
          body: 'Arena ancha y tranquila, mucho más vacía que la del centro de Cambrils. A primera hora y al atardecer es entera para vosotros: pasos descalzos, horizonte limpio y ninguna sombrilla de alquiler de por medio. La playa para retratos **íntimos** de la zona.',
        },
        {
          name: 'El Castillo de Vilafortuny',
          body: 'La torre medieval junto al mar. Su piedra oscura contra el cielo de tarde da un contraste potente; un par de retratos aquí y el resto en la arena, y ya tienes historia y mar en la misma serie.',
        },
        {
          name: 'La Llosa',
          body: 'El tramo de costa baja y rocosa que rompe la línea de arena. Las rocas planas y los charcos que deja la marea baja dan primeros planos y reflejos que una playa lisa no te da. Ojo con lo resbaladizo; se trabaja con calma.',
        },
        {
          name: 'El paseo hacia Salou al atardecer',
          body: 'La acera de mar que enlaza Vilafortuny con Cambrils y, más allá, con Salou. A la hora dorada el sol bajo lo pinta todo de oro viejo y se camina sin prisas, el rato perfecto para los retratos de pareja lejos de la gente.',
        },
      ],
    },
    valueExtra: {
      title: 'Por qué una playa tranquila te da mejores fotos',
      paras: [
        `Una playa vacía no es solo más bonita: es técnicamente mejor. Sin multitudes al fondo no hay que esconder cabezas ni recortar el encuadre, y puedes ponerte a la distancia justa para los **retratos de cuerpo entero** con el mar limpio detrás. En Vilafortuny esto pasa de forma natural casi cada mañana y cada atardecer; en el centro de Cambrils, en plena temporada, hay que pelearlo.`,
        `La mejor hora aquí está clara: el **atardecer**. La costa mira de cara al poniente abierto, y la última media hora de sol regala una luz cálida y baja que envuelve la piel sin cegar. Si tu ceremonia termina a media tarde, reservamos quince o veinte minutos a la hora dorada para bajar a la arena —es el tramo de fotos que luego miras más veces.`,
        `Y el juego que hace única la zona: **combinar el castillo y el mar** en la misma sesión. Empezamos con la piedra medieval para un par de retratos con carácter y acabamos descalzos en el agua, todo en un paseo de cinco minutos. Historia y Mediterráneo sin coger el coche, algo que muy pocas playas de la Costa Daurada pueden ofrecerte.`,
      ],
    },
    gallery: {
      title: 'Trabajo real, no montajes',
      intro:
        'Estas imágenes son de nuestro trabajo real de boda. Cuando todavía no tenemos una galería entera hecha en Vilafortuny lo decimos claro y te mostramos trabajo auténtico de otras bodas de la Costa Daurada.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Vilafortuny es lo mismo que Cambrils?',
        a: 'Es el barrio de mar residencial de Cambrils, hacia el lado de Salou. El municipio es el mismo, pero el ambiente no: Vilafortuny es más tranquilo, familiar y vacío, sobre todo fuera de los meses fuertes. Para fotos serenas, esa diferencia lo es todo.',
      },
      {
        q: '¿Se puede hacer la sesión de pareja en el Castillo de Vilafortuny?',
        a: 'La torre es un edificio privado, así que no entramos dentro ni prometemos accesos que no dependen de nosotros. Lo que sí hacemos es aprovechar su silueta de piedra desde fuera como telón de fondo, combinada con la playa de enfrente. Con un par de retratos basta para que el castillo salga en la serie.',
      },
      {
        q: '¿Cubrís Vilafortuny sin recargo?',
        a: 'Sí. Somos de Reus, a pocos minutos, y Vilafortuny y todo Cambrils entran dentro de nuestra zona habitual de cobertura, sin recargo de desplazamiento. La distancia corta es, de hecho, parte de lo que nos deja trabajar con calma vuestro día.',
      },
      {
        q: '¿Cuál es la mejor hora para los retratos en la playa?',
        a: 'El atardecer, sin duda. La costa mira al poniente y la última luz del día es cálida y baja. Si la ceremonia lo permite, cuadramos quince o veinte minutos a la hora dorada; es cuando la playa se vacía y la luz hace el trabajo sola.',
      },
      {
        q: '¿Podemos contratar foto y vídeo a la vez?',
        a: 'Es lo que más recomendamos. Ferran hace la fotografía y Eric el vídeo; nos conocemos tanto que trabajamos codo con codo sin pisarnos, con un único relato de vuestro día. Decídnoslo y os contamos cómo lo plantearíamos en Vilafortuny.',
      },
    ],
    finalCta: {
      h2: 'Hagamos vuestra boda en Vilafortuny',
      body: 'Contadnos la fecha y dónde os casáis. Os diremos con sinceridad cómo aprovecharíamos la playa tranquila y el castillo para vosotros, sin compromiso.',
      label: 'Escribidnos y lo miramos juntos',
    },
    formTitle: 'Hablemos de vuestra boda en Vilafortuny',
    formIntro:
      'Dejadnos la fecha, el lugar y cuatro palabras de cómo os imagináis el día. Os respondemos pronto, siempre nosotros dos.',
    whatsAppMessage:
      '¡Hola Ferran! Nos casamos en Vilafortuny y nos gustaría información de fotografía de boda.',
    breadcrumbCurrent: 'Fotógrafo de boda en Vilafortuny',
  },

  en: {
    meta: {
      title: 'Wedding photographer in Vilafortuny | Lifetime Weddings',
      description:
        'Wedding photographer in Vilafortuny, the quiet beach side of Cambrils on the Costa Daurada. A medieval castle by the sea and calm, family sand for intimate portraits. Brothers from Reus nearby, no travel fee.',
    },
    hero: {
      eyebrow: 'Costa Daurada · Cambrils · Baix Camp',
      h1: 'Wedding photographer in Vilafortuny',
      sub: 'The calmest beach in Cambrils and a medieval castle a step from the water. We are brothers from Reus, minutes away, and we photograph weddings here with no travel fee.',
      heroAlt: 'Couple on their wedding day in golden afternoon light on a quiet beach',
      cta1: 'Check if we have your date',
    },
    cardTitle: 'Wedding photography in Vilafortuny',
    cardBlurb:
      'The intimate face of Cambrils: family sand, few people and a medieval tower by the sea. Portraits with calm and home light.',
    intro: {
      title: 'Vilafortuny, the quiet beach of Cambrils',
      paras: [
        `Vilafortuny is the seaside neighbourhood of **Cambrils** that few guides bother to tell you about: a residential stretch of second homes, gardens and villas, with a long, family beach where the morning belongs to the dog-walkers. It doesn't have the bustle of the centre or the queue of port restaurants. It has something harder to find on a wedding day: **calm**. And here, calm is worth its weight in gold.`,
        `We are **Ferran** and **Eric**, two brothers from **Reus**, a short fifteen minutes from Vilafortuny. We've come down to these beaches all our lives, and we know them when they're empty, not only when they appear in summer photos. This page is about **photography** — me, Ferran, behind the camera — and about what makes marrying on this particular piece of coast different from anywhere else.`,
        `What Vilafortuny offers is the contrast: **quiet sand** for intimate portraits and, a few metres away, the **Castell de Vilafortuny**, a medieval tower that has watched the Mediterranean for centuries. Stone and sea on the same short walk. For a couple who want serene photographs, with no crowds in the background, it is one of the most rewarding corners on the whole Costa Daurada.`,
      ],
    },
    nearbyVenues: {
      title: 'Where to marry near Vilafortuny',
      intro:
        'Real spaces in the immediate area, described for what they are. When we know one first-hand we say so; when we don\'t, we say that too.',
      items: [
        {
          name: 'Castell de Vilafortuny',
          body: 'A **medieval defence tower**, rebuilt and enlarged over the centuries, standing literally in front of the sea. It isn\'t a conventional reception hall, but its stone silhouette is the backdrop that defines the neighbourhood: it lends portraits a weight of history the beach alone can\'t give.',
        },
        {
          name: 'Parc Samà',
          body: 'A few minutes inland, the 19th-century historic garden with a lake, palms and a neo-medieval tower. If your ceremony is in the area and you want portraits among tropical greenery, it is the best green stop nearby.',
          internalSlug: 'parc-sama',
        },
        {
          name: 'The masies of the Baix Camp',
          body: 'Between Cambrils and Reus, the stone farmhouses with a courtyard and vines give the warm alternative to the sea: window light, fig-tree shade and the quiet of the countryside for a gathered celebration.',
        },
        {
          name: 'Seafront hotels and villas',
          body: 'Vilafortuny is a place of stays right beside the sand. Many weddings here pair a meal at a hotel or a rented house with portraits on the beach across the road. Comfortable, discreet and with the sea always at hand.',
        },
      ],
    },
    midCta: {
      title: 'Is your date still free?',
      body: 'We only cover a limited number of weddings a year so we can truly live them. If you\'re marrying in Vilafortuny or Cambrils, it\'s worth checking the calendar early.',
      label: 'Ask about your date on WhatsApp',
    },
    photoSpots: {
      title: 'Our corners in Vilafortuny',
      intro:
        'Four places a few steps from one another, each with its best hour. These are not tourist stops: they are where photography can breathe with no one in the background.',
      items: [
        {
          name: 'Vilafortuny beach',
          body: 'Wide, quiet sand, far emptier than the beach in central Cambrils. Early and at sunset it is entirely yours: bare footsteps, a clean horizon and not a single rental parasol in the frame. The beach for **intimate** portraits in the area.',
        },
        {
          name: 'The Castell de Vilafortuny',
          body: 'The medieval tower by the sea. Its dark stone against an afternoon sky gives a powerful contrast; a couple of portraits here and the rest on the sand, and you already have history and sea in the same set.',
        },
        {
          name: 'La Llosa',
          body: 'The low, rocky stretch of coast that breaks the line of sand. The flat rocks and the pools left by low tide give close-ups and reflections a smooth beach never will. Mind the slippery stone; we work it slowly.',
        },
        {
          name: 'The promenade towards Salou at dusk',
          body: 'The seafront walk that links Vilafortuny with Cambrils and, beyond it, with Salou. At golden hour the low sun paints everything old gold and you stroll without hurry — the perfect window for couple portraits away from the crowd.',
        },
      ],
    },
    valueExtra: {
      title: 'Why a quiet beach gives you better photos',
      paras: [
        `An empty beach isn't only prettier: it is technically better. With no crowds behind you there are no heads to hide and no need to crop the frame, and you can stand at exactly the right distance for **full-length portraits** with a clean sea behind. In Vilafortuny this happens naturally almost every morning and every evening; in central Cambrils, in high season, you have to fight for it.`,
        `The best hour here is clear: **sunset**. The coast faces the open west, and the last half-hour of sun offers a warm, low light that wraps around the skin without dazzling. If your ceremony ends in mid-afternoon, we set aside fifteen or twenty minutes at golden hour to slip down to the sand — it's the run of photos you'll come back to most.`,
        `And the move that makes the area unique: **combining the castle and the sea** in one session. We start with the medieval stone for a couple of portraits with character and finish barefoot in the water, all on a five-minute walk. History and Mediterranean without touching the car — something very few beaches on the Costa Daurada can offer you.`,
      ],
    },
    gallery: {
      title: 'Real work, not mock-ups',
      intro:
        'These images are from our real wedding work. When we don\'t yet have a full gallery shot in Vilafortuny we say so plainly and show you genuine work from other Costa Daurada weddings.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Is Vilafortuny the same as Cambrils?',
        a: 'It is the residential seaside neighbourhood of Cambrils, towards the Salou side. The town is the same, but the mood is not: Vilafortuny is quieter, more of a family place and far emptier, especially outside the peak months. For serene photos, that difference is everything.',
      },
      {
        q: 'Can the couple session be at the Castell de Vilafortuny?',
        a: 'The tower is a private building, so we don\'t go inside or promise access that isn\'t ours to give. What we do is use its stone silhouette from the outside as a backdrop, paired with the beach across the way. A couple of portraits are enough for the castle to appear in the set.',
      },
      {
        q: 'Do you cover Vilafortuny with no travel fee?',
        a: 'Yes. We\'re from Reus, minutes away, and Vilafortuny and all of Cambrils fall within our usual coverage zone, with no travel surcharge. The short distance is, in fact, part of what lets us work your day calmly.',
      },
      {
        q: 'What\'s the best hour for portraits on the beach?',
        a: 'Sunset, without question. The coast faces west and the last light of the day is warm and low. If the ceremony allows it, we line up fifteen or twenty minutes at golden hour; that\'s when the beach empties and the light does the work on its own.',
      },
      {
        q: 'Can we book photo and video together?',
        a: 'It\'s what we most recommend. Ferran shoots the photography and Eric films; we know each other so well that we work side by side without clashing, with one coherent story of your day. Tell us and we\'ll explain how we\'d approach it in Vilafortuny.',
      },
    ],
    finalCta: {
      h2: 'Let\'s make your Vilafortuny wedding',
      body: 'Tell us the date and where you\'re marrying. We\'ll tell you honestly how we\'d use the quiet beach and the castle for you — no obligation.',
      label: 'Message us and we\'ll look together',
    },
    formTitle: 'Let\'s talk about your Vilafortuny wedding',
    formIntro:
      'Leave us the date, the place and a few words on how you picture the day. We reply soon, always the two of us.',
    whatsAppMessage:
      'Hi Ferran! We\'re getting married in Vilafortuny and would love information about wedding photography.',
    breadcrumbCurrent: 'Wedding photographer in Vilafortuny',
  },
};
