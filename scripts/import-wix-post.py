"""Import a single blog post from the legacy Wix site.

Usage:
    python scripts/import-wix-post.py <slug> <legacy-slug>

Output:
    - src/content/blog/<slug>.md   (frontmatter + clean Markdown)
    - public/blog/<slug>/*.jpg     (original full-resolution images)
"""

import sys
import os
import re
import urllib.parse
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from markdownify import markdownify

ROOT = Path(__file__).resolve().parent.parent

if len(sys.argv) != 3:
    print("Usage: python scripts/import-wix-post.py <slug> <legacy-slug>", file=sys.stderr)
    sys.exit(1)

slug, legacy_slug = sys.argv[1], sys.argv[2]
url = f"https://www.lifetime.photo/post/{urllib.parse.quote(legacy_slug, safe='')}"
print(f"Fetching {url}")

r = requests.get(url, headers={"User-Agent": "Mozilla/5.0 (BlogMigrator)"}, timeout=30)
r.raise_for_status()

soup = BeautifulSoup(r.text, "html.parser")

# ---- Extract metadata ----
def meta(prop):
    el = soup.find("meta", property=prop) or soup.find("meta", attrs={"name": prop})
    return el["content"] if el and el.has_attr("content") else ""

title = meta("og:title")
description = meta("og:description")

# ---- Extract post body ----
content = soup.select_one('[data-hook="post-description"]')
if content is None:
    print("ERROR: post-description section not found", file=sys.stderr)
    sys.exit(1)

# ---- Strip Wix-specific noise ----
# Remove buttons, svgs, scripts, styles, anything purely UI.
for sel in ["button", "svg", "script", "style", "noscript"]:
    for el in content.select(sel):
        el.decompose()

# `<wow-image>` wraps each image — unwrap so the inner <img> is exposed at the top level
for wi in content.find_all("wow-image"):
    wi.unwrap()

# Wix scatters `<wix-...>` custom elements; unwrap them all
for el in content.find_all(re.compile(r"^wix-", re.IGNORECASE)):
    el.unwrap()

# Strip *all* class/id/data-* attributes — pure noise once we render in our own template
for el in content.find_all(True):
    for attr in list(el.attrs):
        if attr in ("class", "id") or attr.startswith("data-"):
            del el.attrs[attr]

# ---- Process images: download originals + rewrite to local paths ----
img_dir = ROOT / "public" / "blog" / slug
img_dir.mkdir(parents=True, exist_ok=True)

seen = {}
for img in content.find_all("img"):
    src = img.get("src") or img.get("data-src") or ""
    if "wixstatic.com/media/" not in src:
        continue
    # Strip /v1/fill/.../ to get the original full-res image
    normalized = re.sub(r"/v1/[^?]*", "", src).split("?")[0]
    filename = os.path.basename(normalized)
    local_path = f"/blog/{slug}/{filename}"

    if normalized not in seen:
        seen[normalized] = local_path
        dest = img_dir / filename
        if not dest.exists():
            resp = requests.get(normalized, headers={"User-Agent": "Mozilla/5.0 (BlogMigrator)"}, timeout=60)
            if resp.ok:
                dest.write_bytes(resp.content)
                kb = len(resp.content) / 1024
                alt = img.get("alt", "")[:60]
                print(f"  ok {filename} ({kb:.0f} KB) - {alt}")
            else:
                print(f"  fail {normalized} -> HTTP {resp.status_code}")

    img["src"] = local_path
    # Strip the srcset and sizes — they pointed to wixstatic
    for a in ("srcset", "sizes", "data-src", "loading"):
        if a in img.attrs:
            del img.attrs[a]

# ---- Convert to Markdown ----
md_body = markdownify(
    str(content),
    heading_style="ATX",            # use # ## ###
    bullets="-",
    strip=["span", "div", "section"],
)

# Tidy whitespace: collapse 3+ blank lines, strip trailing spaces per line
md_body = re.sub(r"\n[ \t]+\n", "\n\n", md_body)
md_body = re.sub(r"\n{3,}", "\n\n", md_body)
md_body = md_body.strip()

# ---- Write file ----
def yaml_escape(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')

frontmatter = (
    "---\n"
    f'title: "{yaml_escape(title)}"\n'
    f'description: "{yaml_escape(description)}"\n'
    f'legacySlug: "{yaml_escape(legacy_slug)}"\n'
    "---\n\n"
)

out_path = ROOT / "src" / "content" / "blog" / f"{slug}.md"
out_path.parent.mkdir(parents=True, exist_ok=True)
out_path.write_text(frontmatter + md_body + "\n", encoding="utf-8")

print(f"\nWrote {out_path} ({len(md_body)} chars body, {len(seen)} images)")
