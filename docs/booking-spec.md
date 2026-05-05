# Lifetime Weddings — Sistema de reserva · Fase 1
## Especificación: wireframe + copy + emails

---

## 0. Resumen estratégico

La página de reserva es lo que la pareja recibe **en lugar de un PDF de presupuesto**. Cuando preparas la propuesta para una pareja, generas su URL única (ej. `lifetime.photo/reserva/laura-marc-2026-x7k2`), se la envías por WhatsApp o email, y desde ahí ellos ven la propuesta completa, leen las preguntas habituales, y reservan en una sola sesión.

**Función estratégica de la página:**
1. Reforzar el valor (no solo el precio).
2. Anticipar y resolver objeciones antes de que las verbalicen.
3. Crear sensación de proceso profesional cuidado.
4. Empujar al CTA único: rellenar el formulario de reserva.

Cada sección tiene una razón. Si una sección no aporta a uno de esos cuatro objetivos, fuera.

---

## 1. Wireframe textual

```
┌──────────────────────────────────────────────────┐
│  HEADER MINIMAL                                  │
│  Logo Lifetime · idioma (CA/ES/EN)               │
├──────────────────────────────────────────────────┤
│                                                  │
│  HERO PERSONALIZADO                              │
│  · Saludo con nombres                            │
│  · Una frase: "hemos preparado esta página       │
│    pensando en vuestra boda en [venue],          │
│    el [fecha]"                                   │
│  · Foto grande (de boda real, mismo estilo/venue)│
│  · CTA primario: "Reservar nuestra fecha"        │
│  · Vigencia visible: "válido hasta DD/MM"        │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  POR QUÉ NOSOTROS (diferenciación)               │
│  · El ángulo "dos hermanos, segunda generación"  │
│  · 2-3 diferenciadores concretos                 │
│  · Sin clichés                                   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  PRUEBA VISUAL                                   │
│  · Galería 4-6 fotos de boda parecida            │
│    (mismo venue / mismo estilo / mismo mes)      │
│  · 1 testimonio breve de pareja similar          │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  VUESTRA PROPUESTA                               │
│  · Nombre del pack                               │
│  · Qué incluye (lista clara, específica)         │
│  · Qué NO incluye (transparencia)                │
│  · Add-ons opcionales con precio                 │
│  · Precio total destacado                        │
│  · Términos de pago (depósito X€, resto a Y)     │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  QUÉ PASA SI RESERVÁIS                           │
│  · 4 pasos numerados, claros                     │
│  · Tiempos estimados                             │
│  · Termina en "y a partir de ahí os acompañamos" │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  PREGUNTAS FRECUENTES                            │
│  · 5-7 preguntas concretas (NO genéricas)        │
│  · Anticipan objeciones reales                   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  CTA FINAL                                       │
│  · "Reservar nuestra fecha" (mismo CTA)          │
│  · Vigencia recordada                            │
│  · WhatsApp directo si tienen dudas              │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  FORMULARIO DE RESERVA                           │
│  (oculto inicialmente, se abre al pulsar CTA)    │
│  · 4 secciones: datos novios / día /             │
│    pago preferido / opcional                     │
│  · Submit → email de confirmación                │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Principios de jerarquía:**
- Hero = personal + foto potente + CTA. Todo lo demás justifica el clic.
- El precio aparece DESPUÉS de "por qué nosotros" y "prueba visual". Nunca antes.
- FAQ va antes del CTA final porque resuelve objeciones que frenan el clic.
- El form aparece al pulsar el CTA, no al hacer scroll. Esto reduce abandono.

---

## 2. Copy completo

> **Nota de idioma:** copy escrito primariamente en **català**, con variante en **castellano** debajo de cada bloque clave. La pareja ve la versión que toca según su `preferred_language` en BD. EN sigue la misma estructura cuando lo necesitéis.

> **Variables entre {{}}** se rellenan dinámicamente desde la BD.

---

### 2.1 HERO

**[CA]**
```
Hola {{nom1}} i {{nom2}},

Hem preparat aquesta pàgina pensant en la vostra boda
a {{venue_name}}, el {{wedding_date_long}}.

Aquí trobareu la nostra proposta, el procés que seguirem
si decidiu reservar amb nosaltres, i les respostes a les
preguntes que sol fer tothom abans de dir que sí.

Si tot us encaixa, en menys de 10 minuts ho podem deixar
tot reservat.
```

**CTA:** `Reservar la nostra data`
**Sub-CTA:** `Aquesta proposta és vàlida fins al {{expires_at_short}}`

**[ES]**
```
Hola {{nom1}} y {{nom2}},

