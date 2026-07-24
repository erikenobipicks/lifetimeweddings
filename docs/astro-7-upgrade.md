# Pla de migració: Astro 6 → 7

> Document de referència per abordar la pujada d'Astro quan toqui. Estat:
> **pendent de planificar** (cap canvi fet). Última revisió: 2026-07-24.

## Per què

La `npm audit` marca avisos **alts del propi framework** que només es
tanquen a Astro 7:

- **Astro ≤ 7.0.9** — 3 XSS (View Transitions, noms d'atributs *spread*,
  directives `transition:*`). Corregit a **7.1.3**.
- **sharp < 0.35** (via Astro) — CVEs de libvips.
- **@astrojs/node** — avís mitjà de *trailing-slash*; la versió compatible
  amb Astro 7 és **11.x** (canvi amb ruptures).

Mentre seguim a Astro 6 els tenim **silenciats** amb una allowlist a
`audit-ci.jsonc` (verificats no explotables aquí: no fem servir View
Transitions, ni illes `client:*`, ni `transition:*`, i sharp només optimitza
imatges pròpies en build). **En completar aquesta migració → eliminar aquella
allowlist** perquè el gate torni a ser estricte del tot.

## Estat actual

| Paquet | Ara | Objectiu |
|---|---|---|
| `astro` | ^6.4.7 | ^7.1.3+ |
| `@astrojs/node` | ^10.1.3 | ^11.x |
| `@astrojs/sitemap` | ^3.7.3 | la que demani Astro 7 |
| Node | 22 (`>=20.19.5`) | verificar mínim d'Astro 7 |

Configuració rellevant (`astro.config.mjs`):
- `output: 'server'` (SSR) amb `adapter: node({ mode: 'standalone' })`.
  Desplegat a **Railway darrere de Cloudflare**; l'start és
  `node ./dist/server/entry.mjs`.
- `security: { checkOrigin: false }` (la defensa CSRF pròpia viu a
  `src/middleware.ts`).
- `i18n` (ca/es/en, `prefixDefaultLocale: false`) + `redirects` + `sitemap`.
- **Tailwind via PostCSS** (`postcss.config.mjs`), no la integració
  `@astrojs/tailwind` (Astro 6 ja la va treure).
- Sense View Transitions, sense `client:*` (verificat), força `is:inline` +
  `define:vars` en scripts.

## Com fer-ho (metodologia)

⚠️ La llista EXACTA de ruptures surt de la **guia oficial d'actualització
d'Astro 7** — consultar-la al fer la feina, no fiar-se de memòria.

1. **Branca pròpia** i fer-ho aïllat (no barrejar amb altres canvis).
2. Executar l'assistent oficial: `npx @astrojs/upgrade` — puja `astro` i les
   integracions (`@astrojs/node` → 11, `@astrojs/sitemap`) de forma
   coordinada i marca deprecacions.
3. `npm run build` i **anar resolent** el que peti, un a un.
4. Revisar la guia oficial per canvis de config (noms d'opcions renombrades,
   `i18n`, `security`, `adapter`, `image`), i aplicar-los.
5. `npx audit-ci --config ./audit-ci.jsonc` ha de passar **sense** les 4
   entrades d'allowlist → esborrar-les (i el fitxer si queda buit) i
   restaurar `npm audit --audit-level=high` net si es vol.

## Zones de risc específiques d'aquest projecte

Coses a mirar amb lupa perquè un *major* d'Astro les sol tocar:

- **Adaptador Node standalone** — que `dist/server/entry.mjs` segueixi sent
  el punt d'entrada i l'start de Railway no canviï; provar `HOST`/`PORT`.
- **Middleware** (`src/middleware.ts`) — API de `defineMiddleware`, `context`,
  redireccions 301 de host canònic, i la **CSP** que emet. Astro pot canviar
  signatures o l'ordre d'execució.
- **Rutes API SSR** (`src/pages/api/**`) — `APIRoute`, lectura de `request`,
  `cookies`, `redirect`; els webhooks (Stripe/Cal.com) i el cron.
- **`security.checkOrigin`** — confirmar que segueix desactivat i que els
  POST públics *multipart* segueixen funcionant darrere Cloudflare.
- **i18n + redirects + sitemap** — que les URLs (`/`, `/es/…`, `/en/…`,
  hreflang, canonical) i els `redirects` no canviïn de forma.
- **Imatges / sharp** — el servei d'imatge d'Astro; verificar que les imatges
  optimitzades (OG, galeries, `photos.generated`) segueixen sortint.
- **Scripts `is:inline` + `define:vars`** — molt usats (formularis, players de
  vídeo, prefill). Comprovar que segueixen injectant-se igual.
- **Tailwind via PostCSS** — que el pipeline segueix compilant sense la
  integració oficial.
- **Env** (`src/lib/env.ts`, `import.meta.env` vs `process.env`) — Astro sol
  ajustar el maneig d'entorn entre *majors*.

## Checklist de verificació (abans de mergear)

Provar en execució (SSR), no només el build:

- [ ] Home + una pàgina SEO (`/fotograf-boda-tarragona`) rendereixen.
- [ ] `/p/<token>` (pressupost públic) — configurador, idioma, caducitat.
- [ ] Admin: login, llistat, fitxa de pressupost, **descompte** (round-trip
      d'imports!), reserva (imports/depòsit), entregues, `/videograf`.
- [ ] Formularis públics (`/formulari/<token>`, contacte) — POST + prefill.
- [ ] Webhooks: signatura Stripe/Cal.com encara valida.
- [ ] Cron `/api/cron/email-queue` (amb `CRON_SECRET`) respon i envia.
- [ ] Sitemap + robots + hreflang correctes.
- [ ] Imatges OG i galeries es generen.
- [ ] `audit-ci` passa amb l'allowlist **buida**.

## Desplegament i rollback

- Desplegar a Railway; comprovar l'start command i les variables d'entorn.
- **Rollback**: com que va en un PR propi, si surt malament es reverteix el
  merge i es torna a Astro 6 (l'allowlist del CI segueix cobrint els avisos
  mentrestant). No tocar dades — la migració és només de codi/deps.

## Resum

No és urgent (els avisos no són explotables aquí i estan silenciats de forma
controlada), però és **higiene recomanable**: tanca els avisos del framework
de veritat i permet treure l'allowlist. És una tasca acotada d'un PR, però
amb prou superfície (SSR + adaptador + middleware) com per fer-la sola i amb
la checklist de dalt.
