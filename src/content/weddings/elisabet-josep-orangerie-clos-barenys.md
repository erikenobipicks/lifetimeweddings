---
# ── Identity ──────────────────────────────────────────────────────────────
couple: "Elisabet & Josep"
date: 2024-06-15              # TODO: confirm exact wedding date with Ferran
published: false              # flip to true once content + seo are written
author: ferran
photoSlug: josep-eli          # ⇒ PHOTOS["josep-eli"] = 24 images in /photos/josep-eli

# ── Venue ─────────────────────────────────────────────────────────────────
venue:
  name: "L'Orangerie Clos Barenys"
  slug: orangerie-clos-barenys    # reserved for future /llocs/<slug>
  city: Tarragona
  region: Tarragona
  country: ES
  type: celler                    # TODO: verify (could also be "altre" — Orangerie is a vineyard event space)

# ── Day details ───────────────────────────────────────────────────────────
details:
  # guests: 95              # TODO: ask Ferran — omit this line if unknown
  ceremonyType: civil         # TODO: verify
  style: ""                   # TODO: e.g. "celler, aire lliure, tardor"
  weather: ""                 # TODO: optional

# ── Suppliers ─────────────────────────────────────────────────────────────
# All TODO — ask Ferran for the list of vendors. Leave a sub-block out
# entirely (or set name: "") if the supplier is unknown; the template
# only renders non-empty entries.
suppliers:
  planner: { name: "" }       # TODO
  catering: { name: "" }      # TODO
  florist: { name: "" }       # TODO
  music: { name: "" }         # TODO
  makeup: { name: "" }        # TODO
  dress: { name: "" }         # TODO

# ── Testimonial (optional) ────────────────────────────────────────────────
# Set to `null` if the couple did not give a written testimonial.
# When populated, a Review JSON-LD is emitted with itemReviewed: #business.
testimonial: null             # TODO: ask Ferran/Eric if Elisabet & Josep gave a quote

# ── Gallery layout ────────────────────────────────────────────────────────
gallery:
  cover: "001"                # hero uses /photos/josep-eli/001-lg.jpg
  # Proposed split of the 24 photos into narrative sections. Adjust the
  # ranges once Ferran reviews which photos belong to which moment.
  sections:
    - key: preparatius
      range: "001-006"
      title:
        ca: "Els preparatius"
        es: "Los preparativos"
        en: "Getting ready"
      intro:
        ca: ""                # TODO: 1-2 frases opcionales que contextualicen el bloque
        es: ""
        en: ""
    - key: cerimonia
      range: "007-012"
      title:
        ca: "La cerimònia"
        es: "La ceremonia"
        en: "The ceremony"
    - key: retrat
      range: "013-018"
      title:
        ca: "Retrat de parella"
        es: "Retrato de pareja"
        en: "Couple portrait"
    - key: festa
      range: "019-024"
      title:
        ca: "La festa"
        es: "La fiesta"
        en: "The party"

# ── Narrative content (trilingual) ────────────────────────────────────────
# ~400 characters each. Keep it natural — incluye el nombre del venue y la
# ciudad porque ahí es donde va el peso SEO local.
content:
  intro:
    ca: |
      TODO: redactar introducció de ~400 caràcters en català. Ha de mencionar
      naturalment "L'Orangerie Clos Barenys" i "Tarragona", i donar una idea
      del to del reportatge (estil documental, moments concrets, etc.).
    es: |
      TODO: redactar introducción de ~400 caracteres en castellano.
    en: |
      TODO: write ~400-character English intro.

# ── SEO ───────────────────────────────────────────────────────────────────
# title ≤ 60 caracteres. description ≤ 160 caracteres.
seo:
  title:
    ca: "Boda d'Elisabet i Josep a L'Orangerie Clos Barenys (Tarragona)"
    es: "Boda de Elisabet y Josep en L'Orangerie Clos Barenys (Tarragona)"
    en: "Elisabet & Josep's wedding at L'Orangerie Clos Barenys (Tarragona)"
  description:
    ca: "TODO: descripció ~160 caràcters que resumeixi la boda d'Elisabet i Josep a L'Orangerie Clos Barenys, Tarragona."
    es: "TODO: descripción ~160 caracteres sobre la boda de Elisabet y Josep en L'Orangerie Clos Barenys, Tarragona."
    en: "TODO: ~160-char description of Elisabet & Josep's wedding at L'Orangerie Clos Barenys, Tarragona."

# ── Related cases ─────────────────────────────────────────────────────────
# Slugs of 2-3 other cases from this collection with a similar vibe (venue
# type, ceremony style, season). Leave empty to skip the "you may also like"
# block at the bottom of the page.
related:
  - cristina-daniel-mas-la-boella
  - idoya-pau-dosterras
  - elena-jordi-masia-san-antonio

# ── Associated blog post (optional) ───────────────────────────────────────
# If we ever write a blog post about this wedding, reference its slug here
# and a card linking to /blog/<slug> will render at the bottom.
# blogPost: boda-clos-barenys-elisabet-josep
---

<!--
The body below is optional. Most cases will leave it empty and populate
everything in the frontmatter above. If a particular case deserves a long
narrative beyond content.intro, write it here in MDX and it will render
below the intro block.
-->
