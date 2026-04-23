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
    'hero.title': 'Dos hermanos. Una cámara y una de vídeo.',
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
    'faq.a3': 'Los packs empiezan en 1.290 € + IVA solo fotografía y 2.480 € + IVA para foto + vídeo. Podéis ver todos los packs y precios o hacernos una consulta personalizada en 1 minuto.',
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
    'quiz.title': 'Veamos si estamos libres vuestra fecha',
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
      'Pack combinado con fotografía (Ferran) y vídeo (Eric). Dos hermanos, un equipo, una boda por día. Desde 2.480 € + IVA.',
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
    'reserva.faq.q2.q': '¿Y si tenéis otra boda nuestro día?',
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

    // Video embed (flagship trailer)
    'reserva.video.eyebrow': 'Bodas en movimiento',
    'reserva.video.heading': 'Echad un vistazo a nuestro trabajo',

    // Videocall CTA (softer "let's meet first" option, between FAQ and FinalCTA)
    'reserva.videocall.eyebrow': '¿Queréis que nos conozcamos antes?',
    'reserva.videocall.heading': 'Hagamos una videollamada de 15 minutos',
    'reserva.videocall.body':
      'Si todavía no lo tenéis del todo claro, lo más fácil es que hablemos en directo. Una videollamada corta — 15 minutos, cuando os vaya bien — nos sirve para conocernos, resolver las dudas concretas que tengáis y que veáis cómo trabajamos.\n\nNo cuesta nada y no os compromete a reservar.',
    'reserva.videocall.cta': 'Hablar por WhatsApp',
    'reserva.videocall.subnote': 'Os va bien cualquier tarde entre semana.',
    // Wedding case rich template (Fase 2)
    'case.eyebrow': 'Boda real',
    'case.intro.heading': 'Su historia',
    'case.ficha.heading': 'Ficha del día',
    'case.ficha.date': 'Fecha',
    'case.ficha.venue': 'Espacio',
    'case.ficha.location': 'Ubicación',
    'case.ficha.guests': 'Invitados',
    'case.ficha.ceremony': 'Ceremonia',
    'case.ficha.style': 'Estilo',
    'case.ficha.weather': 'Tiempo',
    'case.ceremony.civil': 'Civil',
    'case.ceremony.religiosa': 'Religiosa',
    'case.ceremony.simbolica': 'Simbólica',
    'case.suppliers.heading': 'Proveedores',
    'case.suppliers.planner': 'Wedding planner',
    'case.suppliers.catering': 'Catering',
    'case.suppliers.florist': 'Flores',
    'case.suppliers.music': 'Música',
    'case.suppliers.makeup': 'Maquillaje',
    'case.suppliers.dress': 'Vestido',
    'case.testimoni.heading': 'Sus palabras',
    'case.related.heading': 'Bodas similares',
    'case.blog.heading': 'Lee más en el blog',
    'case.blog.cta': 'Leer el post',
    'case.cta.heading': '¿Os casáis pronto?',
    'case.cta.subtitle': 'Si os gusta este estilo documental y natural, contadnos vuestra boda. Os responderemos en menos de 24h.',
    'case.cta.button': 'Consultar disponibilidad',

    // Cookies
    'cookies.title': 'Privacidad y cookies',
    'cookies.desc': 'Usamos cookies esenciales para que la web funcione y, opcionalmente, cookies analíticas para mejorar vuestra experiencia. Podéis aceptarlas, rechazarlas o personalizar vuestra elección.',
    'cookies.accept': 'Aceptar todas',
    'cookies.reject': 'Solo esenciales',
    'cookies.settings': 'Más información',
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
    'hero.title': 'Dos germans. Una càmera i una de vídeo.',
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
    'faq.a3': 'Els packs comencen en 1.290 € + IVA només fotografia i 2.480 € + IVA per foto + vídeo. Podeu veure tots els packs i preus o fer-nos una consulta personalitzada en 1 minut.',
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

    'quiz.title': 'Mirem si estem lliures la vostra data',
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
      'Pack combinat amb fotografia (Ferran) i vídeo (Eric). Dos germans, un equip, una boda per dia. Des de 2.480 € + IVA.',
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
    'reserva.faq.q2.q': 'I si teniu una altra boda el nostre dia?',
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
    'reserva.form.field.ceremonyTime': 'Hora aproximada de la cerimònia',
    'reserva.form.field.serviceEndTime': 'Hora aproximada de fi del servei',
    'reserva.form.field.guestCount': "Nombre estimat d'invitats",
    'reserva.form.field.communication': 'Mètode de comunicació preferit',
    'reserva.form.field.language': 'Idioma preferit',
    'reserva.form.field.payment': 'Mètode de pagament preferit',
    'reserva.form.field.howFound': 'Com ens vau conèixer?',
    'reserva.form.field.notes': "Hi ha alguna cosa important que vulgueu que sapiguem des de ja?",
    'reserva.form.opt.yes': 'Sí',
    'reserva.form.opt.no': 'No',
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

    // Video embed
    'reserva.video.eyebrow': 'Bodes en moviment',
    'reserva.video.heading': 'Feu un cop d\'ull a la nostra feina',

    // Videocall CTA
    'reserva.videocall.eyebrow': 'Voleu que ens coneguem abans?',
    'reserva.videocall.heading': 'Fem una videocall de 15 minuts',
    'reserva.videocall.body':
      "Si encara no ho teniu del tot clar, el més fàcil és que parlem en directe. Una videocall curta — 15 minuts, quan us vagi bé — ens serveix per conèixer-nos, resoldre els dubtes concrets que tingueu i que veieu com treballem.\n\nNo costa res i no us compromet a reservar.",
    'reserva.videocall.cta': 'Parlar pel WhatsApp',
    'reserva.videocall.subnote': 'Us va bé qualsevol tarda entre setmana.',
    // Wedding case rich template (Fase 2)
    'case.eyebrow': 'Boda real',
    'case.intro.heading': 'La seva història',
    'case.ficha.heading': 'Fitxa del dia',
    'case.ficha.date': 'Data',
    'case.ficha.venue': 'Espai',
    'case.ficha.location': 'Ubicació',
    'case.ficha.guests': 'Convidats',
    'case.ficha.ceremony': 'Cerimònia',
    'case.ficha.style': 'Estil',
    'case.ficha.weather': 'Temps',
    'case.ceremony.civil': 'Civil',
    'case.ceremony.religiosa': 'Religiosa',
    'case.ceremony.simbolica': 'Simbòlica',
    'case.suppliers.heading': 'Proveïdors',
    'case.suppliers.planner': 'Wedding planner',
    'case.suppliers.catering': 'Càtering',
    'case.suppliers.florist': 'Flors',
    'case.suppliers.music': 'Música',
    'case.suppliers.makeup': 'Maquillatge',
    'case.suppliers.dress': 'Vestit',
    'case.testimoni.heading': 'Les seves paraules',
    'case.related.heading': 'Bodes similars',
    'case.blog.heading': 'Llegeix més al blog',
    'case.blog.cta': 'Llegir el post',
    'case.cta.heading': 'Us caseu aviat?',
    'case.cta.subtitle': 'Si us agrada aquest estil documental i natural, expliqueu-nos la vostra boda. Us respondrem en menys de 24h.',
    'case.cta.button': 'Consultar disponibilitat',

    'cookies.title': 'Privacitat i galetes',
    'cookies.desc': 'Fem servir galetes essencials perquè la web funcioni i, opcionalment, galetes analítiques per millorar la vostra experiència. Podeu acceptar-les, rebutjar-les o personalitzar la vostra tria.',
    'cookies.accept': 'Acceptar totes',
    'cookies.reject': 'Només essencials',
    'cookies.settings': 'Més informació',
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
    'faq.a3': 'Packs start at €1,290 + VAT for photo only and €2,480 + VAT for photo + video. You can view all packs and prices or get a personalised quote in under a minute.',
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

    'quiz.title': 'Let’s see if we’re free on your date',
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
      'Combined pack with photography (Ferran) and video (Eric). Two brothers, one team, one wedding per day. From €2,480 + VAT.',
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
    // EN strings are TODO — keys exist so the type system is complete and so
    // `useTranslations('en')` can be called without throwing. Until properly
    // translated, the helper falls back to the CA defaults via the
    // `(ui[defaultLang] as ...)[key]` branch. Mark each string with TODO so
    // it's grep-able when we sit down to translate.
    'reserva.cta.primary': 'TODO: Book our date',
    'reserva.cta.expires': 'TODO: This proposal is valid until {expires}',
    'reserva.hero.greeting': 'TODO: Hi {n1} and {n2},',
    'reserva.hero.body': 'TODO: EN copy for hero body — see docs/booking-spec.md',
    'reserva.why.heading': 'TODO: Two brothers. Second generation.',
    'reserva.why.body': 'TODO: EN copy for why-us — see docs/booking-spec.md',
    'reserva.proof.eyebrow': 'TODO: Real weddings',
    'reserva.proof.heading': 'TODO: A few weddings we have shot',
    'reserva.proof.testimonial.author': 'TODO: — {author}, married at {venue}',
    'reserva.pack.eyebrow': 'TODO: Your proposal',
    'reserva.pack.heading': 'TODO: {name} pack',
    'reserva.pack.includes': 'TODO: What is included:',
    'reserva.pack.excludes': 'TODO: What is not included:',
    'reserva.pack.addons': 'TODO: Optional add-ons:',
    'reserva.pack.invest': 'TODO: Total investment',
    'reserva.pack.deposit': 'TODO: Deposit to book',
    'reserva.pack.terms': 'TODO: Remaining payment',
    'reserva.steps.heading': 'TODO: If everything fits, here is how it works:',
    'reserva.steps.s1.title': 'TODO: Fill in the booking form',
    'reserva.steps.s1.body': 'TODO: 5 minutes — see spec',
    'reserva.steps.s2.title': 'TODO: We send the contract to sign online',
    'reserva.steps.s2.body': 'TODO: see spec',
    'reserva.steps.s3.title': 'TODO: You pay the deposit',
    'reserva.steps.s3.body': 'TODO: card or transfer',
    'reserva.steps.s4.title': 'TODO: Your date is locked in',
    'reserva.steps.s4.body': 'TODO: only for you',
    'reserva.steps.outro': 'TODO: see spec',
    'reserva.faq.heading': 'TODO: Frequently asked',
    'reserva.faq.q1.q': 'TODO: What if it rains?',
    'reserva.faq.q1.a': 'TODO: see spec',
    'reserva.faq.q2.q': 'TODO: What if you have another wedding our day?',
    'reserva.faq.q2.a': 'TODO: see spec',
    'reserva.faq.q3.q': 'TODO: Can we adjust the pack?',
    'reserva.faq.q3.a': 'TODO: see spec',
    'reserva.faq.q4.q': 'TODO: When do we get the photos and video?',
    'reserva.faq.q4.a': 'TODO: see spec',
    'reserva.faq.q5.q': 'TODO: How do we pay the rest?',
    'reserva.faq.q5.a': 'TODO: see spec',
    'reserva.faq.q6.q': 'TODO: What if we had to cancel?',
    'reserva.faq.q6.a': 'TODO: see spec',
    'reserva.faq.q7.q': 'TODO: Are you registered? Do you have insurance?',
    'reserva.faq.q7.a': 'TODO: see spec',
    'reserva.final.heading': 'TODO: If it fits, let us do it.',
    'reserva.final.whatsapp':
      'TODO: If you have any questions before booking, message us on WhatsApp.',
    'reserva.banner.submitted.title': 'TODO: We have received your details',
    'reserva.banner.submitted.body':
      'TODO: We will send the contract within 24h.',
    'reserva.expired.title': 'TODO: This proposal expired on {date}',
    'reserva.expired.body': 'TODO: Drop us a line and we will refresh it.',
    'reserva.expired.cta': 'TODO: Contact via WhatsApp',
    'reserva.notfound.title': 'TODO: We could not find this proposal',
    'reserva.notfound.body':
      'TODO: The link may be wrong or withdrawn. If you think this is a mistake, contact us.',

    // Reservation form — EN strings TODO; helper falls back to CA.
    'reserva.form.heading': 'TODO: Booking details',
    'reserva.form.intro': 'TODO: see spec',
    'reserva.form.section.c1': 'TODO: First spouse details',
    'reserva.form.section.c2': 'TODO: Second spouse details',
    'reserva.form.section.billing': 'TODO: Billing details',
    'reserva.form.section.day': 'TODO: Day confirmation',
    'reserva.form.section.preferences': 'TODO: Preferences',
    'reserva.form.section.optional': 'TODO: Optional but useful',
    'reserva.form.field.fullName': 'TODO: Full name',
    'reserva.form.field.dni': 'TODO: National ID',
    'reserva.form.field.birthDate': 'TODO: Date of birth',
    'reserva.form.field.address': 'TODO: Postal address',
    'reserva.form.field.email': 'TODO: Email',
    'reserva.form.field.phone': 'TODO: Phone',
    'reserva.form.field.billingSame': 'TODO: Same address as first spouse',
    'reserva.form.field.billingName': 'TODO: Billing name',
    'reserva.form.field.billingDni': 'TODO: Billing tax ID',
    'reserva.form.field.billingAddress': 'TODO: Billing address',
    'reserva.form.field.dateConfirmed': 'TODO: Date confirmed?',
    'reserva.form.field.dateAlt': 'TODO: Alternative date',
    'reserva.form.field.venueConfirmed': 'TODO: Venue confirmed?',
    'reserva.form.field.venueAlt': 'TODO: Alternative venue',
    'reserva.form.field.ceremonyTime': 'TODO: Approx. ceremony time',
    'reserva.form.field.serviceEndTime': 'TODO: Approx. end time',
    'reserva.form.field.guestCount': 'TODO: Estimated guests',
    'reserva.form.field.communication': 'TODO: Preferred communication',
    'reserva.form.field.language': 'TODO: Preferred language',
    'reserva.form.field.payment': 'TODO: Preferred payment method',
    'reserva.form.field.howFound': 'TODO: How did you find us?',
    'reserva.form.field.notes': 'TODO: Anything important we should know now?',
    'reserva.form.opt.yes': 'Yes',
    'reserva.form.opt.no': 'No',
    'reserva.form.opt.email': 'Email',
    'reserva.form.opt.whatsapp': 'WhatsApp',
    'reserva.form.opt.phone': 'Phone',
    'reserva.form.opt.card': 'Card',
    'reserva.form.opt.transfer': 'Transfer',
    'reserva.form.submit': 'TODO: Send and continue to contract',
    'reserva.form.submit.microcopy': 'TODO: see spec',
    'reserva.form.submitting': 'Sending…',
    'reserva.form.success.title': 'TODO: Done!',
    'reserva.form.success.body': 'TODO: see spec',
    'reserva.form.error.generic': 'TODO: see spec',
    'reserva.form.error.alreadySubmitted': 'TODO: see spec',
    'reserva.form.error.rateLimited': 'TODO: see spec',
    'reserva.form.error.validation': 'TODO: see spec',

    // Video embed + videocall CTA — EN strings TODO; helper falls back to CA.
    'reserva.video.eyebrow': 'TODO: Weddings in motion',
    'reserva.video.heading': 'TODO: Take a look at our work',
    'reserva.videocall.eyebrow': 'TODO: Want to meet first?',
    'reserva.videocall.heading': 'TODO: Let\'s do a 15-minute video call',
    'reserva.videocall.body': 'TODO: see spec',
    'reserva.videocall.cta': 'TODO: Message on WhatsApp',
    'reserva.videocall.subnote': 'TODO: Any weekday afternoon works.',
    // Wedding case rich template (Fase 2)
    'case.eyebrow': 'Real wedding',
    'case.intro.heading': 'Their story',
    'case.ficha.heading': 'Day at a glance',
    'case.ficha.date': 'Date',
    'case.ficha.venue': 'Venue',
    'case.ficha.location': 'Location',
    'case.ficha.guests': 'Guests',
    'case.ficha.ceremony': 'Ceremony',
    'case.ficha.style': 'Style',
    'case.ficha.weather': 'Weather',
    'case.ceremony.civil': 'Civil',
    'case.ceremony.religiosa': 'Religious',
    'case.ceremony.simbolica': 'Symbolic',
    'case.suppliers.heading': 'Vendors',
    'case.suppliers.planner': 'Wedding planner',
    'case.suppliers.catering': 'Catering',
    'case.suppliers.florist': 'Florist',
    'case.suppliers.music': 'Music',
    'case.suppliers.makeup': 'Makeup',
    'case.suppliers.dress': 'Dress',
    'case.testimoni.heading': 'In their words',
    'case.related.heading': 'Similar weddings',
    'case.blog.heading': 'Read more on the blog',
    'case.blog.cta': 'Read the post',
    'case.cta.heading': 'Getting married soon?',
    'case.cta.subtitle': 'If you love this documentary, natural style, tell us about your wedding. We reply within 24h.',
    'case.cta.button': 'Check availability',

    'cookies.title': 'Privacy and cookies',
    'cookies.desc': 'We use essential cookies so the site works and, optionally, analytics cookies to improve your experience. You can accept them, reject them or customise your choice.',
    'cookies.accept': 'Accept all',
    'cookies.reject': 'Essential only',
    'cookies.settings': 'More information',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key];
  };
}

/** Prefix a path with the locale segment. CA (default) has no prefix. */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'ca') return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}
