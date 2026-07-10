# Pla: substituir FotoStudio amb galeries + comandes + calendaris propis

> Document de referència per a un projecte multi-fase. Estat: **planificació**
> (cap codi escrit encara). Última revisió: 2026-07-10.

## Context i motivació

Avui la pàgina d'entrega de material (`/entrega/[slug]`, `src/lib/deliveries.ts`)
apunta a material allotjat **fora**:

- **Vídeo** → YouTube ocult.
- **Descàrrega en alta** → SwissTransfer (caduca als ~30 dies).
- **Galeria de fotos** → FotoStudio.

A part, fem servir FotoStudio per a **galeries + comandes + calendaris** (no per a
factures — les factures les fem per una altra banda). Cost actual segons factura:

> **Factura FotoStudio (10/09/2025):** "Suscripción anual de CRM + galerías
> fotostudio.io (almacenamiento ilimitado)" — **326,45 €/any**, IVA 0%
> (autoliquidació, proveïdor belga). Una sola línia: **CRM + galeries + storage
> il·limitat, inseparables**.

Objectiu: portar galeries, comandes i calendaris a un sistema propi, integrat amb
el web/panell que ja tenim, i donar de baixa FotoStudio.

## Stack actual (condicionants)

- Astro SSR, adaptador **Node standalone**, desplegat a **Railway darrere de
  Cloudflare**. Disc **efímer** → el material **no** es pot guardar al servidor de
  l'app: cal **object storage + CDN**.
- Base de dades **Turso (libsql)**, migracions idempotents via `ensureColumn`.
- **Email** propi ja existent (`src/lib/email.ts`) → reutilitzable.
- **Pagament online**: encara no integrat, però tenim **Stripe** disponible.
- **Bookings** propis ja existents (`src/lib/bookings`, `/admin/bookings`) →
  reutilitzables per a l'agenda interna.
- **Sense** dependència de la facturació de FotoStudio (les factures es fan fora).

## ⚠️ La veritat sobre l'estalvi (llegir primer)

FotoStudio dóna **storage IL·LIMITAT** per 326 €/any. R2 es paga **per GB**:

- R2 ≈ **0,18 $/GB/any** → punt d'equilibri amb 326 € ≈ **~2 TB** guardats.
- Una boda en alta = 40–60 GB. 30 bodes/any ≈ **1,2–1,8 TB/any** *només bodes*,
  més estudi i esdeveniments.
- Acumulant 2–3 anys d'alta resolució → 3–6 TB → R2 costaria **540–1.080 $/any**,
  **més** que FotoStudio ara.

**Conclusió:** si guardem tota l'alta resolució per sempre, self-hostar **pot
sortir més car**. Només estalviem de veritat amb una **política de retenció**:

- **Galeria web** (mida pantalla, ~2–4 GB/galeria) → permanent a R2. 100 galeries
  ≈ 300 GB ≈ **~50 $/any**. Barat.
- **Alta resolució** → a R2 només durant la finestra d'entrega/venda (3–6 mesos),
  després es retira (en guardem còpia freda local).

Amb aquesta disciplina R2 costa **~50–150 $/any** vs 326 € → estalvi real. Sense
disciplina, no. **El valor principal del projecte no és el diner (depèn del volum)
sinó el control, la marca (tot sota `lifetime.photo`) i la independència de
tercers.**

## Arquitectura de referència

- **Emmagatzematge:** Cloudflare R2 (compatible S3, **sortida gratuïta**, ja som a
  Cloudflare). Domini propi `media.lifetime.photo` amb CDN de Cloudflare al davant.
