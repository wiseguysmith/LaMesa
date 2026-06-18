import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // ISD-aligned palette. Legacy names (cream/sand/terracotta/brown/warm)
        // are kept so existing classes keep working, but remapped to ISD colors:
        // deep navy + cyan tech-accent + white + orange highlight.

        // Page + surface neutrals (cool, near-white)
        cream: '#F4F7FB',          // main page background
        sand: '#E6EEF7',           // secondary surfaces / cards

        // Primary = ISD cyan / tech-blue
        terracotta: '#0883A8',       // primary buttons / accents (deep cyan, white-text safe)
        'terracotta-light': '#06B6D4', // bright cyan for hover / highlights

        // Dark anchors = ISD deep navy
        'brown-dark': '#0A1A3A',    // dark sections, headings, footer
        'brown-mid': '#16315E',     // dark secondary

        // Muted text = slate
        'warm-muted': '#5B6B82',

        // Explicit ISD semantic aliases for new code
        navy: '#0A1A3A',
        'navy-mid': '#16315E',
        cyan: '#06B6D4',
        'cyan-deep': '#0883A8',
        'isd-orange': '#F5841F',
        'isd-orange-light': '#FBA94C',
        ink: '#0A1A3A',
        'cool-border': '#DCE4ED',

        // Override Tailwind's default `amber` scale with ISD cyan/tech-blue.
        // The logged-in app uses amber-* utilities as the brand accent; remapping
        // the scale recolors the whole authenticated UI to ISD in one place.
        amber: {
          50: '#ECFBFF',
          100: '#D0F4FB',
          200: '#A5E9F5',
          300: '#6FD8EC',
          400: '#38C3DE',
          500: '#14A8C7',
          600: '#0883A8',
          700: '#0A6E8F',
          800: '#0C586F',
          900: '#0D4255',
        },
      },
    },
  },
  plugins: [],
};
export default config;