Hemos preparado esta página pensando en vuestra boda
en {{venue_name}}, el {{wedding_date_long}}.

Aquí encontraréis nuestra propuesta, el proceso que
seguiremos si decidís reservar con nosotros, y las
respuestas a las preguntas que suelen hacer todas las
parejas antes de dar el sí.

Si todo os encaja, en menos de 10 minutos podemos
dejarlo todo reservado.
```

**CTA:** `Reservar nuestra fecha`
**Sub-CTA:** `Esta propuesta es válida hasta el {{expires_at_short}}`

---

### 2.2 POR QUÉ NOSOTROS

**[CA]**
```
Som dos germans. La segona generació.

El nostre pare ja feia fotos i vídeos de bodes a Reus
fa més de trenta anys. Avui ho fem nosaltres, amb la
mateixa cura i una mirada actual.

Quan reserveu amb Lifetime, ens reserveu a tots dos.
La feina del vostre dia la fem nosaltres en persona —
no un equip rotatori que canvia segons el cap de setmana.

Aquesta diferència la notareu el dia, i la veureu
després al material.
```

**[ES]**
```
Somos dos hermanos. La segunda generación.

Nuestro padre ya hacía fotos y vídeos de bodas en Reus
hace más de treinta años. Hoy lo hacemos nosotros, con
el mismo cuidado y una mirada actual.

Cuando reserváis con Lifetime, nos reserváis a los dos.
El trabajo del día lo hacemos nosotros en persona — no
un equipo rotatorio que cambia según el fin de semana.

Esa diferencia la notaréis el día, y la veréis después
en el material.
```

> **Por qué funciona este copy:** evita los clichés del sector ("capturamos momentos únicos"), aporta una historia familiar real, y resuelve una objeción tácita pero importante en el sector — "¿quién hará la foto realmente, vosotros o un freelance que no conozco?".

---

### 2.3 PRUEBA VISUAL

**Layout:** grid de 4-6 fotos. Tres ratios mezclados (vertical, horizontal, cuadrado) para ritmo visual. Click → lightbox.

**Mini-testimonio debajo (opcional pero recomendado):**

**[CA]**
```
"Vam dubtar entre tres fotògrafs. Vam triar Lifetime
per la sensació que ens donaven, i és exactament el
que va passar el dia. La nostra família encara parla
del vídeo."

— {{nom_parella_referencia}}, casats al {{venue_referencia}}
```

**[ES]** *(adaptación directa)*

> **Importante:** el testimonio debe ser real. Si tenéis varios, escoged el más parecido al perfil de la pareja a la que vais a enviar la página (mismo tipo de venue, mismo presupuesto, misma estética).

---

### 2.4 VUESTRA PROPUESTA (pack)

**[CA]**
```
Pack {{pack_name}}

{{pack_description}}

Què inclou:
{{pack_includes_bullets}}

Què no inclou:
{{pack_excludes_bullets}}

Add-ons opcionals:
{{pack_addons_with_prices}}

Inversió total: {{pack_price}} €
Dipòsit per reservar: {{deposit}} €
Pagament restant: {{payment_terms}}
```

> **Nota CRO clave:** la palabra "inversió" en lugar de "preu" reposiciona la transacción. No es un gasto, es una inversión en algo que les durará toda la vida. Pequeño cambio, impacto real en percepción.

---

### 2.5 QUÉ PASA SI RESERVÁIS

**[CA]**
```
Si tot us encaixa, així funciona:

1. Ompliu el formulari de reserva
   5 minuts. Recollim les dades necessàries per
   preparar el contracte.

2. Us enviem el contracte per signar online
   Sense imprimir, sense escanejar. Ho fareu des
   del mòbil en 2 minuts.

3. Pagueu el dipòsit
   Amb targeta o transferència, com us vagi millor.

4. La vostra data queda reservada
   Bloquegem el calendari només per vosaltres.

A partir d'aquí, us acompanyem fins al dia. Mesos
abans us enviarem un qüestionari per planificar el
timeline, i les setmanes prèvies repassem la
logística junts.
```

**[ES]** *(adaptación directa)*

---

### 2.6 PREGUNTAS FRECUENTES

> **Estrategia de FAQ:** cada pregunta debe responder a una objeción real que frena el clic. Nada genérico. Si una pregunta no resuelve una objeción, fuera.

**[CA]** (mínimo 5, idealmente 7)

```
Què passa si plou?
Treballem amb dues càmeres i material preparat per
qualsevol condició. La pluja sovint dona les fotos
més bones del dia — i ja ho hem viscut moltes vegades.

