/**
 * One-shot image optimisation script.
 *
 *   1. Re-encode every blog image (JPG + existing WebP) to optimised WebP
 *      at max 1600px wide, quality 82. The Wix migration left these at
 *      1-1.5 MB each — we typically squash to <200 KB without visible loss.
 *   2. For each /photos/<wedding>/<NNN>-{sm,md,lg}.jpg, generate a sibling
 *      .webp at the same dimensions. The JPGs stay as <picture> fallback.
 *
 * Idempotent: safe to re-run; existing .webp outputs are overwritten.
 */

import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const BLOG_DIR = join(ROOT, 'public', 'blog');
const PHOTOS_DIR = join(ROOT, 'public', 'photos');

const BLOG_MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

interface Stats {
  before: number;
  after: number;
  count: number;
}
const blog: Stats = { before: 0, after: 0, count: 0 };
const photos: Stats = { before: 0, after: 0, count: 0 };

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function fileSize(p: string): Promise<number> {
  try { return (await stat(p)).size; } catch { return 0; }
}

// ── Blog: collapse everything to optimised WebP ─────────────────────────
async function optimiseBlog(): Promise<void> {
  const files = (await walk(BLOG_DIR)).filter((f) =>
    /\.(jpe?g|webp|png)$/i.test(f),
  );
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const out = file.replace(/\.(jpe?g|webp|png)$/i, '.webp');
    const before = await fileSize(file);
    blog.before += before;
    try {
      // Process to a buffer first because we may be reading and writing the
      // same .webp path — Sharp doesn't like that.
      const buf = await sharp(file)
        .rotate()
        .resize({ width: BLOG_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer();
      const { writeFile } = await import('node:fs/promises');
      await writeFile(out, buf);
      const after = await fileSize(out);
      blog.after += after;
      blog.count += 1;
      // If the input was JPG/PNG (not the .webp output), drop the original.
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        await unlink(file);
      }
    } catch (err) {
      console.warn(`[blog] failed ${file}:`, (err as Error).message);
    }
  }
}

// ── Photos: add WebP siblings without touching the JPGs ────────────────
async function optimisePhotos(): Promise<void> {
  const files = (await walk(PHOTOS_DIR)).filter((f) => /\.jpe?g$/i.test(f));
  for (const file of files) {
    const out = file.replace(/\.jpe?g$/i, '.webp');
    const before = await fileSize(file);
    photos.before += before;
    try {
      await sharp(file)
        .rotate()
        // No resize — we want a 1:1 WebP twin so <source srcset> can pick by
        // viewport width without changing dimensions vs the JPG fallback.
        .webp({ quality: WEBP_QUALITY })
        .toFile(out);
      const after = await fileSize(out);
      photos.after += after;
      photos.count += 1;
    } catch (err) {
      console.warn(`[photos] failed ${file}:`, (err as Error).message);
    }
  }
}

function mb(b: number): string {
  return (b / 1024 / 1024).toFixed(1) + ' MB';
}

await optimiseBlog();
await optimisePhotos();

console.log('— blog: %d files, %s → %s (%d%% reduction)',
  blog.count,
  mb(blog.before),
  mb(blog.after),
  blog.before > 0 ? Math.round((1 - blog.after / blog.before) * 100) : 0,
);
console.log('— photos: %d webp siblings, %s of JPGs → +%s of webp (size delta varies per file)',
  photos.count,
  mb(photos.before),
  mb(photos.after),
);
