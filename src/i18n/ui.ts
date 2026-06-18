// Central i18n dictionary. Keep keys identical across locales.
// Source of truth: Spanish. CA/EN translations completed in full (unlike the
// current Wix site which has partial translations — see memory).

export const languages = {
  ca: 'Català',
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'ca' as const;

export type Lang = keyof typeof languages;

export const ogLocale: Record<Lang, string> = {
  es: 'es_ES',
  ca: 'ca_ES',
  en: 'en_US',
};

export const ui = {
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.portfolio': 'Portfolio',
    'nav.videos': 'Vídeos',
    'nav.services': 'Servicios',
    'nav.testimonials': 'Testimonios',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.book': 'Consultar disponibilidad',

    // Hero
    'hero.eyebrow': 'Fotografía y vídeo de bodas · Tarragona · Reus · Lleida',
    'hero.title': 'Dos hermanos. Dos cámaras: una de foto, una de vídeo.',
    'hero.title2': 'Vuestra historia, contada a cuatro manos.',
    'hero.subtitle': 'Somos la segunda generación de una familia de fotógrafos. Llevamos más de 15 años contando bodas en Cataluña con un estilo documental, natural y sin poses forzadas.',
    'hero.cta': 'Consultar disponibilidad',
    'hero.cta.secondary': 'Ver bodas reales',

    // Trust bar
    'trust.weddings': '+150 bodas',
    'trust.coverage': 'Tarragona · Lleida · Barcelona',
    'trust.delivery': 'Entrega en 3–4 semanas',
    'trust.rating': '5★ en Google',

    // About
    'about.label': 'Quiénes somos',
    'about.title': 'Nos hemos criado entre cámaras.',
    'about.subtitle': 'Dos hermanos, la misma mirada en dos formatos.',
    'about.p1':
      'Somos Eric y Ferran Blasco, dos hermanos y la segunda generación de una familia de fotógrafos. Antes de andar, ya había carretes, focos y álbumes de boda en casa. De alguna manera, eso te marca.',
    'about.p2':
      'Creamos Lifetime Weddings porque queríamos contar las bodas de otra manera: sin poses forzadas, sin fórmulas y sin prisas. Uno lo hace en foto, el otro en vídeo. La misma mirada, dos formatos.',
    'about.p3':
      'Hacemos bodas en Tarragona, Reus, Lleida, Barcelona y allá donde nos lleve la historia. Y sí — si nos lo pedís, montamos la cámara en Nueva York también (ya lo hemos hecho).',
    'about.cta': 'Ver bodas reales',

    // Team
    'team.label': 'Los que estaremos allí',

    // Portfolio
    'portfolio.label': 'Nuestro trabajo',
    'portfolio.title': 'Algunas bodas recientes',
    'portfolio.intro':
      'Nuestro estilo es fotoperiodismo documental: pasamos desapercibidos, no dirigimos, no interrumpimos. Nuestro trabajo es que dentro de 20 años reviváis el día — no que recordéis al fotógrafo.',

    // Services
    'services.label': 'Lo que ofrecemos',
    'services.title': 'Servicios que ofrecemos',
    'services.photo.title': 'Fotografía de Bodas',
    'services.photo.desc':
      '700–1.200 imágenes editadas, entregadas en galería privada en 3–4 semanas. Cobertura completa del día, del preparativo a la fiesta, con estilo documental.',
    'services.video.title': 'Vídeo de Bodas',
    'services.video.desc':
      'Película documental de 25–35 minutos, entregada en 8–10 semanas. Opcional: tráiler corto, discursos y ceremonia completa sin cortes.',
    'services.fusion.title': 'Sesión pre-boda',
    'services.fusion.desc':
      'Una mañana o una tarde para conocernos y para que os familiaricéis con la cámara antes del gran día. En Tarragona, Reus o donde os venga bien.',

    // Video / Love Stories
    'video.label': 'Hasta donde haga falta',
    'video.title': 'Nueva York, Málaga, Huesca, o a la vuelta de casa',
    'video.p1':
      'Ariadna y Clifton se conocieron en Manhattan. Querían un recuerdo que empezara allí donde empezó todo, así que montamos la cámara y nos llevamos el vídeo a Brooklyn.',
    'video.p2':
      'No todas las historias piden viajar a Nueva York — la mayoría se quedan en Tarragona y están muy bien así. Pero si la vuestra lo pide, vamos donde haga falta.',
    'video.cta': 'Contadnos vuestra historia',

    // Testimonials
    'testi.label': 'Testimonios',
    'testi.title': 'Mirad lo que dicen de nosotros',

    // Instagram
    'insta.title': 'Seamos amigos en Instagram',
    'insta.handle': '@lifetime.weddings',
    'insta.cta': 'Seguir en Instagram',

    // YouTube
    'yt.title': 'Suscríbete a nuestro canal de YouTube',

    // Contact
    'contact.label': 'Contacto',
    'contact.title': 'Estamos deseando conoceros',
    'contact.subtitle':
      'Contadnos sobre vuestra boda. Os respondemos en menos de 24h (l.–v.).',
    'contact.date.placeholder': 'Aproximada (mes y año, o estación)',
    'contact.field.name': 'Nombre',
    'contact.field.email': 'Correo electrónico',
    'contact.field.phone': 'Teléfono',
    'contact.field.date': 'Fecha de la boda',
    'contact.field.venue': 'Lugar de la celebración',
    'contact.field.message': 'Cuéntanos sobre vuestra boda',
    'contact.field.consent': 'Acepto la política de privacidad.',
    'contact.submit': 'Enviar mensaje',
    'contact.success': '¡Muchas gracias por poneros en contacto con nosotros! Os responderemos muy pronto.',
    'contact.error': 'Ha habido un error al enviar el mensaje. Intentadlo de nuevo o escribidnos a hola@lifetime.photo',
    'contact.microcopy': 'Os respondemos en menos de 24h (de lunes a viernes).',
    'contact.placeholder.message': 'Opcional: lugar, estilo, hora de la ceremonia, lo que queráis compartir…',
    'contact.where.title': 'De dónde venimos y hasta dónde vamos',
    'contact.where.desc':
      'Nuestra base está en Reus (Tarragona). Cubrimos bodas sin coste de desplazamiento en Tarragona, Reus, Lleida, Barcelona y el resto de Cataluña. Para bodas fuera de Cataluña, os pasamos un presupuesto a medida.',
    'contact.where.address': 'Dirección',
    'contact.where.hours': 'Horario de respuesta',
    'contact.where.hours.value': 'l.–v., 9h–19h',
    'contact.h1': 'Hablemos de vuestra boda',
    'contact.sub.pre': 'Os respondemos en menos de 24h (l.–v.). Si preferís, también podéis escribirnos por',
    'contact.sub.wa': 'WhatsApp',
    'contact.sub.post': '.',

    // Videos page
    'videos.eyebrow': 'Tráilers',
    'videos.h1': 'Vídeos de boda',
    'videos.intro':
      'Películas documentales de bodas filmadas en Tarragona, Reus y por toda Cataluña. Sin poses forzadas, sin guion — solo lo que pasa de verdad.',
    'videos.play.aria': 'Reproducir tráiler',
    'videos.channel.cta': 'Ver más vídeos en nuestro canal de YouTube →',

    // Landings (hidden per-typology proposal pages)
    'landings.deliverables.title': 'Qué os entregamos',
    'landings.packs.title': 'Packs recomendados',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.legal': 'Aviso legal',
    'footer.privacy': 'Política de privacidad',
    'footer.cookies': 'Política de cookies',

    // WhatsApp float
    'wa.label': 'Escríbenos por WhatsApp',
    'wa.message':
      '¡Hola! Nos gustaría información sobre vuestros packs de foto y vídeo de boda. Nos casamos el…',

    // FAQ
    'faq.label': 'Preguntas frecuentes',
    'faq.title': 'Resolvemos las dudas más habituales',
    'faq.q1': '¿Sois dos o uno? ¿Quién viene el día de la boda?',
    'faq.a1': 'Venimos siempre Eric (vídeo) y Ferran (foto). Si el pack incluye segundo operador, se incorpora una persona más de confianza durante las horas clave (preparativos dobles, ceremonia o fiesta).',
    'faq.q2': '¿Qué estilo de fotografía hacéis?',
    'faq.a2': 'Fotoperiodismo creativo. Documental, natural, sin poses forzadas. Os guiamos cuando hace falta — por ejemplo en el retrato de pareja — pero el resto del día pasamos desapercibidos. El objetivo es que dentro de 20 años revivas el día, no que recuerdes al fotógrafo.',
    'faq.q3': '¿Cuánto cuesta una boda con vosotros?',
    'faq.a3': 'Cada boda es única y el presupuesto depende de la fecha, el lugar y el pack. Os pasamos uno personalizado en menos de 24h. Rellenad el quiz de 1 minuto con vuestros datos y os respondemos con una propuesta concreta.',
    'faq.q4': '¿Cuándo recibimos las fotos y el vídeo?',
    'faq.a4': 'Galería online con todas las fotos editadas en 3–4 semanas. Vídeo documental en 8–10 semanas. Tráiler, si lo habéis contratado, en 3–4 semanas.',
    'faq.q5': '¿Viajáis fuera de Cataluña?',
    'faq.a5': 'Sí. Nuestra base es Reus, pero hemos hecho bodas en Barcelona, Lleida, Girona, Huesca, Castellón, Málaga y Nueva York. Los desplazamientos fuera de Cataluña se presupuestan aparte.',
    'faq.q6': '¿Hacéis sesión pre-boda?',
    'faq.a6': 'Sí. Es opcional y la recomendamos: os ayuda a sentiros cómodos delante de la cámara y nos permite conoceros mejor antes del gran día.',
    'faq.q7': '¿Y si llueve?',
    'faq.a7': 'Pues llueve, y es precioso. Tenemos experiencia en bodas con lluvia, viento o sol de justicia. Nunca es un problema — solo otra historia que contar.',
    'faq.q8': '¿Cómo se hace la reserva?',
    'faq.a8': 'Confirmamos disponibilidad, firmamos un contrato simple y pedimos un 30% para bloquear la fecha. El resto se paga antes de la boda.',
    'faq.q9': '¿Puedo ver una boda completa, no solo los mejores momentos?',
    'faq.a9': 'Sí. Si nos escribís, os enviamos 1–2 galerías completas para que veáis la coherencia de todo el reportaje, no solo las fotos de Instagram.',
    'faq.q10': '¿Hacéis álbum?',
    'faq.a10': 'Sí, diseñamos álbumes de madera personalizados incluidos en algunos packs. También podemos diseñar álbumes extra para padres y padrinos.',

    // WhatsApp float
    'wa.chat': 'Habla con nosotros',

    // YouTube
    'yt.more': 'Todos los tráilers y películas en nuestro canal →',

    // Quiz funnel
    'quiz.title': 'Veamos si tenemos vuestra fecha libre',
    'quiz.subtitle': 'En 1 minuto os hacemos una propuesta personalizada.',
    'quiz.step': 'Paso',
    'quiz.of': 'de',
    'quiz.next': 'Siguiente',
    'quiz.back': 'Atrás',
    'quiz.submit': 'Ver nuestra propuesta',
    'quiz.loading': 'Preparando vuestra propuesta...',
    'quiz.q1': '¿Cuándo os casáis?',
    'quiz.q2': '¿Dónde será la boda?',
    'quiz.q3': '¿Qué tipo de ceremonia?',
    'quiz.q4': '¿Qué servicios os interesan?',
    'quiz.q5': '¿Presupuesto aproximado?',
    'quiz.q6': '¿Cómo os llamáis?',
    'quiz.loc.tarragona': 'Tarragona / Reus',
    'quiz.loc.barcelona': 'Barcelona',
    'quiz.loc.lleida': 'Lleida / Girona',
    'quiz.loc.other_cat': 'Resto de Catalunya',
    'quiz.loc.international': 'Destino internacional',
    'quiz.ceremony.civil': 'Civil',
    'quiz.ceremony.religious': 'Religiosa',
    'quiz.ceremony.symbolic': 'Simbólica',
    'quiz.svc.photo': 'Solo fotografía',
    'quiz.svc.video': 'Solo vídeo',
    'quiz.svc.both': 'Fotografía y vídeo',
    'quiz.budget.low': 'Hasta 1.500 €',
    'quiz.budget.mid': '1.500 – 2.500 €',
    'quiz.budget.high': '2.500 – 3.500 €',
    'quiz.budget.premium': 'Más de 3.500 €',
    'quiz.name.label': 'Vuestros nombres',
    'quiz.name.placeholder': 'Ej. Anna & Marc',
    'quiz.email.label': 'Correo electrónico',
    'quiz.phone.label': 'Teléfono (opcional)',
    'quiz.venue.label': 'Finca o lugar de celebración',
    'quiz.venue.placeholder': 'Ej. Mas la Boella, Tarragona',
    'quiz.error': 'Ha habido un error. Inténtalo de nuevo.',
    'quiz.success.title': '¡Gracias! Os hemos recibido.',
    'quiz.success.desc': 'Revisamos vuestras respuestas y os enviamos una propuesta personalizada en menos de 24h (l.–v.).',

    // Dossier
    'dossier.badge': 'Packs 2026',
    'dossier.title': 'Packs de fotografía, vídeo y foto+vídeo',
    'dossier.lead':
      'Todas las bodas son distintas. Estos son nuestros packs base — a partir de aquí, nos adaptamos a la vuestra. Si no encontráis lo que buscáis, preguntadnos y hablamos.',
    'dossier.lead2':
      'Bodas en Tarragona, Reus, Lleida, Barcelona y resto de Cataluña sin coste de desplazamiento.',
    'dossier.type.photo': 'Fotografía',
    'dossier.type.video': 'Vídeo',
    'dossier.type.combo': 'Foto + Vídeo',
    'dossier.includes': 'Incluye',
    'dossier.badge.star': 'Lo que recomendamos',
    'dossier.badge.picked.photo': 'Más elegido en fotografía',
    'dossier.badge.picked.video': 'Más elegido en vídeo',
    'dossier.cta': 'Consultar disponibilidad',
    'dossier.offer.title': 'Dos detalles',
    'dossier.offer.p1': 'Sesión pre-boda incluida si reserváis antes del 31/12/2026.',
    'dossier.offer.p2': 'Pago fraccionado sin intereses disponible en todos los packs.',

    // Packs — next steps block
    'dossier.next.title': '¿Y ahora qué?',
    'dossier.next.s1': 'Nos escribís. Nos contáis la fecha, el lugar y el pack que os interesa.',
    'dossier.next.s2': 'Os confirmamos disponibilidad en menos de 24h.',
    'dossier.next.s3': 'Si os cuadra, firmamos un contrato simple y bloqueamos la fecha con un 30 %.',
    'dossier.next.s4': 'El resto, unos días antes de la boda. Sin sorpresas.',
    'dossier.next.personalise':
      'Todos los packs se pueden personalizar. Si queréis más o menos cobertura, un álbum extra o un tráiler con música concreta — lo hablamos.',
    'dossier.next.cta.primary': 'Consultar disponibilidad',
    'dossier.next.cta.secondary': 'Habla con nosotros por WhatsApp',

    // Legal
    'legal.updated': 'Última actualización',

    // Schema.org (not user-visible; consumed by src/lib/seo.ts)
    'schema.org.description':
      'Fotógrafos y videógrafos de bodas en Tarragona, Reus, Lleida y Barcelona. Dos hermanos, segunda generación de fotógrafos. Estilo documental, natural, sin poses.',
    'schema.service.foto.name': 'Fotografía de boda',
    'schema.service.foto.description':
      'Cobertura fotográfica completa de boda: 700–1.200 imágenes editadas en galería privada, entregadas en 3–4 semanas. Estilo documental.',
    'schema.service.video.name': 'Vídeo de boda',
    'schema.service.video.description':
      'Película documental de 25–35 minutos, entregada en 8–10 semanas. Opcional: tráiler corto, discursos y ceremonia completa sin cortes.',
    'schema.service.preboda.name': 'Sesión pre-boda',
    'schema.service.preboda.description':
      'Sesión de pareja previa a la boda para conoceros y que os sintáis cómodos con la cámara. En Tarragona, Reus o donde os venga bien.',
    'schema.service.combo.name': 'Pack Foto + Vídeo de boda',
    'schema.service.combo.description':
      'Pack combinado con fotografía (Ferran) y vídeo (Eric). Dos hermanos, un equipo, una boda por día. Presupuesto personalizado según fecha, lugar y pack.',
    'schema.breadcrumb.home': 'Inicio',
    'schema.breadcrumb.blog': 'Blog',
    'schema.breadcrumb.bodas': 'Bodas',
    'schema.breadcrumb.contact': 'Contacto',
    'schema.breadcrumb.quiz': 'Consultar disponibilidad',
    'schema.breadcrumb.videos': 'Vídeos',
    'schema.breadcrumb.legal': 'Aviso legal',
    'schema.breadcrumb.privacy': 'Política de privacidad',
    'schema.breadcrumb.cookies': 'Política de cookies',

    // ─── Reserva (booking proposal page) ─────────────────────────────────
    // Copy locked in docs/booking-spec.md. Keep it in sync there.
    // Variables rendered with template literals at component level.
    'reserva.cta.primary': 'Reservar nuestra fecha',
    'reserva.cta.toPayment': 'Ir al pago del depósito',
    'reserva.cta.expires': 'Esta propuesta es válida hasta el {expires}',

    // Hero
    'reserva.hero.greeting': 'Hola {n1} y {n2},',
    'reserva.hero.body':
      'Hemos preparado esta página pensando en vuestra boda en {venue}, el {date}.\n\nAquí encontraréis nuestra propuesta, el proceso que seguiremos si decidís reservar con nosotros, y las respuestas a las preguntas que suelen hacer todas las parejas antes de dar el sí.\n\nSi todo os encaja, en menos de 10 minutos podemos dejarlo todo reservado.',

    // Why us
    'reserva.why.heading': 'Somos dos hermanos. La segunda generación.',
    'reserva.why.body':
      'Nuestro padre ya hacía fotos y vídeos de bodas en Reus hace más de treinta años. Hoy lo hacemos nosotros, con el mismo cuidado y una mirada actual.\n\nCuando reserváis con Lifetime, nos reserváis a los dos. El trabajo del día lo hacemos nosotros en persona — no un equipo rotatorio que cambia según el fin de semana.\n\nEsa diferencia la notaréis el día, y la veréis después en el material.',

    // Visual proof
    'reserva.proof.eyebrow': 'Bodas reales',
    'reserva.proof.heading': 'Algunas bodas que hemos hecho',
    'reserva.proof.testimonial.author': '— {author}, casados en {venue}',

    // Pack
    'reserva.pack.eyebrow': 'Vuestra propuesta',
    'reserva.pack.heading': 'Pack {name}',
    'reserva.pack.includes': 'Qué incluye:',
    'reserva.pack.excludes': 'Qué no incluye:',
    'reserva.pack.addons': 'Add-ons opcionales:',
    'reserva.pack.invest': 'Inversión total',
    'reserva.pack.deposit': 'Depósito para reservar',
    'reserva.pack.terms': 'Pago restante',
    'reserva.pack.was': 'Antes',
    'reserva.pack.discount': 'Descuento especial',
    'reserva.pack.originalPrice': 'Precio regular',

    // Incentive ("caramelo") — optional reservation reward
    'reserva.incentive.eyebrow': 'Un detalle para vosotros',
    'reserva.incentive.heading': 'Si reserváis con nosotros',
    'reserva.incentive.deadline': 'Válido si reserváis antes del {date}',
    'reserva.incentive.save': 'Ahorráis {amount}',
    'reserva.incentive.cta': 'Reservar nuestra fecha',

    // Steps
    'reserva.steps.heading': 'Si todo os encaja, así funciona:',
    'reserva.steps.s1.title': 'Rellenáis el formulario de reserva',
    'reserva.steps.s1.body': '5 minutos. Recogemos los datos necesarios para preparar el contrato.',
    'reserva.steps.s2.title': 'Os enviamos el contrato para firmar online',
    'reserva.steps.s2.body': 'Sin imprimir, sin escanear. Lo haréis desde el móvil en 2 minutos.',
    'reserva.steps.s3.title': 'Pagáis el depósito',
    'reserva.steps.s3.body': 'Con tarjeta o transferencia, como mejor os vaya.',
    'reserva.steps.s4.title': 'Vuestra fecha queda reservada',
    'reserva.steps.s4.body': 'Bloqueamos el calendario solo para vosotros.',
    'reserva.steps.outro':
      'A partir de aquí, os acompañamos hasta el día. Meses antes os enviaremos un cuestionario para planificar el timeline, y las semanas previas repasamos la logística juntos.',

    // FAQ
    'reserva.faq.heading': 'Preguntas frecuentes',
    'reserva.faq.q1.q': '¿Qué pasa si llueve?',
    'reserva.faq.q1.a':
      'Trabajamos con dos cámaras y material preparado para cualquier condición. La lluvia muchas veces da las mejores fotos del día — y ya lo hemos vivido muchas veces.',
    'reserva.faq.q2.q': '¿Y si tenéis otra boda el mismo día que la nuestra?',
    'reserva.faq.q2.a':
      'Cuando reserváis, bloqueamos el calendario solo para vosotros. No hacemos dos bodas el mismo día, nunca.',
    'reserva.faq.q3.q': '¿Podemos ajustar el pack a nuestras necesidades?',
    'reserva.faq.q3.a':
      'Sí. El pack es un punto de partida. Si necesitáis más horas, menos horas, solo foto, solo vídeo, o algo distinto, lo hablamos y lo ajustamos.',
    'reserva.faq.q4.q': '¿Cuándo recibimos las fotos y el vídeo?',
    'reserva.faq.q4.a':
      'Material editado completo entre 8 y 12 semanas después de la boda. Una selección breve (10-15 fotos) os la enviamos la semana siguiente para que podáis compartirla con la familia.',
    'reserva.faq.q5.q': '¿Cómo se paga el resto?',
    'reserva.faq.q5.a':
      '50% al firmar, 50% un mes antes del día. Lo podemos ajustar si os va mejor otro reparto.',
    'reserva.faq.q6.q': '¿Qué pasa si tuviéramos que cancelar?',
    'reserva.faq.q6.a':
      'Política clara en el contrato. Resumiendo: el depósito no es reembolsable, pero la fecha se puede mover una vez sin coste si avisáis con tiempo suficiente.',
    'reserva.faq.q7.q': '¿Estáis federados? ¿Tenéis seguro?',
    'reserva.faq.q7.a':
      'Sí. Trabajamos como autónomos federados, con seguro de responsabilidad civil y factura oficial.',

    // Final CTA
    'reserva.final.heading': 'Si os encaja, hagámoslo.',
    'reserva.final.whatsapp':
      'Si tenéis cualquier duda antes de reservar, escribidnos por WhatsApp.',

    // Status banner
    'reserva.banner.submitted.title': 'Ya nos habéis enviado vuestros datos',
    'reserva.banner.submitted.body':
      'Os enviamos el contrato en menos de 24h. Si necesitáis modificar algo, escribidnos por WhatsApp.',

    // Expired view
    'reserva.expired.title': 'Esta propuesta caducó el {date}',
    'reserva.expired.body':
      'Escribidnos y os la refrescamos en un momento.',
    'reserva.expired.cta': 'Contactar por WhatsApp',

    // Deposit payment (post-/reserva)
    'reserva.pay.heading': 'Pago de la reserva',
    'reserva.pay.intro': 'Para confirmar vuestra fecha en exclusiva, solo queda el pago del depósito. Podéis pagar por transferencia o con tarjeta.',
    'reserva.pay.dataReceived': '¡Hemos recibido vuestros datos!',
    'reserva.pay.success': '¡Pago recibido! Os enviaremos el contrato para firmarlo. Gracias por confiar en nosotros.',
    'reserva.pay.cancel': 'El pago se ha cancelado. Podéis volver a intentarlo o usar la transferencia.',
    'reserva.pay.recap.pack': 'Pack',
    'reserva.pay.recap.total': 'Inversión total',
    'reserva.pay.recap.deposit': 'Depósito de reserva',
    'reserva.pay.recap.terms': 'Plan de pago',
    'reserva.pay.transfer.heading': 'Transferencia bancaria',
    'reserva.pay.transfer.beneficiary': 'Beneficiario',
    'reserva.pay.transfer.iban': 'IBAN',
    'reserva.pay.transfer.bank': 'Banco',
    'reserva.pay.transfer.amount': 'Importe',
    'reserva.pay.transfer.reference': 'Concepto',
    'reserva.pay.transfer.note': 'Cuando recibamos la transferencia os enviaremos el contrato.',
    'reserva.pay.note.secondPayment': 'El segundo pago se hace hasta 15 días antes de la boda.',
    'reserva.pay.note.cash': 'El pago en efectivo se entrega el día de la boda, o en una visita previa si la concertamos.',
    'reserva.pay.card.heading': 'Pago con tarjeta',
    'reserva.pay.card.button': 'Pagar el depósito con tarjeta',
    'reserva.pay.card.note': 'Pago seguro mediante Stripe. Se os enviará el contrato automáticamente.',
    'reserva.pay.card.error': 'No hemos podido iniciar el pago. Volved a intentarlo o usad la transferencia.',
    'reserva.pay.paid.heading': 'Depósito recibido',
    'reserva.pay.paid.body': '¡Gracias! El siguiente paso es rellenar y firmar el contrato.',
    'reserva.pay.paid.cta': 'Ir al contrato',

    // Not found view
    'reserva.notfound.title': 'No hemos encontrado esta propuesta',
    'reserva.notfound.body':
      'El enlace puede ser incorrecto o haberse retirado. Si pensáis que es un error, escribidnos.',

    // Reservation form (under #reservar anchor on the proposal page)
    'reserva.form.heading': 'Datos para la reserva',
    'reserva.form.intro':
      'Recogemos los datos necesarios para preparar el contrato. En menos de 24h os lo enviamos para firmar online.',
    'reserva.form.section.c1': 'Datos del primer contraente',
    'reserva.form.section.c2': 'Datos del segundo contraente',
    'reserva.form.section.billing': 'Datos de facturación',
    'reserva.form.section.day': 'Confirmación del día',
    'reserva.form.section.preferences': 'Preferencias',
    'reserva.form.section.optional': 'Opcional pero útil',
    'reserva.form.field.fullName': 'Nombre completo',
    'reserva.form.field.dni': 'DNI / NIE',
    'reserva.form.field.birthDate': 'Fecha de nacimiento',
    'reserva.form.field.address': 'Dirección postal completa',
    'reserva.form.field.sameAddressAsC1': 'Vivimos juntos en la misma dirección postal (usar la dirección del primer contraente para los dos y para la factura).',
    'reserva.form.field.email': 'Email',
    'reserva.form.field.phone': 'Teléfono',
    'reserva.form.field.billingSame': 'Misma dirección que el primer contraente',
    'reserva.form.field.billingName': 'Nombre de facturación',
    'reserva.form.field.billingDni': 'DNI/NIF de facturación',
    'reserva.form.field.billingAddress': 'Dirección de facturación',
    'reserva.form.field.dateConfirmed': '¿Fecha confirmada?',
    'reserva.form.field.dateAlt': 'Fecha alternativa propuesta',
    'reserva.form.field.venueConfirmed': '¿Lugar confirmado?',
    'reserva.form.field.venueAlt': 'Lugar alternativo propuesto',
    'reserva.form.field.timeSlot': '¿Boda de mañana o de tarde?',
    'reserva.form.field.timeSlot.hint': 'La hora exacta la concretaremos más adelante.',
    'reserva.form.field.ceremonyTime': 'Hora aproximada de la ceremonia',
    'reserva.form.field.serviceEndTime': 'Hora aproximada de fin del servicio',
    'reserva.form.field.guestCount': 'Número estimado de invitados',
    'reserva.form.field.communication': 'Método de comunicación preferido',
    'reserva.form.field.language': 'Idioma preferido',
    'reserva.form.field.payment': 'Método de pago preferido',
    'reserva.form.field.howFound': '¿Cómo nos conocisteis?',
    'reserva.form.field.notes': '¿Hay algo importante que queráis que sepamos desde ya?',
    'reserva.form.opt.yes': 'Sí',
    'reserva.form.opt.no': 'No',
    'reserva.form.opt.morning': 'Mañana',
    'reserva.form.opt.afternoon': 'Tarde',
    'reserva.form.field.billingContact': '¿A nombre de qué contraente irá el contrato y la factura?',
    'reserva.form.opt.contraent1': 'Primer contraente',
    'reserva.form.opt.contraent2': 'Segundo contraente',
    'reserva.form.opt.email': 'Email',
    'reserva.form.opt.whatsapp': 'WhatsApp',
    'reserva.form.opt.phone': 'Teléfono',
    'reserva.form.opt.card': 'Tarjeta',
    'reserva.form.opt.transfer': 'Transferencia',
    'reserva.form.submit': 'Enviar y pasar al contrato',
    'reserva.form.submit.microcopy':
      'Al enviar, recibiréis un email de confirmación inmediato. En menos de 24h os enviamos el contrato para firmar.',
    'reserva.form.submitting': 'Enviando…',
    'reserva.form.success.title': '¡Hecho!',
    'reserva.form.success.body':
      'Hemos recibido vuestros datos. Os llegará el email de confirmación en los próximos minutos. Si no aparece, revisad spam.',
    'reserva.form.error.generic':
      'No hemos podido enviar el formulario. Probad de nuevo en un momento o escribidnos por WhatsApp.',
    'reserva.form.error.alreadySubmitted':
      'Esta reserva ya está procesada. Si necesitáis modificar algo, escribidnos por WhatsApp.',
    'reserva.form.error.rateLimited':
      'Demasiados intentos en poco tiempo. Esperad unos minutos antes de probar de nuevo.',
    'reserva.form.error.validation':
      'Hay campos con un formato incorrecto. Revisadlos abajo.',

    // /contrato post-deposit form — second step after /reserva, filled
    // once the operator has confirmed the deposit transfer. Captures the
    // image-rights consent and the operational details that go in the
    // physical contract (ceremony vs reception, type, First Look, GDPR).
    'contrato.title': 'Datos para el contrato',
    'contrato.intro':
      'Esta información es esencial para la elaboración del contrato, ya que nos tomamos muy en serio vuestros derechos de imagen. Queremos que tengáis plena confianza en el uso que haremos del material que capturemos durante vuestra boda.',
    'contrato.gating.deposit_pending.title': 'Esperando confirmación del depósito',
    'contrato.gating.deposit_pending.body':
      'En cuanto recibamos el depósito os habilitaremos este formulario para terminar de preparar el contrato. Si creéis que ya lo habéis transferido, avisadnos por WhatsApp.',
    'contrato.gating.already_submitted.title': 'Ya tenemos vuestros datos',
    'contrato.gating.already_submitted.body':
      'Hemos recibido toda la información del contrato. Lo estamos preparando y os llegará firmado en unos días.',
    'contrato.section.day.heading': 'Detalles operativos del día',
    'contrato.section.day.intro': 'Para terminar de planificar la jornada.',
    'contrato.section.consent.heading': 'Consentimiento de publicación',
    'contrato.section.consent.intro':
      'La publicación de nuestros trabajos en medios digitales o físicos se realiza siempre sin ánimo de lucro y con el único propósito de mostrar nuestra forma de contar historias. Nunca publicaremos la película completa de vuestra boda (20–25 min) en ningún medio público. Marcad los canales en los que nos autorizáis a mostrar las imágenes:',
    'contrato.section.gdpr.heading': 'Protección de datos',
    'contrato.field.languageBetween': 'Idioma en el que os comunicáis entre vosotros',
    'contrato.field.languageBetween.help': 'Útil para saber en qué idioma dirigirnos a vosotros durante la jornada.',
    'contrato.field.ceremonyLocation': 'Lugar de la ceremonia',
    'contrato.field.receptionLocation': 'Lugar del banquete',
    'contrato.field.c1PrepAddress': 'Dirección donde se preparará el contraente 1',
    'contrato.field.c2PrepAddress': 'Dirección donde se preparará el contraente 2',
    'contrato.field.prepAddress.help': 'Calle, número, ciudad. Es donde os recogeremos por la mañana.',
    'contrato.field.ceremonyType': 'Tipo de ceremonia',
    'contrato.opt.ceremony.civil': 'Civil',
    'contrato.opt.ceremony.religious': 'Religiosa',
    'contrato.opt.ceremony.other': 'Otro',
    'contrato.field.ceremonyTypeOther': 'Especificad',
    'contrato.field.firstLook': '¿Queréis hacer un "First Look"?',
    'contrato.field.firstLook.help':
      'El First Look es un momento especial antes de la ceremonia en el que os veis por primera vez en un espacio íntimo. Nosotros os acompañamos para capturar toda la emoción.',
    'contrato.opt.firstLook.yes': 'Sí',
    'contrato.opt.firstLook.no': 'No',
    'contrato.opt.firstLook.not_sure': 'Aún no lo tenemos claro',
    'contrato.field.publicationConsent': 'Canales autorizados',
    'contrato.opt.consent.display': 'Escaparate físico en el estudio (C/ Mare Molas 26, Reus)',
    'contrato.opt.consent.facebook': 'Facebook profesional (facebook.com/lifetimeweddingstories)',
    'contrato.opt.consent.website': 'Página web (lifetime.photo)',
    'contrato.opt.consent.instagram': 'Instagram (@lifetime.weddings)',
    'contrato.opt.consent.private_video':
      'Vídeo privado (solo compartido con otras parejas, nunca enlace público)',
    'contrato.opt.consent.instagram_reel': 'Reel de Instagram (@lifetime.weddings)',
    'contrato.opt.consent.instagram_stories':
      'Stories de Instagram el mismo día de la boda (cobertura en directo)',
    'contrato.opt.consent.blog_real_wedding':
      'Artículo "real wedding" en el blog (lifetime.photo/bodas) con vuestra historia',
    'contrato.opt.consent.paid_ads':
      'Anuncios pagados en Meta / Google (uso de imágenes en campañas publicitarias)',
    'contrato.opt.consent.venue_partners':
      'Compartir el reportaje con el venue / wedding planner para sus propios canales',
    'contrato.field.gdpr.label': 'Acepto el tratamiento de datos',
    'contrato.field.gdpr.body':
      'De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, le informamos que los datos personales recogidos serán tratados por OBJECTIU S.C.P. (C/ Mare Molas 26, Reus) con la finalidad de gestionar el contrato y la prestación de los servicios fotográficos. Sus datos no se cederán a terceros salvo obligación legal. Podrá ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiéndonos al correo indicado en nuestra política de privacidad.',
    'contrato.submit': 'Enviar datos del contrato',
    'contrato.submit.microcopy':
      'Una vez enviado, prepararemos el contrato y os llegará por email en los próximos días.',
    'contrato.submitting': 'Enviando…',
    'contrato.success.title': '¡Hecho!',
    'contrato.success.body':
      'Hemos recibido los datos. Prepararemos el contrato y os llegará para firmar en los próximos días.',
    'contrato.error.generic':
      'No hemos podido enviar el formulario. Probad de nuevo en un momento o escribidnos por WhatsApp.',
    'contrato.error.alreadySubmitted':
      'Estos datos ya están registrados. Si necesitáis modificar algo, escribidnos por WhatsApp.',
    'contrato.error.depositPending':
      'Esperamos vuestro depósito antes de poder procesar este formulario.',
    'contrato.error.rateLimited': 'Demasiados intentos en poco tiempo. Esperad unos minutos.',
    'contrato.error.validation': 'Hay campos con un formato incorrecto. Revisadlos.',
    'contrato.accept.heading': 'Vuestro contrato',
    'contrato.accept.intro': 'Este es el contrato con vuestros datos. Leedlo con calma y aceptadlo para finalizar la reserva. Os enviaremos una copia en PDF por email.',
    'contrato.accept.checkbox': 'He leído y acepto el contrato',
    'contrato.accept.submit': 'Aceptar el contrato',
    'contrato.accept.submitting': 'Enviando…',
    'contrato.accept.success.title': '¡Contrato aceptado!',
    'contrato.accept.success.body': 'Gracias. Os hemos enviado vuestra copia en PDF por email. ¡Nos vemos pronto!',
    'contrato.accept.error.generic': 'No se ha podido registrar la aceptación. Inténtalo de nuevo o escríbenos por WhatsApp.',
    'contrato.accepted.title': 'Contrato aceptado',
    'contrato.accepted.body': 'Ya tenemos vuestro contrato aceptado. Os hemos enviado la copia en PDF por email. Cualquier duda, escribidnos.',

    // Video embed (flagship trailer)
    'reserva.video.eyebrow': 'Bodas en movimiento',
    'reserva.video.heading': 'Echad un vistazo a nuestro trabajo',

    // Videocall CTA (softer "let's meet first" option, between FAQ and FinalCTA)
    'reserva.videocall.eyebrow': '¿Queréis que nos conozcamos antes?',
    'reserva.videocall.heading': 'Hagamos una videollamada de 15 minutos',
    'reserva.videocall.body':
      'Si todavía no lo tenéis del todo claro, lo más fácil es que hablemos en directo. Una videollamada corta — 15 minutos, cuando os vaya bien — nos sirve para conocernos, resolver las dudas concretas que tengáis y que veáis cómo trabajamos.\n\nNo cuesta nada y no os compromete a reservar.',
    'reserva.videocall.cta': 'Hablar por WhatsApp',
    'reserva.videocall.bookCta': 'Reservar una videollamada',
    'reserva.videocall.orWhatsapp': 'O si lo preferís,',
    'reserva.videocall.whatsappLink': 'escribidnos por WhatsApp.',
    'reserva.videocall.subnote': 'Os va bien cualquier tarde entre semana.',

    // Accessibility / global UI labels
    'a11y.skipToContent': 'Saltar al contenido',
    'a11y.openMenu': 'Abrir menú',
    'a11y.closeMenu': 'Cerrar menú',

    // Cookies
    'cookies.title': 'Privacidad y cookies',
    'cookies.desc': 'Usamos cookies esenciales para que la web funcione y, opcionalmente, cookies analíticas para mejorar vuestra experiencia. Podéis aceptarlas, rechazarlas o personalizar vuestra elección.',
    'cookies.accept': 'Aceptar todas',
    'cookies.reject': 'Solo esenciales',
    'cookies.settings': 'Más información',
    'cookies.preferences': 'Preferencias de cookies',
    'consent.gated.title': 'Contenido bloqueado',
    'consent.gated.body': 'Has rechazado las cookies de terceros. Para ver este vídeo de YouTube necesitamos cargar contenido externo que puede instalar cookies.',
    'consent.gated.cta': 'Cambiar preferencias',

    // Private quote page /p/<token>
    'quote.notFound.title': 'Presupuesto no encontrado',
    'quote.notFound.body': 'Este enlace no existe o ha sido archivado. Si creéis que es un error, escribidnos a',
    'quote.expired.title': 'Enlace caducado',
    'quote.expired.body': 'Este presupuesto ya no está disponible. Pedidnos un enlace actualizado a',
    'quote.password.title': 'Contenido protegido',
    'quote.password.body': 'Introducid la contraseña que os hemos compartido.',
    'quote.password.error': 'Contraseña incorrecta.',
    'quote.password.submit': 'Entrar',
    'quote.hero.eyebrow': 'Presupuesto personalizado',
    'quote.hero.body': 'Gracias por confiar en Lifetime Weddings. Aquí tenéis la propuesta que hemos preparado para vosotros.',
    'quote.notes.eyebrow': 'Una nota para vosotros',
    'quote.intro.default': '{name}, hemos preparado esta propuesta pensando en vuestro día. Echadle un vistazo con calma —el vídeo, ejemplos reales y los packs— y preguntadnos lo que queráis.',
    'quote.packs.heading': 'La propuesta',
    'quote.packs.includes': 'Incluye',
    'quote.showcase.eyebrow': 'Trabajos similares',
    'quote.showcase.cta': 'Ver la galería y el vídeo',
    'quote.gallery.heading': 'La galería que os recomendamos',
    'quote.gallery.eyebrow': 'Galería privada',
    'quote.gallery.description': 'Mirad una boda completa que hemos disparado',
    'quote.gallery.newTab': 'Abrir en una pestaña',
    'quote.gallery.blocked': 'La galería no se puede mostrar incrustada aquí. Ábrela en una pestaña aparte para verla completa.',
    'quote.cta.heading': '¿Nos vemos pronto?',
    'quote.cta.body': 'Si tenéis preguntas o queréis concretar algo, responded este correo o escribidnos por WhatsApp.',
    'quote.cta.email': 'Escribir por email',
    'quote.cta.whatsapp': 'Escribir por WhatsApp',
    'quote.wa.message': '¡Hola! Somos {name}. Hemos visto el presupuesto y nos gustaría concretar.',
    'quote.wa.videocallMessage': '¡Hola! Somos {name}. Hemos visto el presupuesto y nos gustaría hacer una videollamada de 15 minutos antes de decidir.',
    'quote.extras.heading': 'Extras opcionales',
    'quote.extras.body': 'Podéis añadir cualquiera de estos servicios a vuestro pack. Os los reservamos solo si nos lo confirmáis.',
    'quote.combo.extras.heading': 'Y juntos:',
    // Interactive configurator — couple-side
    'quote.configurator.eyebrow': 'A vuestra medida',
    'quote.configurator.heading': 'Personalizad vuestro presupuesto',
    'quote.configurator.intro': 'Marcad lo que os interesa y veréis el total al momento. Cuando esté listo, enviádnoslo y os respondemos con la propuesta final.',
    'quote.configurator.basePacks': 'Packs base',
    'quote.configurator.combos': 'Combos (foto + vídeo)',
    'quote.configurator.extras': 'Extras opcionales',
    'quote.configurator.typePhoto': 'Foto',
    'quote.configurator.typeVideo': 'Vídeo',
    'quote.configurator.typeCombo': 'Combo',
    'quote.configurator.subtotal': 'Subtotal',
    'quote.configurator.discount': 'Descuento',
    'quote.configurator.total': 'Total',
    'quote.configurator.paymentNote': 'Pago: 30 % de reserva, 50 % un mes antes de la boda, 20 % un mes después. Sin comisiones ni intermediarios.',
    'quote.configurator.messageLabel': 'Mensaje para nosotros (opcional)',
    'quote.configurator.messagePlaceholder': 'Por ejemplo: ¿podríais incluir 2 horas extra de cobertura? ¿O sustituir el álbum por dos para los padres?',
    'quote.configurator.submit': 'Enviar nuestra configuración',
    'quote.configurator.submitting': 'Enviando…',
    'quote.configurator.successTitle': 'Recibido — gracias',
    'quote.configurator.successBody': 'Nos ha llegado vuestra configuración. Os respondemos en breve con la propuesta final.',
    'quote.configurator.errorBody': 'No hemos podido enviarlo. Por favor, probadlo de nuevo o escribidnos por WhatsApp.',
    'quote.configurator.empty': 'Marcad al menos un pack o un extra antes de enviar.',
    'quote.configurator.closedTitle': 'Presupuesto cerrado',
    'quote.configurator.closedBody': 'Hemos cerrado vuestro presupuesto. Si queréis cambiar algo, escribidnos y lo abrimos de nuevo.',
    'quote.configurator.previousTitle': 'Vuestra última configuración está guardada',
    'quote.configurator.singleChoiceNote': 'Elegid solo uno: un pack base o un combo. Los extras los podéis combinar libremente.',
    'quote.configurator.clearPack': 'Quitar la selección del pack',
    'quote.configurator.toggleSeeVideo': '¿Queréis ver también la opción de vídeo? →',
    'quote.configurator.toggleSeePhoto': '¿Queréis ver también la opción de foto? →',
    // Value pillars block (3 columns) — between showcase and triptych on /p/<token>.
    'quote.values.eyebrow': 'Qué nos diferencia',
    'quote.values.heading': 'Tres motivos por los que nuestras parejas nos eligen',
    'quote.values.p1.title': 'Dos hermanos, un mismo equipo',
    'quote.values.p1.body': 'Foto y vídeo coordinados desde dentro: una sola mirada en dos formatos. No tendréis que sincronizar a dos proveedores el día más importante.',
    'quote.values.p2.title': 'Fotoperiodismo, sin poses',
    'quote.values.p2.body': 'Pasamos desapercibidos y no dirigimos la escena. Queremos que en 20 años reviváis el día tal y como fue, no que recordéis al fotógrafo.',
    'quote.values.p3.title': 'Entrega en 3-4 semanas',
    'quote.values.p3.body': 'Vuestra galería privada con 700-1.200 fotos editadas, listas para compartir antes de lo que tarda en apagarse el bronceado de la luna de miel. El vídeo, en 8-10 semanas.',
    'quote.faq.heading': 'Preguntas frecuentes',
    'quote.faq.q1.q': '¿Cuántas fotos entregamos?',
    'quote.faq.q1.a': 'Os entregamos entre 700 y 1.200 fotografías editadas, seleccionando siempre las mejores para contar vuestra historia de la forma más emocionante y auténtica.',
    'quote.faq.q2.q': '¿Quién elige las fotos del álbum?',
    'quote.faq.q2.a': 'Nosotros hacemos una primera selección para que el álbum narre bien vuestro gran día. Tendréis una ronda de cambios para ajustarlo a vuestro gusto.',
    'quote.faq.q3.q': '¿Cuánto dura el vídeo?',
    'quote.faq.q3.a': 'El vídeo principal suele durar entre 25 y 40 minutos. Si queréis, podéis añadir extras como los discursos en un vídeo aparte. Nos adaptamos a lo que necesitéis.',
    'quote.faq.q4.q': '¿Cómo se hace el pago?',
    'quote.faq.q4.a': '30 % como reserva, 50 % un mes antes de la boda y 20 % un mes después. Podéis pagar en efectivo, transferencia o tarjeta — siempre con justificante y contrato firmado. También aceptamos pagos a plazos mensuales hasta el día de la boda, sin comisiones ni intermediarios.',
    'quote.faq.q5.q': '¿Podemos elegir la música del vídeo?',
    'quote.faq.q5.a': 'Por supuesto. Si tenéis una canción especial en mente, contádnoslo. Si por algún motivo no encaja bien con el montaje, os lo comentaremos y os ayudaremos a encontrar una alternativa que os guste.',
    'quote.faq.q6.q': 'Nos casamos fuera de la provincia, ¿os desplazáis?',
    'quote.faq.q6.a': 'Sí. Hemos cubierto bodas por toda España y también en Nueva York, Roma y Londres. Las tarifas incluyen el desplazamiento dentro de la provincia de Tarragona y hasta 100 km de Reus. Para distancias mayores, presupuestamos viaje y kilometraje aparte.',
    'quote.faq.q7.q': '¿Cuánto tiempo estaréis en la boda?',
    'quote.faq.q7.a': 'El día de vuestra boda lo reservamos solo para vosotros. Normalmente estamos entre 10 y 13 horas — desde los preparativos hasta 45 min – 1 h después del baile nupcial. Y nunca delegamos en terceros: vamos nosotros.',
  },

  ca: {
    // Nav
    'nav.home': 'Inici',
    'nav.about': 'Nosaltres',
    'nav.portfolio': 'Portfolio',
    'nav.videos': 'Vídeos',
    'nav.services': 'Serveis',
    'nav.testimonials': 'Testimonis',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacte',
    'nav.book': 'Consultar disponibilitat',

    'hero.eyebrow': 'Fotografia i vídeo de bodes · Tarragona · Reus · Lleida',
    'hero.title': 'Dos germans. Dues càmeres: una de foto, una de vídeo.',
    'hero.title2': 'La vostra història, explicada a quatre mans.',
    'hero.subtitle': 'Som la segona generació d’una família de fotògrafs. Fa més de 15 anys que expliquem bodes a Catalunya amb un estil documental, natural i sense posats forçats.',
    'hero.cta': 'Consultar disponibilitat',
    'hero.cta.secondary': 'Veure bodes reals',

    'trust.weddings': '+150 bodes',
    'trust.coverage': 'Tarragona · Lleida · Barcelona',
    'trust.delivery': 'Entrega en 3–4 setmanes',
    'trust.rating': '5★ a Google',

    'about.label': 'Qui som',
    'about.title': 'Ens hem criat entre càmeres.',
    'about.subtitle': 'Dos germans, la mateixa mirada en dos formats.',
    'about.p1':
      'Som l’Eric i en Ferran Blasco, dos germans i la segona generació d’una família de fotògrafs. Abans que caminéssim, ja hi havia carrets, focus i àlbums de boda a casa. D’alguna manera, això et marca.',
    'about.p2':
      'Vam crear Lifetime Weddings perquè volíem explicar les bodes d’una altra manera: sense posats forçats, sense fórmules i sense presses. Un ho fa en foto, l’altre en vídeo. La mateixa mirada, dos formats.',
    'about.p3':
      'Fem bodes a Tarragona, Reus, Lleida, Barcelona i allà on ens porti la història. I sí — si ens ho demaneu, muntem la càmera a Nova York també (ja ho hem fet).',
    'about.cta': 'Veure bodes reals',

    'team.label': 'Els que hi serem',

    'portfolio.label': 'La nostra feina',
    'portfolio.title': 'Algunes bodes recents',
    'portfolio.intro':
      'El nostre estil és fotoperiodisme documental: passem desapercebuts, no dirigim, no interrompem. La nostra feina és que d’aquí 20 anys reviviu el dia — no que recordeu el fotògraf.',

    'services.label': 'El que oferim',
    'services.title': 'Serveis que oferim',
    'services.photo.title': 'Fotografia de Bodes',
    'services.photo.desc':
      '700–1.200 imatges editades, entregades en galeria privada en 3–4 setmanes. Cobertura completa del dia, de la preparació a la festa, amb estil documental.',
    'services.video.title': 'Vídeo de Bodes',
    'services.video.desc':
      'Pel·lícula documental de 25–35 minuts, entregada en 8–10 setmanes. Opcional: tràiler curt, discursos i cerimònia completa sense talls.',
    'services.fusion.title': 'Sessió pre-boda',
    'services.fusion.desc':
      'Un matí o una tarda per conèixer-nos i perquè us familiaritzeu amb la càmera abans del gran dia. A Tarragona, Reus o allà on us vagi bé.',

    'video.label': 'Fins on calgui',
    'video.title': 'Nova York, Màlaga, Osca, o a la vora de casa',
    'video.p1':
      'L’Ariadna i en Clifton es van conèixer a Manhattan. Volien un record que comencés allà on va començar tot, així que vam muntar la càmera i ens vam endur el vídeo a Brooklyn.',
    'video.p2':
      'No totes les històries demanen viatjar a Nova York — la majoria es queden a Tarragona i estan molt bé així. Però si la vostra ho demana, anem on faci falta.',
    'video.cta': 'Parleu-nos de la vostra història',

    'testi.label': 'Testimonis',
    'testi.title': 'Mireu què en diuen de nosaltres',

    'insta.title': 'Siguem amics a Instagram',
    'insta.handle': '@lifetime.weddings',
    'insta.cta': 'Segueix-nos a Instagram',

    'yt.title': 'Subscriu-te al nostre canal de YouTube',

    'contact.label': 'Contacte',
    'contact.title': 'Tenim ganes de conèixer-vos',
    'contact.subtitle':
      'Expliqueu-nos la vostra boda. Us responem en menys de 24h (dl.–dv.).',
    'contact.date.placeholder': 'Aproximada (mes i any, o estació)',
    'contact.field.name': 'Nom',
    'contact.field.email': 'Correu electrònic',
    'contact.field.phone': 'Telèfon',
    'contact.field.date': 'Data de la boda',
    'contact.field.venue': 'Lloc de la celebració',
    'contact.field.message': 'Expliqueu-nos sobre la vostra boda',
    'contact.field.consent': 'Accepto la política de privacitat.',
    'contact.submit': 'Enviar missatge',
    'contact.success': 'Moltes gràcies per posar-vos en contacte! Us respondrem ben aviat.',
    'contact.error': 'Hi ha hagut un error en enviar el missatge. Torneu-ho a provar o escriviu-nos a hola@lifetime.photo',
    'contact.microcopy': 'Us responem en menys de 24h (de dilluns a divendres).',
    'contact.placeholder.message': 'Opcional: lloc, estil, hora de la cerimònia, res que vulgueu compartir…',
    'contact.where.title': 'D’on venim i fins on anem',
    'contact.where.desc':
      'La nostra base és a Reus (Tarragona). Cobrim bodes sense cost de desplaçament a Tarragona, Reus, Lleida, Barcelona i la resta de Catalunya. Per a bodes fora de Catalunya, us passem un pressupost a mida.',
    'contact.where.address': 'Adreça',
    'contact.where.hours': 'Horari de resposta',
    'contact.where.hours.value': 'dl.–dv., 9h–19h',
    'contact.h1': 'Parlem de la vostra boda',
    'contact.sub.pre': 'Us responem en menys de 24h (dl.–dv.). Si preferiu, també podeu escriure-nos per',
    'contact.sub.wa': 'WhatsApp',
    'contact.sub.post': '.',

    // Videos page
    'videos.eyebrow': 'Tràilers',
    'videos.h1': 'Vídeos de boda',
    'videos.intro':
      'Pel·lícules documentals de bodes filmades a Tarragona, Reus i arreu de Catalunya. Sense posats forçats, sense guió — només el que passa de veritat.',
    'videos.play.aria': 'Reproduir tràiler',
    'videos.channel.cta': 'Veure més vídeos al nostre canal de YouTube →',

    // Landings
    'landings.deliverables.title': 'Què us entreguem',
    'landings.packs.title': 'Packs recomanats',

    'footer.rights': 'Tots els drets reservats.',
    'footer.legal': 'Avís legal',
    'footer.privacy': 'Política de privacitat',
    'footer.cookies': 'Política de galetes',

    'wa.label': 'Escriu-nos per WhatsApp',
    'wa.chat': 'Parla amb nosaltres',
    'wa.message':
      'Hola! Ens agradaria informació dels vostres packs de foto i vídeo de boda. Ens casem el…',

    'yt.more': 'Tots els tràilers i pel·lícules al nostre canal →',

    // FAQ
    'faq.label': 'Preguntes freqüents',
    'faq.title': 'Resolem els dubtes més habituals',
    'faq.q1': 'Sou dos o un? Qui ve el dia de la boda?',
    'faq.a1': 'Venim sempre l’Eric (vídeo) i en Ferran (foto). Si el pack inclou segon operador, s’incorpora una persona més de confiança durant les hores clau (preparatius dobles, cerimònia o festa).',
    'faq.q2': 'Quin estil de fotografia feu?',
    'faq.a2': 'Fotoperiodisme creatiu. Documental, natural, sense posats forçats. Us guiem quan cal — per exemple en el retrat de parella — però la resta del dia passem desapercebuts. L’objectiu és que d’aquí 20 anys reviviu el dia, no que recordeu el fotògraf.',
    'faq.q3': 'Quant costa una boda amb vosaltres?',
    'faq.a3': 'Cada boda és única i el pressupost depèn de la data, el lloc i el pack. Us en passem un de personalitzat en menys de 24h. Empleneu el quiz d\'1 minut amb les vostres dades i us responem amb una proposta concreta.',
    'faq.q4': 'Quan rebem les fotos i el vídeo?',
    'faq.a4': 'Galeria online amb totes les fotos editades en 3–4 setmanes. Vídeo documental en 8–10 setmanes. Tràiler, si l’heu contractat, en 3–4 setmanes.',
    'faq.q5': 'Viatgeu fora de Catalunya?',
    'faq.a5': 'Sí. La nostra base és Reus, però hem fet bodes a Barcelona, Lleida, Girona, Osca, Castelló, Màlaga i Nova York. Els desplaçaments fora de Catalunya es pressuposten a part.',
    'faq.q6': 'Feu sessió pre-boda?',
    'faq.a6': 'Sí. És opcional i la recomanem: us ajuda a sentir-vos còmodes davant de la càmera i ens permet conèixer-vos millor abans del gran dia.',
    'faq.q7': 'I si plou?',
    'faq.a7': 'Doncs plou, i és preciós. Tenim experiència en bodes amb pluja, vent o sol de justícia. Mai és un problema — només una altra història per explicar.',
    'faq.q8': 'Com es fa la reserva?',
    'faq.a8': 'Confirmem disponibilitat, signem un contracte simple i demanem un 30 % per bloquejar la data. La resta es paga abans de la boda.',
    'faq.q9': 'Puc veure una boda completa, no només els millors moments?',
    'faq.a9': 'Sí. Si ens escriviu us enviem 1–2 galeries completes perquè veieu la coherència de tot el reportatge, no només les fotos d’Instagram.',
    'faq.q10': 'Feu àlbum?',
    'faq.a10': 'Sí, dissenyem àlbums de fusta personalitzats inclosos en alguns packs. També podem dissenyar àlbums extra per a pares i padrins.',

    'quiz.title': 'Mirem si tenim la vostra data lliure',
    'quiz.subtitle': 'En 1 minut us fem una proposta personalitzada.',
    'quiz.step': 'Pas',
    'quiz.of': 'de',
    'quiz.next': 'Següent',
    'quiz.back': 'Enrere',
    'quiz.submit': 'Veure la nostra proposta',
    'quiz.loading': 'Preparant la vostra proposta...',
    'quiz.q1': 'Quan us caseu?',
    'quiz.q2': 'On serà la boda?',
    'quiz.q3': 'Quin tipus de cerimònia?',
    'quiz.q4': 'Quins serveis us interessen?',
    'quiz.q5': 'Pressupost aproximat?',
    'quiz.q6': 'Com us dieu?',
    'quiz.loc.tarragona': 'Tarragona / Reus',
    'quiz.loc.barcelona': 'Barcelona',
    'quiz.loc.lleida': 'Lleida / Girona',
    'quiz.loc.other_cat': 'Resta de Catalunya',
    'quiz.loc.international': 'Destí internacional',
    'quiz.ceremony.civil': 'Civil',
    'quiz.ceremony.religious': 'Religiosa',
    'quiz.ceremony.symbolic': 'Simbòlica',
    'quiz.svc.photo': 'Només fotografia',
    'quiz.svc.video': 'Només vídeo',
    'quiz.svc.both': 'Fotografia i vídeo',
    'quiz.budget.low': 'Fins a 1.500 €',
    'quiz.budget.mid': '1.500 – 2.500 €',
    'quiz.budget.high': '2.500 – 3.500 €',
    'quiz.budget.premium': 'Més de 3.500 €',
    'quiz.name.label': 'Els vostres noms',
    'quiz.name.placeholder': 'Ex. Anna & Marc',
    'quiz.email.label': 'Correu electrònic',
    'quiz.phone.label': 'Telèfon (opcional)',
    'quiz.venue.label': 'Finca o lloc de celebració',
    'quiz.venue.placeholder': 'P. ex. Mas la Boella, Tarragona',
    'quiz.error': 'Hi ha hagut un error. Torneu-ho a provar.',
    'quiz.success.title': 'Gràcies! Us hem rebut.',
    'quiz.success.desc': 'Revisem les vostres respostes i us enviem una proposta personalitzada en menys de 24h (dl.–dv.).',

    'dossier.badge': 'Packs 2026',
    'dossier.title': 'Packs de fotografia, vídeo i foto+vídeo',
    'dossier.lead':
      'Totes les bodes són diferents. Aquests són els nostres packs base — a partir d’aquí, ens adaptem a la vostra. Si no trobeu el que busqueu, pregunteu-nos i en parlem.',
    'dossier.lead2':
      'Bodes a Tarragona, Reus, Lleida, Barcelona i resta de Catalunya sense cost de desplaçament.',
    'dossier.type.photo': 'Fotografia',
    'dossier.type.video': 'Vídeo',
    'dossier.type.combo': 'Foto + Vídeo',
    'dossier.includes': 'Inclou',
    'dossier.badge.star': 'El que recomanem',
    'dossier.badge.picked.photo': 'Més escollit en fotografia',
    'dossier.badge.picked.video': 'Més escollit en vídeo',
    'dossier.cta': 'Consultar disponibilitat',
    'dossier.offer.title': 'Dos detalls',
    'dossier.offer.p1': 'Sessió pre-boda inclosa si reserveu abans del 31/12/2026.',
    'dossier.offer.p2': 'Pagament fraccionat sense interessos disponible en tots els packs.',

    'dossier.next.title': 'I ara què?',
    'dossier.next.s1': 'Ens escriviu. Ens expliqueu la data, el lloc i el pack que us interessa.',
    'dossier.next.s2': 'Us confirmem disponibilitat en menys de 24h.',
    'dossier.next.s3': 'Si us quadra, signem un contracte simple i bloquegem la data amb un 30 %.',
    'dossier.next.s4': 'La resta, uns dies abans de la boda. Sense sorpreses.',
    'dossier.next.personalise':
      'Tots els packs es poden personalitzar. Si voleu més o menys cobertura, un àlbum extra o un tràiler amb música concreta — ho parlem.',
    'dossier.next.cta.primary': 'Consultar disponibilitat',
    'dossier.next.cta.secondary': 'Parla amb nosaltres per WhatsApp',

    'legal.updated': 'Darrera actualització',

    // Schema.org
    'schema.org.description':
      'Fotògrafs i videògrafs de bodes a Tarragona, Reus, Lleida i Barcelona. Dos germans, segona generació de fotògrafs. Estil documental, natural, sense posats.',
    'schema.service.foto.name': 'Fotografia de boda',
    'schema.service.foto.description':
      'Cobertura fotogràfica completa de boda: 700–1.200 imatges editades en galeria privada, entregades en 3–4 setmanes. Estil documental.',
    'schema.service.video.name': 'Vídeo de boda',
    'schema.service.video.description':
      'Pel·lícula documental de 25–35 minuts, entregada en 8–10 setmanes. Opcional: tràiler curt, discursos i cerimònia completa sense talls.',
    'schema.service.preboda.name': 'Sessió pre-boda',
    'schema.service.preboda.description':
      'Sessió de parella prèvia a la boda per conèixer-nos i perquè us sentiu còmodes davant la càmera. A Tarragona, Reus o allà on us vagi bé.',
    'schema.service.combo.name': 'Pack Foto + Vídeo de boda',
    'schema.service.combo.description':
      'Pack combinat amb fotografia (Ferran) i vídeo (Eric). Dos germans, un equip, una boda per dia. Pressupost personalitzat segons data, lloc i pack.',
    'schema.breadcrumb.home': 'Inici',
    'schema.breadcrumb.blog': 'Blog',
    'schema.breadcrumb.bodas': 'Bodes',
    'schema.breadcrumb.contact': 'Contacte',
    'schema.breadcrumb.quiz': 'Consultar disponibilitat',
    'schema.breadcrumb.videos': 'Vídeos',
    'schema.breadcrumb.legal': 'Avís legal',
    'schema.breadcrumb.privacy': 'Política de privacitat',
    'schema.breadcrumb.cookies': 'Política de galetes',

    // ─── Reserva (booking proposal page) ─────────────────────────────────
    'reserva.cta.primary': 'Reservar la nostra data',
    'reserva.cta.toPayment': 'Anar al pagament del dipòsit',
    'reserva.cta.expires': 'Aquesta proposta és vàlida fins al {expires}',

    // Hero
    'reserva.hero.greeting': 'Hola {n1} i {n2},',
    'reserva.hero.body':
      'Hem preparat aquesta pàgina pensant en la vostra boda a {venue}, el {date}.\n\nAquí trobareu la nostra proposta, el procés que seguirem si decidiu reservar amb nosaltres, i les respostes a les preguntes que sol fer tothom abans de dir que sí.\n\nSi tot us encaixa, en menys de 10 minuts ho podem deixar tot reservat.',

    // Why us
    'reserva.why.heading': 'Som dos germans. La segona generació.',
    'reserva.why.body':
      'El nostre pare ja feia fotos i vídeos de bodes a Reus fa més de trenta anys. Avui ho fem nosaltres, amb la mateixa cura i una mirada actual.\n\nQuan reserveu amb Lifetime, ens reserveu a tots dos. La feina del vostre dia la fem nosaltres en persona — no un equip rotatori que canvia segons el cap de setmana.\n\nAquesta diferència la notareu el dia, i la veureu després al material.',

    // Visual proof
    'reserva.proof.eyebrow': 'Bodes reals',
    'reserva.proof.heading': 'Algunes bodes que hem fet',
    'reserva.proof.testimonial.author': '— {author}, casats al {venue}',

    // Pack
    'reserva.pack.eyebrow': 'La vostra proposta',
    'reserva.pack.heading': 'Pack {name}',
    'reserva.pack.includes': 'Què inclou:',
    'reserva.pack.excludes': 'Què no inclou:',
    'reserva.pack.addons': 'Add-ons opcionals:',
    'reserva.pack.invest': 'Inversió total',
    'reserva.pack.deposit': 'Dipòsit per reservar',
    'reserva.pack.terms': 'Pagament restant',
    'reserva.pack.was': 'Abans',
    'reserva.pack.discount': 'Descompte especial',
    'reserva.pack.originalPrice': 'Preu regular',

    // Incentive ("caramel") — optional reservation reward
    'reserva.incentive.eyebrow': 'Un detall per a vosaltres',
    'reserva.incentive.heading': 'Si reserveu amb nosaltres',
    'reserva.incentive.deadline': 'Vàlid si reserveu abans del {date}',
    'reserva.incentive.save': 'Estalvieu {amount}',
    'reserva.incentive.cta': 'Reservar la nostra data',

    // Steps
    'reserva.steps.heading': 'Si tot us encaixa, així funciona:',
    'reserva.steps.s1.title': 'Ompliu el formulari de reserva',
    'reserva.steps.s1.body':
      '5 minuts. Recollim les dades necessàries per preparar el contracte.',
    'reserva.steps.s2.title': 'Us enviem el contracte per signar online',
    'reserva.steps.s2.body':
      'Sense imprimir, sense escanejar. Ho fareu des del mòbil en 2 minuts.',
    'reserva.steps.s3.title': 'Pagueu el dipòsit',
    'reserva.steps.s3.body': 'Amb targeta o transferència, com us vagi millor.',
    'reserva.steps.s4.title': 'La vostra data queda reservada',
    'reserva.steps.s4.body': 'Bloquegem el calendari només per vosaltres.',
    'reserva.steps.outro':
      "A partir d'aquí, us acompanyem fins al dia. Mesos abans us enviarem un qüestionari per planificar el timeline, i les setmanes prèvies repassem la logística junts.",

    // FAQ
    'reserva.faq.heading': 'Preguntes freqüents',
    'reserva.faq.q1.q': 'Què passa si plou?',
    'reserva.faq.q1.a':
      'Treballem amb dues càmeres i material preparat per qualsevol condició. La pluja sovint dona les fotos més bones del dia — i ja ho hem viscut moltes vegades.',
    'reserva.faq.q2.q': "I si teniu una altra boda el mateix dia que la nostra?",
    'reserva.faq.q2.a':
      'Quan reserveu, bloquegem el calendari només per vosaltres. No fem dues bodes el mateix dia, mai.',
    'reserva.faq.q3.q': 'Podem ajustar el pack a les nostres necessitats?',
    'reserva.faq.q3.a':
      'Sí. El pack és un punt de partida. Si necessiteu més hores, menys hores, només foto, només vídeo, o alguna cosa diferent, ho parlem i ho ajustem.',
    'reserva.faq.q4.q': 'Quan rebem les fotos i el vídeo?',
    'reserva.faq.q4.a':
      "Material editat complet entre 8 i 12 setmanes després de la boda. Una selecció breu (10-15 fotos) us l'enviem la setmana següent perquè pugueu compartir-la amb la família.",
    'reserva.faq.q5.q': 'Com es paga la resta?',
    'reserva.faq.q5.a':
      '50% en signar, 50% un mes abans del dia. Ho podem ajustar si us va millor un altre repartiment.',
    'reserva.faq.q6.q': "Què passa si haguéssim de cancel·lar?",
    'reserva.faq.q6.a':
      'Política clara al contracte. Resumint: el dipòsit és no reembossable, però la data es pot moure una vegada sense cost si avisem amb temps suficient.',
    'reserva.faq.q7.q': 'Esteu federats? Teniu assegurança?',
    'reserva.faq.q7.a':
      'Sí. Treballem com a autònoms federats, amb assegurança de responsabilitat civil i factura oficial.',

    // Final CTA
    'reserva.final.heading': 'Si us encaixa, fem-ho.',
    'reserva.final.whatsapp':
      'Si teniu cap dubte abans de reservar, escriviu-nos pel WhatsApp.',

    // Status banner
    'reserva.banner.submitted.title': 'Ja ens heu enviat les vostres dades',
    'reserva.banner.submitted.body':
      'Us enviem el contracte en menys de 24h. Si heu de modificar alguna cosa, escriviu-nos pel WhatsApp.',

    // Expired view
    'reserva.expired.title': 'Aquesta proposta va caducar el {date}',
    'reserva.expired.body':
      'Escriviu-nos i us la refresquem en un moment.',
    'reserva.expired.cta': 'Contactar per WhatsApp',

    // Deposit payment (post-/reserva)
    'reserva.pay.heading': 'Pagament de la reserva',
    'reserva.pay.intro': 'Per confirmar la vostra data en exclusiva, només queda el pagament del dipòsit. Podeu pagar per transferència o amb targeta.',
    'reserva.pay.dataReceived': 'Hem rebut les vostres dades!',
    'reserva.pay.success': 'Pagament rebut! Us enviarem el contracte per signar-lo. Gràcies per confiar en nosaltres.',
    'reserva.pay.cancel': 'El pagament s\'ha cancel·lat. Podeu tornar a provar-ho o fer servir la transferència.',
    'reserva.pay.recap.pack': 'Pack',
    'reserva.pay.recap.total': 'Inversió total',
    'reserva.pay.recap.deposit': 'Dipòsit de reserva',
    'reserva.pay.recap.terms': 'Pla de pagament',
    'reserva.pay.transfer.heading': 'Transferència bancària',
    'reserva.pay.transfer.beneficiary': 'Beneficiari',
    'reserva.pay.transfer.iban': 'IBAN',
    'reserva.pay.transfer.bank': 'Banc',
    'reserva.pay.transfer.amount': 'Import',
    'reserva.pay.transfer.reference': 'Concepte',
    'reserva.pay.transfer.note': 'Quan rebem la transferència us enviarem el contracte.',
    'reserva.pay.note.secondPayment': 'El segon pagament es fa fins a 15 dies abans de la boda.',
    'reserva.pay.note.cash': 'El pagament en efectiu es lliura el dia de la boda, o en una visita prèvia si la concertem.',
    'reserva.pay.card.heading': 'Pagament amb targeta',
    'reserva.pay.card.button': 'Pagar el dipòsit amb targeta',
    'reserva.pay.card.note': 'Pagament segur mitjançant Stripe. Us enviarem el contracte automàticament.',
    'reserva.pay.card.error': 'No hem pogut iniciar el pagament. Torneu-ho a provar o feu servir la transferència.',
    'reserva.pay.paid.heading': 'Dipòsit rebut',
    'reserva.pay.paid.body': 'Gràcies! El següent pas és emplenar i signar el contracte.',
    'reserva.pay.paid.cta': 'Anar al contracte',

    // Not found view
    'reserva.notfound.title': 'No hem trobat aquesta proposta',
    'reserva.notfound.body':
      "L'enllaç pot ser incorrecte o haver-se retirat. Si penseu que és un error, escriviu-nos.",

    // Reservation form
    'reserva.form.heading': 'Dades per a la reserva',
    'reserva.form.intro':
      'Recollim les dades necessàries per preparar el contracte. En menys de 24h us l\'enviem per signar online.',
    'reserva.form.section.c1': 'Dades del primer contraent',
    'reserva.form.section.c2': 'Dades del segon contraent',
    'reserva.form.section.billing': 'Dades de facturació',
    'reserva.form.section.day': 'Confirmació del dia',
    'reserva.form.section.preferences': 'Preferències',
    'reserva.form.section.optional': 'Opcional però útil',
    'reserva.form.field.fullName': 'Nom complet',
    'reserva.form.field.dni': 'DNI / NIE',
    'reserva.form.field.birthDate': 'Data de naixement',
    'reserva.form.field.address': 'Adreça postal completa',
    'reserva.form.field.sameAddressAsC1': 'Vivim junts a la mateixa adreça postal (fer servir l\'adreça del primer contraent per a tots dos i per a la factura).',
    'reserva.form.field.email': 'Email',
    'reserva.form.field.phone': 'Telèfon',
    'reserva.form.field.billingSame': "Mateixa adreça que el primer contraent",
    'reserva.form.field.billingName': 'Nom de facturació',
    'reserva.form.field.billingDni': 'DNI/NIF de facturació',
    'reserva.form.field.billingAddress': 'Adreça de facturació',
    'reserva.form.field.dateConfirmed': 'Data confirmada?',
    'reserva.form.field.dateAlt': 'Data alternativa proposada',
    'reserva.form.field.venueConfirmed': 'Lloc confirmat?',
    'reserva.form.field.venueAlt': 'Lloc alternatiu proposat',
    'reserva.form.field.timeSlot': 'Boda de matí o de tarda?',
    'reserva.form.field.timeSlot.hint': "L'hora exacta la concretarem més endavant.",
    'reserva.form.field.ceremonyTime': 'Hora aproximada de la cerimònia',
    'reserva.form.field.serviceEndTime': 'Hora aproximada de fi del servei',
    'reserva.form.field.guestCount': 'Nombre estimat de convidats',
    'reserva.form.field.communication': 'Mètode de comunicació preferit',
    'reserva.form.field.language': 'Idioma preferit',
    'reserva.form.field.payment': 'Mètode de pagament preferit',
    'reserva.form.field.howFound': 'Com ens vau conèixer?',
    'reserva.form.field.notes': "Hi ha alguna cosa important que vulgueu que sapiguem des de ja?",
    'reserva.form.opt.yes': 'Sí',
    'reserva.form.opt.no': 'No',
    'reserva.form.opt.morning': 'Matí',
    'reserva.form.opt.afternoon': 'Tarda',
    'reserva.form.field.billingContact': 'A nom de quin contraent anirà el contracte i la factura?',
    'reserva.form.opt.contraent1': 'Primer contraent',
    'reserva.form.opt.contraent2': 'Segon contraent',
    'reserva.form.opt.email': 'Email',
    'reserva.form.opt.whatsapp': 'WhatsApp',
    'reserva.form.opt.phone': 'Telèfon',
    'reserva.form.opt.card': 'Targeta',
    'reserva.form.opt.transfer': 'Transferència',
    'reserva.form.submit': 'Enviar i passar al contracte',
    'reserva.form.submit.microcopy':
      "En enviar, rebreu un email de confirmació immediat. En menys de 24h us enviem el contracte per signar.",
    'reserva.form.submitting': 'Enviant…',
    'reserva.form.success.title': 'Fet!',
    'reserva.form.success.body':
      'Hem rebut les vostres dades. Us arribarà l\'email de confirmació en els pròxims minuts. Si no apareix, reviseu el spam.',
    'reserva.form.error.generic':
      "No hem pogut enviar el formulari. Proveu-ho un altre cop d'aquí a un moment o escriviu-nos pel WhatsApp.",
    'reserva.form.error.alreadySubmitted':
      'Aquesta reserva ja està processada. Si heu de modificar alguna cosa, escriviu-nos pel WhatsApp.',
    'reserva.form.error.rateLimited':
      'Massa intents en poc temps. Espereu uns minuts abans de tornar a provar.',
    'reserva.form.error.validation':
      'Hi ha camps amb un format incorrecte. Reviseu-los a baix.',

    // /contrato post-deposit form
    'contrato.title': 'Dades per al contracte',
    'contrato.intro':
      "Aquesta informació és essencial per a l'elaboració del contracte, ja que ens prenem molt seriosament els vostres drets d'imatge. Volem que tingueu plena confiança en l'ús que es farà del material que captem durant el vostre casament.",
    'contrato.gating.deposit_pending.title': 'Esperant confirmació del dipòsit',
    'contrato.gating.deposit_pending.body':
      "Tan bon punt rebem el dipòsit us habilitarem aquest formulari per acabar de preparar el contracte. Si penseu que ja l'heu transferit, aviseu-nos pel WhatsApp.",
    'contrato.gating.already_submitted.title': 'Ja tenim les vostres dades',
    'contrato.gating.already_submitted.body':
      "Hem rebut tota la informació del contracte. L'estem preparant i us arribarà signat en uns dies.",
    'contrato.section.day.heading': 'Detalls operatius del dia',
    'contrato.section.day.intro': 'Per acabar de planificar la jornada.',
    'contrato.section.consent.heading': 'Consentiment de publicació',
    'contrato.section.consent.intro':
      "La publicació dels nostres treballs en mitjans digitals o físics es fa sempre sense ànim de lucre i amb l'únic objectiu de mostrar la nostra manera d'explicar històries. Mai publicarem la pel·lícula completa del vostre casament (20–25 min) en cap mitjà públic. Marqueu els canals en què ens autoritzeu a mostrar les imatges:",
    'contrato.section.gdpr.heading': 'Protecció de dades',
    'contrato.field.languageBetween': 'Idioma en què us comuniqueu entre vosaltres',
    'contrato.field.languageBetween.help': 'Útil perquè sapiguem en quin idioma dirigir-nos a vosaltres durant la jornada.',
    'contrato.field.ceremonyLocation': 'Lloc de la cerimònia',
    'contrato.field.receptionLocation': 'Lloc del banquet',
    'contrato.field.c1PrepAddress': 'Adreça on es prepararà el contraent 1',
    'contrato.field.c2PrepAddress': 'Adreça on es prepararà el contraent 2',
    'contrato.field.prepAddress.help': 'Carrer, número, ciutat. És on us anirem a recollir pel matí.',
    'contrato.field.ceremonyType': 'Tipus de cerimònia',
    'contrato.opt.ceremony.civil': 'Civil',
    'contrato.opt.ceremony.religious': 'Religiosa',
    'contrato.opt.ceremony.other': 'Altres',
    'contrato.field.ceremonyTypeOther': 'Especifiqueu',
    'contrato.field.firstLook': 'Voleu fer un "First Look"?',
    'contrato.field.firstLook.help':
      "El First Look és un moment especial abans de la cerimònia en què us veieu per primera vegada en un espai íntim. Nosaltres us acompanyem per capturar tota l'emoció.",
    'contrato.opt.firstLook.yes': 'Sí',
    'contrato.opt.firstLook.no': 'No',
    'contrato.opt.firstLook.not_sure': 'Encara no ho tenim clar',
    'contrato.field.publicationConsent': 'Canals autoritzats',
    'contrato.opt.consent.display': "Aparador físic a l'estudi (C/ Mare Molas 26, Reus)",
    'contrato.opt.consent.facebook': 'Facebook professional (facebook.com/lifetimeweddingstories)',
    'contrato.opt.consent.website': 'Pàgina web (lifetime.photo)',
    'contrato.opt.consent.instagram': 'Instagram (@lifetime.weddings)',
    'contrato.opt.consent.private_video':
      'Vídeo privat (només compartit amb altres parelles, mai enllaç públic)',
    'contrato.opt.consent.instagram_reel': 'Reel d\'Instagram (@lifetime.weddings)',
    'contrato.opt.consent.instagram_stories':
      'Stories d\'Instagram el mateix dia de la boda (cobertura en directe)',
    'contrato.opt.consent.blog_real_wedding':
      'Article "real wedding" al blog (lifetime.photo/bodes) amb la vostra història',
    'contrato.opt.consent.paid_ads':
      'Anuncis pagats a Meta / Google (ús d\'imatges en campanyes publicitàries)',
    'contrato.opt.consent.venue_partners':
      'Compartir el reportatge amb el venue / wedding planner per als seus propis canals',
    'contrato.field.gdpr.label': 'Accepto el tractament de dades',
    'contrato.field.gdpr.body':
      "D'acord amb el Reglament (UE) 2016/679 (RGPD) i la Llei Orgànica 3/2018, l'informem que les dades personals recollides seran tractades per OBJECTIU S.C.P. (C/ Mare Molas 26, Reus) amb la finalitat de gestionar el contracte i la prestació dels serveis fotogràfics. Les seves dades no se cediran a tercers excepte en cas d'obligació legal. Podrà exercir els seus drets d'accés, rectificació, supressió, oposició, limitació i portabilitat escrivint-nos al correu indicat a la nostra política de privacitat.",
    'contrato.submit': 'Enviar dades del contracte',
    'contrato.submit.microcopy':
      'Un cop enviat, prepararem el contracte i us arribarà per email en els pròxims dies.',
    'contrato.submitting': 'Enviant…',
    'contrato.success.title': 'Fet!',
    'contrato.success.body':
      'Hem rebut les dades. Prepararem el contracte i us arribarà per signar en els pròxims dies.',
    'contrato.error.generic':
      "No hem pogut enviar el formulari. Proveu-ho un altre cop d'aquí a un moment o escriviu-nos pel WhatsApp.",
    'contrato.error.alreadySubmitted':
      'Aquestes dades ja estan registrades. Si heu de modificar alguna cosa, escriviu-nos pel WhatsApp.',
    'contrato.error.depositPending':
      'Esperem el vostre dipòsit abans de poder processar aquest formulari.',
    'contrato.error.rateLimited': 'Massa intents en poc temps. Espereu uns minuts.',
    'contrato.error.validation': 'Hi ha camps amb un format incorrecte. Reviseu-los.',
    'contrato.accept.heading': 'El vostre contracte',
    'contrato.accept.intro': 'Aquest és el contracte amb les vostres dades. Llegiu-lo amb calma i accepteu-lo per finalitzar la reserva. Us enviarem una còpia en PDF per email.',
    'contrato.accept.checkbox': 'He llegit i accepto el contracte',
    'contrato.accept.submit': 'Acceptar el contracte',
    'contrato.accept.submitting': 'Enviant…',
    'contrato.accept.success.title': 'Contracte acceptat!',
    'contrato.accept.success.body': 'Gràcies. Us hem enviat la vostra còpia en PDF per email. Ens veiem aviat!',
    'contrato.accept.error.generic': 'No s\'ha pogut registrar l\'acceptació. Torna-ho a provar o escriu-nos pel WhatsApp.',
    'contrato.accepted.title': 'Contracte acceptat',
    'contrato.accepted.body': 'Ja tenim el vostre contracte acceptat. Us hem enviat la còpia en PDF per email. Qualsevol dubte, escriviu-nos.',

    // Video embed
    'reserva.video.eyebrow': 'Bodes en moviment',
    'reserva.video.heading': 'Feu un cop d\'ull a la nostra feina',

    // Videocall CTA
    'reserva.videocall.eyebrow': 'Voleu que ens coneguem abans?',
    'reserva.videocall.heading': 'Fem una videocall de 15 minuts',
    'reserva.videocall.body':
      "Si encara no ho teniu del tot clar, el més fàcil és que parlem en directe. Una videocall curta — 15 minuts, quan us vagi bé — ens serveix per conèixer-nos, resoldre els dubtes concrets que tingueu i que veieu com treballem.\n\nNo costa res i no us compromet a reservar.",
    'reserva.videocall.cta': 'Parlar pel WhatsApp',
    'reserva.videocall.bookCta': 'Reservar una videocall',
    'reserva.videocall.orWhatsapp': 'O si ho preferiu,',
    'reserva.videocall.whatsappLink': 'escriviu-nos pel WhatsApp.',
    'reserva.videocall.subnote': 'Us va bé qualsevol tarda entre setmana.',

    // Accessibility / global UI labels
    'a11y.skipToContent': 'Saltar al contingut',
    'a11y.openMenu': 'Obrir menú',
    'a11y.closeMenu': 'Tancar menú',

    'cookies.title': 'Privacitat i galetes',
    'cookies.desc': 'Fem servir galetes essencials perquè la web funcioni i, opcionalment, galetes analítiques per millorar la vostra experiència. Podeu acceptar-les, rebutjar-les o personalitzar la vostra tria.',
    'cookies.accept': 'Acceptar totes',
    'cookies.reject': 'Només essencials',
    'cookies.settings': 'Més informació',
    'cookies.preferences': 'Preferències de galetes',
    'consent.gated.title': 'Contingut bloquejat',
    'consent.gated.body': 'Has rebutjat les galetes de tercers. Per veure aquest vídeo de YouTube necessitem carregar contingut extern que pot instal·lar galetes.',
    'consent.gated.cta': 'Canviar preferències',

    // Private quote page /p/<token>
    'quote.notFound.title': 'Pressupost no trobat',
    'quote.notFound.body': 'Aquest enllaç no existeix o ha estat arxivat. Si creieu que és un error, escriviu-nos a',
    'quote.expired.title': 'Enllaç caducat',
    'quote.expired.body': 'Aquest pressupost ja no està disponible. Demaneu-nos un enllaç actualitzat a',
    'quote.password.title': 'Contingut protegit',
    'quote.password.body': 'Introduïu la contrasenya que us hem compartit.',
    'quote.password.error': 'Contrasenya incorrecta.',
    'quote.password.submit': 'Entrar',
    'quote.hero.eyebrow': 'Pressupost personalitzat',
    'quote.hero.body': 'Gràcies per confiar en Lifetime Weddings. Aquí teniu la proposta que hem preparat per a vosaltres.',
    'quote.notes.eyebrow': 'Una nota per a vosaltres',
    'quote.intro.default': '{name}, hem preparat aquesta proposta pensant en el vostre dia. Mireu-vos-la amb calma —el vídeo, exemples reals i els packs— i pregunteu-nos el que vulgueu.',
    'quote.packs.heading': 'La proposta',
    'quote.packs.includes': 'Inclou',
    'quote.showcase.eyebrow': 'Treballs similars',
    'quote.showcase.cta': 'Veure la galeria i el vídeo',
    'quote.gallery.heading': 'La galeria que us recomanem',
    'quote.gallery.eyebrow': 'Galeria privada',
    'quote.gallery.description': 'Mireu una boda sencera que hem disparat',
    'quote.gallery.newTab': 'Obrir en una pestanya',
    'quote.gallery.blocked': 'La galeria no es pot mostrar incrustada aquí. Obre-la en una pestanya a part per veure-la sencera.',
    'quote.cta.heading': 'Ens veiem aviat?',
    'quote.cta.body': 'Si teniu preguntes o voleu concretar alguna cosa, responeu aquest correu o escriviu-nos pel WhatsApp.',
    'quote.cta.email': 'Escriure per email',
    'quote.cta.whatsapp': 'Escriure per WhatsApp',
    'quote.wa.message': 'Hola! Som {name}. Hem vist el pressupost i ens agradaria concretar.',
    'quote.wa.videocallMessage': 'Hola! Som {name}. Hem vist el pressupost i ens agradaria fer una videocall de 15 minuts abans de decidir.',
    'quote.extras.heading': 'Extres opcionals',
    'quote.extras.body': 'Podeu afegir qualsevol d\'aquests serveis al vostre pack. Us els reservem només si ens ho confirmeu.',
    'quote.combo.extras.heading': 'I junts:',
    // Interactive configurator — couple-side
    'quote.configurator.eyebrow': 'A la vostra mida',
    'quote.configurator.heading': 'Personalitzeu el vostre pressupost',
    'quote.configurator.intro': 'Marqueu allò que us interessa i veureu el total a l\'instant. Quan estigui llest, envieu-nos-ho i us responem amb la proposta final.',
    'quote.configurator.basePacks': 'Packs base',
    'quote.configurator.combos': 'Combos (foto + vídeo)',
    'quote.configurator.extras': 'Extres opcionals',
    'quote.configurator.typePhoto': 'Foto',
    'quote.configurator.typeVideo': 'Vídeo',
    'quote.configurator.typeCombo': 'Combo',
    'quote.configurator.subtotal': 'Subtotal',
    'quote.configurator.discount': 'Descompte',
    'quote.configurator.total': 'Total',
    'quote.configurator.paymentNote': 'Pagament: 30 % de reserva, 50 % un mes abans de la boda, 20 % un mes després. Sense comissions ni intermediaris.',
    'quote.configurator.messageLabel': 'Missatge per a nosaltres (opcional)',
    'quote.configurator.messagePlaceholder': 'Per exemple: podríeu incloure 2 hores extra de cobertura? O substituir l\'àlbum per dos per als pares?',
    'quote.configurator.submit': 'Enviar la nostra configuració',
    'quote.configurator.submitting': 'Enviant…',
    'quote.configurator.successTitle': 'Rebut — gràcies',
    'quote.configurator.successBody': 'Ens ha arribat la vostra configuració. Us responem aviat amb la proposta final.',
    'quote.configurator.errorBody': 'No ho hem pogut enviar. Si us plau, torneu-ho a provar o escriviu-nos pel WhatsApp.',
    'quote.configurator.empty': 'Marqueu almenys un pack o un extra abans d\'enviar.',
    'quote.configurator.closedTitle': 'Pressupost tancat',
    'quote.configurator.closedBody': 'Hem tancat el vostre pressupost. Si voleu canviar alguna cosa, escriviu-nos i el reobrim.',
    'quote.configurator.previousTitle': 'La vostra darrera configuració està desada',
    'quote.configurator.singleChoiceNote': 'Trieu-ne només un: un pack base o un combo. Els extres els podeu combinar lliurement.',
    'quote.configurator.clearPack': 'Treure la selecció del pack',
    'quote.configurator.toggleSeeVideo': 'Voleu veure també l\'opció de vídeo? →',
    'quote.configurator.toggleSeePhoto': 'Voleu veure també l\'opció de foto? →',
    // Value pillars block (3 columns) — between showcase and triptych on /p/<token>.
    'quote.values.eyebrow': 'Què ens diferencia',
    'quote.values.heading': 'Tres motius pels quals les parelles ens trien',
    'quote.values.p1.title': 'Dos germans, un sol equip',
    'quote.values.p1.body': 'Foto i vídeo coordinats des de dins: una mateixa mirada en dos formats. No haureu de sincronitzar dos proveïdors el dia més important.',
    'quote.values.p2.title': 'Fotoperiodisme, sense poses',
    'quote.values.p2.body': 'Passem desapercebuts i no dirigim l\'escena. Volem que d\'aquí 20 anys reviviu el dia tal com va ser, no que us recordeu del fotògraf.',
    'quote.values.p3.title': 'Entrega en 3-4 setmanes',
    'quote.values.p3.body': 'La vostra galeria privada amb 700-1.200 fotos editades, llestes per compartir abans del que tarda a esvair-se el bronzejat de la lluna de mel. El vídeo, en 8-10 setmanes.',
    'quote.faq.heading': 'Preguntes freqüents',
    'quote.faq.q1.q': 'Quantes fotos entreguem?',
    'quote.faq.q1.a': 'Us entreguem entre 700 i 1.200 fotografies editades, sempre seleccionant les millors per explicar la vostra història de la manera més emocionant i autèntica.',
    'quote.faq.q2.q': 'Qui tria les fotos de l\'àlbum?',
    'quote.faq.q2.a': 'Nosaltres fem una primera selecció per assegurar que l\'àlbum narri de la millor manera el vostre gran dia. Tindreu una ronda de canvis per ajustar-lo al vostre gust.',
    'quote.faq.q3.q': 'Quant dura el vídeo?',
    'quote.faq.q3.a': 'El vídeo principal acostuma a durar entre 25 i 40 minuts. Si voleu, podeu afegir extres com els discursos en un vídeo a part. Ens adaptem al que necessiteu.',
    'quote.faq.q4.q': 'Com es fa el pagament?',
    'quote.faq.q4.a': '30 % com a senyal/reserva, 50 % un mes abans de la boda i 20 % un mes després. Podeu pagar en efectiu, transferència o targeta — sempre amb justificant i contracte signat. També acceptem pagaments a terminis mensuals fins al dia de la boda, sense comissions ni intermediaris.',
    'quote.faq.q5.q': 'Podem triar la música del vídeo?',
    'quote.faq.q5.a': 'És clar! Si teniu alguna cançó especial en ment, només cal que ens ho digueu. Si per algun motiu no encaixa bé amb el muntatge, us ho comentarem i us ajudarem a trobar una alternativa que us agradi.',
    'quote.faq.q6.q': 'Ens casem fora de la província, us desplaceu?',
    'quote.faq.q6.a': 'Sí, i tant! Hem cobert casaments arreu d\'Espanya i també a Nova York, Roma i Londres. Les tarifes inclouen el desplaçament dins de la província de Tarragona i fins a 100 km de Reus. Per a desplaçaments més llargs, pressupostem viatge i quilometratge a part.',
    'quote.faq.q7.q': 'Quant de temps esteu al casament?',
    'quote.faq.q7.a': 'El dia del vostre casament el reservem exclusivament per a vosaltres. Normalment estem entre 10 i 13 hores — des dels preparatius fins a 45 min – 1 h després del ball nupcial. I no deleguem mai a tercers: anem nosaltres.',
  },

  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.videos': 'Videos',
    'nav.services': 'Services',
    'nav.testimonials': 'Testimonials',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.book': 'Check availability',

    'hero.eyebrow': 'Wedding photography & film · Tarragona · Reus · Lleida',
    'hero.title': 'Two brothers. One camera, one film rig.',
    'hero.title2': 'Your story, told with four hands.',
    'hero.subtitle': 'We’re the second generation of a family of photographers. For over 15 years we’ve been telling wedding stories across Catalonia — documentary, natural, never posed.',
    'hero.cta': 'Check availability',
    'hero.cta.secondary': 'See real weddings',

    'trust.weddings': '+150 weddings',
    'trust.coverage': 'Tarragona · Lleida · Barcelona',
    'trust.delivery': 'Delivery in 3–4 weeks',
    'trust.rating': '5★ on Google',

    'about.label': 'Who we are',
    'about.title': 'We grew up with cameras.',
    'about.subtitle': 'Two brothers, one vision in two formats.',
    'about.p1':
      'We are Eric and Ferran Blasco, two brothers and the second generation of a family of photographers. Before we could walk, there were already rolls of film, lighting kits and wedding albums at home. Somehow, that shapes you.',
    'about.p2':
      'We created Lifetime Weddings because we wanted to tell weddings differently: no forced poses, no formulas, no rush. One works in photo, the other in video. The same eye, two formats.',
    'about.p3':
      'We shoot weddings in Tarragona, Reus, Lleida, Barcelona and wherever the story takes us. And yes — if you ask, we’ll set up the camera in New York too (we’ve done it).',
    'about.cta': 'See real weddings',

    'team.label': 'Who’ll be there',

    'portfolio.label': 'Our work',
    'portfolio.title': 'Recent weddings',
    'portfolio.intro':
      'Our style is documentary photojournalism: we stay out of the way, we don’t direct, we don’t interrupt. Our job is that 20 years from now you relive the day — not that you remember the photographer.',

    'services.label': 'What we offer',
    'services.title': 'Services we offer',
    'services.photo.title': 'Wedding Photography',
    'services.photo.desc':
      '700–1,200 edited images, delivered in a private online gallery in 3–4 weeks. Full-day coverage, from getting ready to the party, documentary style.',
    'services.video.title': 'Wedding Video',
    'services.video.desc':
      '25–35 minute documentary film, delivered in 8–10 weeks. Optional: short trailer, speeches and uncut ceremony.',
    'services.fusion.title': 'Pre-wedding session',
    'services.fusion.desc':
      'A morning or afternoon to get to know each other and for you to get comfortable in front of the camera. In Tarragona, Reus or wherever suits you.',

    'video.label': 'As far as it takes',
    'video.title': 'New York, Málaga, Huesca, or just round the corner',
    'video.p1':
      'Ariadna and Clifton met in Manhattan. They wanted a memory that started where everything started, so we packed the camera and shot the film in Brooklyn.',
    'video.p2':
      'Not every story calls for a trip to New York — most stay in Tarragona, and that’s great. But if yours calls for it, we’ll go wherever it takes.',
    'video.cta': 'Tell us your story',

    'testi.label': 'Testimonials',
    'testi.title': 'See what couples say about us',

    'insta.title': 'Let’s be friends on Instagram',
    'insta.handle': '@lifetime.weddings',
    'insta.cta': 'Follow on Instagram',

    'yt.title': 'Subscribe to our YouTube channel',

    'contact.label': 'Contact',
    'contact.title': 'We’re looking forward to meeting you',
    'contact.subtitle':
      'Tell us about your wedding. We reply within 24h (Mon–Fri).',
    'contact.date.placeholder': 'Approximate (month + year, or season)',
    'contact.field.name': 'Name',
    'contact.field.email': 'Email',
    'contact.field.phone': 'Phone',
    'contact.field.date': 'Wedding date',
    'contact.field.venue': 'Venue',
    'contact.field.message': 'Tell us about your wedding',
    'contact.field.consent': 'I accept the privacy policy.',
    'contact.submit': 'Send message',
    'contact.success': 'Thanks a lot for reaching out! We’ll get back to you very soon.',
    'contact.error': 'There was an error sending the message. Please try again or email us at hola@lifetime.photo',
    'contact.where.title': 'Where we’re based and how far we go',
    'contact.where.desc':
      'Our base is in Reus (Tarragona). We cover weddings at no travel cost in Tarragona, Reus, Lleida, Barcelona and the rest of Catalonia. For weddings outside Catalonia, we’ll send you a custom quote.',
    'contact.where.address': 'Address',
    'contact.where.hours': 'Reply hours',
    'contact.where.hours.value': 'Mon–Fri, 9am–7pm',
    'contact.h1': 'Let’s talk about your wedding',
    'contact.sub.pre': 'We reply within 24h (Mon–Fri). You can also reach us on',
    'contact.sub.wa': 'WhatsApp',
    'contact.sub.post': '.',

    // Videos page
    'videos.eyebrow': 'Trailers',
    'videos.h1': 'Wedding videos',
    'videos.intro':
      'Documentary wedding films shot in Tarragona, Reus and across Catalonia. No forced poses, no script — only what actually happens.',
    'videos.play.aria': 'Play trailer',
    'videos.channel.cta': 'Watch more videos on our YouTube channel →',

    // Landings
    'landings.deliverables.title': 'What you get',
    'landings.packs.title': 'Recommended packs',

    'footer.rights': 'All rights reserved.',
    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy policy',
    'footer.cookies': 'Cookie policy',

    'wa.label': 'Message us on WhatsApp',
    'wa.chat': 'Chat with us',
    'wa.message':
      'Hi! We’d like info on your wedding photo and video packs. We’re getting married on…',

    'yt.more': 'All trailers and films on our channel →',

    'faq.label': 'Frequently asked questions',
    'faq.title': 'Answers to the most common questions',
    'faq.q1': 'Are you two, or one? Who comes on the wedding day?',
    'faq.a1': 'Eric (video) and Ferran (photo) always come together. If the pack includes a second operator, a trusted teammate joins during the key hours (dual getting-ready, ceremony or party).',
    'faq.q2': 'What photography style do you shoot?',
    'faq.a2': 'Creative photojournalism. Documentary, natural, no forced poses. We guide you when we need to — for the couple’s portrait, for example — but the rest of the day we stay out of the way. The goal is that 20 years from now you relive the day, not remember the photographer.',
    'faq.q3': 'How much does a wedding with you cost?',
    'faq.a3': 'Every wedding is unique and the price depends on the date, location and package. We send you a personalised quote within 24h. Fill in the 1-minute quiz with your details and we\'ll come back with a concrete proposal.',
    'faq.q4': 'When do we get the photos and video?',
    'faq.a4': 'Online gallery with all edited photos in 3–4 weeks. Documentary film in 8–10 weeks. Trailer, if included, in 3–4 weeks.',
    'faq.q5': 'Do you travel outside Catalonia?',
    'faq.a5': 'Yes. Our base is Reus, but we’ve shot weddings in Barcelona, Lleida, Girona, Huesca, Castellón, Málaga and New York. Travel outside Catalonia is quoted separately.',
    'faq.q6': 'Do you offer a pre-wedding session?',
    'faq.a6': 'Yes. It’s optional and we recommend it: it helps you feel comfortable in front of the camera and lets us get to know you better before the big day.',
    'faq.q7': 'What if it rains?',
    'faq.a7': 'Then it rains, and it’s beautiful. We’ve shot through rain, wind and scorching sun. It’s never a problem — just another story to tell.',
    'faq.q8': 'How do we book?',
    'faq.a8': 'We confirm availability, sign a simple contract and ask for 30 % to hold the date. The rest is paid before the wedding.',
    'faq.q9': 'Can I see a full wedding, not just the highlights?',
    'faq.a9': 'Yes. Reach out and we’ll send 1–2 full galleries so you can see the consistency of the whole coverage, not just the Instagram picks.',
    'faq.q10': 'Do you design albums?',
    'faq.a10': 'Yes, we design personalised wooden albums included in selected packs. We can also design extra albums for parents and godparents.',

    'contact.microcopy': 'We reply within 24h (Monday to Friday).',
    'contact.placeholder.message': 'Optional: venue, style, ceremony time, anything you want to share…',

    'quiz.title': 'Let’s see if your date is available',
    'quiz.subtitle': 'In 1 minute we’ll send you a personalised quote.',
    'quiz.step': 'Step',
    'quiz.of': 'of',
    'quiz.next': 'Next',
    'quiz.back': 'Back',
    'quiz.submit': 'See our proposal',
    'quiz.loading': 'Preparing your proposal...',
    'quiz.q1': 'When is the wedding?',
    'quiz.q2': 'Where will it take place?',
    'quiz.q3': 'What type of ceremony?',
    'quiz.q4': 'Which services interest you?',
    'quiz.q5': 'Approximate budget?',
    'quiz.q6': 'What are your names?',
    'quiz.loc.tarragona': 'Tarragona / Reus',
    'quiz.loc.barcelona': 'Barcelona',
    'quiz.loc.lleida': 'Lleida / Girona',
    'quiz.loc.other_cat': 'Rest of Catalonia',
    'quiz.loc.international': 'International destination',
    'quiz.ceremony.civil': 'Civil',
    'quiz.ceremony.religious': 'Religious',
    'quiz.ceremony.symbolic': 'Symbolic',
    'quiz.svc.photo': 'Photography only',
    'quiz.svc.video': 'Video only',
    'quiz.svc.both': 'Photography and video',
    'quiz.budget.low': 'Up to €1,500',
    'quiz.budget.mid': '€1,500 – €2,500',
    'quiz.budget.high': '€2,500 – €3,500',
    'quiz.budget.premium': 'Over €3,500',
    'quiz.name.label': 'Your names',
    'quiz.name.placeholder': 'e.g. Anna & Marc',
    'quiz.email.label': 'Email',
    'quiz.phone.label': 'Phone (optional)',
    'quiz.venue.label': 'Venue / wedding location',
    'quiz.venue.placeholder': 'e.g. Mas la Boella, Tarragona',
    'quiz.error': 'Something went wrong. Please try again.',
    'quiz.success.title': 'Thanks! We’ve received your message.',
    'quiz.success.desc': 'We’ll review your answers and send you a personalised proposal within 24h (Mon–Fri).',

    'dossier.badge': '2026 packs',
    'dossier.title': 'Photography, video and photo+video packs',
    'dossier.lead':
      'Every wedding is different. These are our base packs — from here, we adapt to yours. If you don’t see what you’re looking for, just ask.',
    'dossier.lead2':
      'Weddings in Tarragona, Reus, Lleida, Barcelona and the rest of Catalonia with no travel fee.',
    'dossier.type.photo': 'Photography',
    'dossier.type.video': 'Video',
    'dossier.type.combo': 'Photo + Video',
    'dossier.includes': 'Includes',
    'dossier.badge.star': 'What we recommend',
    'dossier.badge.picked.photo': 'Most picked in photography',
    'dossier.badge.picked.video': 'Most picked in video',
    'dossier.cta': 'Check availability',
    'dossier.offer.title': 'Two small things',
    'dossier.offer.p1': 'Pre-wedding session included if you book before 31/12/2026.',
    'dossier.offer.p2': 'Interest-free split payment available on all packs.',

    'dossier.next.title': 'What happens next?',
    'dossier.next.s1': 'You write to us. Tell us the date, the venue and the pack you’re interested in.',
    'dossier.next.s2': 'We confirm availability within 24h.',
    'dossier.next.s3': 'If it works for you, we sign a simple contract and hold the date with a 30 % deposit.',
    'dossier.next.s4': 'The rest, a few days before the wedding. No surprises.',
    'dossier.next.personalise':
      'All packs can be personalised. If you want more or less coverage, an extra album or a trailer with a specific song — let’s talk.',
    'dossier.next.cta.primary': 'Check availability',
    'dossier.next.cta.secondary': 'Chat with us on WhatsApp',

    'legal.updated': 'Last updated',

    // Schema.org
    'schema.org.description':
      'Wedding photographers and videographers in Tarragona, Reus, Lleida and Barcelona. Two brothers, second generation of photographers. Documentary style, natural, no posing.',
    'schema.service.foto.name': 'Wedding photography',
    'schema.service.foto.description':
      'Full-day wedding photo coverage: 700–1,200 edited images in a private online gallery, delivered in 3–4 weeks. Documentary style.',
    'schema.service.video.name': 'Wedding videography',
    'schema.service.video.description':
      '25–35 min documentary film, delivered in 8–10 weeks. Optional: short trailer, speeches and uncut ceremony.',
    'schema.service.preboda.name': 'Pre-wedding session',
    'schema.service.preboda.description':
      'Pre-wedding couple session to get to know each other and help you feel comfortable on camera. In Tarragona, Reus or wherever suits you.',
    'schema.service.combo.name': 'Photo + Video wedding pack',
    'schema.service.combo.description':
      'Combined pack with photography (Ferran) and video (Eric). Two brothers, one team, one wedding per day. Personalised quote based on date, location and package.',
    'schema.breadcrumb.home': 'Home',
    'schema.breadcrumb.blog': 'Blog',
    'schema.breadcrumb.bodas': 'Weddings',
    'schema.breadcrumb.contact': 'Contact',
    'schema.breadcrumb.quiz': 'Check availability',
    'schema.breadcrumb.videos': 'Videos',
    'schema.breadcrumb.legal': 'Legal notice',
    'schema.breadcrumb.privacy': 'Privacy policy',
    'schema.breadcrumb.cookies': 'Cookie policy',

    // ─── Reserva (booking proposal page) ─────────────────────────────────
    // ─── Reserva (booking proposal page) ─────────────────────────────────
    'reserva.cta.primary': 'Book our date',
    'reserva.cta.toPayment': 'Go to the deposit payment',
    'reserva.cta.expires': 'This proposal is valid until {expires}',

    // Hero
    'reserva.hero.greeting': 'Hi {n1} and {n2},',
    'reserva.hero.body':
      "We've put this page together with your wedding at {venue} on {date} in mind.\n\nHere you'll find our proposal, the process we follow if you decide to book with us, and answers to the questions most couples ask before saying yes.\n\nIf it all fits, we can have everything booked in under 10 minutes.",

    // Why us
    'reserva.why.heading': "Two brothers. Second generation.",
    'reserva.why.body':
      "Our father was shooting weddings in Reus more than thirty years ago. We do it now, with the same care and a contemporary eye.\n\nWhen you book Lifetime, you book both of us. The work on your day is done by us in person — not a rotating crew that changes from one weekend to the next.\n\nYou'll notice the difference on the day, and you'll see it later in the material.",

    // Visual proof
    'reserva.proof.eyebrow': 'Real weddings',
    'reserva.proof.heading': "A few weddings we've shot",
    'reserva.proof.testimonial.author': '— {author}, married at {venue}',

    // Pack
    'reserva.pack.eyebrow': 'Your proposal',
    'reserva.pack.heading': 'Pack {name}',
    'reserva.pack.includes': "What's included:",
    'reserva.pack.excludes': "What's not included:",
    'reserva.pack.addons': 'Optional add-ons:',
    'reserva.pack.invest': 'Total investment',
    'reserva.pack.deposit': 'Deposit to book',
    'reserva.pack.terms': 'Remaining payment',
    'reserva.pack.was': 'Before',
    'reserva.pack.discount': 'Special discount',
    'reserva.pack.originalPrice': 'Regular price',

    // Incentive — optional reservation reward
    'reserva.incentive.eyebrow': 'A little something for you',
    'reserva.incentive.heading': 'If you book with us',
    'reserva.incentive.deadline': 'Valid if you book before {date}',
    'reserva.incentive.save': 'You save {amount}',
    'reserva.incentive.cta': 'Book our date',

    // Steps
    'reserva.steps.heading': "If it all fits, here's how it works:",
    'reserva.steps.s1.title': 'You fill in the booking form',
    'reserva.steps.s1.body':
      '5 minutes. We collect what we need to prepare the contract.',
    'reserva.steps.s2.title': 'We send the contract to sign online',
    'reserva.steps.s2.body':
      "No printing, no scanning. You'll do it from your phone in 2 minutes.",
    'reserva.steps.s3.title': 'You pay the deposit',
    'reserva.steps.s3.body': 'Card or bank transfer, whichever suits you better.',
    'reserva.steps.s4.title': 'Your date is locked in',
    'reserva.steps.s4.body': 'We block off the calendar just for you.',
    'reserva.steps.outro':
      "From there, we walk with you up to the day. A few months out we'll send a questionnaire to plan the timeline, and the weeks before the wedding we review the logistics together.",

    // FAQ
    'reserva.faq.heading': 'Frequently asked',
    'reserva.faq.q1.q': 'What if it rains?',
    'reserva.faq.q1.a':
      "We work with two cameras and gear ready for any conditions. Rain often gives the best photos of the day — we've been through it many times.",
    'reserva.faq.q2.q': "What if you have another wedding on our day?",
    'reserva.faq.q2.a':
      "When you book, we block the calendar just for you. We never shoot two weddings on the same day.",
    'reserva.faq.q3.q': 'Can we tailor the pack to our needs?',
    'reserva.faq.q3.a':
      "Yes. The pack is a starting point. If you need more hours, fewer hours, photo only, video only, or something different, we'll talk and adjust it.",
    'reserva.faq.q4.q': 'When do we get the photos and video?',
    'reserva.faq.q4.a':
      "Fully edited material 8 to 12 weeks after the wedding. A short selection (10–15 photos) goes out the following week so you can share with family.",
    'reserva.faq.q5.q': 'How do we pay the rest?',
    'reserva.faq.q5.a':
      '50% on signing, 50% one month before the day. We can adjust the split if another arrangement suits you better.',
    'reserva.faq.q6.q': 'What if we have to cancel?',
    'reserva.faq.q6.a':
      "Spelled out clearly in the contract. In short: the deposit is non-refundable, but the date can be moved once at no extra cost if you let us know with enough notice.",
    'reserva.faq.q7.q': "Are you registered? Do you have insurance?",
    'reserva.faq.q7.a':
      "Yes. We work as registered self-employed photographers, with public-liability insurance and proper invoicing.",

    // Final CTA
    'reserva.final.heading': "If it fits, let's do it.",
    'reserva.final.whatsapp':
      "If you have any questions before booking, message us on WhatsApp.",

    // Status banner
    'reserva.banner.submitted.title': "We've received your details",
    'reserva.banner.submitted.body':
      "We'll send the contract within 24h. If you need to change anything, message us on WhatsApp.",

    // Expired view
    'reserva.expired.title': 'This proposal expired on {date}',
    'reserva.expired.body':
      "Drop us a line and we'll refresh it in a moment.",
    'reserva.expired.cta': 'Contact via WhatsApp',

    // Deposit payment (post-/reserva)
    'reserva.pay.heading': 'Booking payment',
    'reserva.pay.intro': 'To lock in your date exclusively, all that\'s left is the deposit. You can pay by bank transfer or card.',
    'reserva.pay.dataReceived': "We've received your details!",
    'reserva.pay.success': 'Payment received! We\'ll send you the contract to sign. Thank you for trusting us.',
    'reserva.pay.cancel': 'The payment was cancelled. You can try again or use the bank transfer.',
    'reserva.pay.recap.pack': 'Pack',
    'reserva.pay.recap.total': 'Total investment',
    'reserva.pay.recap.deposit': 'Booking deposit',
    'reserva.pay.recap.terms': 'Payment plan',
    'reserva.pay.transfer.heading': 'Bank transfer',
    'reserva.pay.transfer.beneficiary': 'Beneficiary',
    'reserva.pay.transfer.iban': 'IBAN',
    'reserva.pay.transfer.bank': 'Bank',
    'reserva.pay.transfer.amount': 'Amount',
    'reserva.pay.transfer.reference': 'Reference',
    'reserva.pay.transfer.note': 'Once we receive the transfer we\'ll send you the contract.',
    'reserva.pay.note.secondPayment': 'The second payment is due up to 15 days before the wedding.',
    'reserva.pay.note.cash': 'The cash payment is handed over on the wedding day, or at an earlier visit if we arrange one.',
    'reserva.pay.card.heading': 'Card payment',
    'reserva.pay.card.button': 'Pay the deposit by card',
    'reserva.pay.card.note': 'Secure payment via Stripe. The contract will be sent to you automatically.',
    'reserva.pay.card.error': "We couldn't start the payment. Try again or use the bank transfer.",
    'reserva.pay.paid.heading': 'Deposit received',
    'reserva.pay.paid.body': 'Thank you! The next step is to fill in and sign the contract.',
    'reserva.pay.paid.cta': 'Go to the contract',

    // Not found view
    'reserva.notfound.title': "We couldn't find this proposal",
    'reserva.notfound.body':
      "The link may be wrong or withdrawn. If you think this is a mistake, write to us.",

    // Reservation form
    'reserva.form.heading': 'Booking details',
    'reserva.form.intro':
      "We collect what we need to prepare the contract. We'll send it to sign online within 24h.",
    'reserva.form.section.c1': "Spouse 1",
    'reserva.form.section.c2': "Spouse 2",
    'reserva.form.section.billing': 'Billing details',
    'reserva.form.section.day': 'Day confirmation',
    'reserva.form.section.preferences': 'Preferences',
    'reserva.form.section.optional': 'Optional but useful',
    'reserva.form.field.fullName': 'Full name',
    'reserva.form.field.dni': 'National ID (DNI / NIE / passport)',
    'reserva.form.field.birthDate': 'Date of birth',
    'reserva.form.field.address': 'Full postal address',
    'reserva.form.field.sameAddressAsC1': "We live together at the same postal address (use the first partner's address for both and for the invoice).",
    'reserva.form.field.email': 'Email',
    'reserva.form.field.phone': 'Phone',
    'reserva.form.field.billingSame': "Same address as spouse 1",
    'reserva.form.field.billingName': 'Billing name',
    'reserva.form.field.billingDni': 'Billing tax ID',
    'reserva.form.field.billingAddress': 'Billing address',
    'reserva.form.field.dateConfirmed': 'Date confirmed?',
    'reserva.form.field.dateAlt': 'Alternative date',
    'reserva.form.field.venueConfirmed': 'Venue confirmed?',
    'reserva.form.field.venueAlt': 'Alternative venue',
    'reserva.form.field.timeSlot': 'Morning or afternoon wedding?',
    'reserva.form.field.timeSlot.hint': "We'll set the exact time later on.",
    'reserva.form.field.ceremonyTime': 'Approx. ceremony time',
    'reserva.form.field.serviceEndTime': 'Approx. service end time',
    'reserva.form.field.guestCount': 'Estimated number of guests',
    'reserva.form.field.communication': 'Preferred way to keep in touch',
    'reserva.form.field.language': 'Preferred language',
    'reserva.form.field.payment': 'Preferred payment method',
    'reserva.form.field.howFound': 'How did you find us?',
    'reserva.form.field.notes': "Anything important we should know now?",
    'reserva.form.opt.yes': 'Yes',
    'reserva.form.opt.no': 'No',
    'reserva.form.opt.morning': 'Morning',
    'reserva.form.opt.afternoon': 'Afternoon',
    'reserva.form.field.billingContact': "Whose name will the contract and invoice be in?",
    'reserva.form.opt.contraent1': 'First partner',
    'reserva.form.opt.contraent2': 'Second partner',
    'reserva.form.opt.email': 'Email',
    'reserva.form.opt.whatsapp': 'WhatsApp',
    'reserva.form.opt.phone': 'Phone',
    'reserva.form.opt.card': 'Card',
    'reserva.form.opt.transfer': 'Bank transfer',
    'reserva.form.submit': 'Send and continue to the contract',
    'reserva.form.submit.microcopy':
      "When you submit, you'll receive an immediate confirmation email. We'll send the contract to sign within 24h.",
    'reserva.form.submitting': 'Sending…',
    'reserva.form.success.title': 'Done!',
    'reserva.form.success.body':
      "We've received your details. The confirmation email will arrive in the next few minutes. If you don't see it, check your spam folder.",
    'reserva.form.error.generic':
      "We couldn't send the form. Try again in a moment, or message us on WhatsApp.",
    'reserva.form.error.alreadySubmitted':
      "This booking has already been processed. If you need to change anything, message us on WhatsApp.",
    'reserva.form.error.rateLimited':
      'Too many attempts in a short time. Wait a few minutes before trying again.',
    'reserva.form.error.validation':
      "Some fields have an incorrect format. Please check them below.",

    // /contrato post-deposit form
    'contrato.title': 'Contract details',
    'contrato.intro':
      'This information is essential for preparing the contract, as we take your image rights very seriously. We want you to feel completely confident about how any material captured during your wedding may be used.',
    'contrato.gating.deposit_pending.title': 'Waiting for deposit confirmation',
    'contrato.gating.deposit_pending.body':
      "As soon as we receive the deposit we'll unlock this form so you can finish preparing the contract. If you think you've already transferred it, please message us on WhatsApp.",
    'contrato.gating.already_submitted.title': 'We already have your details',
    'contrato.gating.already_submitted.body':
      "We've received all the contract information. We're preparing it and you'll receive it signed within a few days.",
    'contrato.section.day.heading': 'Day-of operational details',
    'contrato.section.day.intro': 'To finish planning the day.',
    'contrato.section.consent.heading': 'Publication consent',
    'contrato.section.consent.intro':
      'The publication of our work on digital or physical media is always done without commercial intent and solely to showcase our storytelling style. We will never publish the full wedding film (20–25 min) on any public platform. Tick the channels where you authorise us to show images:',
    'contrato.section.gdpr.heading': 'Data protection',
    'contrato.field.languageBetween': 'Which language do you usually speak between you?',
    'contrato.field.languageBetween.help': 'Helps us know which language to use with you during the day.',
    'contrato.field.ceremonyLocation': 'Ceremony location',
    'contrato.field.receptionLocation': 'Reception location',
    'contrato.field.c1PrepAddress': 'Address where partner 1 will get ready',
    'contrato.field.c2PrepAddress': 'Address where partner 2 will get ready',
    'contrato.field.prepAddress.help': "Street, number, city. That's where we'll come to pick you up in the morning.",
    'contrato.field.ceremonyType': 'Type of ceremony',
    'contrato.opt.ceremony.civil': 'Civil',
    'contrato.opt.ceremony.religious': 'Religious',
    'contrato.opt.ceremony.other': 'Other',
    'contrato.field.ceremonyTypeOther': 'Please specify',
    'contrato.field.firstLook': 'Would you like to have a "First Look"?',
    'contrato.field.firstLook.help':
      'The First Look is a special moment before the ceremony where you see each other for the first time in a private setting. We accompany you to capture all the emotion.',
    'contrato.opt.firstLook.yes': 'Yes',
    'contrato.opt.firstLook.no': 'No',
    'contrato.opt.firstLook.not_sure': 'Not sure yet',
    'contrato.field.publicationConsent': 'Authorised channels',
    'contrato.opt.consent.display': 'Physical studio display (C/ Mare Molas 26, Reus)',
    'contrato.opt.consent.facebook': 'Facebook professional (facebook.com/lifetimeweddingstories)',
    'contrato.opt.consent.website': 'Website (lifetime.photo)',
    'contrato.opt.consent.instagram': 'Instagram (@lifetime.weddings)',
    'contrato.opt.consent.private_video':
      'Private video (shown only to other couples privately, never a public link)',
    'contrato.opt.consent.instagram_reel': 'Instagram Reel (@lifetime.weddings)',
    'contrato.opt.consent.instagram_stories':
      'Instagram Stories on the wedding day (live coverage)',
    'contrato.opt.consent.blog_real_wedding':
      'Real-wedding blog post on lifetime.photo/bodes featuring your story',
    'contrato.opt.consent.paid_ads':
      'Paid ads on Meta / Google (use of images in advertising campaigns)',
    'contrato.opt.consent.venue_partners':
      'Share the wedding with the venue / wedding planner for their own channels',
    'contrato.field.gdpr.label': 'I accept the data processing policy',
    'contrato.field.gdpr.body':
      'In accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018, we inform you that the personal data collected will be processed by OBJECTIU S.C.P. (C/ Mare Molas 26, Reus) for the purpose of managing the contract and providing the photography services. Your data will not be shared with third parties unless required by law. You may exercise your rights of access, rectification, erasure, objection, restriction and portability by contacting us at the email indicated in our privacy policy.',
    'contrato.submit': 'Submit contract details',
    'contrato.submit.microcopy':
      "Once submitted, we'll prepare the contract and email it to you within a few days.",
    'contrato.submitting': 'Submitting…',
    'contrato.success.title': 'Done!',
    'contrato.success.body':
      "We've received the details. We'll prepare the contract and send it to you to sign within a few days.",
    'contrato.error.generic':
      "We couldn't send the form. Try again in a moment, or message us on WhatsApp.",
    'contrato.error.alreadySubmitted':
      'These details have already been recorded. If you need to change anything, message us on WhatsApp.',
    'contrato.error.depositPending':
      'We need to receive your deposit before we can process this form.',
    'contrato.error.rateLimited': 'Too many attempts in a short time. Wait a few minutes.',
    'contrato.error.validation': 'Some fields have an incorrect format. Please check them.',
    'contrato.accept.heading': 'Your contract',
    'contrato.accept.intro': 'This is the contract with your details. Read it carefully and accept it to finalise the booking. We\'ll email you a PDF copy.',
    'contrato.accept.checkbox': 'I have read and accept the contract',
    'contrato.accept.submit': 'Accept the contract',
    'contrato.accept.submitting': 'Sending…',
    'contrato.accept.success.title': 'Contract accepted!',
    'contrato.accept.success.body': 'Thank you. We\'ve emailed you your PDF copy. See you soon!',
    'contrato.accept.error.generic': 'We couldn\'t record your acceptance. Try again or message us on WhatsApp.',
    'contrato.accepted.title': 'Contract accepted',
    'contrato.accepted.body': 'Your contract is accepted. We\'ve emailed you the PDF copy. Any questions, just write to us.',

    // Video embed
    'reserva.video.eyebrow': 'Weddings in motion',
    'reserva.video.heading': "Have a look at our work",

    // Videocall CTA
    'reserva.videocall.eyebrow': 'Want to meet first?',
    'reserva.videocall.heading': "Let's do a 15-minute video call",
    'reserva.videocall.body':
      "If you're not fully sure yet, the easiest thing is to talk face-to-face. A short video call — 15 minutes, whenever it suits you — lets us get to know each other, answer the specific questions you have, and show you how we work.\n\nCosts nothing and doesn't commit you to booking.",
    'reserva.videocall.cta': 'Message on WhatsApp',
    'reserva.videocall.bookCta': 'Book a video call',
    'reserva.videocall.orWhatsapp': 'Or if you prefer,',
    'reserva.videocall.whatsappLink': 'message us on WhatsApp.',
    'reserva.videocall.subnote': 'Any weekday afternoon works for us.',

    // Accessibility / global UI labels
    'a11y.skipToContent': 'Skip to content',
    'a11y.openMenu': 'Open menu',
    'a11y.closeMenu': 'Close menu',

    'cookies.title': 'Privacy and cookies',
    'cookies.desc': 'We use essential cookies so the site works and, optionally, analytics cookies to improve your experience. You can accept them, reject them or customise your choice.',
    'cookies.accept': 'Accept all',
    'cookies.reject': 'Essential only',
    'cookies.settings': 'More information',
    'cookies.preferences': 'Cookie preferences',
    'consent.gated.title': 'Content blocked',
    'consent.gated.body': 'You declined third-party cookies. To play this YouTube video we need to load external content that may set cookies.',
    'consent.gated.cta': 'Change preferences',

    // Private quote page /p/<token>
    'quote.notFound.title': 'Quote not found',
    'quote.notFound.body': "This link doesn't exist or has been archived. If you think this is a mistake, write to us at",
    'quote.expired.title': 'Link expired',
    'quote.expired.body': 'This quote is no longer available. Ask us for an updated link at',
    'quote.password.title': 'Protected content',
    'quote.password.body': 'Enter the password we shared with you.',
    'quote.password.error': 'Incorrect password.',
    'quote.password.submit': 'Enter',
    'quote.hero.eyebrow': 'Personalised quote',
    'quote.hero.body': 'Thank you for choosing Lifetime Weddings. Here is the proposal we put together for you.',
    'quote.notes.eyebrow': 'A note for you',
    'quote.intro.default': '{name}, we put this proposal together with your day in mind. Take your time with it —the film, real examples and the packages— and ask us anything.',
    'quote.packs.heading': 'The proposal',
    'quote.packs.includes': 'Includes',
    'quote.showcase.eyebrow': 'Similar weddings',
    'quote.showcase.cta': 'See the gallery and video',
    'quote.gallery.heading': 'The gallery we picked for you',
    'quote.gallery.eyebrow': 'Private gallery',
    'quote.gallery.description': 'See a full wedding we shot',
    'quote.gallery.newTab': 'Open in a new tab',
    'quote.gallery.blocked': "The gallery can't be shown embedded here. Open it in a new tab to see the full thing.",
    'quote.cta.heading': 'See you soon?',
    'quote.cta.body': "If you have questions or want to finalise anything, reply to this email or message us on WhatsApp.",
    'quote.cta.email': 'Email us',
    'quote.cta.whatsapp': 'WhatsApp us',
    'quote.wa.message': "Hi! We're {name}. We've seen the quote and would like to move forward.",
    'quote.wa.videocallMessage': "Hi! We're {name}. We've seen the quote and would like a 15-minute video call before deciding.",
    'quote.extras.heading': 'Optional add-ons',
    'quote.extras.body': "You can add any of these services on top of your pack. We only reserve them once you confirm.",
    'quote.combo.extras.heading': 'And together:',
    // Interactive configurator — couple-side
    'quote.configurator.eyebrow': 'Tailored to you',
    'quote.configurator.heading': 'Customise your quote',
    'quote.configurator.intro': "Tick what you'd like and the total updates instantly. Once it's right, send it over — we'll reply with the final proposal.",
    'quote.configurator.basePacks': 'Base packs',
    'quote.configurator.combos': 'Combos (photo + video)',
    'quote.configurator.extras': 'Optional add-ons',
    'quote.configurator.typePhoto': 'Photo',
    'quote.configurator.typeVideo': 'Video',
    'quote.configurator.typeCombo': 'Combo',
    'quote.configurator.subtotal': 'Subtotal',
    'quote.configurator.discount': 'Discount',
    'quote.configurator.total': 'Total',
    'quote.configurator.paymentNote': 'Payment: 30 % deposit, 50 % a month before the wedding, 20 % a month after. No fees or middlemen.',
    'quote.configurator.messageLabel': 'A message for us (optional)',
    'quote.configurator.messagePlaceholder': 'For example: could you include 2 extra hours of coverage? Or swap the album for two for the parents?',
    'quote.configurator.submit': 'Send our configuration',
    'quote.configurator.submitting': 'Sending…',
    'quote.configurator.successTitle': "Got it — thank you",
    'quote.configurator.successBody': "We've received your configuration. We'll get back to you shortly with the final proposal.",
    'quote.configurator.errorBody': "We couldn't send it. Please try again, or message us on WhatsApp.",
    'quote.configurator.empty': 'Tick at least one pack or add-on before sending.',
    'quote.configurator.closedTitle': 'Quote closed',
    'quote.configurator.closedBody': "We've closed your quote. If you want to change anything, drop us a line and we'll reopen it.",
    'quote.configurator.previousTitle': 'Your last configuration is saved',
    'quote.configurator.singleChoiceNote': 'Pick just one: either a base pack or a combo. Add-ons can be combined freely.',
    'quote.configurator.clearPack': 'Clear pack selection',
    'quote.configurator.toggleSeeVideo': 'Want to see the video option as well? →',
    'quote.configurator.toggleSeePhoto': 'Want to see the photo option as well? →',
    // Value pillars block (3 columns) — between showcase and triptych on /p/<token>.
    'quote.values.eyebrow': 'What sets us apart',
    'quote.values.heading': 'Three reasons couples pick us',
    'quote.values.p1.title': 'Two brothers, one crew',
    'quote.values.p1.body': 'Photo and video coordinated from the inside — the same eye in two formats. No need to sync two separate vendors on the most important day.',
    'quote.values.p2.title': 'Documentary, no posing',
    'quote.values.p2.body': "We blend in and don't direct the scene. We want you to relive the day exactly as it happened — not to remember the photographer.",
    'quote.values.p3.title': '3-4 week delivery',
    'quote.values.p3.body': 'Your private gallery with 700-1,200 edited photos, ready to share before your honeymoon tan fades. Video lands in 8-10 weeks.',
    'quote.faq.heading': 'Frequently asked questions',
    'quote.faq.q1.q': 'How many photos do you deliver?',
    'quote.faq.q1.a': "We deliver between 700 and 1,200 edited photographs — always picking the best ones to tell your story in the most emotional and authentic way.",
    'quote.faq.q2.q': 'Who picks the album photos?',
    'quote.faq.q2.a': "We make a first selection to make sure the album tells your big day well. You'll get a round of changes to adjust it to your liking.",
    'quote.faq.q3.q': 'How long is the video?',
    'quote.faq.q3.a': "The main film usually runs 25–40 minutes. If you want, you can add extras like the full speeches in a separate cut. We adapt to whatever you need.",
    'quote.faq.q4.q': 'How does payment work?',
    'quote.faq.q4.a': '30 % as a deposit, 50 % one month before the wedding and 20 % one month after. You can pay by cash, bank transfer or card — always with a receipt and signed contract. We also accept monthly instalments up to the wedding day, with no commissions or third-party financing.',
    'quote.faq.q5.q': 'Can we pick the music for the film?',
    'quote.faq.q5.a': "Of course. If you have a special song in mind, let us know. If for some reason it doesn't fit the edit, we'll talk it through and help you find an alternative you'll love.",
    'quote.faq.q6.q': "We're getting married outside the province — do you travel?",
    'quote.faq.q6.a': "Yes! We've shot weddings all over Spain and also in New York, Rome and London. Our rates include travel within the province of Tarragona and up to 100 km from Reus. For longer trips, travel and mileage are quoted separately.",
    'quote.faq.q7.q': 'How long will you stay at the wedding?',
    'quote.faq.q7.a': "Your wedding day is reserved exclusively for you. We typically stay 10–13 hours — from prep through to 45 min – 1 h after the first dance. And we never delegate to third parties: it's always us.",
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    const value = (ui[lang] as Record<string, string>)[key];
    // Fall back to CA when (a) the key is missing in `lang`, or (b) the
    // value is still a placeholder. We tag untranslated strings with
    // "TODO:" so the build doesn't break (the type system needs every
    // locale to have every key) but we don't want to ship the placeholder
    // text to real users. CA is the editorial source of truth.
    if (value === undefined || value.startsWith('TODO:')) {
      return (ui[defaultLang] as Record<string, string>)[key];
    }
    return value;
  };
}

/** Prefix a path with the locale segment. CA (default) has no prefix. */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'ca') return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}