I si teniu una altra boda el nostre dia?
Quan reserveu, bloquegem el calendari només per
vosaltres. No fem dues bodes el mateix dia, mai.

Podem ajustar el pack a les nostres necessitats?
Sí. El pack és un punt de partida. Si necessiteu
més hores, menys hores, només foto, només vídeo,
o alguna cosa diferent, ho parlem i ho ajustem.

Quan rebem les fotos i el vídeo?
Material editat complet entre 8 i 12 setmanes
després de la boda. Una selecció breu (10-15
fotos) us l'enviem la setmana següent perquè
pugueu compartir-la amb la família.

Com es paga la resta?
50% en signar, 50% un mes abans del dia. Ho podem
ajustar si us va millor un altre repartiment.

Què passa si haguéssim de cancel·lar?
Política clara al contracte. Resumint: el dipòsit
és no reembossable, però la data es pot moure una
vegada sense cost si avisem amb temps suficient.

Esteu federats? Tens assegurança?
Sí. Treballem com a autònoms federats, amb
assegurança de responsabilitat civil i factura
oficial.
```

**[ES]** *(adaptación directa de las mismas 7 preguntas)*

---

### 2.7 CTA FINAL

**[CA]**
```
Si us encaixa, fem-ho.

[Reservar la nostra data]

Aquesta proposta és vàlida fins al {{expires_at_short}}.
Si teniu cap dubte abans de reservar, escriu-nos pel
WhatsApp: {{whatsapp_link}}
```

**[ES]**
```
Si os encaja, hagámoslo.

[Reservar nuestra fecha]

Esta propuesta es válida hasta el {{expires_at_short}}.
Si tenéis cualquier duda antes de reservar, escribidnos
por WhatsApp: {{whatsapp_link}}
```

---

### 2.8 FORMULARIO DE RESERVA

> **Aparece como modal o sección expandida al pulsar el CTA.** No está visible inicialmente para no abrumar. Una vez aparece, hace scroll automático hasta él.

**Sección 1 — Dades del primer contraent**
- Nom complet
- DNI / NIF
- Data de naixement
- Adreça postal completa
- Email
- Telèfon

**Sección 2 — Dades del segon contraent** *(estructura idéntica)*

**Sección 3 — Dades de facturació**
- Checkbox: "Mateixa adreça que la del primer contraent"
- Si no: nom de facturació, DNI/NIF de facturació, adreça

**Sección 4 — Confirmació del dia**
- Data confirmada (pre-rellenada, editable)
- Lloc confirmat (pre-rellenado, editable)
- Hora aproximada de la cerimònia
- Hora aproximada de fi del servei
- Nombre estimat d'invitats

**Sección 5 — Preferències**
- Mètode de comunicació preferit (email / WhatsApp / telèfon)
- Idioma preferit (CA / ES / EN)
- Mètode de pagament preferit (targeta / transferència)

**Sección 6 — Opcional pero útil**
- Com ens vau conèixer? (textarea curt)
- Hi ha alguna cosa important que vulgueu que sapiguem des de ja? (textarea)

**Submit:** botón `Enviar i passar al contracte`
**Texto bajo botón:** *"En enviar, rebreu un email de confirmació immediat. En menys de 24h us enviarem el contracte per signar."*

---

## 3. Email de confirmación post-form

**Subject (CA):** `Hem rebut la vostra reserva — següents passos, {{nom1}}`
**Subject (ES):** `Hemos recibido vuestra reserva — siguientes pasos, {{nom1}}`

**Body [CA]:**
```
Hola {{nom1}} i {{nom2}},

Acabem de rebre les vostres dades per la reserva
de la boda del {{wedding_date_long}} a {{venue_name}}.

Això és el que passa ara:

→ En menys de 24h us enviem el contracte per signar
  online (no cal imprimir res).

→ Junt amb el contracte rebreu el link per al
  dipòsit de {{deposit}} €.

→ Quan totes dues coses estiguin fetes, la vostra
  data queda formalment bloquejada al nostre
  calendari.

Mentrestant, si us sorgeix qualsevol dubte,
escriviu-nos directament al WhatsApp:
{{whatsapp_link}}

Estem ja pensant en la vostra boda. Parlem aviat.

