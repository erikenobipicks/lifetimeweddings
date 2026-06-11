# Secuencia de emails automáticos para clientes — Lifetime Weddings

Secuencia completa de comunicación con la pareja, desde la reserva hasta un año
después de la boda. Pensada para sonar como si la escribiera Ferran en persona,
no como una automatización.

---

## Cómo usar este documento

**Variables disponibles** (sustituir en la herramienta de automatización):

| Variable | Contenido |
|---|---|
| `{{nombre_pareja}}` | Nombres de la pareja (ej. "Laura y Marc") |
| `{{fecha_boda}}` | Fecha de la boda |
| `{{lugar_boda}}` | Lugar de la celebración |
| `{{hora_ceremonia}}` | Hora de la ceremonia |
| `{{nombre_fotografo}}` | Ferran |
| `{{nombre_videografo}}` | Eric |
| `{{link_formulario}}` | Enlace al formulario de información de la boda |
| `{{link_galeria}}` | Enlace a la galería online |
| `{{link_album}}` | Enlace a la propuesta de diseño del álbum |
| `{{telefono_contacto}}` | Teléfono de contacto |

**Reglas generales de la secuencia:**

- Los emails se firman como Ferran (con Eric mencionado cuando toca), porque la
  voz única hace que suene a persona, no a empresa.
