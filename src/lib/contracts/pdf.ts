// Render the contract HTML (from ./generate) to a PDF Buffer with pdfkit.
// The template HTML is a constrained set of tags (h2/h3/h4/p/ul/li/strong/
// em/br + a final flex signature paragraph), so we walk it with a small
// renderer using flowing text — pdfkit paginates automatically.

import PDFDocument from 'pdfkit';
import path from 'node:path';
import { parse, type HTMLElement, type Node } from 'node-html-parser';

const GOLD = '#c9a96e';
const INK = '#1a1a1a';
const MUTED = '#555555';
const LOGO_PATH = path.resolve('public/logos/logo-circle-color.png');

export interface ContractPdfInput {
  html: string;
  /** Electronic-acceptance footer line, already localised. Omitted → no
   *  footer (e.g. preview before acceptance). */
  acceptanceLine?: string;
}

interface Run {
  text: string;
  bold: boolean;
  italic: boolean;
}

const NODE_TEXT = 3;

/** Flatten an element's inline content into styled runs. */
function inlineRuns(el: Node, bold = false, italic = false): Run[] {
  const runs: Run[] = [];
  for (const child of el.childNodes) {
    if (child.nodeType === NODE_TEXT) {
      const text = (child as unknown as { rawText: string }).rawText
        .replace(/\s+/g, ' ');
      if (text) runs.push({ text, bold, italic });
    } else {
      const tag = (child as HTMLElement).rawTagName?.toLowerCase();
      const b = bold || tag === 'strong' || tag === 'b';
      const i = italic || tag === 'em' || tag === 'i';
      runs.push(...inlineRuns(child, b, i));
    }
  }
  return runs;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function generateContractPdf(input: ContractPdfInput): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 54, bottom: 54, left: 54, right: 54 } });
    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const contentW = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // Small logo, centred at the very top.
    try {
      doc.image(LOGO_PATH, doc.page.width / 2 - 20, doc.y, { width: 40, height: 40 });
      doc.moveDown(2.6);
    } catch {
      /* logo missing → skip */
    }

    const root = parse(input.html);

    const renderRuns = (runs: Run[], opts: PDFKit.Mixins.TextOptions = {}) => {
      if (runs.length === 0) {
        doc.moveDown(0.4);
        return;
      }
      runs.forEach((r, idx) => {
        const font =
          r.bold && r.italic
            ? 'Helvetica-BoldOblique'
            : r.bold
              ? 'Helvetica-Bold'
              : r.italic
                ? 'Helvetica-Oblique'
                : 'Helvetica';
        doc.font(font).text(decode(r.text), {
          continued: idx < runs.length - 1,
          ...opts,
        });
      });
    };

    for (const node of root.childNodes) {
      if (node.nodeType === NODE_TEXT) {
        const t = (node as unknown as { rawText: string }).rawText.trim();
        if (t) {
          doc.fillColor(INK).fontSize(10);
          renderRuns([{ text: t, bold: false, italic: false }]);
        }
        continue;
      }
      const el = node as HTMLElement;
      const tag = el.rawTagName?.toLowerCase();

      switch (tag) {
        case 'h2':
          doc.moveDown(0.3);
          doc.fillColor(INK).font('Helvetica-Bold').fontSize(15);
          doc.text(decode(el.text.replace(/\s+/g, ' ').trim()), { align: 'center' });
          doc.moveDown(0.8);
          break;
        case 'h3':
          doc.moveDown(0.6);
          doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(11.5);
          doc.text(decode(el.text.replace(/\s+/g, ' ').trim()), { characterSpacing: 1 });
          doc.moveDown(0.3);
          break;
        case 'h4':
          doc.moveDown(0.5);
          doc.fillColor(INK).font('Helvetica-Bold').fontSize(10.5);
          doc.text(decode(el.text.replace(/\s+/g, ' ').trim()));
          doc.moveDown(0.2);
          break;
        case 'br':
          doc.moveDown(0.6);
          break;
        case 'ul':
          doc.fontSize(10);
          for (const li of el.childNodes) {
            if ((li as HTMLElement).rawTagName?.toLowerCase() !== 'li') continue;
            const runs = inlineRuns(li);
            // Bullet + content as one flowing, continued chain (no manual
            // y juggling → pagination stays correct). Hanging indent keeps
            // wrapped lines aligned under the text, not the bullet.
            doc.fillColor(GOLD).font('Helvetica-Bold').text('•  ', {
              continued: true,
              indent: 8,
              align: 'left',
            });
            doc.fillColor(INK);
            renderRuns(runs);
            doc.moveDown(0.15);
          }
          doc.moveDown(0.2);
          break;
        case 'p': {
          // Signature flex line: two spans, space-between.
          const spans = el.querySelectorAll('span');
          const style = el.getAttribute('style') ?? '';
          if (style.includes('space-between') && spans.length === 2) {
            doc.moveDown(0.6);
            const y = doc.y;
            doc.fillColor(INK).font('Helvetica-Bold').fontSize(10);
            doc.text(decode(spans[0].text.replace(/\s+/g, ' ').trim()), doc.page.margins.left, y, {
              width: contentW / 2,
            });
            doc.text(decode(spans[1].text.replace(/\s+/g, ' ').trim()), doc.page.margins.left, y, {
              width: contentW,
              align: 'right',
            });
            doc.moveDown(1);
            break;
          }
          doc.fillColor(INK).fontSize(10);
          renderRuns(inlineRuns(el));
          doc.moveDown(0.35);
          break;
        }
        default:
          // Unknown block — render its text safely.
          if (el.text.trim()) {
            doc.fillColor(INK).fontSize(10);
            renderRuns(inlineRuns(el));
            doc.moveDown(0.3);
          }
      }
    }

    // Electronic-acceptance footer.
    if (input.acceptanceLine) {
      doc.moveDown(1);
      doc
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.width - doc.page.margins.right, doc.y)
        .strokeColor('#ddd')
        .lineWidth(1)
        .stroke();
      doc.moveDown(0.5);
      doc.fillColor(MUTED).font('Helvetica-Oblique').fontSize(8.5).text(input.acceptanceLine);
    }

    doc.end();
  });
}
