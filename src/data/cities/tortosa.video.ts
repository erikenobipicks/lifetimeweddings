// Per-language VIDEO copy for Tortosa (Baix Ebre, Terres de l'Ebre).
//
// Lifetime Weddings — Ferran (photo) & Eric (video), based in Reus, ~1h away.
// Long strings use backtick template literals throughout: Catalan and
// "Terres de l'Ebre" carry many apostrophes and escaping them is error-prone.

import type { CityServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const TORTOSA_VIDEO: Record<Lang, CityServiceCopy> = {
  ca: {
    meta: {
      title: `Vídeo de boda a Tortosa | Lifetime Weddings`,
      description: `Vídeo de boda a Tortosa i les Terres de l'Ebre. Cinema del Castell de la Suda i el riu Ebre, so real de la cerimònia i dron sobre l'Ebre on es permet. Estil cinematogràfic i natural.`,
    },
    hero: {
      eyebrow: `Vídeo de boda · Tortosa · Terres de l'Ebre`,
      h1: `Vídeo de boda a Tortosa`,
      sub: `El castell sobre el turó, el riu Ebre i el so real de la cerimònia. Filmem la vostra boda a Tortosa amb mirada cinematogràfica i dron sobre l'Ebre on es permet.`,
      heroAlt: `Fotograma d'un vídeo de boda amb un castell sobre el turó i llum de capvespre`,
    },
    cardTitle: `Tortosa`,
    cardBlurb: `Vídeo de boda cinematogràfic entre el Castell de la Suda, el riu Ebre i la pedra renaixentista.`,
    intro: {
      title: `Filmar una boda a Tortosa`,
      paras: [
        `Poques ciutats de Catalunya donen tant de joc en moviment com Tortosa. Un **castell sobre el turó**, un riu ample que reflecteix el cel i carrers de pedra que semblen d'una altra època: tot això és or per a un vídeo de boda. Les **Terres de l'Ebre** tenen una escala i una llum que a la pantalla es noten de seguida.`,
        `Sóc l'Eric i em dedico al vídeo. El meu germà Ferran fa la fotografia, i treballem sempre junts com a **Lifetime Weddings**, dos germans de **Reus**. La meva feina és narrar el vostre dia com si fos una pel·lícula curta: imatge neta, moviments suaus i, sobretot, el **so real** de la boda: la veu tremolosa dels vots, les rialles, el silenci abans del "sí".`,
        `A Tortosa combino els plans amplis i cinematogràfics del castell i el riu amb la intimitat dels espais petits. Aquesta pàgina explica com filmo una boda en aquesta ciutat, quins racons faig servir i com el dron sobre l'Ebre pot obrir la vostra pel·lícula.`,
      ],
    },
    spots: {
      title: `Racons de Tortosa per filmar`,
      intro: `Cinc o sis escenaris que faig servir de veritat per construir el ritme de la pel·lícula, tots dins de Tortosa i el seu entorn.`,
      items: [
        {
          name: `Castell de la Suda`,
          body: `El castell, avui Parador, és el pla d'obertura perfecte: des de dalt es veu tota la ciutat i el riu. És l'escenari ideal per als plans amplis, els travellings suaus i, quan es permet, un vol de dron que revela Tortosa sencera al capvespre.`,
        },
        {
          name: `Catedral de Santa Maria`,
          body: `La catedral gòtica i el seu claustre donen so i imatge de cerimònia amb una acústica i una llum precioses. Filmo aquí la solemnitat de l'entrada, els vots i els gestos petits, sempre cuidant l'àudio net de les veus.`,
        },
        {
          name: `Reials Col·legis`,
          body: `El pati renaixentista, amb els seus tres pisos d'arcs, és una joia per al moviment de càmera: els travellings guanyen profunditat i la simetria dona plans molt elegants. És el racó més arquitectònic per als plans de parella.`,
        },
        {
          name: `El riu Ebre i el Pont del Mil·lenni`,
          body: `El riu és el gran aliat del vídeo: reflexos, llum oberta i moviment natural de l'aigua. El Pont del Mil·lenni aporta línies modernes i, on la normativa ho permet, el dron sobre l'Ebre dona els plans més espectaculars de la pel·lícula.`,
        },
        {
          name: `El nucli antic i el call jueu`,
          body: `Els carrers estrets i la pedra vella tenen una textura molt cinematogràfica. Aquí filmo els plans de transició, els passejos de la parella i els detalls que donen ànima i ritme al muntatge.`,
        },
        {
          name: `El Delta de l'Ebre`,
          body: `A poca estona amb cotxe, el Delta ofereix horitzons plans i cels enormes, ideals per al dron i per a un pla final que respira. És l'opció perfecta si voleu tancar la pel·lícula amb grans espais i llum daurada.`,
        },
      ],
    },
    style: {
      title: `El to cinematogràfic de les Terres de l'Ebre`,
      paras: [
        `El vídeo a Tortosa juga amb el contrast entre la grandesa (el castell, el riu, el Delta) i la calidesa (la família, el menjar, els carrers de pedra). Aquest contrast dona pel·lícules amb ritme: plans amplis que impressionen i primers plans que emocionen.`,
        `Treballo el **so** amb el mateix mim que la imatge. Micròfons discrets als vots i als parlaments, so ambient del riu i de la festa, i un muntatge on la música mai tapa la veu de veritat. La vostra pel·lícula ha de sonar com va sonar el dia.`,
        `Si a més voleu la imatge fixa, el meu germà Ferran fa la **fotografia de la vostra boda a Tortosa** en paral·lel. Anar coordinats vol dir que ni ell ni jo us fem repetir res, i que foto i vídeo expliquen la mateixa història amb la mateixa mirada.`,
      ],
    },
    approach: {
      title: `Com filmo a Tortosa`,
      bullets: [
        `**So real primer:** micròfons discrets als vots i parlaments; la veritat del dia mana sobre la música.`,
        `**Plans cinematogràfics** del Castell de la Suda i el riu Ebre a l'hora daurada.`,
        `**Dron sobre l'Ebre** on la normativa ho permet, per als plans aeris més espectaculars.`,
        `**Moviment suau:** travellings i estabilització als arcs dels Reials Col·legis i al nucli antic.`,
        `**Opció Delta de l'Ebre** per a un pla final de grans espais i cel obert.`,
        `**Dos germans, dues càmeres:** vídeo i foto coordinats perquè no us dupliquem els moments.`,
      ],
    },
    gallery: {
      title: `Els nostres vídeos`,
      intro: `Una mostra del nostre estil cinematogràfic. Encara no tenim una pel·lícula rodada a Tortosa; aquests vídeos són de bodes reals nostres i mostren com traduïm en imatge i so la llum, la pedra i l'emoció que trobareu també aquí.`,
    },
    faqTitle: `Preguntes freqüents`,
    faqs: [
      {
        q: `Veniu des de Reus fins a Tortosa?`,
        a: `Sí. Estem a **Reus, a poc menys d'una hora** de Tortosa per l'AP-7 i l'N-340. Filmem a les Terres de l'Ebre amb normalitat i el desplaçament és molt raonable; ho tanquem tot en el pressupost sense sorpreses.`,
      },
      {
        q: `Es pot volar el dron sobre l'Ebre o el castell?`,
        a: `On la normativa i els permisos ho permeten, sí, i el resultat és espectacular. El dron té restriccions segons la zona i el dia, així que ho comprovem sempre amb antelació i, si no es pot, tenim plans alternatius igual de potents des de terra.`,
      },
      {
        q: `Es pot fer un pla final al Delta de l'Ebre?`,
        a: `És clar. El **Delta** queda a poca estona amb cotxe i els seus horitzons oberts són ideals per al dron i per a un pla de tancament que respira. Ho podem fer el mateix dia o en una sessió a part.`,
      },
      {
        q: `Feu vídeo i foto alhora?`,
        a: `Sí, i és el nostre punt fort. Jo, l'Eric, faig el vídeo i el Ferran la **foto**; anem coordinats perquè no us haguem de fer repetir res. Contractar els dos serveis junts surt més a compte i el resultat queda cohesionat.`,
      },
      {
        q: `Com és el so de la cerimònia al vídeo?`,
        a: `El cuidem al màxim. Fem servir micròfons discrets per capturar els vots i els parlaments amb claredat, i afegim el so ambient del riu i de la festa. La música del muntatge mai tapa les veus de veritat.`,
      },
    ],
    finalCta: {
      h2: `Parlem del vídeo de la vostra boda a Tortosa`,
      body: `Expliqueu-nos com us imagineu el dia i si voleu dron, so de cerimònia o un pla final al Delta. Us direm si tenim la data lliure i us proposarem la millor manera de filmar-ho.`,
    },
    formTitle: `Consultar disponibilitat a Tortosa`,
    formIntro: `Digueu-nos la data i el lloc de la boda i us responem amb disponibilitat i pressupost, sense compromís.`,
    whatsAppMessage: `Hola Lifetime Weddings! Ens casem a Tortosa i busquem videògraf. Ens podeu passar disponibilitat?`,
    breadcrumbCurrent: `Vídeo de boda a Tortosa`,
  },

  es: {
    meta: {
      title: `Vídeo de boda en Tortosa | Lifetime Weddings`,
      description: `Vídeo de boda en Tortosa y las Terres de l'Ebre. Cine del Castillo de la Suda y el río Ebro, sonido real de la ceremonia y dron sobre el Ebro donde se permite. Estilo cinematográfico y natural.`,
    },
    hero: {
      eyebrow: `Vídeo de boda · Tortosa · Terres de l'Ebre`,
      h1: `Vídeo de boda en Tortosa`,
      sub: `El castillo sobre la colina, el río Ebro y el sonido real de la ceremonia. Filmamos vuestra boda en Tortosa con mirada cinematográfica y dron sobre el Ebro donde se permite.`,
      heroAlt: `Fotograma de un vídeo de boda con un castillo sobre la colina y luz de atardecer`,
    },
    cardTitle: `Tortosa`,
    cardBlurb: `Vídeo de boda cinematográfico entre el Castillo de la Suda, el río Ebro y la piedra renacentista.`,
    intro: {
      title: `Filmar una boda en Tortosa`,
      paras: [
        `Pocas ciudades de Cataluña dan tanto juego en movimiento como Tortosa. Un **castillo sobre la colina**, un río ancho que refleja el cielo y calles de piedra que parecen de otra época: todo eso es oro para un vídeo de boda. Las **Terres de l'Ebre** tienen una escala y una luz que en pantalla se notan enseguida.`,
        `Soy Eric y me dedico al vídeo. Mi hermano Ferran hace la fotografía, y trabajamos siempre juntos como **Lifetime Weddings**, dos hermanos de **Reus**. Mi trabajo es narrar vuestro día como si fuera una película corta: imagen limpia, movimientos suaves y, sobre todo, el **sonido real** de la boda: la voz temblorosa de los votos, las risas, el silencio antes del "sí".`,
        `En Tortosa combino los planos amplios y cinematográficos del castillo y el río con la intimidad de los espacios pequeños. Esta página explica cómo filmo una boda en esta ciudad, qué rincones uso y cómo el dron sobre el Ebro puede abrir vuestra película.`,
      ],
    },
    spots: {
      title: `Rincones de Tortosa para filmar`,
      intro: `Cinco o seis escenarios que uso de verdad para construir el ritmo de la película, todos dentro de Tortosa y su entorno.`,
      items: [
        {
          name: `Castillo de la Suda`,
          body: `El castillo, hoy Parador, es el plano de apertura perfecto: desde arriba se ve toda la ciudad y el río. Es el escenario ideal para los planos amplios, los travellings suaves y, cuando se permite, un vuelo de dron que revela Tortosa entera al atardecer.`,
        },
        {
          name: `Catedral de Santa María`,
          body: `La catedral gótica y su claustro dan sonido e imagen de ceremonia con una acústica y una luz preciosas. Filmo aquí la solemnidad de la entrada, los votos y los gestos pequeños, siempre cuidando el audio limpio de las voces.`,
        },
        {
          name: `Reials Col·legis`,
          body: `El patio renacentista, con sus tres pisos de arcos, es una joya para el movimiento de cámara: los travellings ganan profundidad y la simetría da planos muy elegantes. Es el rincón más arquitectónico para los planos de pareja.`,
        },
        {
          name: `El río Ebro y el Pont del Mil·lenni`,
          body: `El río es el gran aliado del vídeo: reflejos, luz abierta y movimiento natural del agua. El Pont del Mil·lenni aporta líneas modernas y, donde la normativa lo permite, el dron sobre el Ebro da los planos más espectaculares de la película.`,
        },
        {
          name: `El casco antiguo y el call judío`,
          body: `Las calles estrechas y la piedra vieja tienen una textura muy cinematográfica. Aquí filmo los planos de transición, los paseos de la pareja y los detalles que dan alma y ritmo al montaje.`,
        },
        {
          name: `El Delta del Ebro`,
          body: `A poco rato en coche, el Delta ofrece horizontes planos y cielos enormes, ideales para el dron y para un plano final que respira. Es la opción perfecta si queréis cerrar la película con grandes espacios y luz dorada.`,
        },
      ],
    },
    style: {
      title: `El tono cinematográfico de las Terres de l'Ebre`,
      paras: [
        `El vídeo en Tortosa juega con el contraste entre la grandeza (el castillo, el río, el Delta) y la calidez (la familia, la comida, las calles de piedra). Ese contraste da películas con ritmo: planos amplios que impresionan y primeros planos que emocionan.`,
        `Trabajo el **sonido** con el mismo mimo que la imagen. Micrófonos discretos en los votos y los parlamentos, sonido ambiente del río y de la fiesta, y un montaje donde la música nunca tapa la voz de verdad. Vuestra película debe sonar como sonó el día.`,
        `Si además queréis la imagen fija, mi hermano Ferran hace la **fotografía de vuestra boda en Tortosa** en paralelo. Ir coordinados significa que ni él ni yo os hacemos repetir nada, y que foto y vídeo cuentan la misma historia con la misma mirada.`,
      ],
    },
    approach: {
      title: `Cómo filmo en Tortosa`,
      bullets: [
        `**Sonido real primero:** micrófonos discretos en los votos y parlamentos; la verdad del día manda sobre la música.`,
        `**Planos cinematográficos** del Castillo de la Suda y el río Ebro a la hora dorada.`,
        `**Dron sobre el Ebro** donde la normativa lo permite, para los planos aéreos más espectaculares.`,
        `**Movimiento suave:** travellings y estabilización en los arcos de los Reials Col·legis y en el casco antiguo.`,
        `**Opción Delta del Ebro** para un plano final de grandes espacios y cielo abierto.`,
        `**Dos hermanos, dos cámaras:** vídeo y foto coordinados para no duplicaros los momentos.`,
      ],
    },
    gallery: {
      title: `Nuestros vídeos`,
      intro: `Una muestra de nuestro estilo cinematográfico. Todavía no tenemos una película rodada en Tortosa; estos vídeos son de bodas reales nuestras y muestran cómo traducimos en imagen y sonido la luz, la piedra y la emoción que encontraréis también aquí.`,
    },
    faqTitle: `Preguntas frecuentes`,
    faqs: [
      {
        q: `¿Venís desde Reus hasta Tortosa?`,
        a: `Sí. Estamos en **Reus, a poco menos de una hora** de Tortosa por la AP-7 y la N-340. Filmamos en las Terres de l'Ebre con normalidad y el desplazamiento es muy razonable; lo cerramos todo en el presupuesto sin sorpresas.`,
      },
      {
        q: `¿Se puede volar el dron sobre el Ebro o el castillo?`,
        a: `Donde la normativa y los permisos lo permiten, sí, y el resultado es espectacular. El dron tiene restricciones según la zona y el día, así que lo comprobamos siempre con antelación y, si no se puede, tenemos planos alternativos igual de potentes desde tierra.`,
      },
      {
        q: `¿Se puede hacer un plano final en el Delta del Ebro?`,
        a: `Por supuesto. El **Delta** queda a poco rato en coche y sus horizontes abiertos son ideales para el dron y para un plano de cierre que respira. Podemos hacerlo el mismo día o en una sesión aparte.`,
      },
      {
        q: `¿Hacéis vídeo y foto a la vez?`,
        a: `Sí, y es nuestro punto fuerte. Yo, Eric, hago el vídeo y Ferran la **foto**; vamos coordinados para no haceros repetir nada. Contratar ambos servicios juntos sale más a cuenta y el resultado queda cohesionado.`,
      },
      {
        q: `¿Cómo es el sonido de la ceremonia en el vídeo?`,
        a: `Lo cuidamos al máximo. Usamos micrófonos discretos para capturar los votos y los parlamentos con claridad, y añadimos el sonido ambiente del río y de la fiesta. La música del montaje nunca tapa las voces de verdad.`,
      },
    ],
    finalCta: {
      h2: `Hablemos del vídeo de vuestra boda en Tortosa`,
      body: `Contadnos cómo os imagináis el día y si queréis dron, sonido de ceremonia o un plano final en el Delta. Os diremos si tenemos la fecha libre y os propondremos la mejor manera de filmarlo.`,
    },
    formTitle: `Consultar disponibilidad en Tortosa`,
    formIntro: `Decidnos la fecha y el lugar de la boda y os respondemos con disponibilidad y presupuesto, sin compromiso.`,
    whatsAppMessage: `¡Hola Lifetime Weddings! Nos casamos en Tortosa y buscamos videógrafo. ¿Nos podéis pasar disponibilidad?`,
    breadcrumbCurrent: `Vídeo de boda en Tortosa`,
  },

  en: {
    meta: {
      title: `Wedding videographer in Tortosa | Lifetime Weddings`,
      description: `Wedding videographer in Tortosa and the Terres de l'Ebre. Cinematic film of the Suda Castle and the river Ebre, real ceremony sound and drone over the Ebre where permitted. Cinematic, natural style.`,
    },
    hero: {
      eyebrow: `Wedding film · Tortosa · Terres de l'Ebre`,
      h1: `Wedding videographer in Tortosa`,
      sub: `The hilltop castle, the river Ebre and the real sound of the ceremony. We film your Tortosa wedding with a cinematic eye and drone over the Ebre where permitted.`,
      heroAlt: `Still frame from a wedding film with a hilltop castle and evening light`,
    },
    cardTitle: `Tortosa`,
    cardBlurb: `Cinematic wedding film among the Suda Castle, the river Ebre and Renaissance stone.`,
    intro: {
      title: `Filming a wedding in Tortosa`,
      paras: [
        `Few towns in Catalonia give a filmmaker as much to work with as Tortosa. A **castle on the hill**, a broad river mirroring the sky and stone streets that feel from another age — all of it is gold for a wedding film. The **Terres de l'Ebre** have a scale and a light that read on screen straight away.`,
        `I am Eric and I handle the film. My brother Ferran shoots the photography, and we always work together as **Lifetime Weddings**, two brothers from **Reus**. My job is to narrate your day like a short film: clean image, smooth movement and, above all, the **real sound** of the wedding — the trembling voice of the vows, the laughter, the silence before the "yes".`,
        `In Tortosa I combine the wide, cinematic shots of the castle and river with the intimacy of the small spaces. This page explains how I film a wedding in this town, which corners I use and how a drone over the Ebre can open your film.`,
      ],
    },
    spots: {
      title: `Corners of Tortosa to film`,
      intro: `Five or six settings I genuinely use to build the film's rhythm, all within Tortosa and its surroundings.`,
      items: [
        {
          name: `Suda Castle`,
          body: `The castle, now a Parador, is the perfect opening shot: from the top you see the whole town and the river. It is the ideal setting for wide shots, gentle tracking moves and, where permitted, a drone flight revealing all of Tortosa at dusk.`,
        },
        {
          name: `Santa Maria Cathedral`,
          body: `The Gothic cathedral and its cloister give ceremony sound and image with beautiful acoustics and light. Here I film the solemnity of the entrance, the vows and the small gestures, always protecting the clean audio of the voices.`,
        },
        {
          name: `Reials Col·legis`,
          body: `The Renaissance courtyard, with its three storeys of arches, is a jewel for camera movement: tracking shots gain depth and the symmetry yields very elegant frames. It is the most architectural corner for the couple shots.`,
        },
        {
          name: `The river Ebre and the Pont del Mil·lenni`,
          body: `The river is the film's great ally: reflections, open light and the natural motion of the water. The Pont del Mil·lenni adds modern lines and, where regulations allow, the drone over the Ebre delivers the most spectacular shots of the film.`,
        },
        {
          name: `The old town and the call jueu`,
          body: `The narrow streets and old stone carry a very cinematic texture. Here I film the transition shots, the couple's walks and the details that give the edit its soul and rhythm.`,
        },
        {
          name: `The Ebre Delta`,
          body: `A short drive away, the Delta offers flat horizons and vast skies, ideal for the drone and for a closing shot that breathes. It is the perfect option if you want to end the film with wide open spaces and golden light.`,
        },
      ],
    },
    style: {
      title: `The cinematic tone of the Terres de l'Ebre`,
      paras: [
        `Filming in Tortosa plays on the contrast between grandeur (the castle, the river, the Delta) and warmth (the family, the food, the stone streets). That contrast makes films with rhythm: wide shots that impress and close-ups that move.`,
        `I work the **sound** with the same care as the image. Discreet microphones on the vows and speeches, ambient sound of the river and the party, and an edit where the music never buries the real voice. Your film should sound the way the day sounded.`,
        `If you also want the still image, my brother Ferran shoots the **photography of your Tortosa wedding** in parallel. Working in sync means neither of us makes you repeat anything, and photo and film tell the same story with the same eye.`,
      ],
    },
    approach: {
      title: `How I film in Tortosa`,
      bullets: [
        `**Real sound first:** discreet microphones on the vows and speeches; the truth of the day wins over the music.`,
        `**Cinematic shots** of the Suda Castle and the river Ebre at golden hour.`,
        `**Drone over the Ebre** where regulations allow, for the most spectacular aerial shots.`,
        `**Smooth movement:** tracking and stabilisation through the arches of the Reials Col·legis and the old town.`,
        `**Ebre Delta option** for a closing shot of wide open spaces and open sky.`,
        `**Two brothers, two cameras:** film and photo coordinated so we never make you repeat a moment.`,
      ],
    },
    gallery: {
      title: `Our films`,
      intro: `A sample of our cinematic style. We do not yet have a film shot in Tortosa; these videos are from our real weddings and show how we translate light, stone and emotion into image and sound — the same qualities you will find here.`,
    },
    faqTitle: `Frequently asked questions`,
    faqs: [
      {
        q: `Do you travel from Reus to Tortosa?`,
        a: `Yes. We are based in **Reus, just under an hour** from Tortosa via the AP-7 and N-340. We film across the Terres de l'Ebre routinely and travel is very reasonable; we fold it all into the quote with no surprises.`,
      },
      {
        q: `Can you fly the drone over the Ebre or the castle?`,
        a: `Where regulations and permits allow, yes, and the result is spectacular. The drone is restricted depending on the area and the day, so we always check in advance and, if it is not possible, we have equally strong alternative shots from the ground.`,
      },
      {
        q: `Can you do a closing shot in the Ebre Delta?`,
        a: `Absolutely. The **Delta** is a short drive away and its open horizons are ideal for the drone and for a closing shot that breathes. We can do it the same day or in a separate session.`,
      },
      {
        q: `Do you shoot video and photo together?`,
        a: `Yes, and it is our strength. I, Eric, handle the video and Ferran the **photo**; we work in sync so we never make you repeat anything. Booking both services together is better value and the result feels cohesive.`,
      },
      {
        q: `What is the ceremony sound like in the film?`,
        a: `We look after it carefully. We use discreet microphones to capture the vows and speeches clearly, and add the ambient sound of the river and the party. The music in the edit never buries the real voices.`,
      },
    ],
    finalCta: {
      h2: `Let's talk about your Tortosa wedding film`,
      body: `Tell us how you picture the day and whether you want drone, ceremony sound or a closing shot in the Delta. We will let you know if your date is free and suggest the best way to film it.`,
    },
    formTitle: `Check availability in Tortosa`,
    formIntro: `Tell us the date and venue of the wedding and we will reply with availability and a quote, no obligation.`,
    whatsAppMessage: `Hi Lifetime Weddings! We're getting married in Tortosa and looking for a videographer. Could you send us your availability?`,
    breadcrumbCurrent: `Wedding videographer in Tortosa`,
  },
};
