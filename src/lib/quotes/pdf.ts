// Branded quote PDF — "proposta personalitzada" the couple can download
// from the email. Pure pdfkit (no headless browser) so it runs anywhere
// the Node server runs, including Railway.
//
// Returns a Buffer ready to attach to a Resend email. Localised to the
// quote's preferred language. Reuses the PACKS catalog so the PDF always
// matches what the couple sees on /p/<token>.

import PDFDocument from 'pdfkit';
import path from 'node:path';
import { PACKS, getComposedSubpacks, type Pack } from '~/data/packs';
import { SITE } from '~/data/site';
import type { Lang } from '~/i18n/ui';

// Brand palette (mirrors tailwind.config).
const GOLD = '#c9a96e';
const INK = '#1a1a1a';
const CREAM = '#f9f5f0';
const MUTED = '#6b6b6b';

const LOGO_PATH = path.resolve('public/logos/logo-circle-color.png');

interface QuotePdfInput {
  coupleName: string;
  packIds: string[];
  notes: string | null;
  lang: Lang;
}

function copy(lang: Lang) {
  if (lang === 'es') {
    return {
      eyebrow: 'PROPUESTA PERSONALIZADA',
      intro: (c: string) =>
        `${c}, gracias por confiar en nosotros. Aquí tenéis la propuesta que hemos preparado para vuestra boda.`,
      includes: 'Incluye',
      notesHeading: 'Una nota para vosotros',
      ivaNote: 'Precios con IVA incluido.',
      footerTalk: '¿Hablamos? Responded al correo o escribidnos por WhatsApp.',
    };
  }
  if (lang === 'en') {
    return {
      eyebrow: 'PERSONALISED PROPOSAL',
      intro: (c: string) =>
        `${c}, thank you for trusting us. Here is the proposal we put together for your wedding.`,
      includes: 'Includes',
      notesHeading: 'A note for you',
      ivaNote: 'Prices include VAT.',
      footerTalk: 'Shall we talk? Reply to the email or message us on WhatsApp.',
    };
  }
  return {
    eyebrow: 'PROPOSTA PERSONALITZADA',
    intro: (c: string) =>
      `${c}, gràcies per confiar en nosaltres. Aquí teniu la proposta que hem preparat per a la vostra boda.`,
    includes: 'Inclou',
    notesHeading: 'Una nota per a vosaltres',
    ivaNote: 'Preus amb IVA inclòs.',
    footerTalk: 'Parlem? Responeu al correu o escriviu-nos pel WhatsApp.',
  };
}

