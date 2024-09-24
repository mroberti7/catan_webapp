import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        catan: {
          red: '#8F1D27',
        },
        primary: '#FABB00',
        secondary: '#FFFFFF',
        dark: '#212529',
      },
      backgroundImage: {
        'catan-bg': "url('/assets/catan-bg-2.png')",
      },
      animation: {
        'ltr-linear-infinite': 'ltr-linear-infinite 50s linear infinite',
      },
      keyframes: {
        'ltr-linear-infinite': {
          from: { 'background-position': '0 0' },
          to: { 'background-position': '500% 0%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
