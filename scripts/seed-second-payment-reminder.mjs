// One-shot seed: insert the "2n pagament · recordatori 14 dies" email
// sequence used by the per-booking cron (`days_before_wedding` trigger,
// 14 days offset). Idempotent — re-running detects the slug and skips.
//
// Run with: npx tsx scripts/seed-second-payment-reminder.mjs
//
// The text is drafted to mirror Eric's existing tone (see auto-reply +
// reserva confirmation copy). He can edit it from /admin/sequences after
// seeding — this script just guarantees the row exists.

import { db, initSchema } from '../src/lib/db.ts';
import { createSequence } from '../src/lib/bookings/sequences.ts';

await initSchema();

const slug = 'recordatori-2n-pagament-14d';
const existing = await db.execute({
  sql: 'SELECT id FROM email_sequences WHERE slug = ?',
  args: [slug],
});
if (existing.rows.length > 0) {
  console.log(`already exists (id=${existing.rows[0].id}) — skipping insert`);
  process.exit(0);
}

const subject = {
  ca: 'Recordatori del segon pagament · {couple}',
  es: 'Recordatorio del segundo pago · {couple}',
  en: 'Reminder: second payment · {couple}',
};

const bodyHtml = {
  ca: `
<p>Hola {n1} i {n2},</p>
<p>En 14 dies arriba el casament, i toca el <strong>segon pagament</strong> de la vostra reserva.</p>
<p>El podeu fer per:</p>
<ul>
  <li><strong>Transferència bancària</strong> — feu servir la mateixa referència que la del dipòsit. (Si l'heu perdut, escriviu-nos i us la tornem a passar.)</li>
  <li><strong>Targeta</strong> — <a href="{public_site_url}/reserva/{slug}#pagament">des de la vostra pàgina segura</a>.</li>
</ul>
<p>Si teniu qualsevol dubte sobre l'import o la data, responeu aquest correu o escriviu-nos pel WhatsApp. Ens veiem aviat!</p>
<p>Ferran i Eric<br/>Lifetime</p>
  `.trim(),
  es: `
<p>Hola {n1} y {n2},</p>
<p>En 14 días llega la boda, y toca el <strong>segundo pago</strong> de vuestra reserva.</p>
<p>Lo podéis hacer por:</p>
<ul>
  <li><strong>Transferencia bancaria</strong> — usad la misma referencia que la del depósito. (Si la habéis perdido, escribidnos y os la pasamos de nuevo.)</li>
  <li><strong>Tarjeta</strong> — <a href="{public_site_url}/reserva/{slug}#pagament">desde vuestra página segura</a>.</li>
</ul>
<p>Si tenéis cualquier duda sobre el importe o la fecha, responded este correo o escribidnos por WhatsApp. ¡Nos vemos pronto!</p>
<p>Ferran y Eric<br/>Lifetime</p>
  `.trim(),
  en: `
<p>Hi {n1} and {n2},</p>
<p>The wedding is 14 days away, and the <strong>second payment</strong> for your booking is now due.</p>
<p>You can pay via:</p>
<ul>
  <li><strong>Bank transfer</strong> — use the same reference as the deposit. (If you've misplaced it, drop us a line and we'll send it again.)</li>
  <li><strong>Card</strong> — <a href="{public_site_url}/reserva/{slug}#pagament">from your secure page</a>.</li>
</ul>
<p>If you have any questions about the amount or the date, reply to this email or message us on WhatsApp. See you very soon!</p>
<p>Ferran and Eric<br/>Lifetime</p>
  `.trim(),
};

const id = await createSequence({
  slug,
  enabled: true,
  triggerKind: 'days_before_wedding',
  triggerOffsetDays: 14,
  formKind: null,
  subject,
  bodyHtml,
});

console.log(`seeded sequence id=${id} (slug=${slug})`);
