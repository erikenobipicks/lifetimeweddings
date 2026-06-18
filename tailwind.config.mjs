import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand colors are defined as CSS custom properties (RGB channels)
        // in src/styles/global.css `:root`. Referencing them through
        // `rgb(var(--x) / <alpha-value>)` keeps Tailwind opacity modifiers
        // (e.g. `bg-gold/5`, `text-gold/30`) working while the canonical
        // values live in a single place.
        cream: 'rgb(var(--cream) / <alpha-value>)', // page background — ivory #f7f4ef
        sand: 'rgb(var(--sand) / <alpha-value>)', // alternating section band #efe9e0
        // `white` is overridden to the warm "paper" tone (#fffdfa) so the
        // hundreds of existing `bg-white` cards/surfaces pick up the
        // editorial off-white without per-component edits.
        white: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)', // muted body text #6f675e
        line: 'rgb(var(--line) / <alpha-value>)', // hairline / borders #ddd4c8
        gold: 'rgb(var(--gold) / <alpha-value>)',
        // Darker, same-hue gold for accessible small text on light
        // backgrounds (eyebrows/labels). See --gold-deep in global.css.
        'gold-deep': 'rgb(var(--gold-deep) / <alpha-value>)',
      },
      fontFamily: {
        // Cormorant Garamond (display/headings, serif, weight 500)
        // Jost (body/UI, 300/400) — light editorial reskin (April 2026)
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.5rem', md: '2rem', lg: '3rem' },
      },
    },
  },
  plugins: [typography],
};
