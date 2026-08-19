/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF6EF',
        cream: '#F3E8DA',
        'cream-deep': '#EADFC9',
        burgundy: {
          DEFAULT: '#6B1029',
          light: '#8A1D3B',
          dark: '#4A0B1D',
        },
        rose: {
          DEFAULT: '#C98A94',
          light: '#E4B9C0',
          dark: '#A9636F',
        },
        gold: {
          DEFAULT: '#AD8A4E',
          light: '#CDAE79',
          dark: '#8C6D38',
        },
        charcoal: {
          DEFAULT: '#2A2420',
          soft: '#4A4038',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-fade': 'linear-gradient(90deg, transparent, #AD8A4E, transparent)',
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(42, 36, 32, 0.25)',
        card: '0 10px 30px -12px rgba(42, 36, 32, 0.18)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--rot, 0deg))' },
          '50%': { transform: 'translateY(-14px) rotate(var(--rot, 0deg))' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.45)' },
          '70%': { boxShadow: '0 0 0 14px rgba(37, 211, 102, 0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 8s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
