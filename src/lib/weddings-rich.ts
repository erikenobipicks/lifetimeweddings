// Wedding case resolver. Joins the two sources of truth:
//
//   - WEDDINGS array (src/data/weddings.ts) — source of truth for which
//     /bodas/<slug> URLs exist. Rarely touched; keeps legacyUrl redirects.
//   - `weddings` Content Collection (src/content/weddings/*.md) — rich
//     content (intro, venue details, suppliers, testimonial, etc.). Written
//     case-by-case, flipped to `published: true` when the write-up is ready.
//
// The template calls getWeddingCase() per request and branches:
//   mode === 'rich'   → render the editorial case page
//   mode === 'simple' → render the existing gallery-only page (fallback)
//
// Stub guard: even with published:true, if content.intro[lang] or
// seo.title[lang] is missing / starts with "TODO", the entry degrades to
// simple for that locale and logs a warning. This is a safety net — the
// primary guard remains `published: false` by default.
//
// Preview override: ?preview=rich query param forces rich mode, but ONLY in
// dev (import.meta.env.DEV). Stripped from prod builds entirely.

import { getCollection } from 'astro:content';
import { WEDDINGS, type Wedding } from '~/data/weddings';
import type { Lang } from '~/i18n/ui';
import type { CollectionEntry } from 'astro:content';

export type WeddingCase =
  | {
      mode: 'rich';
      legacy: Wedding;
      rich: CollectionEntry<'weddings'>['data'];
      body: string;
    }
  | { mode: 'simple'; legacy: Wedding };

export interface GetWeddingCaseOpts {
  /** Dev-only override. When true, rich is activated regardless of
   *  `published`, but the stub guard still applies. */
  preview?: boolean;
}

export async function getWeddingCase(
  slug: string,
  lang: Lang,
  opts: GetWeddingCaseOpts = {},
): Promise<WeddingCase | null> {
  // WEDDINGS is the registry of valid URLs. Unknown slug → null (→ 404).
  const legacy = WEDDINGS.find((w) => w.slug === slug);
  if (!legacy) return null;

  // Use getCollection() + filter rather than getEntry() to avoid Astro's
  // "Entry X was not found" warnings on the many slugs that don't yet have
  // an MD file. getCollection is internally cached per build.
  const all = await getCollection('weddings');
  const rich = all.find((e) => e.id === slug);
  if (!rich) return { mode: 'simple', legacy };

  const activateRich = rich.data.published || opts.preview === true;
  if (!activateRich) return { mode: 'simple', legacy };

  // Stub guard: never render rich template with placeholder content visible
  // in PRODUCTION. The preview override bypasses this — its whole purpose is
  // to see the layout while content is still being written.
  if (!opts.preview) {
    const intro = rich.data.content?.intro?.[lang]?.trim() ?? '';
    const seoTitle = rich.data.seo?.title?.[lang]?.trim() ?? '';
    const isStub =
      intro === '' ||
      seoTitle === '' ||
      intro.toUpperCase().startsWith('TODO') ||
      seoTitle.toUpperCase().startsWith('TODO');

    if (isStub) {
      console.warn(
        `[weddings] ${slug} (lang=${lang}) published:true but stub content/seo — degrading to simple.`,
      );
      return { mode: 'simple', legacy };
    }
  }

  return { mode: 'rich', legacy, rich: rich.data, body: rich.body ?? '' };
}

/** Parse "NNN-NNN" gallery section range into inclusive numeric bounds.
 *  Invalid input returns null; caller should skip the section. */
export function parseSectionRange(range: string): { from: number; to: number } | null {
  const m = range.match(/^(\d{3})-(\d{3})$/);
  if (!m) return null;
  const from = parseInt(m[1], 10);
  const to = parseInt(m[2], 10);
  if (from < 1 || to < from) return null;
  return { from, to };
}
