// One-shot: turn the originals in public/photos/quote-page/ into the
// responsive WebP variants we ship on /p/<token>.
//
//   1. Copy/rename originals into public/photos/quote-page/originals/ so
//      Eric can swap them later by editing one source file.
//   2. For each curated slot, emit `<slot>-{640,1080,1600}.webp` at the
//      same aspect ratio as the source. The runtime <picture> srcset
//      picks the right one per viewport width.
//   3. Quality 80 (matches scripts/optimise-images.ts for the rest of
//      the site so the visual feel stays consistent).
//
// Idempotent — re-running overwrites. Run with:  npx tsx scripts/process-quote-photos.mjs
//
// The mapping below is the only thing to edit if Eric uploads more
// photos or wants to reorder the slots.

import sharp from 'sharp';
import { copyFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC_DIR = join(ROOT, 'public', 'photos', 'quote-page');
const ORIG_DIR = join(SRC_DIR, 'originals');

const WIDTHS = [640, 1080, 1600];
const QUALITY = 80;

/** Curated mapping: which uploaded file feeds which slot on /p/<token>.
 *  Slot names are what the Astro template references, so keep them
 *  stable. Reordering is fine; renaming a slot means updating the
 *  template too. */
const SLOTS = [
  // Hero background — landscape, B&W, sets the tone the moment they land.
  { slot: 'hero-yes', source: 'DSC01119.JPG' },
  // Atmospheric break between packs proposal and configurator. Joy +
  // crowd energy — counterweight to the wall of UI underneath.
  { slot: 'moment-lifted-bride', source: 'Idoya&Pau_0622_@Lifetime.weddings.JPG' },
  // Cinematic blur between FAQ and flagship video. Hero shot, lingers.
  { slot: 'moment-couple-blur', source: 'Josep&Eli_0440_by_@Lifetime.weddings.JPG' },
  // Triptych before the video-call CTA — 3 portraits side by side.
  { slot: 'triptych-kiss', source: 'Cristina_Daniel_0566_by_@Lifetime.weddings.JPG' },
  { slot: 'triptych-smoke', source: 'Marta_i Adrià_0637_by_@Lifetime.weddings.JPG' },
  { slot: 'triptych-bouquet', source: "Josep&Eli_0458_by_@Lifetime.weddings.JPG" },
  // Emotional closer before the final CTA — B&W motion blur.
  { slot: 'closer-walk', source: 'Marta_i Adrià_0810_by_@Lifetime.weddings.JPG' },
];

if (existsSync(ORIG_DIR)) await rm(ORIG_DIR, { recursive: true });
await mkdir(ORIG_DIR, { recursive: true });

let totalIn = 0;
let totalOut = 0;
let count = 0;

for (const { slot, source } of SLOTS) {
  const src = join(SRC_DIR, source);
  if (!existsSync(src)) {
    console.warn(`⚠ missing source for slot '${slot}': ${source}`);
    continue;
  }
  // Archive original (so the SRC_DIR ends up with only the WebP outputs
  // shipped to the browser, originals stowed away neatly).
  await copyFile(src, join(ORIG_DIR, source));

  const { size: srcSize } = await sharp(src).metadata().then(async () => {
    const { default: fs } = await import('node:fs/promises');
    return fs.stat(src);
  });
  totalIn += srcSize;

  for (const w of WIDTHS) {
    const out = join(SRC_DIR, `${slot}-${w}.webp`);
    await sharp(src)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    const { size } = await import('node:fs/promises').then((m) => m.stat(out));
    totalOut += size;
  }
  count += 1;
  console.log(`✓ ${slot}  ← ${source}`);
}

// Drop the originals from SRC_DIR (now safely in ORIG_DIR). Keeps the
// public-facing folder lean.
for (const { source } of SLOTS) {
  const p = join(SRC_DIR, source);
  if (existsSync(p)) await rm(p);
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(`\nDone — ${count} slots, ${SLOTS.length * WIDTHS.length} WebP variants.`);
console.log(`Originals: ${mb(totalIn)} MB  →  WebP total: ${mb(totalOut)} MB`);