- **Pujada:** **URLs pre-signades (presigned PUT)** — el navegador de l'admin puja
  **directament a R2**; el servidor només signa. Així el material no passa mai per
  Railway (sense pressió de memòria ni límits de mida de petició ni cost d'egress).
- **Model de dades:** generalitzar `deliveries` → taula `galleries` (tipus:
  `boda` | `estudi` | `esdeveniment`) + taula `gallery_photos`
  (`gallery_id`, `r2_key`, `filename`, `width`, `height`, `size`, `sort_order`,
  `is_cover`).
- **Accés:** slug amb sufix aleatori de 12 car. (com ara) i/o codi d'accés +
  caducitat opcional.
- **Pagament:** Stripe (checkout + webhooks). Les factures legals segueixen fora.
- **Calendari:** Google Calendar API per a sincronització; agenda pública pròpia
  per a reserva de slots.

## Full de ruta per fases

| Fase | Què | Substitueix |
|------|-----|-------------|
| 0 | Infra R2 + model de dades | — |
| 1 | Galeries: hosting + visualització + entrega | Hosting/galeries |
| 2 | Proofing / selecció del client | Selecció |
| 3 | Botiga + comandes (Stripe) | Comandes / venda |
| 4 | Calendaris (reserva client + agenda + Google) | Calendaris |
| 5 | Migració + baixa de FotoStudio | → −326 €/any |

### Fase 0 — Fonaments

- Bucket R2 + domini `media.lifetime.photo` + credencials a Railway
  (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`).
- Helper de pujada pre-signada amb `@aws-sdk/client-s3`.
- Model de dades: `galleries` + `gallery_photos` (generalitzant `deliveries`).

### Fase 1 — Galeries (hosting + veure + descarregar) ✅ primer, baix risc

- Admin: crear galeria, **pujada massiva directa a R2**, portada, ordenar,
  esborrar, generació de miniatures.
- Pàgina pública: graella responsive, lightbox, portada, color de fons, lazy load.
- Descàrrega: per foto + "descarregar tot" (ZIP).
- Accés: slug secret / codi d'accés + caducitat opcional.
- Email "galeria llesta" (reusant `src/lib/email.ts`).
- **Resultat:** serveix boda i estudi, i **mata SwissTransfer**.

### Fase 2 — Proofing / selecció

- Enllaç/codi per client (sense login), marcar preferides, límit de selecció
  ("tria'n 20"), watermark opcional, l'admin veu i exporta la selecció.

### Fase 3 — Botiga + comandes (Stripe)

Tres tipus de producte:

- **Descàrrega digital** → paga amb Stripe → desbloqueig **automàtic** de l'alta.
- **Producte físic** (àlbum Santa Book, còpies) → selecció + pack + Stripe →
  **comanda a l'admin** amb estat (pendent → en producció → entregat); es produeix
  manualment.
- **Sessions / vals regal** → Stripe → genera **codi de val** bescanviable.

Inclou: catàleg de packs amb preu (reaprofitant els presets actuals), carret,
checkout Stripe + webhooks, gestió de comandes a l'admin, emails de confirmació.
Les factures es continuen fent on ja es fan.

### Fase 4 — Calendaris

- **Reserva de slots pel client:** agenda pública amb franges (p. ex.
  mini-sessions de Nadal); el client reserva → confirma per email → opcionalment
  paga la reserva amb Stripe.
- **Agenda interna:** gestionar sessions/bodes al panell, enllaçant amb el sistema
  de `bookings` existent.
- **Sync Google Calendar:** crear/actualitzar esdeveniments al Google Calendar via
  API.

### Fase 5 — Migració + baixa

- Baixar galeries actives de FotoStudio → pujar a R2.
- Redireccions dels enllaços antics.
- Baixa de FotoStudio → estalvi 326 €/any (amb la retenció ben feta).

## Costos estimats

- **R2:** ~50–150 $/any amb política de retenció; pot pujar molt sense ella (veure
  secció d'estalvi). Sortida gratuïta.
- **Stripe:** ~1,5 % + 0,25 €/transacció (targeta EU), només sobre vendes reals.
- **Google Calendar API:** gratuït.
- **Front FotoStudio:** −326 €/any un cop completa la Fase 5.

## Riscos i coses a vigilar

1. **Storage:** sense retenció, R2 pot costar més que FotoStudio (storage il·limitat).
2. **Backup:** R2 passa a ser font única → activar versioning R2 o còpia a
   Backblaze B2, i mantenir còpia freda local de l'alta.
3. **Pagaments:** PCI el cobreix Stripe, però cal gestionar devolucions i estats de
   comanda amb cura.
4. **Volum/manteniment:** 100+ galeries/any, pujades i ZIPs grossos → política de
   retenció i neteja.
5. **Calendari públic:** la reserva de slots és la peça més gran de la Fase 4;
   valorar fer-la l'última.

## Per començar (Fase 0+1) cal

1. Compte **Cloudflare R2** + bucket, credencials com a env vars a Railway.
2. Connectar `media.lifetime.photo` al bucket via Cloudflare.

Tot el codi el fem nosaltres; només calen les credencials per endollar.