Ferran i {{nom_segon_germà}}
Lifetime
```

**Body [ES]:** *(adaptación directa, cambiando "Hem rebut" por "Hemos recibido", etc.)*

---

## 4. Variables que la página recibe de la BD

Para la página de reserva, el endpoint `/reserva/[slug]` necesita devolver:

```typescript
{
  // Pareja
  nom1: string,
  nom2: string,
  preferred_language: 'ca' | 'es' | 'en',

  // Boda
  wedding_date_long: string,    // "12 de juliol de 2026"
  wedding_date_short: string,   // "12/07/2026"
  venue_name: string,
  venue_city: string,

  // Pack (snapshot)
  pack_name: string,
  pack_description: string,
  pack_includes: string[],
  pack_excludes: string[],
  pack_addons: { name: string, price_cents: number }[],
  pack_price_cents: number,
  deposit_cents: number,
  payment_terms: string,

  // Personalización
  custom_intro: string | null,    // Si quieres añadir un mensaje específico

  // Estado y vigencia
  expires_at: Date,
  status: 'sent' | 'viewed' | 'form_submitted',

  // Contacto
  whatsapp_link: string           // Generado a partir del num de la página
}
```

---

## 5. Notas de UX y diseño

- **Tipografía:** Fraunces para títulos (ya en uso), Inter para cuerpo (ya en uso).
- **Color:** mantener paleta actual de lifetime.photo. Acentos cálidos (ocre, mostaza suave) para CTA primario, no rojo ni colores agresivos.
- **Imágenes:** las del hero y la galería visual deben ser **reales**, de bodas que habéis hecho. Evitad stock a toda costa.
- **Animaciones:** mínimas. Fade-in suave al hacer scroll, nada más. Lo recargado mata el premium.
- **Mobile:** la mayoría de parejas abrirán esto desde el móvil después de cenar. Diseño mobile-first innegociable. CTA siempre visible (sticky en móvil).
- **Velocidad:** página debe cargar en <2s. Imágenes optimizadas (WebP, lazy load fuera del hero).
- **Accesibilidad:** contrastes correctos, font sizes mínimos 16px en cuerpo. No queremos perder a una madre que abre la página y no lee.

---

## 6. Estados visuales que cubrir

La página debe manejar 4 estados según `bookings.status`:

1. **`sent`** (la pareja entra por primera vez): vista completa, todo normal. El backend marca como `viewed` automáticamente al cargar.
2. **`viewed`** (la pareja vuelve a entrar antes de rellenar el form): vista igual, sin marcador especial.
3. **`form_submitted`** (la pareja ya rellenó el form): vista con un banner arriba: *"Ya nos habéis enviado vuestros datos. Os enviamos el contrato en menos de 24h. Si necesitáis modificar algo, escribidnos por WhatsApp."*
4. **`expired`** (`expires_at` ya pasó): vista bloqueada con mensaje: *"Esta propuesta caducó el {{expires_at_short}}. Escribidnos para refrescarla."*

---

## 7. Decisiones de implementación (post-inspección, validadas)

Notas de adaptación al stack real:

- **BD: SQLite/libSQL** (no Postgres). UUIDs vía `crypto.randomUUID()`, JSONB → TEXT con `JSON.stringify/parse`, fechas TIMESTAMPTZ → ISO-8601, `BOOLEAN` → INTEGER 0/1. CHECK constraints sí soportados. Trigger `updated_at` en sintaxis SQLite.
- **Auth admin**: se reusa el sistema existente (bcrypt + sesiones en BD). Las nuevas rutas `/admin/bookings/*` heredan el middleware actual. El Paso 7 del spec original (password único en env, sin hash) queda anulado por regresión de seguridad.
- **Rutas**: convención del proyecto → `/admin/bookings/*` para UI y `/api/admin/bookings/*` para API admin. Endpoints públicos (la pareja) a `/api/reserva/*`.
- **Migraciones**: se añaden las nuevas tablas a `initSchema()` en `src/lib/db.ts`. Idempotente, sin framework nuevo.
- **Emails**: se reusan `sendNotification()` (interno) y se añade un wrapper específico para la confirmación a la pareja (siguiendo el patrón de `sendAutoReplyToLead`). Patrón "fail soft" mantenido.
- **i18n**: keys nuevas integradas en `src/i18n/ui.ts`. EN como TODO inicialmente.
- **Rate limit**: en memoria (Map en proceso). Sin Redis.
- **Slug random**: `crypto.randomBytes` con alfabeto `a-z0-9`.

---

## 8. Out of scope (NO en Fase 1)

- Generación de contrato PDF.
- Firma digital (Signaturit u otro).
- Cobro online con Stripe.
- Secuencia de emails post-reserva (timeline, lista familia).
- Galería dinámica desde CMS — fotos de `<VisualProof />` se cargan desde paths fijos.
- Notificaciones push o internas.
- Integración con calendario externo.
