/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: '#f9f5f0',
        ink: '#1a1a1a',
        gold: '#c9a96e',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.5rem', md: '2rem', lg: '3rem' },
      },
    },
  },
  plugins: [],
};
