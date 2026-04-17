// Load .env into process.env exactly once. Import this from any module that
// reads `process.env.*` (db, auth, email) so values are available both in
// Astro dev and in the production Node build.

import 'dotenv/config';
