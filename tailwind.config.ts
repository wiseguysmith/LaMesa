import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        slab: ['var(--font-roboto-slab)', 'Georgia', 'serif'],
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // ── ISD Brand Palette (Brandbook 2025) ──────────────────────────────

        // Primary
        'isd-navy':       '#264473',   // Primary brand navy (Lilic dark)
        'isd-dark':       '#0f1b2e',   // Darkest bg (Blue dark)
        'isd-dark-green': '#354940',   // Dark section secondary (Green dark)

        // Accent / interactive
        'isd-teal':       '#0eabcd',   // Primary CTA / interactive (Blue intermediate)
        'isd-blue':       '#0196ea',   // Vivid blue
        'isd-mint':       '#c4fddb',   // Mint highlight / button on dark
        'isd-mint-mid':   '#8fcedc',   // Blue midtone
        'isd-lilac':      '#ca86ff',   // Lilac accent
        'isd-green-vivid':'#7cf844',   // Vivid green accent
        'isd-cyan-light': '#ccf4f6',   // Light cyan

        // Neutrals
        'isd-light':      '#efefef',   // Light background
        'isd-white':      '#ffffff',
        'isd-gray':       '#6e7175',   // Muted / body secondary text
        'isd-gray-light': '#e0e0e0',   // Borders / dividers
        'isd-gray-mid':   '#b1b8b8',   // Mid gray

        // Legacy aliases — keep so existing logged-in UI classes don't break
        cream:            '#efefef',
        sand:             '#e0e0e0',
        terracotta:       '#0eabcd',
        'terracotta-light':'#c4fddb',
        'brown-dark':     '#0f1b2e',
        'brown-mid':      '#264473',
        'warm-muted':     '#6e7175',
        navy:             '#0f1b2e',
        'navy-mid':       '#264473',
        cyan:             '#0eabcd',
        'cyan-deep':      '#0196ea',
        'isd-orange':     '#0eabcd',
        'isd-orange-light':'#c4fddb',
        ink:              '#0f1b2e',
        'cool-border':    '#e0e0e0',

        // Remap amber scale → ISD teal (logged-in UI uses amber-* utilities)
        amber: {
          50:  '#f0fdfc',
          100: '#ccf4f6',
          200: '#8fcedc',
          300: '#5bbdd4',
          400: '#0eabcd',
          500: '#0196ea',
          600: '#0eabcd',
          700: '#0a8baa',
          800: '#0a6e8a',
          900: '#0a5270',
        },
      },
      backgroundImage: {
        // ISD gradient presets from brandbook
        'isd-hero':     'linear-gradient(135deg, #0f1b2e 0%, #354940 100%)',
        'isd-light-1':  'linear-gradient(135deg, #efefef 0%, #c4fddb 50%, #ca86ff 100%)',
        'isd-light-2':  'linear-gradient(135deg, #efefef 0%, #ccf4f6 50%, #0196ea 100%)',
        'isd-light-3':  'linear-gradient(135deg, #efefef 0%, #c4fddb 50%, #7cf844 100%)',
        'isd-mint-fade':'linear-gradient(180deg, #c4fddb 0%, #efefef 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
