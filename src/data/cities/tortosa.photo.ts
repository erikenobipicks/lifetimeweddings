// Per-language PHOTO copy for Tortosa (Baix Ebre, Terres de l'Ebre).
//
// Lifetime Weddings — Ferran (photo) & Eric (video), based in Reus, ~1h away.
// Long strings use backtick template literals throughout: Catalan and
// "Terres de l'Ebre" carry many apostrophes and escaping them is error-prone.

import type { CityServiceCopy } from './types';
import type { Lang } from '~/i18n/ui';

export const TORTOSA_PHOTO: Record<Lang, CityServiceCopy> = {
  ca: {
    meta: {
      title: `Fotògraf de boda a Tortosa | Lifetime Weddings`,
      description: `Fotògraf de boda a Tortosa i les Terres de l'Ebre. Retrats al Castell de la Suda, la Catedral de Santa Maria i els Reials Col·legis, amb la llum del riu Ebre. Estil documental i natural.`,
    },
    hero: {
      eyebrow: `Fotografia de boda · Tortosa · Terres de l'Ebre`,
      h1: `Fotògraf de boda a Tortosa`,
      sub: `La pedra renaixentista, el riu Ebre i la llum daurada del capvespre des del castell. Fotografiem la vostra boda a Tortosa amb mirada documental, sense poses forçades.`,
      heroAlt: `Parella el dia de la seva boda amb pedra històrica i llum càlida de capvespre`,
    },
    cardTitle: `Tortosa`,
    cardBlurb: `Fotografia de boda entre pedra renaixentista, el riu Ebre i les vistes des del Castell de la Suda.`,
    intro: {
      title: `Fotografiar una boda a Tortosa`,
      paras: [
        `Tortosa és una de les ciutats amb més ànima de Catalunya i, per a un fotògraf, un regal poc conegut. Aquí conviuen la **pedra daurada del Renaixement**, un riu ample que talla la ciutat i un castell que corona el turó amb vistes de 360 graus. Poca gent que es casa a les **Terres de l'Ebre** sap la quantitat de textures i llums que té a mà en un radi de deu minuts.`,
        `Som en Ferran i l'Eric, dos germans de **Reus**. En Ferran fa la fotografia i l'Eric el vídeo, i treballem sempre a quatre mans però mai a sobre vostre. La nostra manera de fotografiar és documental: observem, ens anticipem i deixem que el dia passi. Les millors imatges de Tortosa no són les posades, són les que passen soles quan la llum del riu entra pel carrer.`,
        `Coneixem el terreny de veritat. Sabem a quina hora el sol pega a la façana dels **Reials Col·legis**, on aparcar a prop de la Catedral i quan val la pena pujar al **castell de la Suda** per als retrats. Aquesta pàgina explica com fotografiem una boda en aquesta ciutat i quins racons fem servir.`,
      ],
    },
    spots: {
      title: `Racons de Tortosa per fotografiar`,
      intro: `Cinc o sis llocs que fem servir de veritat, tots a pocs minuts els uns dels altres dins de Tortosa i el seu entorn.`,
      items: [
        {
          name: `Castell de la Suda`,
          body: `El castell àrab que corona el turó, avui Parador, és el mirador natural de la ciutat. Es pot reservar i ofereix retrats amb tota Tortosa i el riu al fons. A l'hora daurada, la pedra s'encén i les vistes fan de teló per als retrats de parella més amplis del dia.`,
        },
        {
          name: `Catedral de Santa Maria`,
          body: `La catedral gòtica, amb el seu claustre de arcs i pati interior, dona ombra neta i llum suau tot el dia. El claustre és perfecte per a retrats íntims i per als detalls de la cerimònia; la façana barroca aporta una entrada solemne.`,
        },
        {
          name: `Reials Col·legis`,
          body: `El pati renaixentista dels Reials Col·legis és una joia: tres pisos d'arcs, escalinata i pedra treballada. És el racó més arquitectònic de Tortosa i on fem els retrats amb més geometria i simetria. La llum rebotada del pati és molt afavoridora.`,
        },
        {
          name: `El riu Ebre i el Pont del Mil·lenni`,
          body: `L'Ebre travessa la ciutat i regala reflexos i llum oberta. El Pont del Mil·lenni, blanc i modern, contrasta amb la pedra vella i funciona molt bé al capvespre. Els passejos de vora riu són ideals per als moments tranquils entre cerimònia i banquet.`,
        },
        {
          name: `El nucli antic i el call jueu`,
          body: `Els carrers estrets del nucli antic i el call jueu tenen textura, portes velles i racons d'ombra que donen imatges molt cinematogràfiques. Aquí busquem el detall, el gest i la llum que s'escola entre edificis.`,
        },
        {
          name: `El Delta de l'Ebre`,
          body: `A poca estona amb cotxe s'obre el Delta: arrossars infinits, cel enorme i horitzons plans. És l'opció perfecta si voleu una sessió de parella diferent, amb la llum bruta i daurada que només tenen els grans espais oberts.`,
        },
      ],
    },
    style: {
      title: `La llum i l'ambient de les Terres de l'Ebre`,
      paras: [
        `Tortosa té una llum diferent de la costa. El riu obre el cel i la pedra daurada torna la llum càlida fins ben entrada la tarda. Això ens permet fer retrats amb un to melós sense haver de forçar res: la ciutat ja ve amb el color posat.`,
        `És una boda de ritme tranquil, de poble gran amb història, on la família i el menjar tenen molt de pes. Fotografiem aquest ritme tal com és: les converses llargues, els brindis, el ball. No interrompem, ens fem transparents perquè les emocions surtin soles.`,
        `Si voleu moviment i so a més de la imatge fixa, el meu germà Eric roda el **vídeo de la vostra boda a Tortosa** en paral·lel, i els dos formats es complementen sense que mai hàgiu de posar dues vegades.`,
      ],
    },
    approach: {
      title: `Com fotografiem a Tortosa`,
      bullets: [
        `**Documental primer:** observem i ens anticipem; les poses es redueixen als retrats de parella.`,
        `**Retrats a l'hora daurada** al Castell de la Suda o vora l'Ebre, quan la pedra i el riu donen la millor llum.`,
        `**Arquitectura com a aliada:** fem servir els arcs dels Reials Col·legis i el claustre de la catedral per compondre amb geometria.`,
        `**Detalls i textures** del nucli antic i el call jueu per donar cos al reportatge.`,
        `**Opció Delta de l'Ebre** per a una sessió de parella amb grans espais, si el temps del dia ho permet.`,
        `**Dos germans, dues càmeres:** foto i vídeo coordinats perquè no us dupliquem els moments.`,
      ],
    },
    gallery: {
      title: `El nostre treball`,
      intro: `Una mostra del nostre estil documental. Encara no tenim una galeria feta a Tortosa; aquestes imatges són de bodes reals nostres i mostren com traduïm en fotografia la llum, la pedra i l'emoció que trobareu també aquí.`,
    },
    faqTitle: `Preguntes freqüents`,
    faqs: [
      {
        q: `Veniu des de Reus fins a Tortosa?`,
        a: `Sí. Estem a **Reus, a poc menys d'una hora** de Tortosa per l'AP-7 i l'N-340. Cobrim les Terres de l'Ebre amb normalitat i el desplaçament és molt raonable; ho tancarem tot en el pressupost sense sorpreses.`,
      },
      {
        q: `Es pot fer una sessió al Delta de l'Ebre?`,
        a: `És clar. El **Delta** queda a poca estona amb cotxe i és espectacular per a una sessió de parella entre arrossars i cels oberts. Ho podem fer el mateix dia si l'horari acompanya, o un altre dia com a sessió postboda.`,
      },
      {
        q: `Cal permís per fotografiar al Castell de la Suda o als monuments?`,
        a: `El Castell de la Suda és un Parador i es pot reservar per a la cerimònia o per als retrats. En espais com la Catedral o els Reials Col·legis solem gestionar l'accés amb antelació. Us ajudem amb tots aquests tràmits durant la preparació.`,
      },
      {
        q: `Feu foto i vídeo alhora?`,
        a: `Sí, i és el nostre punt fort. En Ferran fa la foto i l'Eric el **vídeo**; treballem coordinats perquè no us haguem de fer repetir res. Contractar els dos serveis junts és més àgil per a vosaltres i el resultat queda cohesionat.`,
      },
      {
        q: `Quan hauríem de reservar la data?`,
        a: `Com abans millor, sobretot per a caps de setmana de primavera i tardor. Treballem un nombre limitat de bodes l'any per cuidar cada parella; escriviu-nos amb la data i us diem de seguida si la tenim lliure.`,
      },
    ],
    finalCta: {
      h2: `Parlem de la vostra boda a Tortosa`,
      body: `Expliqueu-nos com us imagineu el dia i quins racons de Tortosa us fan il·lusió. Us direm si tenim la data lliure i us proposarem la millor manera de cobrir-ho amb foto i, si voleu, vídeo.`,
    },
    formTitle: `Consultar disponibilitat a Tortosa`,
    formIntro: `Digueu-nos la data i el lloc de la boda i us responem amb disponibilitat i pressupost, sense compromís.`,
    whatsAppMessage: `Hola Lifetime Weddings! Ens casem a Tortosa i busquem fotògraf. Ens podeu passar disponibilitat?`,
    breadcrumbCurrent: `Fotògraf de boda a Tortosa`,
  },

  es: {
    meta: {
      title: `Fotógrafo de boda en Tortosa | Lifetime Weddings`,
      description: `Fotógrafo de boda en Tortosa y las Terres de l'Ebre. Retratos en el Castillo de la Suda, la Catedral de Santa María y los Reials Col·legis, con la luz del río Ebro. Estilo documental y natural.`,
    },
    hero: {
      eyebrow: `Fotografía de boda · Tortosa · Terres de l'Ebre`,
      h1: `Fotógrafo de boda en Tortosa`,
      sub: `La piedra renacentista, el río Ebro y la luz dorada del atardecer desde el castillo. Fotografiamos vuestra boda en Tortosa con mirada documental, sin poses forzadas.`,
      heroAlt: `Pareja el día de su boda con piedra histórica y luz cálida de atardecer`,
    },
    cardTitle: `Tortosa`,
    cardBlurb: `Fotografía de boda entre piedra renacentista, el río Ebro y las vistas desde el Castillo de la Suda.`,
    intro: {
      title: `Fotografiar una boda en Tortosa`,
      paras: [
        `Tortosa es una de las ciudades con más alma de Cataluña y, para un fotógrafo, un regalo poco conocido. Aquí conviven la **piedra dorada del Renacimiento**, un río ancho que parte la ciudad y un castillo que corona la colina con vistas de 360 grados. Poca gente que se casa en las **Terres de l'Ebre** sabe la cantidad de texturas y luces que tiene a mano en un radio de diez minutos.`,
        `Somos Ferran y Eric, dos hermanos de **Reus**. Ferran hace la fotografía y Eric el vídeo, y trabajamos siempre a cuatro manos pero nunca encima de vosotros. Nuestra manera de fotografiar es documental: observamos, nos anticipamos y dejamos que el día pase. Las mejores imágenes de Tortosa no son las posadas, son las que ocurren solas cuando la luz del río entra por la calle.`,
        `Conocemos el terreno de verdad. Sabemos a qué hora el sol pega en la fachada de los **Reials Col·legis**, dónde aparcar cerca de la Catedral y cuándo vale la pena subir al **castillo de la Suda** para los retratos. Esta página explica cómo fotografiamos una boda en esta ciudad y qué rincones usamos.`,
      ],
    },
    spots: {
      title: `Rincones de Tortosa para fotografiar`,
      intro: `Cinco o seis lugares que usamos de verdad, todos a pocos minutos unos de otros dentro de Tortosa y su entorno.`,
      items: [
        {
          name: `Castillo de la Suda`,
          body: `El castillo árabe que corona la colina, hoy Parador, es el mirador natural de la ciudad. Se puede reservar y ofrece retratos con toda Tortosa y el río al fondo. A la hora dorada, la piedra se enciende y las vistas hacen de telón para los retratos de pareja más amplios del día.`,
        },
        {
          name: `Catedral de Santa María`,
          body: `La catedral gótica, con su claustro de arcos y patio interior, da sombra limpia y luz suave todo el día. El claustro es perfecto para retratos íntimos y para los detalles de la ceremonia; la fachada barroca aporta una entrada solemne.`,
        },
        {
          name: `Reials Col·legis`,
          body: `El patio renacentista de los Reials Col·legis es una joya: tres pisos de arcos, escalinata y piedra trabajada. Es el rincón más arquitectónico de Tortosa y donde hacemos los retratos con más geometría y simetría. La luz rebotada del patio es muy favorecedora.`,
        },
        {
          name: `El río Ebro y el Pont del Mil·lenni`,
          body: `El Ebro atraviesa la ciudad y regala reflejos y luz abierta. El Pont del Mil·lenni, blanco y moderno, contrasta con la piedra vieja y funciona muy bien al atardecer. Los paseos junto al río son ideales para los momentos tranquilos entre ceremonia y banquete.`,
        },
        {
          name: `El casco antiguo y el call judío`,
          body: `Las calles estrechas del casco antiguo y el call judío tienen textura, puertas viejas y rincones de sombra que dan imágenes muy cinematográficas. Aquí buscamos el detalle, el gesto y la luz que se cuela entre edificios.`,
        },
        {
          name: `El Delta del Ebro`,
          body: `A poco rato en coche se abre el Delta: arrozales infinitos, cielo enorme y horizontes planos. Es la opción perfecta si queréis una sesión de pareja diferente, con la luz sucia y dorada que solo tienen los grandes espacios abiertos.`,
        },
      ],
    },
    style: {
      title: `La luz y el ambiente de las Terres de l'Ebre`,
      paras: [
        `Tortosa tiene una luz diferente a la de la costa. El río abre el cielo y la piedra dorada devuelve la luz cálida hasta bien entrada la tarde. Eso nos permite hacer retratos con un tono meloso sin forzar nada: la ciudad ya viene con el color puesto.`,
        `Es una boda de ritmo tranquilo, de pueblo grande con historia, donde la familia y la comida tienen mucho peso. Fotografiamos ese ritmo tal como es: las conversaciones largas, los brindis, el baile. No interrumpimos, nos volvemos transparentes para que las emociones salgan solas.`,
        `Si queréis movimiento y sonido además de la imagen fija, mi hermano Eric rueda el **vídeo de vuestra boda en Tortosa** en paralelo, y ambos formatos se complementan sin que tengáis que posar dos veces.`,
      ],
    },
    approach: {
      title: `Cómo fotografiamos en Tortosa`,
      bullets: [
        `**Documental primero:** observamos y nos anticipamos; las poses se reducen a los retratos de pareja.`,
        `**Retratos a la hora dorada** en el Castillo de la Suda o junto al Ebro, cuando la piedra y el río dan la mejor luz.`,
        `**La arquitectura como aliada:** usamos los arcos de los Reials Col·legis y el claustro de la catedral para componer con geometría.`,
        `**Detalles y texturas** del casco antiguo y el call judío para dar cuerpo al reportaje.`,
        `**Opción Delta del Ebro** para una sesión de pareja con grandes espacios, si el horario del día lo permite.`,
        `**Dos hermanos, dos cámaras:** foto y vídeo coordinados para no duplicaros los momentos.`,
      ],
    },
    gallery: {
      title: `Nuestro trabajo`,
      intro: `Una muestra de nuestro estilo documental. Todavía no tenemos una galería hecha en Tortosa; estas imágenes son de bodas reales nuestras y muestran cómo traducimos en fotografía la luz, la piedra y la emoción que encontraréis también aquí.`,
    },
    faqTitle: `Preguntas frecuentes`,
    faqs: [
      {
        q: `¿Venís desde Reus hasta Tortosa?`,
        a: `Sí. Estamos en **Reus, a poco menos de una hora** de Tortosa por la AP-7 y la N-340. Cubrimos las Terres de l'Ebre con normalidad y el desplazamiento es muy razonable; lo cerramos todo en el presupuesto sin sorpresas.`,
      },
      {
        q: `¿Se puede hacer una sesión en el Delta del Ebro?`,
        a: `Por supuesto. El **Delta** queda a poco rato en coche y es espectacular para una sesión de pareja entre arrozales y cielos abiertos. Podemos hacerla el mismo día si el horario acompaña, u otro día como sesión postboda.`,
      },
      {
        q: `¿Hace falta permiso para fotografiar en el Castillo de la Suda o en los monumentos?`,
        a: `El Castillo de la Suda es un Parador y se puede reservar para la ceremonia o para los retratos. En espacios como la Catedral o los Reials Col·legis solemos gestionar el acceso con antelación. Os ayudamos con todos esos trámites durante la preparación.`,
      },
      {
        q: `¿Hacéis foto y vídeo a la vez?`,
        a: `Sí, y es nuestro punto fuerte. Ferran hace la foto y Eric el **vídeo**; trabajamos coordinados para no haceros repetir nada. Contratar ambos servicios juntos es más ágil para vosotros y el resultado queda cohesionado.`,
      },
      {
        q: `¿Cuándo deberíamos reservar la fecha?`,
        a: `Cuanto antes mejor, sobre todo para fines de semana de primavera y otoño. Trabajamos un número limitado de bodas al año para cuidar a cada pareja; escribidnos con la fecha y os decimos enseguida si la tenemos libre.`,
      },
    ],
    finalCta: {
      h2: `Hablemos de vuestra boda en Tortosa`,
      body: `Contadnos cómo os imagináis el día y qué rincones de Tortosa os hacen ilusión. Os diremos si tenemos la fecha libre y os propondremos la mejor manera de cubrirlo con foto y, si queréis, vídeo.`,
    },
    formTitle: `Consultar disponibilidad en Tortosa`,
    formIntro: `Decidnos la fecha y el lugar de la boda y os respondemos con disponibilidad y presupuesto, sin compromiso.`,
    whatsAppMessage: `¡Hola Lifetime Weddings! Nos casamos en Tortosa y buscamos fotógrafo. ¿Nos podéis pasar disponibilidad?`,
    breadcrumbCurrent: `Fotógrafo de boda en Tortosa`,
  },

  en: {
    meta: {
      title: `Wedding photographer in Tortosa | Lifetime Weddings`,
      description: `Wedding photographer in Tortosa and the Terres de l'Ebre. Portraits at the Suda Castle, Santa Maria Cathedral and the Reials Col·legis, in the light of the river Ebre. Documentary, natural style.`,
    },
    hero: {
      eyebrow: `Wedding photography · Tortosa · Terres de l'Ebre`,
      h1: `Wedding photographer in Tortosa`,
      sub: `Renaissance stone, the river Ebre and golden evening light from the hilltop castle. We photograph your Tortosa wedding with a documentary eye and no forced posing.`,
      heroAlt: `Couple on their wedding day among historic stone in warm evening light`,
    },
    cardTitle: `Tortosa`,
    cardBlurb: `Wedding photography among Renaissance stone, the river Ebre and the views from the Suda Castle.`,
    intro: {
      title: `Photographing a wedding in Tortosa`,
      paras: [
        `Tortosa is one of the most soulful towns in Catalonia and, for a photographer, a well-kept secret. Here you find **golden Renaissance stone**, a broad river cutting through the town and a castle crowning the hill with 360-degree views. Few couples marrying in the **Terres de l'Ebre** realise how many textures and pockets of light sit within a ten-minute radius.`,
        `We are Ferran and Eric, two brothers based in **Reus**. Ferran shoots the photography and Eric the film, and we always work in tandem but never on top of you. Our approach is documentary: we watch, we anticipate and we let the day unfold. The best images of Tortosa are not the posed ones — they are the moments that happen on their own when river light spills into the street.`,
        `We know the ground for real. We know what time the sun strikes the facade of the **Reials Col·legis**, where to park near the Cathedral and when it is worth climbing up to the **Suda Castle** for portraits. This page explains how we photograph a wedding in this town and which corners we use.`,
      ],
    },
    spots: {
      title: `Corners of Tortosa to photograph`,
      intro: `Five or six places we genuinely use, all a few minutes apart within Tortosa and its surroundings.`,
      items: [
        {
          name: `Suda Castle`,
          body: `The hilltop Moorish castle, now a Parador, is the town's natural lookout. It can be booked and offers portraits with all of Tortosa and the river behind. At golden hour the stone catches fire and the view becomes a backdrop for the widest couple portraits of the day.`,
        },
        {
          name: `Santa Maria Cathedral`,
          body: `The Gothic cathedral, with its arched cloister and inner courtyard, gives clean shade and soft light all day. The cloister is perfect for intimate portraits and for ceremony details; the Baroque facade lends a solemn entrance.`,
        },
        {
          name: `Reials Col·legis`,
          body: `The Renaissance courtyard of the Reials Col·legis is a jewel: three storeys of arches, a grand staircase and finely worked stone. It is the most architectural corner of Tortosa and where we make the most geometric, symmetrical portraits. The light bouncing around the courtyard is wonderfully flattering.`,
        },
        {
          name: `The river Ebre and the Pont del Mil·lenni`,
          body: `The Ebre runs through the town, offering reflections and open light. The Pont del Mil·lenni, white and modern, contrasts with the old stone and works beautifully at dusk. The riverside walks are ideal for quiet moments between ceremony and reception.`,
        },
        {
          name: `The old town and the call jueu`,
          body: `The narrow streets of the old town and the Jewish quarter carry texture, old doorways and shaded corners that yield very cinematic frames. Here we hunt for the detail, the gesture and the light slipping between buildings.`,
        },
        {
          name: `The Ebre Delta`,
          body: `A short drive away the Delta opens up: endless rice paddies, a huge sky and flat horizons. It is the perfect option for a different couple session, in the grainy, golden light only wide open spaces can give.`,
        },
      ],
    },
    style: {
      title: `The light and mood of the Terres de l'Ebre`,
      paras: [
        `Tortosa has a different light from the coast. The river opens up the sky and the golden stone throws warm light back well into the afternoon. That lets us make portraits with a honeyed tone without forcing anything — the town already comes with the colour built in.`,
        `It is a slow-paced wedding, a large historic town where family and food carry real weight. We photograph that rhythm exactly as it is: the long conversations, the toasts, the dancing. We do not interrupt; we become transparent so the emotions surface on their own.`,
        `If you want motion and sound alongside the still image, my brother Eric films the **video of your Tortosa wedding** in parallel, and the two formats complement each other without you ever having to pose twice.`,
      ],
    },
    approach: {
      title: `How we photograph in Tortosa`,
      bullets: [
        `**Documentary first:** we watch and anticipate; posing is kept to the couple portraits.`,
        `**Golden-hour portraits** at the Suda Castle or by the Ebre, when the stone and the river give the best light.`,
        `**Architecture as an ally:** we use the arches of the Reials Col·legis and the cathedral cloister to compose with geometry.`,
        `**Details and textures** from the old town and the call jueu to give the reportage body.`,
        `**Ebre Delta option** for a couple session with wide open spaces, if the day's timing allows.`,
        `**Two brothers, two cameras:** photo and film coordinated so we never make you repeat a moment.`,
      ],
    },
    gallery: {
      title: `Our work`,
      intro: `A sample of our documentary style. We do not yet have a gallery shot in Tortosa; these images are from our real weddings and show how we translate light, stone and emotion into photographs — the same qualities you will find here.`,
    },
    faqTitle: `Frequently asked questions`,
    faqs: [
      {
        q: `Do you travel from Reus to Tortosa?`,
        a: `Yes. We are based in **Reus, just under an hour** from Tortosa via the AP-7 and N-340. We cover the Terres de l'Ebre routinely and travel is very reasonable; we fold it all into the quote with no surprises.`,
      },
      {
        q: `Can we do a session in the Ebre Delta?`,
        a: `Absolutely. The **Delta** is a short drive away and is spectacular for a couple session among rice paddies and open skies. We can do it the same day if the timing works, or on another day as a post-wedding session.`,
      },
      {
        q: `Do we need a permit to photograph at the Suda Castle or the monuments?`,
        a: `The Suda Castle is a Parador and can be booked for the ceremony or for portraits. For places like the Cathedral or the Reials Col·legis we usually arrange access in advance. We help you with all of that during the planning.`,
      },
      {
        q: `Do you shoot photo and video together?`,
        a: `Yes, and it is our strength. Ferran handles the photo and Eric the **video**; we work in sync so we never make you repeat anything. Booking both services together is smoother for you and the result feels cohesive.`,
      },
      {
        q: `When should we reserve the date?`,
        a: `The sooner the better, especially for spring and autumn weekends. We take on a limited number of weddings each year to look after every couple; send us your date and we will tell you straight away whether it is free.`,
      },
    ],
    finalCta: {
      h2: `Let's talk about your Tortosa wedding`,
      body: `Tell us how you picture the day and which corners of Tortosa excite you. We will let you know if your date is free and suggest the best way to cover it with photo and, if you wish, video.`,
    },
    formTitle: `Check availability in Tortosa`,
    formIntro: `Tell us the date and venue of the wedding and we will reply with availability and a quote, no obligation.`,
    whatsAppMessage: `Hi Lifetime Weddings! We're getting married in Tortosa and looking for a photographer. Could you send us your availability?`,
    breadcrumbCurrent: `Wedding photographer in Tortosa`,
  },
};
