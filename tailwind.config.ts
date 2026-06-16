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
        cream: '#FDF6EC',
        sand: '#F5E6D0',
        terracotta: '#C2622D',
        'terracotta-light': '#E07848',
        'brown-dark': '#2D1B0E',
        'brown-mid': '#5C3A1E',
        'warm-muted': '#8C7B6B',
      },
    },
  },
  plugins: [],
};
export default config;
