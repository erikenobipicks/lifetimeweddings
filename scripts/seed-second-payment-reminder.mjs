// One-shot seed for local/CLI use: insert the studio's default email
// sequences (currently the "2n pagament · recordatori 14 dies" reminder).
// Idempotent — re-running skips slugs that already exist.
//
// NOTE: this writes to whatever DATABASE_URL points at. For production
// (Railway) prefer the one-click button on /admin/sequences instead, which
// runs the same seed against the live DB without needing a shell.
//
// Run from the project root: npx tsx scripts/seed-second-payment-reminder.mjs

import { seedDefaultSequences } from '../src/lib/bookings/sequences.ts';

const { created, skipped } = await seedDefaultSequences();
if (created.length) console.log('created:', created.join(', '));
if (skipped.length) console.log('skipped (already existed):', skipped.join(', '));
if (!created.length && !skipped.length) console.log('nothing to seed');
