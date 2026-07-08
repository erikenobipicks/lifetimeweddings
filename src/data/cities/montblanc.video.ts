// Per-language VIDEO copy for Montblanc (Conca de Barberà, Tarragona).
//
// Lifetime Weddings — Eric (video) & Ferran (photo), based in Reus, ~40 min
// from Montblanc. Cinematic medieval atmosphere, ceremony sound and drone over
// the walls and vineyards where allowed. Video cluster: /videograf-boda-montblanc.
//
// Honesty rule: no invented client names, no faked "real wedding in Montblanc".

import type { CityServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const MONTBLANC_VIDEO: Record<Lang, CityServiceCopy> = {
  ca: {
    meta: {
      title: 'Vídeo de boda a Montblanc | Lifetime Weddings',
      description:
        'Vídeo de boda a Montblanc i la Conca de Barberà. Cinema entre pedra medieval, so real de la cerimònia i dron sobre muralla i vinyes on la normativa ho permet.',
    },
    hero: {
      eyebrow: 'Conca de Barberà · Tarragona',
      h1: 'Vídeo de boda a Montblanc',
      sub: 'Films de casament amb ànima medieval: atmosfera de pedra, so real dels vots i imatges aèries sobre muralla i vinyes on la normativa ho permet.',
      heroAlt: 'Videògraf filmant una parella davant d\'una muralla medieval il·luminada per la llum daurada del capvespre',
    },
    cardTitle: 'Montblanc',
    cardBlurb: 'Films amb atmosfera medieval: muralla, Pont Vell i vinyes de la Conca. So real de la cerimònia i dron sobre la pedra on es permet.',
    intro: {
      title: 'Filmem la teva boda a Montblanc',
      paras: [
        `Som en **Ferran** i l'**Eric**, dos germans de **Reus**. Jo, l'Eric, m'encarrego del **vídeo**, i Montblanc em queda a uns **quaranta minuts**: una vila que conec de trepitjar-la. Sé com sona el silenci dins de **Santa Maria** i quins camins de vinya s'obren nets per a un pla aeri.`,
        `Un **vídeo de boda a Montblanc** no és un recull de plans macos sense fil. És una **pel·lícula**: la vostra història amb ritme, amb el so real de l'ambient i amb l'escenari medieval treballant a favor de l'emoció, mai per damunt. Filmo amb **discreció** i amb dos o tres punts de vista perquè cap moment important es perdi.`,
        `On la fotografia congela l'instant, el vídeo el manté viu: el moviment, la veu i la música. Si voleu també fotografia, el meu germà cobreix el **fotògraf de boda a Montblanc** i anem coordinats de principi a fi.`,
      ],
    },
    spots: {
      title: 'On filmem a Montblanc i la Conca',
      intro: 'Sis escenaris reals que aprofitem segons la llum, el so i la normativa. Cap pla per omplir: cada localització suma al film.',
      items: [
        {
          name: 'La muralla medieval',
          body: 'La **muralla de Montblanc**, una de les millor conservades de Catalunya, és un fons de cinema. Amb la llum rasant filmem plans de moviment lent al llarg de la pedra, i on la normativa ho permet fem **dron** sobre tot el perímetre.',
        },
        {
          name: 'El Pont Vell sobre el Francolí',
          body: 'El **Pont Vell** sobre el Francolí ens dóna plans serens amb aigua i arcs de pedra. Ideal per als moments tranquils del film —el passeig de la parella— amb el so ambient del riu de fons.',
        },
        {
          name: 'Santa Maria i Sant Miquel',
          body: 'A la gòtica **Santa Maria la Major** i al romànic **Sant Miquel** l\'atenció va al **so**: els vots, la música, el ressò de la nau. Filmem sense molestar i respectem els horaris de la parròquia.',
        },
        {
          name: 'El Portal de Sant Jordi',
          body: 'El **Portal de Sant Jordi**, on la llegenda situa Sant Jordi i el drac, és un marc de pedra amb força narrativa. L\'aprofitem per a transicions i plans de pas que donen sentit de lloc al muntatge.',
        },
        {
          name: 'Cellers i vinyes de la Conca',
          body: 'La **Conca de Barberà** i els seus **cellers modernistes** ens ofereixen llum daurada i camins oberts entre ceps: terreny perfecte per a plans aeris amplis i un tastet de parella cinematogràfic al capvespre.',
        },
        {
          name: 'Poblet i Santes Creus (UNESCO)',
          body: 'Els monestirs de **Poblet** i **Santes Creus**, Patrimoni de la UNESCO, tenen **normes estrictes de gravació i de dron**. Us ajudem a demanar els permisos i planifiquem el rodatge perquè respecti espais i horaris.',
        },
      ],
    },
    style: {
      title: 'L\'atmosfera de cinema de Montblanc',
      paras: [
        `Montblanc regala una **atmosfera medieval** que en vídeo es nota molt: la textura de la pedra, les ombres dels carrers i la **llum daurada** baixa del capvespre creen un color de cinema difícil d\'igualar. L\'aprofitem amb un etalonatge sobri, sense sobrecarregar-lo.`,
        `Un film de casament és tant **imatge com so**. Cuidem especialment l\'àudio —els vots, els discursos, l\'ambient del riu— amb micròfons discrets, perquè d\'aquí a anys torneu a sentir el dia, no només a veure\'l.`,
      ],
    },
    approach: {
      title: 'Com filmem aquí',
      bullets: [
        'Diverses càmeres a la cerimònia per no perdre cap mirada ni reacció.',
        'So real prioritari: micròfons discrets als vots, els discursos i l\'ambient.',
        'Dron sobre muralla i vinyes només on la normativa i els permisos ho autoritzen.',
        'Etalonatge cinematogràfic i sobri que respecta els tons de pedra i vinya.',
        'Rodatge coordinat amb la fotografia perquè cap servei surti al pla de l\'altre.',
      ],
    },
    gallery: {
      title: 'Films reals',
      intro: 'Una mostra dels nostres vídeos de casament. No etiquetem cap film com a boda de Montblanc si no ho és: és feina real amb la mateixa mirada que portaríem a la Conca.',
    },
    faqTitle: 'Preguntes freqüents',
    faqs: [
      {
        q: 'Podeu volar el dron sobre la muralla o els monestirs?',
        a: 'Depèn de la normativa i dels permisos de cada lloc. Sobre la muralla i les vinyes sol ser possible amb les autoritzacions adequades; a Poblet i Santes Creus les normes són més estrictes. Ho comprovem abans del dia.',
      },
      {
        q: 'Com captureu el so de la cerimònia?',
        a: 'Amb micròfons discrets a l\'ofici, als nuvis i als punts clau, més enregistrament d\'ambient. Volem que els vots i els discursos s\'entenguin nets, perquè el so és la meitat de l\'emoció.',
      },
      {
        q: 'Feu també la fotografia?',
        a: 'Sí. En Ferran s\'encarrega del fotògraf de boda a Montblanc i treballem coordinats el mateix dia. Contractar foto i vídeo junts simplifica la logística i evita que dos equips es trepitgin.',
      },
      {
        q: 'Quant dura el vídeo final i quan el rebem?',
        a: 'Preparem una peça curta amb el batec del dia i una versió més llarga amb els moments clau. Els formats i terminis te\'ls concretem segons la temporada quan tanquem la data.',
      },
      {
        q: 'Us desplaceu a Montblanc des de Reus?',
        a: 'Sí, Montblanc ens queda a uns quaranta minuts i és zona habitual. El desplaçament dins la Conca de Barberà sol anar inclòs; per a distàncies més llargues t\'ho detallem al pressupost.',
      },
    ],
    finalCta: {
      h2: 'Fem el vídeo de la teva boda a Montblanc',
      body: 'Expliquem-nos la vostra data i com imagineu el film. Us direm disponibilitat, idees per aprofitar la muralla i les vinyes, i un pressupost clar sense compromís.',
    },
    formTitle: 'Demana pressupost de vídeo',
    formIntro: 'Data, lloc i quatre línies sobre vosaltres. Responem aviat amb disponibilitat i preu per al vídeo de la vostra boda a Montblanc.',
    whatsAppMessage: 'Hola! Ens casem a prop de Montblanc i volem informació de vídeo de boda.',
    breadcrumbCurrent: 'Vídeo de boda a Montblanc',
  },
  es: {
    meta: {
      title: 'Vídeo de boda en Montblanc | Lifetime Weddings',
      description:
        'Vídeo de boda en Montblanc y la Conca de Barberà. Cine de piedra medieval, sonido real de la ceremonia y dron sobre muralla y viñedos donde se permite.',
    },
    hero: {
      eyebrow: 'Conca de Barberà · Tarragona',
      h1: 'Vídeo de boda en Montblanc',
      sub: 'Películas de boda con alma medieval: atmósfera de piedra, sonido real de los votos e imágenes aéreas sobre muralla y viñedos donde la normativa lo permite.',
      heroAlt: 'Videógrafo filmando a una pareja frente a una muralla medieval iluminada por la luz dorada del atardecer',
    },
    cardTitle: 'Montblanc',
    cardBlurb: 'Películas con atmósfera medieval: muralla, Pont Vell y viñedos de la Conca. Sonido real de la ceremonia y dron sobre la piedra donde se permite.',
    intro: {
      title: 'Filmamos tu boda en Montblanc',
      paras: [
        `Somos **Ferran** y **Eric**, dos hermanos de **Reus**. Yo, Eric, me encargo del **vídeo**, y Montblanc está a unos **cuarenta minutos**: una villa que conozco de pisarla. Sé cómo suena el silencio dentro de **Santa Maria** y qué caminos de viñedo se abren limpios para un plano aéreo.`,
        `Un **vídeo de boda en Montblanc** no es un montón de planos bonitos sin hilo. Es una **película**: vuestra historia con ritmo, con el sonido real del ambiente y con el escenario medieval trabajando a favor de la emoción, nunca por encima. Filmo con **discreción** y con dos o tres puntos de vista para que ningún momento importante se pierda.`,
        `Donde la fotografía congela el instante, el vídeo lo mantiene vivo: el movimiento, la voz y la música. Si queréis también fotografía, mi hermano cubre el **fotógrafo de boda en Montblanc** y vamos coordinados de principio a fin.`,
      ],
    },
    spots: {
      title: 'Dónde filmamos en Montblanc y la Conca',
      intro: 'Seis escenarios reales que aprovechamos según la luz, el sonido y la normativa. Ningún plano de relleno: cada localización suma a la película.',
      items: [
        {
          name: 'La muralla medieval',
          body: 'La **muralla de Montblanc**, una de las mejor conservadas de Cataluña, es un fondo de cine. Con la luz rasante filmamos planos de movimiento lento a lo largo de la piedra, y donde la normativa lo permite volamos un **dron** sobre todo el perímetro.',
        },
        {
          name: 'El Pont Vell sobre el Francolí',
          body: 'El **Pont Vell** sobre el Francolí nos da planos serenos con agua y arcos de piedra. Ideal para los momentos tranquilos de la película —el paseo de la pareja— con el sonido ambiente del río de fondo.',
        },
        {
          name: 'Santa Maria y Sant Miquel',
          body: 'En la gótica **Santa Maria la Major** y en el románico **Sant Miquel** la atención va al **sonido**: los votos, la música, el eco de la nave. Filmamos sin molestar y respetamos los horarios de la parroquia.',
        },
        {
          name: 'El Portal de Sant Jordi',
          body: 'El **Portal de Sant Jordi**, donde la leyenda sitúa a Sant Jordi y el dragón, es un marco de piedra con fuerza narrativa. Lo aprovechamos para transiciones y planos de paso que dan sentido de lugar al montaje.',
        },
        {
          name: 'Bodegas y viñedos de la Conca',
          body: 'La **Conca de Barberà** y sus **bodegas modernistas** nos ofrecen luz dorada y caminos abiertos entre cepas: terreno perfecto para planos aéreos amplios y una sesión de pareja cinematográfica al atardecer.',
        },
        {
          name: 'Poblet y Santes Creus (UNESCO)',
          body: 'Los monasterios de **Poblet** y **Santes Creus**, Patrimonio de la UNESCO, tienen **normas estrictas de grabación y de dron**. Te ayudamos a solicitar los permisos y planificamos el rodaje para que respete espacios y horarios.',
        },
      ],
    },
    style: {
      title: 'La atmósfera de cine de Montblanc',
      paras: [
        `Montblanc regala una **atmósfera medieval** que en vídeo se nota mucho: la textura de la piedra, las sombras de las calles y la **luz dorada** baja del atardecer crean un color de cine difícil de igualar. La aprovechamos con un etalonaje sobrio, sin sobrecargarla.`,
        `Una película de boda es tanto **imagen como sonido**. Cuidamos especialmente el audio —los votos, los discursos, el ambiente del río— con micrófonos discretos, para que dentro de años volváis a oír el día, no solo a verlo.`,
      ],
    },
    approach: {
      title: 'Cómo filmamos aquí',
      bullets: [
        'Varias cámaras en la ceremonia para no perder ninguna mirada ni reacción.',
        'Sonido real prioritario: micrófonos discretos en los votos, los discursos y el ambiente.',
        'Dron sobre muralla y viñedos solo donde la normativa y los permisos lo autorizan.',
        'Etalonaje cinematográfico y sobrio que respeta los tonos de piedra y viñedo.',
        'Rodaje coordinado con la fotografía para que ningún servicio salga en el plano del otro.',
      ],
    },
    gallery: {
      title: 'Películas reales',
      intro: 'Una muestra de nuestros vídeos de boda. No etiquetamos ninguna película como boda de Montblanc si no lo es: es trabajo real con la misma mirada que llevaríamos a la Conca.',
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Podéis volar el dron sobre la muralla o los monasterios?',
        a: 'Depende de la normativa y los permisos de cada lugar. Sobre la muralla y los viñedos suele ser posible con las autorizaciones adecuadas; en Poblet y Santes Creus las normas son más estrictas. Lo comprobamos antes del día.',
      },
      {
        q: '¿Cómo captáis el sonido de la ceremonia?',
        a: 'Con micrófonos discretos en el oficio, en los novios y en los puntos clave, más grabación de ambiente. Queremos que los votos y los discursos se entiendan limpios, porque el sonido es la mitad de la emoción.',
      },
      {
        q: '¿Hacéis también la fotografía?',
        a: 'Sí. Ferran se encarga del fotógrafo de boda en Montblanc y trabajamos coordinados el mismo día. Contratar foto y vídeo juntos simplifica la logística y evita que dos equipos se estorben.',
      },
      {
        q: '¿Cuánto dura el vídeo final y cuándo lo recibimos?',
        a: 'Preparamos una pieza corta con el latido del día y una versión más larga con los momentos clave. Los formatos y plazos te los concretamos según la temporada al cerrar la fecha.',
      },
      {
        q: '¿Os desplazáis a Montblanc desde Reus?',
        a: 'Sí, Montblanc está a unos cuarenta minutos y es zona habitual. El desplazamiento dentro de la Conca de Barberà suele ir incluido; para distancias más largas te lo detallamos en el presupuesto.',
      },
    ],
    finalCta: {
      h2: 'Hacemos el vídeo de tu boda en Montblanc',
      body: 'Cuéntanos vuestra fecha y cómo imagináis la película. Te diremos disponibilidad, ideas para aprovechar la muralla y los viñedos, y un presupuesto claro sin compromiso.',
    },
    formTitle: 'Pide presupuesto de vídeo',
    formIntro: 'Fecha, lugar y cuatro líneas sobre vosotros. Respondemos pronto con disponibilidad y precio para el vídeo de vuestra boda en Montblanc.',
    whatsAppMessage: '¡Hola! Nos casamos cerca de Montblanc y queremos información de vídeo de boda.',
    breadcrumbCurrent: 'Vídeo de boda en Montblanc',
  },
  en: {
    meta: {
      title: 'Wedding videographer in Montblanc | Lifetime Weddings',
      description:
        'Wedding videographer in Montblanc and the Conca de Barberà. Medieval stone, real ceremony sound and drone over town walls and vineyards where permitted.',
    },
    hero: {
      eyebrow: 'Conca de Barberà · Tarragona',
      h1: 'Wedding videographer in Montblanc',
      sub: 'Wedding films with a medieval soul: stone atmosphere, the real sound of your vows and aerial footage over walls and vineyards where regulations allow.',
      heroAlt: 'Videographer filming a couple in front of a medieval town wall lit by the golden light of dusk',
    },
    cardTitle: 'Montblanc',
    cardBlurb: 'Films with a medieval atmosphere: town walls, the old bridge and the Conca vineyards. Real ceremony sound and drone over the stone where permitted.',
    intro: {
      title: 'Filming your wedding in Montblanc',
      paras: [
        `We are **Ferran** and **Eric**, two brothers from **Reus**. I, Eric, handle the **film**, and Montblanc sits about **forty minutes** away: a town I know from walking it. I know how the silence sounds inside **Santa Maria** and which vineyard tracks open up cleanly for an aerial shot.`,
        `A **wedding video in Montblanc** is not a pile of pretty shots with no thread. It is a **film**: your story told with rhythm, with the real sound of the place and the medieval setting working in favour of the emotion, never on top of it. I film with **discretion** and from two or three viewpoints so no important moment is lost.`,
        `Where photography freezes the instant, film keeps it alive: the movement, the voice and the music. If you also want stills, my brother covers the **wedding photographer in Montblanc** and we work in step from start to finish.`,
      ],
    },
    spots: {
      title: 'Where we film in Montblanc and the Conca',
      intro: 'Six real settings we use according to light, sound and regulations. No filler shots: every location adds to the film.',
      items: [
        {
          name: 'The medieval town walls',
          body: 'The **walls of Montblanc**, among the best preserved in Catalonia, are a cinematic backdrop. In the low light we film slow moving shots along the stone, and where regulations allow we fly a **drone** over the whole perimeter.',
        },
        {
          name: 'The Pont Vell over the Francolí',
          body: 'The **Pont Vell**, the old bridge over the Francolí, gives us serene shots with water and stone arches. Ideal for the quiet moments of the film —the couple\'s walk— with the ambient sound of the river underneath.',
        },
        {
          name: 'Santa Maria and Sant Miquel',
          body: 'In the Gothic **Santa Maria la Major** and the Romanesque **Sant Miquel** the focus is on **sound**: the vows, the music, the echo of the nave. We film without disturbing and respect the parish\'s schedules.',
        },
        {
          name: 'The Portal de Sant Jordi',
          body: 'The **Portal de Sant Jordi**, where legend places Saint George and the dragon, is a stone frame with narrative weight. We use it for transitions and passing shots that give the edit a sense of place.',
        },
        {
          name: 'Cellars and vineyards of the Conca',
          body: 'The **Conca de Barberà** and its **modernista cellars** offer golden light and open tracks between the vines: perfect terrain for wide aerial shots and a cinematic couple session at dusk.',
        },
        {
          name: 'Poblet and Santes Creus (UNESCO)',
          body: 'The monasteries of **Poblet** and **Santes Creus**, World Heritage Sites, have **strict filming and drone rules**. We help you request the permits and plan the shoot so it respects their spaces and hours.',
        },
      ],
    },
    style: {
      title: 'The cinematic mood of Montblanc',
      paras: [
        `Montblanc offers a **medieval atmosphere** that reads strongly on film: the texture of the stone, the shadows of the streets and the low **golden light** of dusk create a cinematic colour that is hard to match. We make the most of it with a restrained grade, without overloading it.`,
        `A wedding film is as much **image as sound**. We take particular care of the audio —the vows, the speeches, the ambience of the river— with discreet microphones, so that years from now you hear the day again, not just watch it.`,
      ],
    },
    approach: {
      title: 'How we film here',
      bullets: [
        'Several cameras at the ceremony so no glance or reaction is missed.',
        'Real sound comes first: discreet microphones on the vows, the speeches and the ambience.',
        'Drone over walls and vineyards only where regulations and permits allow.',
        'A cinematic, restrained grade that respects the tones of stone and vine.',
        'Filming coordinated with the photography so neither service appears in the other\'s frame.',
      ],
    },
    gallery: {
      title: 'Real films',
      intro: 'A selection of our wedding films. We never label a film as a Montblanc wedding if it is not: it is real work with the same eye we would bring to the Conca.',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Can you fly the drone over the walls or the monasteries?',
        a: 'It depends on the regulations and permits for each place. Over the walls and vineyards it is usually possible with the right authorisations; at Poblet and Santes Creus the rules are stricter. We check before the day.',
      },
      {
        q: 'How do you capture the ceremony sound?',
        a: 'With discreet microphones on the officiant, the couple and the key points, plus ambient recording. We want the vows and speeches to come through clean, because sound is half the emotion.',
      },
      {
        q: 'Do you also do the photography?',
        a: 'Yes. Ferran covers the wedding photographer in Montblanc and we work in step on the same day. Booking photo and video together simplifies the logistics and stops two crews from clashing.',
      },
      {
        q: 'How long is the final film, and when do we get it?',
        a: 'We prepare a short piece with the heartbeat of the day and a longer version with the key moments. We confirm the formats and timescales by season when we lock in your date.',
      },
      {
        q: 'Do you travel to Montblanc from Reus?',
        a: 'Yes, Montblanc is about forty minutes away and a regular area for us. Travel within the Conca de Barberà is usually included; for longer distances we set it out in the quote.',
      },
    ],
    finalCta: {
      h2: 'Let us film your wedding in Montblanc',
      body: 'Tell us your date and how you picture the film. We will share availability, ideas for making the most of the walls and the vineyards, and a clear, no-obligation quote.',
    },
    formTitle: 'Ask for a video quote',
    formIntro: 'Date, place and a few lines about you. We reply quickly with availability and a price for your Montblanc wedding film.',
    whatsAppMessage: 'Hi! We are getting married near Montblanc and would like information about wedding video.',
    breadcrumbCurrent: 'Wedding videographer in Montblanc',
  },
};