/** Render the quote to a PDF Buffer. */
export function generateQuotePdf(input: QuotePdfInput): Promise<Buffer> {
  const L = copy(input.lang);
  const packs = input.packIds
    .map((id) => PACKS.find((p) => p.id === id))
    .filter((p): p is Pack => p !== undefined);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 0 });
    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const PAGE_W = doc.page.width; // 595.28pt A4
    const M = 50; // content margin
    const contentW = PAGE_W - M * 2;

    // ─── Header band ──────────────────────────────────────────────────
    const headerH = 150;
    doc.rect(0, 0, PAGE_W, headerH).fill(CREAM);
    try {
      doc.image(LOGO_PATH, M, 34, { width: 56, height: 56 });
    } catch {
      /* logo missing → skip, layout still works */
    }
    doc
      .fillColor(GOLD)
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(L.eyebrow, M, 104, { characterSpacing: 2 });
    doc
      .fillColor(INK)
      .font('Helvetica-Bold')
      .fontSize(22)
      .text(input.coupleName, M, 118, { width: contentW });

    // ─── Intro ────────────────────────────────────────────────────────
    let y = headerH + 24;
    doc
      .fillColor(MUTED)
      .font('Helvetica')
      .fontSize(11)
      .text(L.intro(input.coupleName.split('&')[0].split('+')[0].trim()), M, y, {
        width: contentW,
        lineGap: 3,
      });
    y = doc.y + 20;

    // ─── Packs ──────────────────────────────────────────────────────────
    for (const pack of packs) {
      y = ensureSpace(doc, y, 90, M, PAGE_W);

      // Pack name + price row
      doc.fillColor(INK).font('Helvetica-Bold').fontSize(15).text(pack.name[input.lang], M, y, {
        width: contentW - 90,
      });
      const nameBottom = doc.y;
      doc
        .fillColor(GOLD)
        .font('Helvetica-Bold')
        .fontSize(15)
        .text(pack.price, M, y, { width: contentW, align: 'right' });
      y = Math.max(nameBottom, doc.y) + 8;

      // Includes — expand combos into their sub-packs, then the combo's
      // own synergy bullets, matching the /p/<token> breakdown.
      const subpacks = getComposedSubpacks(pack);
      const blocks: Array<{ title?: string; bullets: string[] }> =
        subpacks.length > 0
          ? [
              ...subpacks.map((sp) => ({ title: sp.name[input.lang], bullets: sp.includes[input.lang] })),
              ...(pack.includes[input.lang].length > 0 ? [{ bullets: pack.includes[input.lang] }] : []),
            ]
          : [{ bullets: pack.includes[input.lang] }];

      doc.fillColor(MUTED).font('Helvetica-Bold').fontSize(8).text(L.includes.toUpperCase(), M, y, {
        characterSpacing: 1.5,
      });
      y = doc.y + 4;

      for (const block of blocks) {
        if (block.title) {
          y = ensureSpace(doc, y, 18, M, PAGE_W);
          doc.fillColor(INK).font('Helvetica-Bold').fontSize(10).text(block.title, M, y);
          y = doc.y + 2;
        }
        for (const bullet of block.bullets) {
          y = ensureSpace(doc, y, 16, M, PAGE_W);
          doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(10).text('•', M + 4, y, { continued: false });
          doc
            .fillColor('#333333')
            .font('Helvetica')
            .fontSize(10)
            .text(bullet, M + 16, y, { width: contentW - 16, lineGap: 1 });
          y = doc.y + 3;
        }
        y += 2;
      }

      // Divider
      y += 8;
      doc.moveTo(M, y).lineTo(PAGE_W - M, y).strokeColor('#e7e0d5').lineWidth(1).stroke();
      y += 16;
    }

    // ─── Notes ──────────────────────────────────────────────────────────
    if (input.notes && input.notes.trim()) {
      y = ensureSpace(doc, y, 70, M, PAGE_W);
      doc.rect(M, y, contentW, rectHeightFor(doc, input.notes, contentW)).fill(CREAM);
      doc
        .fillColor(GOLD)
        .font('Helvetica-Bold')
        .fontSize(8)
        .text(L.notesHeading.toUpperCase(), M + 14, y + 12, { characterSpacing: 1.5 });
      doc
        .fillColor(INK)
        .font('Helvetica')
        .fontSize(10)
        .text(input.notes.trim(), M + 14, doc.y + 4, { width: contentW - 28, lineGap: 2 });
      y = doc.y + 18;
    }

    // ─── Footer ───────────────────────────────────────────────────────
    y = ensureSpace(doc, y, 70, M, PAGE_W);
    y += 6;
    doc.fillColor(MUTED).font('Helvetica').fontSize(9).text(L.ivaNote, M, y);
    y = doc.y + 2;
    doc.fillColor(MUTED).font('Helvetica').fontSize(9).text(L.footerTalk, M, y);
    y = doc.y + 8;
    doc
      .fillColor(INK)
      .font('Helvetica-Bold')
      .fontSize(9)
      .text(`Lifetime Weddings · ${SITE.phoneDisplay} · ${SITE.email}`, M, y);
    doc
      .fillColor(MUTED)
      .font('Helvetica')
      .fontSize(8)
      .text(`${SITE.address.street}, ${SITE.address.city} (${SITE.address.region})`, M, doc.y + 1);

    doc.end();
  });
}

/** If `needed` pt won't fit before the bottom margin, add a page and reset
 *  y to the top. Returns the y to keep drawing at. */
function ensureSpace(doc: PDFKit.PDFDocument, y: number, needed: number, margin: number, pageW: number): number {
  const bottom = doc.page.height - margin;
  if (y + needed > bottom) {
    doc.addPage();
    return margin;
  }
  return y;
}

/** Rough box height for the notes background rect (text height + padding). */
function rectHeightFor(doc: PDFKit.PDFDocument, text: string, width: number): number {
  const h = doc.font('Helvetica').fontSize(10).heightOfString(text.trim(), { width: width - 28, lineGap: 2 });
  return h + 40;
}
