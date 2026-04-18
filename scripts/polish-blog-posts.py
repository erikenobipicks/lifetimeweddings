"""Auto-clean common Wix-import artifacts in blog markdown.

Walks src/content/blog/*.md and applies idempotent fixes:
  - Strip bold/italic from inside headings (## **Foo**  ->  ## Foo)
  - Add a space after action emojis when glued to text (👉text -> 👉 text)
  - Collapse heading lines that ended up empty
  - Normalize double colons / lone punctuation lines
  - Squash 3+ blank lines down to 2
  - Trim trailing whitespace on every line
  - Ensure single blank line between block elements

Skips the file we already hand-polished (7-errores-...) so we don't undo work.
"""

import re
import sys
import io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "src" / "content" / "blog"

ALREADY_POLISHED = {"7-errores-al-contratar-fotografo-de-boda"}

# Emojis that often glue to text in Wix exports
GLUED_EMOJIS = ["👉", "✅", "❌", "📸", "📽️", "🎬", "💍", "⭐", "💡", "🔥", "💯", "🚀"]


def split_frontmatter(text):
    """Split YAML frontmatter (--- ... ---) from the body."""
    if not text.startswith("---\n"):
        return "", text
    end = text.find("\n---\n", 4)
    if end == -1:
        return "", text
    return text[: end + 5], text[end + 5 :]


def clean_heading(line):
    """Strip ** and * wrappers from inside a heading; drop empty headings."""
    m = re.match(r"^(#{1,6})\s*(.*)$", line)
    if not m:
        return line
    hashes, content = m.groups()
    content = content.strip()
    # Strip surrounding bold/italic if the *whole* heading is wrapped
    while True:
        if content.startswith("**") and content.endswith("**") and len(content) > 4:
            content = content[2:-2].strip()
        elif content.startswith("*") and content.endswith("*") and len(content) > 2 and not content.startswith("**"):
            content = content[1:-1].strip()
        else:
            break
    # Also strip inline bold that wraps everything except trailing punctuation
    # e.g. "**Cómo evitarlo:**" -> "Cómo evitarlo:"
    m2 = re.match(r"^\*\*(.+?)\*\*([:.,;!?]*)$", content)
    if m2:
        content = m2.group(1).strip() + m2.group(2)
    # Drop trailing colon-and-period combos
    content = re.sub(r"\s+", " ", content).strip()
    return f"{hashes} {content}" if content else ""


def add_emoji_spaces(text):
    """Insert a space after a leading-emoji prefix when glued to a word.
    Also break "**:** EMOJI text" patterns where Wix glued sentences together
    by inserting a paragraph break before the emoji."""
    for em in GLUED_EMOJIS:
        # emoji followed immediately by a word character (letter/digit) -> add space
        text = re.sub(re.escape(em) + r"(?=\w)", em + " ", text)
        # colon-emoji-text patterns: ":👉text" -> ": 👉 text"
        text = re.sub(r"(:)" + re.escape(em), r"\1 " + em, text)
        # When the emoji follows "**.** " (closed bold sentence) → newline first
        text = re.sub(r"(\*\*[\.:!?]\s*)" + re.escape(em), r"\1\n\n" + em, text)
    return text


def polish(body):
    out_lines = []
    in_code = False
    for raw in body.splitlines():
        line = raw.rstrip()

        # Toggle fenced code blocks (don't touch their contents)
        if line.startswith("```"):
            in_code = not in_code
            out_lines.append(line)
            continue
        if in_code:
            out_lines.append(line)
            continue

        # Heading cleanup (also catches bare "###" without trailing space)
        if re.match(r"^#{1,6}(\s|$)", line):
            cleaned = clean_heading(line)
            if cleaned:
                out_lines.append(cleaned)
            continue

        # Skip lone punctuation lines (artifact of Wix splits)
        if re.match(r"^[\s\.\,\:;\-]+$", line):
            continue

        out_lines.append(line)

    text = "\n".join(out_lines)

    # Add spaces after emojis (whole-body, safe regex)
    text = add_emoji_spaces(text)

    # Collapse 3+ blank lines to 2 (i.e. one empty line between blocks)
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Strip trailing blank lines
    text = text.rstrip() + "\n"

    return text


def main():
    files = sorted(BLOG_DIR.glob("*.md"))
    print(f"Found {len(files)} post(s)\n")

    for path in files:
        if path.stem in ALREADY_POLISHED:
            print(f"  skip   {path.name}  (already hand-polished)")
            continue
        original = path.read_text(encoding="utf-8")
        fm, body = split_frontmatter(original)
        new_body = polish(body)
        new_text = fm + new_body if fm else new_body
        if new_text == original:
            print(f"  noop   {path.name}")
            continue
        path.write_text(new_text, encoding="utf-8")
        delta = len(new_text) - len(original)
        sign = "+" if delta >= 0 else ""
        print(f"  ok     {path.name}  ({sign}{delta} chars)")


if __name__ == "__main__":
    main()
