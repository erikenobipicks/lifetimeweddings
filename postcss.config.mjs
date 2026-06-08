// PostCSS pipeline for Tailwind v3.
//
// Astro 6 dropped the `@astrojs/tailwind` integration (it never supported
// Astro 6's peer range), so we wire Tailwind's PostCSS plugin directly — the
// integration did little more than this plus injecting the base styles, which
// we already pull in explicitly via `src/styles/global.css` (`@tailwind base`
// …) in both layouts. `tailwindcss` reads `tailwind.config.mjs` automatically,
// so the theme (custom `gold`/`ink`/`cream` colours, fonts) is unchanged.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
