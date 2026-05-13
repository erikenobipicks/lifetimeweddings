// Usage: node scripts/hash-password.mjs "your password here"
//
// Generates a bcrypt hash you paste into the ADMIN_PASSWORD_HASH env var
// (in Railway for prod, or in .env for local dev). The plaintext is never
// stored — bcrypt is one-way, so if you forget the password you just run
// this again and replace the env var. No recovery needed.

import bcrypt from 'bcryptjs';

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: node scripts/hash-password.mjs "your password"');
  console.error('(Wrap the password in quotes to avoid shell expansion.)');
  process.exit(1);
}

const hash = await bcrypt.hash(pw, 12);
console.log('');
console.log('Paste this into Railway → ADMIN_PASSWORD_HASH (or .env locally):');
console.log('');
console.log('  ' + hash);
console.log('');
console.log('Then redeploy. The plaintext is only in your head — that\'s the point.');
