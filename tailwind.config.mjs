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
        cream: 'rgb(var(--cream) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        // Darker, same-hue gold for accessible small text on light
        // backgrounds (eyebrows/labels). See --gold-deep in global.css.
        'gold-deep': 'rgb(var(--gold-deep) / <alpha-value>)',
      },
      fontFamily: {
        // Fraunces (display/headings, variable with SOFT axis)
        // Inter (body/UI) — replaces Lato (too generic / overused)
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.5rem', md: '2rem', lg: '3rem' },
      },
    },
  },
  plugins: [typography],
};