- Sin emojis salvo casos muy puntuales. Aquí no se usa ninguno.
- Nunca se prometen fechas exactas de entrega: se usan fórmulas prudentes
  ("en los próximos días", "durante las próximas semanas", "según el servicio
  contratado").
- No se mencionan precios.
- El dron se menciona solo donde aporta, siempre con la coletilla de que
  depende de condiciones, ubicación y permisos.
- "Solo una boda por día" aparece de forma natural en 3–4 emails clave
  (bienvenida, proceso, semana antes, día antes), nunca en todos.

**Resumen de automatización:**

| # | Email | Disparador | Tono dominante |
|---|---|---|---|
| 1 | Bienvenida | Reserva + 0 días (mismo día) | Emocional |
| 2 | Cómo será el proceso | Reserva + 3 días | Informativo |
| 3 | Consejos preboda | Al agendar la preboda (o sesión preboda − 14 días) | Informativo cercano |
| 4 | Localización preboda | Agenda de preboda + 21 días, solo si no hay localización elegida | Informativo |
| 5 | Revisión de horarios | Boda − 90 días | Informativo |
| 6 | Información importante | Boda − 30 días | Informativo |
| 7 | Planning definitivo | Boda − 21 días | Informativo |
| 8 | Fotos de inspiración | Boda − 42 días | Informativo cercano |
| 9 | Consejos preparativos y luz | Boda − 15 días | Informativo cercano |
| 10 | Confirmación final | Boda − 7 días | Informativo tranquilizador |
| 11 | Mensaje emocional previo | Boda − 1 día | Emocional |
| 12 | Gracias al día siguiente | Boda + 1 día (revisar antes de enviar) | Emocional |
| 13 | Estamos trabajando en ello | Boda + 7 días | Informativo cálido |
| 14 | Sneak peek | Manual (al tener el avance listo) | Emocional |
| 15 | Entrega de galería | Manual (al publicar la galería) | Emocional |
| 16 | Cómo descargar y guardar | Entrega de galería + 2 días | Informativo |
| 17 | Selección para el álbum | Entrega de galería + 10 días (solo con álbum contratado) | Informativo cercano |
| 18 | Revisión del diseño del álbum | Manual (al tener el diseño listo) | Informativo cercano |
| 19 | Entrega del vídeo | Manual (al publicar el vídeo) | Emocional |
| 20 | Cierre de experiencia | Última entrega + 10 días | Emocional |
| 21 | Reseña de Google | Email de cierre + 4 días | Cercano, sin presión |
| 22 | Aniversario | Boda + 365 días | Emocional |

**Los dos anclajes de los emails automáticos.** Cada disparador de la tabla
usa una de estas referencias, pensadas para trasladarse tal cual a cualquier
herramienta de automatización:

- **`reserva + X días`** — emails ligados al inicio de la relación (1 y 2).
  Se envían igual aunque la boda quede muy lejos.
- **`boda − X días`** — emails operativos del gran día (5–11). Dependen de
  cuánto falta para la boda, no de cuándo se reservó.
- **`boda + X días`** — postboda con fecha conocida (12, 13 y 22).
- **`entrega/evento + X días`** — los que cuelgan de una entrega real o de un
  hito intermedio (3, 4, 16, 17, 20 y 21).

**Regla anticolisión.** Cuando la reserva llega con poca antelación, los dos
anclajes pueden chocar: una pareja que reserva a 2 meses de la boda ya tiene
"boda − 90" en el pasado, y "boda − 30" le caería a pocos días de la
bienvenida. Dos condiciones a configurar:

1. Un email `boda − X` no se envía si su fecha cae antes de `reserva + 7 días`:
   se omite y su contenido se recoge en el siguiente hito (ver la nota 5 de
   implementación sobre fusiones de emails).
2. Dejar un mínimo de 4–5 días entre dos emails automáticos consecutivos; si
   dos coinciden, se retrasa el menos urgente.

**Criterio manual vs. automático:** todo lo que depende de una fecha conocida
(la boda, la reserva) se puede automatizar con total seguridad. Todo lo que
depende de una entrega real (sneak peek, galería, vídeo, diseño de álbum) debe
dispararse manualmente o al cambiar el estado del proyecto en el CRM, nunca
por fecha, para no prometer algo que aún no existe. El email 12 conviene
revisarlo antes de enviar para añadir un detalle real del día.

---

# PARTE 1 — PREBODA

---

## Email 1 — Bienvenida tras la reserva

- **Nombre interno:** `PRE-01-bienvenida`
- **Momento de envío:** automático, **reserva + 0 días** (el mismo día en que se confirma la reserva).
- **Objetivo:** dar la bienvenida, confirmar que la fecha está reservada en firme y transmitir desde el primer minuto que están en buenas manos.
- **Tono:** emocional.

**Asunto:** Vuestra fecha ya es nuestra: bienvenidos, {{nombre_pareja}}

**Preheader:** El {{fecha_boda}} ya está reservado solo para vosotros.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Ya está. El {{fecha_boda}} queda reservado en nuestro calendario, y queremos que sepáis lo que eso significa para nosotros: ese día no haremos ninguna otra boda. Solo la vuestra. Trabajamos así siempre, una boda por día, porque es la única manera de llegar con calma, con energía y con la cabeza puesta al cien por cien en vuestra historia.
>
> Somos {{nombre_fotografo}} y {{nombre_videografo}}, fotógrafo y videógrafo, y a partir de ahora vamos a estar cerca. No hace falta que hagáis nada todavía: en los próximos días os escribiremos para contaros cómo será todo el proceso de aquí a la boda, paso a paso y sin agobios.
>
> De momento, solo una cosa: gracias por confiarnos un día tan importante. No lo decimos por decir. Cada vez que una pareja nos elige, nos lo tomamos como lo que es.
>
> Si en cualquier momento os surge una duda, por pequeña que sea, escribidnos o llamadnos al {{telefono_contacto}}. Estamos aquí para eso.
>
> Un abrazo,
>
> {{nombre_fotografo}} y {{nombre_videografo}}
> Lifetime Weddings

**CTA / acción recomendada:** ninguna acción requerida; solo invitar a responder o llamar si hay dudas. Es deliberado: el primer email no pide nada.

**Nota de personalización:** si en la reunión previa contaron algo concreto (cómo se conocieron, qué les preocupa, qué les hizo elegirnos), añadir una frase mencionándolo. Es el email donde más se nota la diferencia entre plantilla y persona.

**Versión WhatsApp:**

> ¡{{nombre_pareja}}! Ya tenemos vuestra fecha reservada: {{fecha_boda}}. Ese día será solo para vosotros, como siempre hacemos. En unos días os escribimos con calma para explicaros cómo será todo el proceso. Gracias de verdad por la confianza. Un abrazo, {{nombre_fotografo}} y {{nombre_videografo}}.

---

## Email 2 — Cómo será el proceso hasta la boda

- **Nombre interno:** `PRE-02-proceso`
- **Momento de envío:** automático, **reserva + 3 días**.
- **Objetivo:** explicar el recorrido completo de aquí a la boda para que sepan qué esperar y cuándo, y eliminar la incertidumbre de "¿y ahora qué?".
- **Tono:** informativo (con cierre cálido).

**Asunto:** Así será el camino hasta el {{fecha_boda}}

**Preheader:** Qué haremos juntos de aquí a la boda, paso a paso.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Como os prometimos, aquí va un mapa de todo lo que haremos juntos de aquí a la boda. Guardad este email: es la chuleta para no perderse.
>
> **1. Ahora — conocernos mejor.** Si habéis contratado la sesión preboda, buscaremos fecha y lugar con tiempo. Es una sesión tranquila, sin prisas, que además sirve para que el día de la boda la cámara ya no os imponga nada.
>
> **2. Tres meses antes.** Os escribiremos para repasar los horarios generales del día: ceremonia, traslados, dónde se prepara cada uno. Nada definitivo todavía, solo el esqueleto.
>
> **3. Un mes antes.** Os pediremos la información importante de la boda con un formulario sencillo: direcciones, personas clave, momentos especiales que no podemos perdernos.
>
> **4. Las últimas semanas.** Cerraremos el planning definitivo, os daremos algunos consejos sobre luz y tiempos (los aprendimos boda a boda y de verdad marcan la diferencia) y confirmaremos que todo está listo.
>
> **5. El día de la boda.** Nosotros nos ocupamos de todo lo nuestro. Vosotros, de vivirlo.
>
> **6. Después.** Primero un avance para que revivaís el día cuanto antes, luego la galería completa, el vídeo y el álbum, según el servicio contratado. De cada entrega os iremos avisando.
>
> Iremos nosotros marcando los tiempos, así que no tenéis que estar pendientes de nada: cuando toque algo, os escribimos. Esa es una de las ventajas de hacer solo una boda por día — también tenemos calma para acompañar bien cada una.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** guardar el email como referencia. Si tienen preboda contratada y aún sin fecha, proponer ya dos o tres fechas posibles respondiendo a este correo.

**Nota de personalización:** ajustar el punto 1 según hayan contratado o no la preboda. Si la boda es en menos de 4 meses, comprimir los hitos y decirlo con naturalidad ("como vuestra boda está ya cerquita, iremos un poco más ágiles con estos pasos").

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, os acabamos de enviar un email con el mapa de todo el proceso hasta la boda: qué haremos y cuándo, paso a paso. Echadle un ojo cuando podáis, y tranquilos: de los tiempos nos encargamos nosotros e iremos avisando cuando toque cada cosa.

---

## Email 3 — Consejos para la sesión preboda

- **Nombre interno:** `PRE-03-consejos-preboda`
- **Momento de envío:** automático, al confirmar la fecha de la preboda (o **sesión preboda − 14 días**).
- **Objetivo:** que lleguen a la sesión relajados, sabiendo qué ponerse y qué esperar, y desmontar el miedo a "no saber posar".
- **Tono:** informativo cercano.

**Asunto:** Antes de la preboda, leed esto (os va a quitar nervios)

**Preheader:** Qué llevar, qué esperar y por qué no hace falta saber posar.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Ya tenemos fecha para la preboda, así que os contamos cómo solemos plantearla, porque casi todas las parejas llegan con la misma frase: "es que nosotros no sabemos posar". Perfecto. Nosotros no trabajamos con poses. La sesión es básicamente un paseo juntos: vosotros camináis, habláis, os reís de lo que sea, y nosotros estamos cerca capturando lo que pasa de verdad. Los primeros diez minutos hay vergüenza, siempre. Luego desaparece, también siempre.
>
> Algunos consejos que ayudan:
>
> **Ropa.** Llevad algo con lo que os sintáis vosotros mismos, cómodos y favorecidos. Mejor colores lisos o estampados suaves que logos grandes o estampados muy llamativos. Si os apetece traer un segundo look, hay tiempo para un cambio.
>
> **Hora.** Os propondremos hacer la sesión en las últimas horas de tarde, cuando la luz es más bonita. Si hay que ajustarla por vuestros horarios, lo hablamos.
>
> **Plan B.** Si el tiempo no acompaña, no pasa nada: movemos la fecha sin problema. Mejor una buena sesión otro día que una sesión pasada por agua (salvo que la lluvia os haga ilusión, que también tiene su encanto y lo hemos hecho más de una vez).
>
> **Y lo más importante.** No vengáis a "hacer fotos". Venid a pasar una tarde juntos. De lo demás nos ocupamos nosotros.
>
> Cualquier duda sobre el lugar, la ropa o lo que sea, escribidnos sin pensarlo.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** responder con dudas sobre ropa o lugar si las tienen. Confirmar la hora de encuentro.

**Nota de personalización:** si la localización elegida tiene alguna particularidad (playa, montaña, casco antiguo), añadir un consejo específico (calzado cómodo, abrigo para el viento, etc.). Si tienen perro o hijos y quieren incluirlos, mencionar que son bienvenidos.

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, os hemos mandado un email con consejos para la preboda: ropa, luz y qué esperar de la sesión. Resumen rápido: no hace falta saber posar (de eso nada), venid cómodos y pensad que es un paseo juntos, no una sesión de fotos. Lo demás es cosa nuestra.

---

## Email 4 — Recordatorio para elegir localización de la preboda

- **Nombre interno:** `PRE-04-localizacion-preboda`
- **Momento de envío:** automático con condición: **agenda de la preboda + 21 días** (o **sesión preboda − 42 días** si ya hay fecha orientativa), solo si aún no hay localización elegida.
- **Objetivo:** desbloquear la elección del lugar sin que suene a presión, ofreciendo ayuda concreta.
- **Tono:** informativo.

**Asunto:** ¿Dónde os imagináis vuestra preboda?

**Preheader:** Si no lo tenéis claro, tenemos unas cuantas ideas.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Nos falta un detalle para dejar cerrada la preboda: el lugar. Y queríamos escribiros antes de que se eche el tiempo encima, porque elegirlo con calma siempre da mejores resultados.
>
> Nuestra recomendación de siempre: que sea un sitio que diga algo de vosotros. Donde os conocisteis, donde paseáis los domingos, esa cala o ese rincón que sentís un poco vuestro. Las mejores prebodas no salen de los lugares más espectaculares, sino de los que tienen historia para la pareja.
>
> Si no tenéis ninguno en mente, ningún problema: trabajamos por toda Tarragona y Catalunya y conocemos rincones preciosos de costa, de montaña, de viñedos y de pueblos con encanto. Decidnos qué ambiente os gusta más y os proponemos dos o tres opciones concretas para que elijáis.
>
> Respondednos a este correo con vuestra idea (o con un "ayudadnos, que no lo tenemos claro", que también vale) y lo dejamos cerrado.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** responder al email con la localización elegida o pidiendo propuestas.

**Nota de personalización:** si en algún momento mencionaron un lugar con significado para ellos, recordárselo aquí ("¿Sigue en pie aquello de la Costa Daurada que comentasteis?"). Convierte un recordatorio en una conversación.

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, ¿habéis pensado ya dónde os gustaría hacer la preboda? Si tenéis un sitio especial, genial. Y si no, decidnos qué ambiente os gusta (mar, montaña, pueblo, viñedos...) y os proponemos un par de opciones bonitas por la zona. Sin prisa, pero así lo vamos cerrando.

---

## Email 5 — Revisión de horarios generales (3 meses antes)

- **Nombre interno:** `PRE-05-horarios-generales`
- **Momento de envío:** automático, **boda − 90 días** (3 meses antes de {{fecha_boda}}).
- **Objetivo:** obtener el esqueleto horario del día para detectar a tiempo problemas de luz o de tiempos, cuando aún hay margen para ajustar.
- **Tono:** informativo.

**Asunto:** Tres meses: toca repasar los horarios del gran día

**Preheader:** Solo el esqueleto del día, nada definitivo todavía.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Quedan unos tres meses para el {{fecha_boda}} y este es el momento perfecto para repasar juntos los horarios generales del día. No hace falta que esté todo cerrado, solo el esqueleto:
>
> - ¿A qué hora es la ceremonia? (Tenemos anotada las {{hora_ceremonia}}; confirmadnos si sigue siendo así.)
> - ¿Dónde se prepara cada uno? ¿En el mismo sitio o en lugares distintos?
> - ¿La ceremonia y el banquete son en {{lugar_boda}} o hay traslado entre medias?
> - Aproximadamente, ¿a qué hora termina la fiesta?
>
> ¿Por qué os lo pedimos ahora y no el mes de antes? Porque con tres meses de margen todavía se puede ajustar algo si hace falta. A veces, mover la ceremonia media hora cambia por completo la luz que tendremos para vuestros retratos, y este es el momento de verlo con calma. También nos sirve para valorar si la ubicación permite volar el dron ese día — depende de los permisos de la zona y de las condiciones, así que cuanto antes lo miremos, mejor.
>
> Respondednos a este correo con lo que tengáis, aunque sean horarios aproximados. Lo revisamos y, si vemos algo que se pueda mejorar, os lo contamos.
>
> Un abrazo,
>
> {{nombre_fotografo}} y {{nombre_videografo}}

**CTA / acción recomendada:** responder al email con los horarios aproximados del día.

**Nota de personalización:** si ya conocemos la finca o el lugar, decirlo ("en {{lugar_boda}} hemos trabajado más veces y sabemos bien dónde está la mejor luz"). Da mucha tranquilidad. Si la boda es de tarde-noche o en una época con puesta de sol temprana, anticipar aquí la conversación sobre la luz.

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, ¡tres meses ya! Os hemos enviado un email para repasar los horarios generales del día: ceremonia, preparativos, traslados. Nada definitivo, solo el esqueleto. Con este margen aún podemos ajustar cosas para que la luz nos acompañe. ¿Nos lo miráis cuando podáis?

---

## Email 6 — Información importante de la boda (1 mes antes)

- **Nombre interno:** `PRE-06-info-importante`
- **Momento de envío:** automático, **boda − 30 días**.
- **Objetivo:** recopilar mediante formulario todos los datos prácticos y humanos del día: direcciones, personas clave, sorpresas, momentos imprescindibles.
- **Tono:** informativo.

**Asunto:** Un mes: necesitamos conoceros un poco más (10 minutos, prometido)

**Preheader:** Un formulario corto con todo lo que necesitamos para el gran día.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Queda un mes. Se nota ya, ¿verdad?
>
> Para preparar bien el día necesitamos que nos contéis algunas cosas, y para no marearos con veinte emails lo hemos reunido todo en un formulario que se rellena en unos diez minutos:
>
> {{link_formulario}}
>
> Os preguntamos cosas prácticas (direcciones exactas de los preparativos, teléfonos de contacto de ese día, datos de otros proveedores) y otras que nos importan aún más:
>
> - Quiénes son las personas clave de vuestra boda. Esa abuela que no se pierde detalle, el grupo de amigos de toda la vida. Queremos saber a quién no podemos perder de vista.
> - Si hay alguna sorpresa preparada. Tranquilos, somos tumbas. Pero necesitamos saberlo para estar en el sitio justo en el momento justo.
> - Si hay algún momento o detalle que os haga especial ilusión que quede recogido.
> - Y también si hay algo delicado que debamos conocer (una ausencia importante, alguien que prefiere no salir en fotos...). Nos ayuda a hacer las cosas con tacto.
>
> Intentad enviárnoslo durante la próxima semana o así; cuanto antes lo tengamos, con más calma lo preparamos todo.
>
> Un abrazo,
>
> {{nombre_fotografo}} y {{nombre_videografo}}

**CTA / acción recomendada:** rellenar el formulario en {{link_formulario}} en la semana siguiente.

**Nota de personalización:** si ya sabemos de alguna sorpresa o circunstancia especial, no hace falta tocar el email; mejor comentarla por teléfono. Si la pareja es de fuera de Catalunya y la boda es aquí, añadir una línea ofreciendo ayuda logística con la zona.

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, ¡queda un mes! Os hemos enviado por email un formulario cortito (unos 10 minutos) con todo lo que necesitamos saber para el gran día: direcciones, personas importantes, sorpresas si las hay... ¿Podéis rellenarlo esta semana? Así lo preparamos todo con calma. Aquí lo tenéis también: {{link_formulario}}

---

## Email 7 — Planning definitivo del día

- **Nombre interno:** `PRE-07-planning-definitivo`
- **Momento de envío:** automático, **boda − 21 días**.
- **Objetivo:** conseguir el horario cerrado del día (o la última versión disponible) para organizar la cobertura de foto y vídeo.
- **Tono:** informativo.

**Asunto:** ¿Nos pasáis el planning definitivo del día?

**Preheader:** Con el horario cerrado preparamos cada momento al detalle.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Ya estamos en la recta final, y nos toca pediros el planning definitivo del día: el horario cerrado con ceremonia, aperitivo, banquete, baile y todo lo que tengáis previsto entre medias.
>
> Si trabajáis con wedding planner o la finca os ha preparado un cronograma, basta con que nos lo reenviéis tal cual. Y si lo lleváis vosotros, un email con los horarios nos sirve perfectamente; no hace falta nada formal.
>
> ¿Para qué lo queremos tan al detalle? Con el planning delante, {{nombre_videografo}} y yo nos organizamos para que en cada momento cada uno esté donde tiene que estar: quién cubre qué durante los preparativos, dónde nos colocamos en la ceremonia, cuándo encajamos vuestros retratos sin robaros tiempo de la fiesta. Toda esa coordinación que el día de la boda no se ve, se decide ahora.
>
> Y si algún horario baila todavía, no pasa nada: enviadnos la versión que tengáis y nos avisáis si cambia algo.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** responder al email con el planning o reenviar el del wedding planner / finca.

**Nota de personalización:** si en el formulario del email 6 detectamos algo que afecta al planning (traslado largo, ceremonia muy tardía), mencionarlo aquí con una propuesta concreta.

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, cuando tengáis el planning definitivo del día (horarios de ceremonia, banquete, baile...), ¿nos lo pasáis? Si os lo ha hecho la finca o el wedding planner, reenviádnoslo tal cual y listo. Con eso nos organizamos {{nombre_videografo}} y yo para estar siempre donde hay que estar.

---

## Email 8 — Fotos de inspiración o referencias visuales

- **Nombre interno:** `PRE-08-inspiracion`
- **Momento de envío:** automático, **boda − 42 días** (antes del planning definitivo, para que dé tiempo a conversar sobre ello).
- **Objetivo:** conocer sus gustos visuales y alinear expectativas, dejando claro que las referencias orientan pero no se replican.
- **Tono:** informativo cercano.

**Asunto:** ¿Hay alguna foto que os haya robado el corazón?

**Preheader:** Vuestras referencias nos ayudan a conoceros mejor.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Hoy os pedimos algo distinto, y totalmente opcional: si tenéis fotos o vídeos de boda guardados que os encanten (de Pinterest, de Instagram, de la boda de unos amigos), nos haría ilusión verlos.
>
> Que no os engañe la palabra "inspiración": no os pedimos una lista de fotos para copiar. Nuestro trabajo es contar vuestra historia tal y como pase, no recrear la de otros. Pero ver lo que os emociona nos dice muchísimo de vosotros. Si guardáis imágenes de momentos espontáneos y abrazos, o luz de atardecer, o detalles pequeños, o blanco y negro... todo eso nos ayuda a mirar vuestro día con vuestros ojos.
>
> También vale lo contrario: si hay algo que no os gusta nada (esas fotos de grupo eternas, por ejemplo), decídnoslo igual. Saber lo que no queréis es tan útil como saber lo que sí.
>
> Podéis responder a este correo con enlaces, capturas o un tablero de Pinterest. Lo que os sea más cómodo.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** responder con enlaces, capturas o tablero de Pinterest (opcional).

**Nota de personalización:** si la pareja nos eligió por un reportaje concreto de nuestra web, mencionarlo ("recordamos que os enamoró la boda de la Costa Daurada; eso ya nos dice mucho"). Si no responden, no insistir: es opcional de verdad.

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, una pregunta sin compromiso: ¿tenéis guardadas fotos o vídeos de boda que os encanten? ¿De Pinterest, Instagram, donde sea? No es para copiarlas, es que ver lo que os emociona nos ayuda a contar vuestro día con vuestros ojos. Si tenéis algo, pasádnoslo por aquí mismo.

---

## Email 9 — Consejos para preparativos, luz, horarios y momentos importantes

- **Nombre interno:** `PRE-09-consejos-gran-dia`
- **Momento de envío:** automático, **boda − 15 días**.
- **Objetivo:** compartir los consejos prácticos que más mejoran el resultado final (orden en los preparativos, luz, tiempos realistas), desde la experiencia y sin imponer nada.
- **Tono:** informativo cercano.

**Asunto:** Pequeños detalles que hacen grandes recuerdos

**Preheader:** Lo que hemos aprendido boda a boda, resumido para vosotros.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Después de muchas bodas hay cosas que hemos visto repetirse una y otra vez: detalles pequeños que mejoran muchísimo tanto el día como el recuerdo que queda de él. Os los dejamos por aquí. No son deberes; tomad lo que os sirva.
>
> **Los preparativos, con luz natural si se puede.** Una habitación con ventana grande cambia por completo las fotos de ese momento. Si podéis elegir dónde os arregláis, elegid luz.
>
> **Un poco de orden en la habitación de los preparativos.** No hace falta que esté impecable, pero las maletas abiertas y las perchas de plástico acaban saliendo en las fotos. Cinco minutos de despeje hacen milagros. Y si queréis que fotografiemos los detalles (invitaciones, anillos, perfume, zapatos), tenedlos a mano en una cajita.
>
> **Tiempos con margen.** El consejo más valioso que podemos daros: añadid quince minutos de colchón a cada cosa. Las bodas que se viven con calma se notan, en el ambiente y en las imágenes.
>
> **Vuestros retratos, mejor cerca del atardecer.** Es la luz más bonita del día y solo necesitamos veinte o treinta minutos. Lo encajaremos en el planning para que apenas os separe de los vuestros.
>
> **Las fotos de grupo, mejor con lista.** Si nos pasáis una lista corta de los grupos que queréis (familias, amigos, compañeros), las resolvemos en un momento y nadie se pasa el aperitivo posando.
>
> **Y el día D: olvidaos de nosotros.** En serio. No busquéis la cámara, no preguntéis si salió bien. Estaremos en todo, sin invadir nada. Vosotros solo tenéis que vivirlo.
>
> Si queréis que repasemos juntos cualquiera de estos puntos, una llamada y lo vemos.
>
> Un abrazo,
>
> {{nombre_fotografo}} y {{nombre_videografo}}

**CTA / acción recomendada:** preparar la lista de fotos de grupo y enviarla respondiendo a este correo. Llamada opcional para repasar dudas.

**Nota de personalización:** adaptar el consejo de los retratos a la hora real de la puesta de sol en {{fecha_boda}} y a la logística de {{lugar_boda}}. Si hay dron previsto, añadir una línea: "si las condiciones y los permisos lo permiten, ese rato del atardecer también suele ser el mejor momento para las imágenes aéreas".

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, os hemos enviado un email con los consejos que más mejoran las fotos y el recuerdo del día: luz en los preparativos, márgenes en los horarios, la lista de fotos de grupo... Son 2 minutos de lectura y de verdad que marcan diferencia. Cualquier duda, llamada y lo repasamos juntos.

---

## Email 10 — Confirmación final (1 semana antes)

- **Nombre interno:** `PRE-10-confirmacion-final`
- **Momento de envío:** automático, **boda − 7 días**.
- **Objetivo:** confirmar los datos clave del día, recordar cómo localizarnos y transmitir que todo está bajo control.
- **Tono:** informativo tranquilizador.

**Asunto:** Una semana. Por nuestra parte, todo listo.

**Preheader:** Repaso final en dos minutos y a disfrutar de la semana.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Una semana. Qué rápido ha pasado todo, ¿no?
>
> Os escribimos para el repaso final. Esto es lo que tenemos anotado; echadle un vistazo y decidnos si hay algún cambio:
>
> - **Fecha:** {{fecha_boda}}
> - **Ceremonia:** {{hora_ceremonia}} en {{lugar_boda}}
> - **Preparativos:** en las direcciones y horas que nos pasasteis en el formulario
>
> Si todo sigue igual, basta con un "todo correcto" de respuesta. Si algo ha cambiado, aunque sea media hora o un detalle pequeño, contádnoslo y lo ajustamos sin problema.
>
> Por nuestra parte: equipo revisado, copias de seguridad preparadas, planning estudiado y la agenda de ese día entera para vosotros, como siempre. {{nombre_videografo}} y yo llegaremos con tiempo de sobra a los preparativos.
>
> Para cualquier cosa de aquí al gran día, este es mi móvil personal: {{telefono_contacto}}. Guardadlo y compartidlo con alguien de confianza (testigo, hermana, wedding planner) por si ese día hay que localizarnos y vosotros estáis, como debe ser, a otra cosa.
>
> Disfrutad mucho de esta última semana.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** responder confirmando los datos o indicando cambios. Guardar y compartir el teléfono de contacto con una persona de confianza.

**Nota de personalización:** verificar los datos reales antes del envío (este email no debe salir con datos desactualizados; si el CRM no está al día, mejor retenerlo y enviarlo a mano). Si la previsión meteorológica es incierta, añadir una línea tranquilizadora sobre el plan B.

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, ¡una semana! Repaso rápido: {{fecha_boda}}, ceremonia a las {{hora_ceremonia}} en {{lugar_boda}}. ¿Sigue todo igual? Por nuestra parte está todo listo. Guardad mi móvil ({{telefono_contacto}}) y pasádselo a alguien de confianza para el día D. ¡A disfrutar de la semana!

---

## Email 11 — Mensaje emocional 1–2 días antes

- **Nombre interno:** `PRE-11-vispera`
- **Momento de envío:** automático, **boda − 1 día** (idealmente la víspera por la mañana; si se prefiere más margen, boda − 2).
- **Objetivo:** ninguno operativo. Calmar nervios, generar ilusión y cerrar la etapa preboda con un mensaje puramente humano.
- **Tono:** emocional. Sin ninguna petición.

**Asunto:** Ya casi está aquí

**Preheader:** Solo unas líneas antes del gran día.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> No os escribimos para pedir nada ni confirmar nada. Eso ya está hecho. Os escribimos porque mañana es el día, y antes de una boda siempre nos apetece decirle un par de cosas a la pareja.
>
> La primera: va a salir bien. Y si algo pequeño se tuerce — un brindis que se alarga, una lluvia de cinco minutos, un niño que llora en la ceremonia — también estará bien, porque esas cosas acaban siendo las anécdotas que se cuentan durante años. Las bodas perfectas no existen; las bodas inolvidables, sí.
>
> La segunda: mañana no tenéis ningún trabajo que hacer con nosotros. No hay que posar, no hay que estar pendientes, no hay que "salir bien". Estaremos cerca todo el día, cuidando cada momento sin que se note, y la cámara va a quereros tal y como seáis. Es nuestra única boda, lo sabéis: estamos enteros para vosotros.
>
> Descansad esta noche lo que podáis (o lo que os dejen los nervios, que también es parte del ritual). Mañana nos vemos.
>
> Qué ganas.
>
> {{nombre_fotografo}} y {{nombre_videografo}}

**CTA / acción recomendada:** ninguna. Este email no pide nada deliberadamente; cualquier petición rompería su función.

**Nota de personalización:** es el email donde una frase personal vale oro. Si sabemos algo del día (la sorpresa que prepara uno de los dos, el lugar especial de la ceremonia), una referencia velada y cómplice lo convierte en inolvidable. Si hay confianza, puede sustituirse por una nota de voz de WhatsApp: el efecto es aún mayor.

**Versión WhatsApp:**

> {{nombre_pareja}}, mañana es el día. Solo queríamos deciros una cosa: va a salir bien, y no tenéis que hacer nada con nosotros, solo vivirlo. Nosotros estaremos en todo sin que se note. Descansad lo que os dejen los nervios. Qué ganas. {{nombre_fotografo}} y {{nombre_videografo}}.

---

# PARTE 2 — POSTBODA

---

## Email 12 — Gracias al día siguiente

- **Nombre interno:** `POST-12-gracias`
- **Momento de envío:** automático, **boda + 1 día** (media tarde, no temprano), pero **revisándolo antes de enviar** para añadir un detalle real del día.
- **Objetivo:** agradecer la confianza, alargar la emoción del día y dejar claro que sus recuerdos ya están a salvo.
- **Tono:** emocional.

**Asunto:** Lo de ayer fue muy bonito

**Preheader:** Gracias por dejarnos vivirlo tan de cerca.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Imaginamos que hoy es día de resaca emocional: de repasar el día a cámara lenta, de mensajes que no paran de llegar, de "¿te acuerdas de cuando...?". Disfrutad de eso, que también es parte de la boda.
>
> Nosotros solo queríamos daros las gracias. Por la confianza, por cómo nos tratasteis a nosotros y al equipo, y por dejarnos vivir vuestro día tan de cerca. Hay bodas que se trabajan y bodas que se disfrutan, y la vuestra fue claramente de las segundas.
>
> Y un mensaje para vuestra tranquilidad: todo el material de ayer está ya a buen recaudo, con sus copias de seguridad hechas. Vuestros recuerdos están a salvo. En los próximos días os escribiremos para contaros cómo va el proceso de selección y edición, así que de momento no tenéis que hacer nada más que descansar y seguir celebrando.
>
> Un abrazo enorme a los dos,
>
> {{nombre_fotografo}} y {{nombre_videografo}}

**CTA / acción recomendada:** ninguna. Solo descansar.

**Nota de personalización:** **imprescindible** añadir una frase sobre un momento real del día ("lo del discurso de tu padre nos dejó a todos tocados", "el baile sorpresa fue de lo mejor que hemos visto este año"). Es la diferencia entre un email que emociona y uno que se nota automático. Por eso este email se revisa siempre antes de salir.

**Versión WhatsApp:**

> {{nombre_pareja}}, ¡gracias por lo de ayer! Fue un día precioso y nos lo pusisteis facilísimo. Todo el material está ya a salvo con sus copias de seguridad, así que solo os toca descansar y seguir celebrando. En unos días os contamos cómo va el proceso. Un abrazo enorme de parte de los dos.

---

## Email 13 — Estamos trabajando en la selección y edición

- **Nombre interno:** `POST-13-en-proceso`
- **Momento de envío:** automático, **boda + 7 días** (ampliable a +10).
- **Objetivo:** cubrir el silencio natural de las semanas de edición: explicar qué estamos haciendo, gestionar expectativas de plazos con prudencia y mantener la ilusión.
- **Tono:** informativo cálido.

**Asunto:** Vuestra boda, en nuestras pantallas

**Preheader:** Os contamos en qué punto está vuestro reportaje.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Os escribimos para que sepáis qué está pasando con vuestro reportaje, porque sabemos que estas semanas de espera se hacen largas y el silencio nunca es agradable.
>
> Ahora mismo estamos en plena fase de selección: repasar una a una todas las imágenes del día, quedarnos con las que cuentan la historia y empezar a editarlas con el cuidado que merecen. {{nombre_videografo}} está haciendo lo mismo con el material de vídeo. Es la parte más lenta de nuestro trabajo y también la que más nos gusta, porque es donde volvemos a vivir vuestra boda, esta vez sin prisa.
>
> Os adelantamos cómo irán las entregas: primero recibiréis un avance con una pequeña selección, para que no tengáis que esperar al reportaje completo para revivir el día. Después llegará la galería completa y, más adelante, el vídeo y el álbum, según el servicio contratado. De cada entrega os avisaremos nosotros, así que no hace falta que estéis pendientes.
>
> Editamos cada boda con el mismo mimo con el que la fotografiamos, y eso lleva su tiempo. Pero os prometemos que la espera valdrá la pena.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** ninguna acción; solo informar. Invitar a escribir si tienen cualquier duda.

**Nota de personalización:** si durante la selección ya ha aparecido alguna imagen especial, insinuarlo sin enseñarla ("hay una foto del primer baile que nos tiene enamorados; pronto la veréis"). Genera ilusión sin comprometer plazos.

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, ¡noticias! Estamos ya metidos de lleno en la selección y edición de vuestra boda. Es la parte más lenta pero también la más bonita de nuestro trabajo. Pronto os llegará un avance para ir abriendo boca, y después el resto de entregas. Os vamos avisando nosotros, tranquilos.

---

## Email 14 — Entrega del avance (sneak peek)

- **Nombre interno:** `POST-14-sneak-peek`
- **Momento de envío:** **manual**, en cuanto el avance esté listo (o disparado por cambio de estado en el CRM). Nunca por fecha fija.
- **Objetivo:** entregar las primeras imágenes, provocar el primer reencuentro emocional con el día y, de paso, alimentar las ganas del reportaje completo.
- **Tono:** emocional.

**Asunto:** Las primeras fotos de vuestra boda ya están aquí

**Preheader:** Un pequeño adelanto mientras terminamos el resto.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Hoy es un buen día: ya tenéis aquí las primeras fotos de vuestra boda.
>
> {{link_galeria}}
>
> Es solo un adelanto, una pequeña selección de momentos mientras seguimos trabajando en el reportaje completo. Pero no es una selección cualquiera: son algunas de las imágenes que más nos han emocionado al editarlas, y queríamos que las tuvierais cuanto antes.
>
> Un consejo de los que sabemos por experiencia: veladlas juntos, con calma, sin nadie más delante la primera vez. Ese primer visionado solo pasa una vez.
>
> Podéis compartirlas con quien queráis: familia, amigos, redes. Son vuestras. Si las subís a algún sitio y os apetece etiquetarnos, nos hará ilusión, pero solo si os nace.
>
> El resto del reportaje sigue su camino y os avisaremos en cuanto esté. Mientras tanto, esperamos que estas primeras fotos os devuelvan ahí, aunque sea un rato.
>
> Un abrazo,
>
> {{nombre_fotografo}} y {{nombre_videografo}}

**CTA / acción recomendada:** ver el avance en {{link_galeria}}, idealmente juntos. Compartir si les apetece.

**Nota de personalización:** mencionar una de las fotos del avance en concreto ("la de la mirada durante los votos era obligatoria en esta selección"). Si hubo dron y hay alguna toma aérea en el avance, es buen momento para destacarla.

**Versión WhatsApp:**

> {{nombre_pareja}}... ya están aquí las primeras fotos de vuestra boda: {{link_galeria}}. Es solo un adelanto mientras terminamos el resto, pero queríamos que lo tuvierais ya. Consejo: vedlas juntos y con calma la primera vez. Ya nos contaréis. Un abrazo de los dos.

---

## Email 15 — Entrega de la galería online completa

- **Nombre interno:** `POST-15-galeria`
- **Momento de envío:** **manual**, al publicar la galería completa (o por cambio de estado en el CRM).
- **Objetivo:** entregar el reportaje completo. Es uno de los momentos cumbre de toda la experiencia: el email debe estar a la altura.
- **Tono:** emocional.

**Asunto:** Vuestra boda, completa. Ya podéis volver a vivirla.

**Preheader:** El reportaje entero os está esperando en vuestra galería.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Ya está. Vuestra galería completa está lista, y con ella cerramos una de las partes más bonitas de nuestro trabajo: la de revivir vuestra boda imagen a imagen para elegir y cuidar cada una de las que ahora vais a ver.
>
> {{link_galeria}}
>
> Dentro está el día entero: los nervios de los preparativos, las caras de los vuestros en la ceremonia, lo que pasaba en las mesas cuando no mirabais, el baile, los abrazos. Hay fotos que esperáis y otras que no, porque recogen momentos que vosotros no pudisteis ver. Esas suelen ser las favoritas.
>
> Otro consejo de los nuestros: no la veáis con prisa. Buscad un rato tranquilo, poneos cómodos, incluso ponedle música. Algunas parejas nos han contado que la vieron en la tele del salón con una copa de vino, como un estreno privado. Nos parece un plan perfecto.
>
> En un par de días os enviaremos un email corto con todo lo práctico: cómo descargar las fotos en alta calidad, cómo compartir la galería con la familia y cómo guardarlo todo a buen recaudo. Hoy no toca lo práctico. Hoy toca disfrutar.
>
> Esperamos de corazón que la sintáis vuestra.
>
> Un abrazo,
>
> {{nombre_fotografo}} y {{nombre_videografo}}

**CTA / acción recomendada:** ver la galería completa en {{link_galeria}} con calma.

**Nota de personalización:** indicar el número aproximado de fotografías si queda natural. Mencionar algún bloque especial de la galería ("no os perdáis la parte del aperitivo: vuestros amigos dieron mucho juego").

**Versión WhatsApp:**

> {{nombre_pareja}}, llegó el día: vuestra galería completa ya está lista. {{link_galeria}} — Está el día entero, incluidos muchos momentos que no pudisteis ver. Buscad un rato tranquilo para verla juntos, sin prisa. En un par de días os mando lo práctico (descargas, copias...). Hoy, solo disfrutadla.

---

## Email 16 — Cómo descargar, compartir y guardar las fotos

- **Nombre interno:** `POST-16-descargas`
- **Momento de envío:** automático, **entrega de galería + 2 días**.
- **Objetivo:** explicar lo práctico (descarga, compartir, copias de seguridad) y reducir las consultas de soporte, separándolo del momento emocional de la entrega.
- **Tono:** informativo.

**Asunto:** Vuestras fotos, bien guardadas para siempre

**Preheader:** Cómo descargarlas, compartirlas y no perderlas jamás.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Ahora que ya habéis podido ver la galería (esperamos que con el ritual completo de sofá y calma), va el email práctico que os prometimos.
>
> **Para descargar las fotos.** Entrad en {{link_galeria}} y usad el botón de descarga. Podéis bajar la galería completa de una vez, en alta calidad, o fotos sueltas si lo preferís. Las imágenes que recibís no llevan marca de agua y vienen listas para imprimir.
>
> **Para compartir.** Podéis enviar el enlace de la galería a familia y amigos para que la vean y descarguen las fotos donde ellos salen. Os recomendamos pasarlo solo a las personas que queráis: el enlace da acceso a todo el reportaje.
>
> **Para guardarlas bien (esta parte es importante).** Os pedimos cinco minutos para hacer esto cuanto antes:
>
> 1. Descargad la galería completa en al menos dos sitios distintos: por ejemplo, el ordenador y un disco duro externo.
> 2. Si usáis algún servicio en la nube, subid ahí una tercera copia.
> 3. No dejéis la galería online como único almacén: estará disponible una buena temporada, pero no es un archivo para toda la vida.
>
> Sabemos que suena exagerado, pero los discos fallan y los móviles se pierden, y estas fotos son de las cosas que no se pueden volver a hacer. Dos copias hoy os ahorran un disgusto enorme algún día.
>
> Y si algo no funciona o no os aclaráis con la descarga, escribidnos o llamadnos al {{telefono_contacto}} y os echamos una mano en un momento.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** descargar la galería completa y hacer al menos dos copias de seguridad esta semana.

**Nota de personalización:** ajustar las instrucciones a la plataforma de galería que usemos realmente (botones y pasos exactos). Si su servicio incluye álbum, añadir una línea anticipando el siguiente email ("la semana que viene os escribimos para empezar con el álbum").

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, recordatorio práctico: descargad la galería completa en alta calidad ({{link_galeria}}) y guardadla en dos sitios distintos (ordenador + disco duro, por ejemplo). La galería online estará disponible una buena temporada, pero no como archivo para siempre. Cinco minutos hoy y recuerdos a salvo para toda la vida. ¿Dudas? Aquí estamos.

---

## Email 17 — Selección de fotografías para el álbum

- **Nombre interno:** `POST-17-seleccion-album`
- **Momento de envío:** automático, **entrega de galería + 10 días** (orientativo: 1–2 semanas). **Solo para parejas con álbum contratado.**
- **Objetivo:** explicar cómo funciona la selección de fotos para el álbum y ponérselo fácil, ofreciendo ayuda si la elección se les hace cuesta arriba.
- **Tono:** informativo cercano.

**Asunto:** Toca elegir: las fotos que vivirán en vuestro álbum

**Preheader:** Os explicamos cómo hacer la selección sin volverse locos.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Ahora que ya habéis vivido (y revivido) la galería, toca dar el siguiente paso: elegir las fotografías de vuestro álbum.
>
> El álbum es otra cosa. La galería es el archivo completo del día; el álbum es el objeto que estará en casa, el que sacaréis cuando vengan visitas y el que dentro de muchos años alguien abrirá preguntando "¿y esto?". Por eso merece una selección pensada.
>
> Cómo funciona:
>
> 1. Entrad en la galería ({{link_galeria}}) y marcad como favoritas las fotos que queráis en el álbum.
> 2. No hace falta que afinéis al número exacto: con una preselección nos vale. Nosotros os ayudamos a cerrar la selección final para que el álbum respire bien.
> 3. Cuando terminéis, respondednos a este correo y nos ponemos con el diseño.
>
> Dos consejos de los que damos siempre: elegid pensando en la historia completa del día, no solo en las fotos donde salís más favorecidos (las de vuestra gente riendo valen oro en un álbum). Y no os agobiéis con la elección: si os atascáis, decídnoslo y os preparamos nosotros una propuesta de selección como punto de partida. Lo hacemos a menudo y funciona muy bien.
>
> Tomáoslo con calma, no hay prisa ninguna. El álbum estará igual de bien hecho empecemos cuando empecemos.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** marcar favoritas en {{link_galeria}} y avisar al terminar; o pedir que preparemos nosotros una propuesta de selección.

**Nota de personalización:** indicar el número orientativo de fotos según el álbum contratado. Si pasadas unas semanas no hay respuesta, un recordatorio suave por WhatsApp (no insistir por email).

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, ¡empezamos con el álbum! Es fácil: entrad en la galería ({{link_galeria}}) y marcad como favoritas las fotos que queráis dentro. No hace falta afinar el número, con una preselección nos apañamos. Y si la elección se os hace un mundo, decidlo y os preparamos nosotros una propuesta. Sin prisa ninguna.

---

## Email 18 — Revisión del diseño del álbum

- **Nombre interno:** `POST-18-diseno-album`
- **Momento de envío:** **manual**, cuando el diseño del álbum esté listo para revisión.
- **Objetivo:** presentar la propuesta de diseño, explicar cómo revisarla y dejar claro que pueden pedir cambios con total libertad.
- **Tono:** informativo cercano.

**Asunto:** El diseño de vuestro álbum está listo para que le deis el visto bueno

**Preheader:** Miradlo con calma y contadnos qué cambiaríais.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Buenas noticias: el diseño de vuestro álbum ya está listo, y nos hace especial ilusión enseñároslo.
>
> {{link_album}}
>
> Lo hemos maquetado pensando en cómo se vivió el día: las páginas siguen la historia de principio a fin, con aire entre las fotos para que cada momento respire. Veréis que algunas imágenes ocupan página completa o doble página: son las que, a nuestro juicio, sostienen el peso emocional del álbum. Pero el criterio final es el vuestro.
>
> Cómo revisarlo:
>
> - Miradlo con calma, mejor en pantalla grande que en el móvil.
> - Apuntad cualquier cambio: una foto que queráis sustituir, otra que falte, un orden distinto. Pedid cambios con total libertad, que para eso está esta fase: no se imprime nada hasta que vosotros digáis "este es".
> - Respondednos a este correo con vuestros comentarios, o con vuestro visto bueno si os convence tal cual.
>
> Cuando lo aprobéis, lo enviamos a producción. La fabricación artesanal lleva su tiempo — os iremos informando — pero merece cada día de espera: el álbum llega para quedarse muchos años.
>
> Un abrazo,
>
> {{nombre_fotografo}}

**CTA / acción recomendada:** revisar el diseño en {{link_album}} y responder con cambios o visto bueno.

**Nota de personalización:** señalar una decisión concreta de diseño ("la doble página del primer baile era innegociable para nosotros"). Si hay segunda ronda de cambios, gestionarla con la misma paciencia: el cliente debe sentir libertad real de pedir ajustes.

**Versión WhatsApp:**

> {{nombre_pareja}}, ¡el diseño de vuestro álbum está listo! Podéis verlo aquí: {{link_album}}. Miradlo con calma (mejor en pantalla grande) y decidnos cualquier cambio: fotos, orden, lo que sea. No se imprime nada sin vuestro visto bueno. Cuando nos digáis "este es", lo mandamos a producción.

---

## Email 19 — Entrega final del vídeo

- **Nombre interno:** `POST-19-video`
- **Momento de envío:** **manual**, al publicar el vídeo final.
- **Objetivo:** entregar el vídeo de boda. Junto con la galería, el otro gran momento cumbre: máxima carga emocional.
- **Tono:** emocional.

**Asunto:** Vuestra película ya está lista

**Preheader:** El día entero, en movimiento y con sonido. Preparad pañuelos.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Hoy escribe {{nombre_videografo}}, que para una vez que me dejan el email, lo aprovecho: vuestro vídeo de boda está terminado.
>
> {{link_galeria}}
>
> Las fotos congelan los momentos; el vídeo os los devuelve enteros. Vais a volver a escuchar los votos, los discursos, la canción de vuestro baile, la risa de la gente que más queréis. He montado cada escena escuchando vuestro día una y otra vez, eligiendo las palabras y la música que mejor cuentan lo que pasó. Hay vídeos que se editan y vídeos que se viven editándolos. El vuestro fue de los segundos.
>
> El ritual de visionado, esta vez sí o sí: pantalla grande, buen sonido (el audio es la mitad de la emoción), luces bajas y el móvil lejos. Y los pañuelos a mano, que tenemos estadísticas al respecto.
>
> Podéis compartirlo con quien queráis y descargarlo para guardarlo bien, igual que hicisteis con las fotos: un par de copias en sitios distintos.
>
> Esperamos vuestra reacción. De verdad: contadnos cómo ha sido verlo, que esa respuesta es de lo mejor de este trabajo.
>
> Un abrazo,
>
> {{nombre_videografo}} (y {{nombre_fotografo}}, que anda cerca)

**CTA / acción recomendada:** ver el vídeo con el "ritual" completo y contarnos la reacción. Descargar y hacer copias.

**Nota de personalización:** mencionar un elemento concreto del montaje (la canción elegida, un audio de los votos, un discurso que estructura el vídeo). Si hubo tomas de dron, aludir a ellas aquí con naturalidad ("las imágenes aéreas de {{lugar_boda}} le dan un aire de película; ese día las condiciones nos lo pusieron fácil").

**Versión WhatsApp:**

> {{nombre_pareja}}, aviso importante de {{nombre_videografo}}: vuestro vídeo está listo. {{link_galeria}} — Instrucciones: pantalla grande, buen sonido, luces bajas y pañuelos a mano (en serio). Vais a volver a escuchar los votos, los discursos, vuestra canción... Ya me contaréis, que esa llamada es de lo mejor de mi trabajo.

---

## Email 20 — Cierre de experiencia y agradecimiento

- **Nombre interno:** `POST-20-cierre`
- **Momento de envío:** automático, **última entrega + 10 días** (vídeo o álbum físico, lo que llegue más tarde).
- **Objetivo:** cerrar formalmente la experiencia, agradecer de corazón y dejar la puerta abierta para el futuro (postboda, otras sesiones, recomendaciones).
- **Tono:** emocional.

**Asunto:** Esto no es una despedida (pero casi)

**Preheader:** Unas últimas palabras ahora que ya lo tenéis todo.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Con todo ya entregado, nos toca escribir el email que más nos cuesta: el del final.
>
> Habéis sido de esas parejas que hacen que este oficio tenga sentido. Desde la primera reunión hasta el último abrazo de la boda, todo ha sido fácil y bonito con vosotros, y eso no pasa siempre. Cuando decimos que solo hacemos una boda por día para poder cuidar cada historia, hablamos exactamente de esto: de poder vivir lo vuestro como lo hemos vivido.
>
> Antes de cerrar, tres cosas:
>
> Si os quedó alguna espinita de fotos pendientes — o simplemente os apetece volver a poneros delante de nuestra cámara con calma, sin horarios ni invitados — existe la sesión postboda: con otro look, en otro lugar, incluso dentro del mar si os atrevéis. Si algún día os apetece, aquí estamos.
>
> Si alguna pareja amiga anda buscando fotógrafo y videógrafo, podéis darles nuestro contacto con confianza. Que nos llegue una pareja de vuestra parte es el mejor cumplido posible.
>
> Y aunque el trabajo termine, nosotros no desaparecemos: para cualquier cosa que necesitéis de vuestras fotos o vuestro vídeo, ahora o dentro de cinco años, escribidnos. Seguimos aquí.
>
> Gracias por todo, de corazón. Ha sido un regalo acompañaros.
>
> Un abrazo muy fuerte,
>
> {{nombre_fotografo}} y {{nombre_videografo}}
> Lifetime Weddings

**CTA / acción recomendada:** ninguna obligatoria. Puerta abierta a la sesión postboda y a recomendarnos.

**Nota de personalización:** el segundo párrafo debe reescribirse con algo real de la pareja siempre que se pueda. Es el email de despedida: si suena a plantilla, estropea todo lo construido.

**Versión WhatsApp:**

> {{nombre_pareja}}, con todo ya entregado, solo nos queda daros las gracias de verdad. Habéis sido de esas parejas que hacen que este trabajo valga la pena. Recordad que existe la sesión postboda si os quedáis con ganas de más, y que para cualquier cosa de vuestras fotos o vídeo, ahora o en cinco años, aquí seguimos. Un abrazo enorme de los dos.

---

## Email 21 — Petición de reseña de Google

- **Nombre interno:** `POST-21-resena`
- **Momento de envío:** automático, **email de cierre + 4 días** (con la emoción de las entregas aún fresca, pero sin mezclarlo con la despedida).
- **Objetivo:** conseguir una reseña en Google de forma natural, sin presión y explicando honestamente por qué importa.
- **Tono:** cercano, honesto, sin presión.

**Asunto:** Un favor pequeño que para nosotros es enorme

**Preheader:** Cinco minutos vuestros que ayudan a otras parejas a encontrarnos.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Os prometemos que este es de los últimos emails, y viene con una petición. Sin compromiso ninguno, de verdad: si no os apetece o no tenéis el momento, no pasa absolutamente nada.
>
> Somos un equipo pequeño y familiar, y no invertimos en grandes campañas: las parejas nos encuentran sobre todo por recomendaciones y por lo que otras parejas cuentan de nosotros en Google. Por eso, una reseña vuestra nos ayuda más de lo que parece.
>
> Si os animáis, son cinco minutos: contad cómo ha sido la experiencia con vuestras palabras. Lo que les diríais a unos amigos que estuvieran dudando: cómo os sentisteis el día de la boda, qué os parecieron las fotos y el vídeo, cómo fue el trato. Eso es exactamente lo que otra pareja necesita leer para decidirse.
>
> Podéis dejarla buscando "Lifetime Weddings" en Google, o escribidnos y os pasamos el enlace directo para que sea aún más fácil.
>
> Y si lo hacéis, avisadnos, que nos hace ilusión leerla. Las leemos todas, varias veces, y alguna ha caído en momento sensible y ha emocionado más de la cuenta.
>
> Gracias por adelantado, sea cual sea la respuesta.
>
> Un abrazo,
>
> {{nombre_fotografo}} y {{nombre_videografo}}

**CTA / acción recomendada:** dejar reseña en Google (incluir enlace directo al perfil de Google Business en la automatización si es posible).

**Nota de personalización:** si la pareja ya nos elogió por algún canal (un WhatsApp emocionado tras ver el vídeo, por ejemplo), referenciarlo con humor suave ("aquel audio que nos mandasteis tras ver el vídeo, tal cual, ya sería una reseña perfecta"). No enviar nunca más de un recordatorio, y mejor por WhatsApp.

**Versión WhatsApp:**

> Hola {{nombre_pareja}}, un favor pequeño (y sin compromiso, de verdad): ¿os animáis a dejarnos una reseña en Google? Somos un equipo pequeño y lo que las parejas cuentan de nosotros es nuestra mejor carta de presentación. Cinco minutos, con vuestras palabras. Os paso el enlace directo si os va bien. ¡Gracias por adelantado!

---

## Email 22 — Aniversario, un año después

- **Nombre interno:** `POST-22-aniversario`
- **Momento de envío:** automático, **boda + 365 días** (el primer aniversario de {{fecha_boda}}, por la mañana).
- **Objetivo:** felicitar el aniversario, reactivar el recuerdo y la relación, y abrir con suavidad la puerta a futuras sesiones. Sin venta agresiva.
- **Tono:** emocional.

**Asunto:** Hoy hace un año

**Preheader:** Felicidades, {{nombre_pareja}}. Nosotros tampoco lo hemos olvidado.

**Cuerpo:**

> Hola, {{nombre_pareja}}:
>
> Hoy hace exactamente un año estabais en {{lugar_boda}}, probablemente con los nervios a flor de piel y sin saber aún que el día iba a salir tan bonito como salió. Nosotros sí nos acordamos: vuestra fecha es de esas que se quedan en el calendario para siempre.
>
> Feliz primer aniversario.
>
> Hoy es el día perfecto para recuperar un ritual: abrid la galería, poned el vídeo, descorchad algo. Veréis que las fotos han cambiado, aunque sean las mismas; un año después se miran distinto, y cada año que pase se mirarán mejor. Esa es la gracia de todo esto.
>
> No os escribimos para venderos nada. Solo queríamos que supierais que nos acordamos de vosotros y que os deseamos un día muy feliz. Aunque, ya que estamos, dejamos caer una idea por si algún día apetece: hay parejas que celebran los aniversarios con una sesión tranquila, ellos dos solos, para ir sumando capítulos al álbum de su historia. Si alguna vez os pica el gusanillo, ya sabéis dónde estamos.
>
> Que lo celebréis mucho y bien.
>
> Un abrazo muy fuerte,
>
> {{nombre_fotografo}} y {{nombre_videografo}}
> Lifetime Weddings

**CTA / acción recomendada:** ninguna obligatoria; rever la galería y el vídeo. Puerta abierta a sesión de aniversario.

**Nota de personalización:** si hay alguna foto emblemática de su boda, adjuntarla o enlazarla en el email ("os dejamos aquí nuestra favorita, por si queréis empezar el día con ella"). Si sabemos que han sido padres o ha habido un cambio vital, adaptar el mensaje: es lo que convierte este email en uno que se guarda.

**Versión WhatsApp:**

> {{nombre_pareja}}... ¿sabéis qué día es hoy, verdad? Un año ya. Feliz aniversario de parte de {{nombre_fotografo}} y {{nombre_videografo}}. Hoy toca ritual: galería, vídeo y algo que descorchar. Veréis que un año después las fotos se miran distinto (mejor). Que lo celebréis mucho. Un abrazo enorme de los dos.

---

## Notas finales de implementación

1. **Dónde automatizar.** Toda la secuencia puede montarse en el CRM de estudio
   (workflows de Fotostudio o equivalente) usando los anclajes de la tabla
   resumen: `reserva + X` y `boda − X / boda + X` para los emails con fecha
   conocida (1–13, 16–17, 20–22), y cambio de estado del proyecto o envío
   manual para los que dependen de una entrega real (14, 15, 18, 19). Si la
   herramienta solo admite un tipo de anclaje, priorizar `boda − X` para los
   operativos (5–11) y disparar los de arranque (1 y 2) desde el alta del
   proyecto.
2. **Emails que se revisan a mano antes de salir aunque estén automatizados:**
   el 10 (verificar datos reales), el 12 (añadir el detalle del día) y el 20
   (personalizar la despedida). Son los tres donde una plantilla sin retocar
   se nota más.
3. **Equilibrio de tonos.** La secuencia alterna deliberadamente: los emails
   operativos (4–7, 10, 16) van al grano con calidez; los de momentos cumbre
   (1, 11, 12, 14, 15, 19, 20, 22) priorizan la emoción y piden poco o nada.
   No convertir los informativos en emocionales ni al revés: el contraste es
   lo que hace creíble la voz.
4. **WhatsApp como complemento, no duplicado.** Las versiones cortas sirven
   para avisar de que ha llegado un email importante, para recordatorios
   suaves (4, 17, 21) o para los momentos de máxima emoción (11, 14, 19),
   donde el canal cercano multiplica el efecto. No enviar sistemáticamente
   email + WhatsApp con todo: cansa.
5. **Si la boda se contrata con poca antelación** (menos de 3 meses), fusionar:
   1+2 en un solo email, 5+6 en otro, y mantener intactos del 7 en adelante.
6. **Revisar la secuencia una vez al año** con las preguntas reales que sigan
   llegando de las parejas: cada duda repetida es un párrafo que falta en
   alguno de estos emails.
