#!/usr/bin/env node
// CI dependency-audit gate. Replaces `npx audit-ci` (unpinned → started
// failing with an internal error) with a self-contained check: no network
// download, deterministic, and we own the logic.
//
// Fails the build on any HIGH/CRITICAL npm-audit advisory except the ones
// allowlisted below. The Astro-6 / sharp framework advisories that used to be
// here were resolved by the Astro 7 upgrade, so the allowlist is now empty —
// the gate is fully strict again. If a future advisory has no non-breaking fix,
// add its GHSA id here with a justification (and a plan to remove it).
import { execSync } from 'node:child_process';

const ALLOW = new Set([
  // (empty — no advisories currently allowlisted)
]);

let raw = '';
try {
  raw = execSync('npm audit --json', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
} catch (e) {
  // npm audit exits non-zero whenever vulns exist — that's expected; use stdout.
  raw = (e.stdout && e.stdout.toString()) || '';
}

let data;
try {
  data = JSON.parse(raw);
} catch {
  console.error('audit-check: could not parse `npm audit --json` output');
  process.exit(1);
}

const blocking = [];
for (const [pkg, v] of Object.entries(data.vulnerabilities || {})) {
  if (v.severity !== 'high' && v.severity !== 'critical') continue;
  const ids = new Set();
  for (const via of v.via || []) {
    if (via && typeof via === 'object' && typeof via.url === 'string') {
      const m = via.url.match(/GHSA-[0-9a-z-]+/i);
      if (m) ids.add(m[0]);
    }
  }
  // Block only when the package has its OWN advisory id(s) not on the
  // allowlist. Packages vulnerable only transitively (via a string ref) carry
  // no id here and are covered by their leaf advisory's allowlist status.
  const unallowed = [...ids].filter((id) => !ALLOW.has(id));
  if (ids.size > 0 && unallowed.length > 0) {
    blocking.push(`${pkg} (${v.severity}): ${unallowed.join(', ')}`);
  }
}

if (blocking.length) {
  console.error('❌ Advisorios HIGH/CRITICAL no permitidos:');
  for (const b of blocking) console.error('  • ' + b);
  console.error('\nRevisa `npm audit`. Si es del framework y no hay fix sin romper, añádelo al allowlist en scripts/audit-check.mjs con justificación.');
  process.exit(1);
}
console.log('✅ npm audit gate OK (solo advisorios high/critical allowlisted presentes).');
