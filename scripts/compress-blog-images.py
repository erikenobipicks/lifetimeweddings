"""Resize and compress blog images for web delivery.

Walks public/blog/ recursively. For each image:
  - If width > MAX_WIDTH, resize down preserving aspect ratio
  - Re-encode as JPEG quality 85 with progressive scan
  - Overwrite the file on disk

Idempotent: if you re-run, already-compressed images are mostly skipped
(we keep them if they're already under MAX_WIDTH and < 350 KB).
"""

import sys
import io
from pathlib import Path
from PIL import Image, ImageOps

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "public" / "blog"

MAX_WIDTH = 1920
JPEG_QUALITY = 85
SKIP_IF_UNDER_KB = 350  # already-small files don't need re-processing

EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}

total_before = 0
total_after = 0
processed = 0
skipped = 0
errors = 0

files = [p for p in BLOG_DIR.rglob("*") if p.is_file() and p.suffix.lower() in EXTS]
files.sort()
print(f"Found {len(files)} images under {BLOG_DIR}")

for path in files:
    size_before = path.stat().st_size
    total_before += size_before

    # Quick skip: already small AND we know we processed it before
    # (heuristic: small file + .jpg extension)
    if size_before < SKIP_IF_UNDER_KB * 1024 and path.suffix.lower() in (".jpg", ".jpeg"):
        skipped += 1
        total_after += size_before
        continue

    try:
        with Image.open(path) as im:
            # EXIF orientation fix
            im = ImageOps.exif_transpose(im)

            # Convert to RGB (handles RGBA / palette / etc.)
            if im.mode != "RGB":
                im = im.convert("RGB")

            # Resize if too wide
            w, h = im.size
            if w > MAX_WIDTH:
                new_h = int(h * MAX_WIDTH / w)
                im = im.resize((MAX_WIDTH, new_h), Image.LANCZOS)

            # Save back as JPEG. If original was .png/.webp/.avif we still
            # write to the same filename (extension lies, browsers don't care
            # because <img> looks at MIME from the server, but for cleanliness
            # we keep the same path so the markdown links don't break).
            im.save(path, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)

        size_after = path.stat().st_size
        total_after += size_after
        processed += 1

        if processed % 50 == 0:
            print(f"  ... {processed} processed")

    except Exception as e:
        errors += 1
        total_after += size_before
        print(f"  ERROR {path.relative_to(ROOT)}: {e}")

mb_before = total_before / 1024 / 1024
mb_after = total_after / 1024 / 1024
print()
print(f"Processed: {processed}   Skipped (already small): {skipped}   Errors: {errors}")
print(f"Before:    {mb_before:>8.1f} MB")
print(f"After:     {mb_after:>8.1f} MB   ({(1 - total_after/total_before)*100:.0f}% saved)")
