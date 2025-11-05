// tailwind.config.ts
import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#D87D4A',
        'light-orange': '#FBAF85',
        black: '#101010',
        'off-white': '#FAFAFA',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        h1: ['5rem', { lineHeight: '0.9', letterSpacing: '-2.5px' }], // 80px
        h2: ['2.5rem', { lineHeight: '1' }],                         // 40px
        h3: ['1.75rem', { lineHeight: '1.2', letterSpacing: '2px' }], // 28px
        body: ['1rem', { lineHeight: '1.7' }],                       // 16px
      },
      spacing: {
        18: '4.5rem', // 72px
        24: '6rem',   // 96px
        30: '7.5rem', // 120px
      },
      maxWidth: {
        container: '90rem', // 1440px
      },
      borderRadius: {
        DEFAULT: '0.5rem', // 8px
      },
    },
  },
  plugins: [],
};
export default config;