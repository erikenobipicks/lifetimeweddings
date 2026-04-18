// Astro Content Collections — body for migrated Wix blog posts.
// Metadata (title/cover/author/date) lives in src/data/blog.ts; this collection
// only carries the Markdown body + a few overlap fields parsed from the legacy
// HTML during import.

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

export const collections = { blog };
