// Resize an uploaded gallery cover photo for a delivery page.
//
// Runs server-side (node adapter) with sharp — the same library Astro uses
// for its image service, already a dependency. We downscale to a sane max
// width, honour EXIF orientation, strip metadata, and re-encode as a
// progressive JPEG so the stored blob is small (~150–350 KB) regardless of
// what came off a phone camera.

import sharp from 'sharp';

/** Max width of the stored cover. The gallery card is at most ~1000px wide;
 *  1600 keeps it crisp on retina without bloating the blob. */
const MAX_WIDTH = 1600;

export interface ResizedCover {
  image: Uint8Array;
  mime: string;
}

/** Resize + re-encode an image buffer to a web-friendly JPEG. Throws if the
 *  input isn't a decodable image (caller surfaces a friendly error). */
export async function resizeCoverImage(input: Uint8Array | Buffer): Promise<ResizedCover> {
  const out = await sharp(input)
    .rotate() // apply EXIF orientation, then drop it
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    // quality 80 (a touch above photo-default) keeps overlaid text — these
    // covers are pre-designed graphics with a script name on them — crisp.
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toBuffer();
  return { image: new Uint8Array(out), mime: 'image/jpeg' };
}
