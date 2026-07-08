// Per-language PHOTO copy for Montblanc (Conca de Barberà, Tarragona).
//
// Lifetime Weddings — Ferran (photo) & Eric (video), based in Reus, ~40 min
// from Montblanc. Real knowledge of the medieval town, the Francolí valley and
// the Conca de Barberà vineyards. Photo cluster: /fotograf-boda-montblanc.
//
// Honesty rule: no invented client names, no faked "real wedding in Montblanc".

import type { CityServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const MONTBLANC_PHOTO: Record<Lang, CityServiceCopy> = {
  ca: {
    meta: {
      title: 'Fotògraf de boda a Montblanc | Lifetime Weddings',
      description:
        'Fotògraf de boda a Montblanc i la Conca de Barberà. Muralla medieval, Pont Vell i llum daurada de vinya. Reportatge natural i sense pressa. Demana pressupost.',
    },
    hero: {
      eyebrow: 'Conca de Barberà · Tarragona',
      h1: 'Fotògraf de boda a Montblanc',
      sub: 'Reportatge de casament entre muralla medieval, carrers de pedra i vinyes de la Conca. Imatges honestes, llum treballada i cap postura forçada.',
      heroAlt: 'Parella el dia de la boda passejant per un carrer de pedra d\'una vila medieval a la posta de sol',
    },
    cardTitle: 'Montblanc',
    cardBlurb: 'Vila medieval emmurallada, Pont Vell sobre el Francolí i vinyes de la Conca: pedra, textura i llum daurada per a un reportatge amb ànima.',
    intro: {
      title: 'Fotografiem la teva boda a Montblanc',
      paras: [
        `Som en **Ferran** i l'**Eric**, dos germans de **Reus** que fem foto i vídeo de casament. Montblanc ens queda a uns **quaranta minuts**, així que no és un nom en un mapa: sabem a quina hora la **muralla** agafa el to daurat i quin racó de la vila queda tranquil quan la resta és plena de gent.`,
        `Com a **fotògraf de boda a Montblanc** no repetim la mateixa sessió de sempre en un decorat qualsevol. Deixem que el caràcter de la Conca —pedra romànica i gòtica, vinya, silenci— respiri dins les imatges sense tapar mai el que importa: vosaltres, la família i les mirades del dia. Treballem amb **discreció**, sense dirigir cada gest.`,
        `Ens agrada la fotografia documental, la que recordes perquè va passar de veritat. Si busques també moviment i so, el meu germà s'encarrega del **vídeo de boda a Montblanc** i cobrim el dia sencer sense trepitjar-nos.`,
      ],
    },
    spots: {
      title: 'On fotografiem a Montblanc i la Conca',
      intro: 'Sis escenaris reals que coneixem de primera mà. Els fem servir segons la llum i el ritme del vostre dia, mai per omplir una llista.',
      items: [
        {
          name: 'La muralla medieval',
          body: 'La **muralla de Montblanc** és una de les millor conservades de Catalunya. És l\'escenari estrella dels retrats: la fem servir a última hora, quan la pedra s\'escalfa i el sol rasant dibuixa la textura.',
        },
        {
          name: 'El Pont Vell sobre el Francolí',
          body: 'El **Pont Vell** creua el Francolí a l\'entrada de la vila. Amb l\'aigua i els arcs de pedra fem retrats íntims i serens, sovint a l\'hora blava: un contrapunt tranquil a la força de la muralla.',
        },
        {
          name: 'Santa Maria i Sant Miquel',
          body: 'L\'església gòtica de **Santa Maria la Major** domina la vila des de dalt, i **Sant Miquel** guarda l\'atmosfera romànica. Perfectes per a cerimònies i per a fotos amb llum filtrada, sempre respectant les normes de cada parròquia.',
        },
        {
          name: 'El Portal de Sant Jordi',
          body: 'Diu la llegenda que **Sant Jordi** va vèncer el drac aquí, i el **Portal de Sant Jordi** ho recorda. És un pas de muralla amb personalitat: l\'aprofitem per a retrats amb marc de pedra entre la cerimònia i el convit.',
        },
        {
          name: 'Cellers i vinyes de la Conca',
          body: 'La **Conca de Barberà** és terra de vi. Els **cellers modernistes** i les vinyes obertes ens donen la llum daurada del final de tarda per a un tastet de parella relaxat, lluny del bullici.',
        },
        {
          name: 'Poblet i Santes Creus (UNESCO)',
          body: 'A tocar hi ha els monestirs de **Poblet** i **Santes Creus**, Patrimoni de la Humanitat. Tenen **normes pròpies per fotografiar-hi**: cal permís i respectar espais i horaris. Us ajudem amb la gestió si els voleu al reportatge.',
        },
      ],
    },
    style: {
      title: 'La llum i l\'ambient de Montblanc',
      paras: [
        `Montblanc és **pedra i textura**. Els carrers estrets donen ombres netes i parets càlides a qualsevol hora, i quan baixa el sol la **muralla** i les vinyes s\'omplen d\'una **llum daurada** suau que busquem sempre que el timing ho permet.`,
        `L\'ambient medieval demana una fotografia que no soni a estudi. Preferim els **tons naturals**, la pell real i el color de la pedra tal com és, perquè d\'aquí a vint anys la imatge segueixi semblant-se al que vau viure.`,
      ],
    },
    approach: {
      title: 'Com fotografiem aquí',
      bullets: [
        'Retrats a última hora per aprofitar la llum daurada sobre la pedra i les vinyes.',
        'Reportatge documental i discret: gairebé no ens notareu durant el dia.',
        'Coneixem els racons tranquils de la vila per fotografiar sense multituds al fons.',
        'Gestionem permisos i normes de monuments (Poblet, Santes Creus, parròquies) amb temps.',
        'Doble mirada foto + vídeo coordinada, sense que un servei molesti l\'altre.',
      ],
    },
    gallery: {
      title: 'Feina real',
      intro: 'Una selecció del nostre reportatge de casament. No etiquetem imatges com a bodes de Montblanc si no ho són: és feina real amb la mateixa mirada que portaríem a la Conca.',
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Us desplaceu a Montblanc des de Reus?',
        a: 'Sí. Montblanc ens queda a uns quaranta minuts i és zona habitual. El desplaçament dins la Conca de Barberà sol anar inclòs; per a distàncies més llargues t\'ho detallem al pressupost.',
      },
      {
        q: 'Podeu fotografiar la boda a Poblet o Santes Creus?',
        a: 'Sí, però són monuments UNESCO amb normes pròpies: cal permís i respectar horaris i espais. T\'ajudem amb la gestió i planifiquem el reportatge perquè hi encaixi.',
      },
      {
        q: 'Feu també el vídeo de la boda?',
        a: 'Sí. L\'Eric s\'encarrega del vídeo de boda a Montblanc i treballem coordinats el mateix dia. Contractar foto i vídeo junts simplifica la logística i evita que dos equips es trepitgin.',
      },
      {
        q: 'Quan és la millor hora per als retrats de parella?',
        a: 'L\'última hora de tarda, quan el sol rasant escalfa la muralla i les vinyes. Reservem uns minuts en aquell moment: és quan Montblanc dóna la seva millor llum.',
      },
      {
        q: 'Quantes fotos rebrem i quan?',
        a: 'Reps totes les imatges seleccionades i editades del dia, en alta resolució i en una galeria en línia privada. Els terminis te\'ls confirmem segons la temporada quan tanquem la data.',
      },
    ],
    finalCta: {
      h2: 'Fem les fotos de la teva boda a Montblanc',
      body: 'Expliquem-nos la vostra data i com imagineu el dia. Us direm disponibilitat, idees per aprofitar la muralla i les vinyes, i un pressupost clar sense compromís.',
    },
    formTitle: 'Demana pressupost de fotografia',
    formIntro: 'Data, lloc i quatre línies sobre vosaltres. Responem aviat amb disponibilitat i preu per a la vostra boda a Montblanc.',
    whatsAppMessage: 'Hola! Ens casem a prop de Montblanc i volem informació de fotografia de boda.',
    breadcrumbCurrent: 'Fotògraf de boda a Montblanc',
  },
  es: {
    meta: {
      title: 'Fotógrafo de boda en Montblanc | Lifetime Weddings',
      description:
        'Fotógrafo de boda en Montblanc y la Conca de Barberà. Muralla medieval, Pont Vell y luz dorada de viñedo. Reportaje natural y sin prisas. Pide presupuesto.',
    },
    hero: {
      eyebrow: 'Conca de Barberà · Tarragona',
      h1: 'Fotógrafo de boda en Montblanc',
      sub: 'Reportaje de boda entre muralla medieval, calles de piedra y viñedos de la Conca. Imágenes honestas, luz cuidada y ninguna pose forzada.',
      heroAlt: 'Pareja el día de su boda paseando por una calle de piedra de una villa medieval al atardecer',
    },
    cardTitle: 'Montblanc',
    cardBlurb: 'Villa medieval amurallada, Pont Vell sobre el Francolí y viñedos de la Conca: piedra, textura y luz dorada para un reportaje con alma.',
    intro: {
      title: 'Fotografiamos tu boda en Montblanc',
      paras: [
        `Somos **Ferran** y **Eric**, dos hermanos de **Reus** que hacemos foto y vídeo de boda. Montblanc está a unos **cuarenta minutos**, así que no es un nombre en un mapa: sabemos a qué hora la **muralla** toma el tono dorado y qué rincón de la villa queda tranquilo cuando el resto está lleno de gente.`,
        `Como **fotógrafo de boda en Montblanc** no repetimos la sesión de siempre en un decorado cualquiera. Dejamos que el carácter de la Conca —piedra románica y gótica, viñedo, silencio— respire en las imágenes sin tapar nunca lo que importa: vosotros, la familia y las miradas del día. Trabajamos con **discreción**, sin dirigir cada gesto.`,
        `Nos gusta la fotografía documental, la que recuerdas porque ocurrió de verdad. Si buscas también movimiento y sonido, mi hermano se encarga del **vídeo de boda en Montblanc** y cubrimos el día entero sin estorbarnos.`,
      ],
    },
    spots: {
      title: 'Dónde fotografiamos en Montblanc y la Conca',
      intro: 'Seis escenarios reales que conocemos de primera mano. Los usamos según la luz y el ritmo de vuestro día, nunca por rellenar una lista.',
      items: [
        {
          name: 'La muralla medieval',
          body: 'La **muralla de Montblanc** es una de las mejor conservadas de Cataluña. Es el escenario estrella de los retratos: la usamos a última hora, cuando la piedra se calienta y el sol rasante dibuja la textura.',
        },
        {
          name: 'El Pont Vell sobre el Francolí',
          body: 'El **Pont Vell** cruza el Francolí a la entrada de la villa. Con el agua y los arcos de piedra hacemos retratos íntimos y serenos, a menudo a la hora azul: un contrapunto tranquilo a la fuerza de la muralla.',
        },
        {
          name: 'Santa Maria y Sant Miquel',
          body: 'La iglesia gótica de **Santa Maria la Major** domina la villa desde lo alto, y **Sant Miquel** guarda la atmósfera románica. Perfectas para ceremonias y fotos con luz filtrada, siempre respetando las normas de cada parroquia.',
        },
        {
          name: 'El Portal de Sant Jordi',
          body: 'Cuenta la leyenda que **Sant Jordi** venció al dragón aquí, y el **Portal de Sant Jordi** lo recuerda. Es un paso de muralla con personalidad: lo aprovechamos para retratos con marco de piedra entre la ceremonia y el convite.',
        },
        {
          name: 'Bodegas y viñedos de la Conca',
          body: 'La **Conca de Barberà** es tierra de vino. Las **bodegas modernistas** y los viñedos abiertos nos dan la luz dorada del final de la tarde para una sesión de pareja relajada, lejos del bullicio.',
        },
        {
          name: 'Poblet y Santes Creus (UNESCO)',
          body: 'Muy cerca están los monasterios de **Poblet** y **Santes Creus**, Patrimonio de la Humanidad. Tienen **normas propias para fotografiar**: hay que pedir permiso y respetar espacios y horarios. Te ayudamos con la gestión si los quieres en el reportaje.',
        },
      ],
    },
    style: {
      title: 'La luz y el ambiente de Montblanc',
      paras: [
        `Montblanc es **piedra y textura**. Las calles estrechas dan sombras limpias y paredes cálidas a cualquier hora, y cuando baja el sol la **muralla** y los viñedos se llenan de una **luz dorada** suave que buscamos siempre que el timing lo permite.`,
        `El ambiente medieval pide una fotografía que no suene a estudio. Preferimos los **tonos naturales**, la piel real y el color de la piedra tal como es, para que dentro de veinte años la imagen siga pareciéndose a lo que vivisteis.`,
      ],
    },
    approach: {
      title: 'Cómo fotografiamos aquí',
      bullets: [
        'Retratos a última hora para aprovechar la luz dorada sobre la piedra y los viñedos.',
        'Reportaje documental y discreto: apenas nos notaréis durante el día.',
        'Conocemos los rincones tranquilos de la villa para fotografiar sin multitudes al fondo.',
        'Gestionamos permisos y normas de monumentos (Poblet, Santes Creus, parroquias) con tiempo.',
        'Doble mirada foto + vídeo coordinada, sin que un servicio moleste al otro.',
      ],
    },
    gallery: {
      title: 'Trabajo real',
      intro: 'Una selección de nuestro reportaje de boda. No etiquetamos imágenes como bodas de Montblanc si no lo son: es trabajo real con la misma mirada que llevaríamos a la Conca.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Os desplazáis a Montblanc desde Reus?',
        a: 'Sí. Montblanc está a unos cuarenta minutos y es zona habitual. El desplazamiento dentro de la Conca de Barberà suele ir incluido; para distancias más largas te lo detallamos en el presupuesto.',
      },
      {
        q: '¿Podéis fotografiar la boda en Poblet o Santes Creus?',
        a: 'Sí, pero son monumentos UNESCO con normas propias: hay que pedir permiso y respetar horarios y espacios. Te ayudamos con la gestión y planificamos el reportaje para que encaje.',
      },
      {
        q: '¿Hacéis también el vídeo de la boda?',
        a: 'Sí. Eric se encarga del vídeo de boda en Montblanc y trabajamos coordinados el mismo día. Contratar foto y vídeo juntos simplifica la logística y evita que dos equipos se estorben.',
      },
      {
        q: '¿Cuándo es la mejor hora para los retratos de pareja?',
        a: 'La última hora de la tarde, cuando el sol rasante calienta la muralla y los viñedos. Reservamos unos minutos en ese momento: es cuando Montblanc da su mejor luz.',
      },
      {
        q: '¿Cuántas fotos recibiremos y cuándo?',
        a: 'Recibes todas las imágenes seleccionadas y editadas del día, en alta resolución y en una galería online privada. Los plazos te los confirmamos según la temporada al cerrar la fecha.',
      },
    ],
    finalCta: {
      h2: 'Hacemos las fotos de tu boda en Montblanc',
      body: 'Cuéntanos vuestra fecha y cómo imagináis el día. Te diremos disponibilidad, ideas para aprovechar la muralla y los viñedos, y un presupuesto claro sin compromiso.',
    },
    formTitle: 'Pide presupuesto de fotografía',
    formIntro: 'Fecha, lugar y cuatro líneas sobre vosotros. Respondemos pronto con disponibilidad y precio para vuestra boda en Montblanc.',
    whatsAppMessage: '¡Hola! Nos casamos cerca de Montblanc y queremos información de fotografía de boda.',
    breadcrumbCurrent: 'Fotógrafo de boda en Montblanc',
  },
  en: {
    meta: {
      title: 'Wedding photographer in Montblanc | Lifetime Weddings',
      description:
        'Wedding photographer in Montblanc and the Conca de Barberà. Medieval town walls, the old bridge and golden vineyard light. Natural, unhurried reportage.',
    },
    hero: {
      eyebrow: 'Conca de Barberà · Tarragona',
      h1: 'Wedding photographer in Montblanc',
      sub: 'Wedding reportage among medieval walls, stone streets and the vineyards of the Conca. Honest images, considered light and no forced poses.',
      heroAlt: 'Couple on their wedding day walking down a stone street of a medieval walled town at sunset',
    },
    cardTitle: 'Montblanc',
    cardBlurb: 'A medieval walled town, the old bridge over the Francolí and the Conca vineyards: stone, texture and golden light for reportage with soul.',
    intro: {
      title: 'Photographing your wedding in Montblanc',
      paras: [
        `We are **Ferran** and **Eric**, two brothers from **Reus** who shoot wedding photography and film. Montblanc sits about **forty minutes** from home, so it is not a name on a map: we know the hour the **town walls** turn golden and which corner of town stays quiet when the rest is full of people.`,
        `As a **wedding photographer in Montblanc** we do not repeat the same shoot on an anonymous backdrop. We let the character of the Conca —Romanesque and Gothic stone, vineyards, silence— breathe through the images without ever covering what matters: you, your families and the glances of the day. We work with **discretion**, without directing every gesture.`,
        `We love documentary photography, the kind you remember because it actually happened. If you also want motion and sound, my brother handles the **wedding video in Montblanc**, and we cover the whole day without getting in each other's way.`,
      ],
    },
    spots: {
      title: 'Where we photograph in Montblanc and the Conca',
      intro: 'Six real settings we know first-hand. We use them according to the light and the rhythm of your day, never to tick a box.',
      items: [
        {
          name: 'The medieval town walls',
          body: 'The **walls of Montblanc** are among the best preserved in Catalonia. They are the standout setting for portraits: we use them late in the day, when the stone warms up and the low sun draws out the texture.',
        },
        {
          name: 'The Pont Vell over the Francolí',
          body: 'The **Pont Vell**, the old bridge, crosses the Francolí at the edge of town. With the water and stone arches we make intimate, serene portraits, often at the blue hour: a calm counterpoint to the force of the walls.',
        },
        {
          name: 'Santa Maria and Sant Miquel',
          body: 'The Gothic **Santa Maria la Major** crowns the town from above, while **Sant Miquel** keeps the Romanesque atmosphere. Perfect for ceremonies and photographs with filtered light, always respecting each parish\'s rules.',
        },
        {
          name: 'The Portal de Sant Jordi',
          body: 'Legend says **Saint George** slew the dragon right here, and the **Portal de Sant Jordi** remembers it. A gateway through the wall with real character: we use it for portraits framed in stone between the ceremony and the reception.',
        },
        {
          name: 'Cellars and vineyards of the Conca',
          body: 'The **Conca de Barberà** is wine country. The **modernista cellars** and open vineyards give us the golden light of late afternoon for a relaxed couple session, far from the bustle.',
        },
        {
          name: 'Poblet and Santes Creus (UNESCO)',
          body: 'Close by stand the monasteries of **Poblet** and **Santes Creus**, World Heritage Sites. They have **their own rules for photography**: permission is required and spaces and hours respected. We help with the arrangements if you want them in the reportage.',
        },
      ],
    },
    style: {
      title: 'The light and mood of Montblanc',
      paras: [
        `Montblanc is **stone and texture**. The narrow streets give clean shadows and warm walls at any hour, and as the sun drops the **walls** and vineyards fill with a soft **golden light** we chase whenever the timing allows.`,
        `The medieval setting calls for photography that does not look like a studio. We prefer **natural tones**, real skin and the true colour of the stone, so the image still looks like what you lived twenty years from now.`,
      ],
    },
    approach: {
      title: 'How we photograph here',
      bullets: [
        'Portraits late in the day to catch the golden light on the stone and the vines.',
        'Documentary, discreet reportage: you will barely notice us during the day.',
        'We know the quiet corners of the town so we can shoot without crowds in the background.',
        'We arrange permits and monument rules (Poblet, Santes Creus, parishes) well in advance.',
        'A coordinated photo + video pairing, with neither service getting in the other\'s way.',
      ],
    },
    gallery: {
      title: 'Real work',
      intro: 'A selection from our wedding reportage. We never label images as Montblanc weddings if they are not: it is real work with the same eye we would bring to the Conca.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Do you travel to Montblanc from Reus?',
        a: 'Yes. Montblanc is about forty minutes away and a regular area for us. Travel within the Conca de Barberà is usually included; for longer distances we set it out clearly in the quote.',
      },
      {
        q: 'Can you photograph the wedding at Poblet or Santes Creus?',
        a: 'Yes, but they are UNESCO monuments with their own rules: permission is required and specific hours and spaces respected. We help with the arrangements and plan the reportage to fit.',
      },
      {
        q: 'Do you also film the wedding video?',
        a: 'Yes. Eric handles the wedding video in Montblanc and we work in step on the same day. Booking photo and video together simplifies the logistics and stops two crews from clashing.',
      },
      {
        q: 'When is the best time for couple portraits?',
        a: 'Late afternoon, when the low sun warms the walls and the vineyards. We set aside a few minutes at that moment: that is when Montblanc gives its best light.',
      },
      {
        q: 'How many photos will we receive, and when?',
        a: 'You receive every selected, edited image from the day, in high resolution and in a private online gallery. We confirm exact timescales by season when we lock in your date.',
      },
    ],
    finalCta: {
      h2: 'Let us photograph your wedding in Montblanc',
      body: 'Tell us your date and how you picture the day. We will share availability, ideas for making the most of the walls and the vineyards, and a clear, no-obligation quote.',
    },
    formTitle: 'Ask for a photography quote',
    formIntro: 'Date, place and a few lines about you. We reply quickly with availability and a price for your Montblanc wedding.',
    whatsAppMessage: 'Hi! We are getting married near Montblanc and would like information about wedding photography.',
    breadcrumbCurrent: 'Wedding photographer in Montblanc',
  },
};
