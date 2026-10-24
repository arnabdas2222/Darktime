/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#060608',
          900: '#0c0d10',
          850: '#121318',
          800: '#181a20',
          700: '#23262f',
          600: '#353945',
        },
        gold: {
          300: '#f3e3b2',
          400: '#e6ca7b',
          500: '#d4af37',
          600: '#b89228',
          700: '#8c6d1a',
        },
        silver: {
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Cinzel"', '"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
