import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      roboto: ['var(--font-roboto)', 'sans-serif'],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
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
        blink: 'blink 3s infinite',
        'ltr-linear-infinite': 'ltr-linear-infinite 50s linear infinite',
        slideRight: 'slideRight 0.90s ease-in',
        slideLeft: 'slideLeft 0.90s ease-out',
        slideBottom: 'slideBottom 0.30s ease-in',
      },
      keyframes: {
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'black' },
        },
        'ltr-linear-infinite': {
          from: { 'background-position': '0 0' },
          to: { 'background-position': '500% 0%' },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)', display: 'none' },
          '100%': { transform: 'translateX(0px)', display: 'block' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(0px)', display: 'block' },
          '100%': { transform: 'translateX(100%)', display: 'none' },
        },
        slideBottom: {
          '0%': { transform: 'translateY(100%)', display: 'none' },
          '100%': { transform: 'translateY(0px)', display: 'block' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
