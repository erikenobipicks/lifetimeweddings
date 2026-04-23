// Astro Content Collections.
//
// Two collections live here today:
//
//   - `blog`: migrated Wix blog posts. Body = Markdown; a small subset of
//     metadata (title, description, legacySlug) in frontmatter. Heavier
//     metadata (author, date, category, cover) still lives in
//     `src/data/blog.ts`.
//
//   - `weddings`: new rich case studies for `/bodas/<slug>`. ALL the
//     metadata — identity, venue, day details, suppliers, testimonial,
//     gallery sections, trilingual content and SEO — lives in the
//     frontmatter. The Markdown body is optional and only used for very
//     long narratives; for normal cases, `content.intro.{lang}` in the
//     frontmatter is enough.
//
//     IMPORTANT: this collection is the source of truth ONLY for cases
//     with actual written content. The `WEDDINGS` array in
//     `src/data/weddings.ts` is preserved as pure redirect infrastructure
//     for old Wix URLs; it stays separate and should not be conflated
//     with what lives here. A helper in seo.ts will join both when
//     rendering — cases present in this collection AND in WEDDINGS get
//     the rich template, those only in WEDDINGS keep the simple template.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    legacySlug: z.string().optional(),
  }),
});

// ─── Wedding case studies ─────────────────────────────────────────────────
// Reusable leaf types.
const localizedText = z.object({
  ca: z.string().optional(),
  es: z.string().optional(),
  en: z.string().optional(),
});

const supplier = z.object({
  name: z.string(),
  url: z.string().optional(),
});

const weddings = defineCollection({
  loader: glob({ base: './src/content/weddings', pattern: '**/*.md' }),
  schema: z.object({
    // ── Identity (required) ───────────────────────────────────────────────
    /** Display name of the couple, e.g. "Elisabet & Josep". */
    couple: z.string(),
    /** Wedding day — ISO date, coerced to JS Date on read. */
    date: z.coerce.date(),
    /** When false, the rich template is skipped and /bodas/<slug> continues
     *  to be served by the simple gallery-only template. Flip to true once
     *  content.intro + seo are written. */
    published: z.boolean().default(false),
    /** Who authored the case write-up. Default: ferran. */
    author: z.enum(['eric', 'ferran']).default('ferran'),
    /** Link into PHOTOS in src/data/photos.generated.ts. If absent, no
     *  gallery is rendered. Must match an existing key when present. */
    photoSlug: z.string().optional(),

    // ── Venue (optional) ──────────────────────────────────────────────────
    venue: z
      .object({
        name: z.string(),
        /** Reserved for future `/llocs/<slug>` pages. Degrades to plain
         *  text if no venue page exists yet. */
        slug: z.string().optional(),
        city: z.string().optional(),
        region: z.string().optional(),
        country: z.string().default('ES'),
        type: z.enum(['celler', 'masia', 'hotel', 'platja', 'ermita', 'altre']).optional(),
      })
      .optional(),

    // ── Day details (optional, used in the "ficha del dia" block) ─────────
    details: z
      .object({
        guests: z.number().int().positive().optional(),
        ceremonyType: z.enum(['civil', 'religiosa', 'simbolica']).optional(),
        style: z.string().optional(),
        weather: z.string().optional(),
      })
      .optional(),

    // ── Suppliers (all fields optional; empty blocks never render) ────────
    suppliers: z
      .object({
        planner: supplier.optional(),
        catering: supplier.optional(),
        florist: supplier.optional(),
        music: supplier.optional(),
        makeup: supplier.optional(),
        dress: supplier.optional(),
      })
      .optional(),

    // ── Testimonial from the couple (optional) ────────────────────────────
    /** If present, renders a highlighted quote block AND emits a Review
     *  JSON-LD with itemReviewed: #business. If null/undefined, nothing. */
    testimonial: localizedText.optional().nullable(),

    // ── Gallery layout (optional) ─────────────────────────────────────────
    gallery: z
      .object({
        /** Photo id used as the hero cover, e.g. "001". Defaults to the
         *  first image of the photoSet. */
        cover: z.string().optional(),
        /** Split the gallery into narrative sections. Each section has a
         *  range of photos and a trilingual title. If omitted, the
         *  gallery renders as one uniform grid. */
        sections: z
          .array(
            z.object({
              key: z.string(),
              /** "NNN-NNN", where NNN is 1-based zero-padded photo id
               *  (matches filename convention). e.g. "001-006". */
              range: z.string().regex(/^\d{3}-\d{3}$/),
              title: localizedText,
              intro: localizedText.optional(),
            }),
          )
          .optional(),
      })
      .optional(),

    // ── Narrative content (trilingual) ────────────────────────────────────
    /** Paragraph under the hero. ~400 chars. Empty string = no intro block. */
    content: z
      .object({
        intro: localizedText,
      })
      .optional(),

    // ── SEO (trilingual) ──────────────────────────────────────────────────
    /** When published: true, these override the default title/description
     *  that currently come from the WEDDINGS array. */
    seo: z
      .object({
        title: localizedText,
        description: localizedText,
      })
      .optional(),

    // ── Related cases (slugs of other weddings) ───────────────────────────
    related: z.array(z.string()).default([]),

    // ── Associated blog post (optional) ───────────────────────────────────
    /** If set, a card linking to /blog/<slug> renders at the bottom. Slug
     *  must match an existing blog post; otherwise the block is silently
     *  skipped at render time. */
    blogPost: z.string().optional(),
  }),
});

export const collections = { blog, weddings };
