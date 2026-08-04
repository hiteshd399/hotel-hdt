/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Luxury hotel palette
        gold: {
          DEFAULT: '#C9A227',
          light: '#D4AF37',
          dark: '#9B7D1F',
          50: '#FBF7E8',
          100: '#F5EDC8',
          200: '#EBDB95',
          300: '#DBC45C',
          400: '#C9A227',
          500: '#A8861A',
          600: '#876914',
          700: '#6B5210',
          800: '#4F3C0C',
          900: '#332608',
        },
        ink: {
          DEFAULT: '#0E0E0E',
          light: '#1B1B1B',
          lighter: '#262626',
          card: '#161616',
        },
        cream: '#F5F1E8',
      },
      fontFamily: {
        // Body & UI sans
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Display serif for headings
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        // Hand-written accents
        script: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #D4AF37 50%, #9B7D1F 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0E0E0E 0%, #1B1B1B 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(14,14,14,0.3) 0%, rgba(14,14,14,0.7) 60%, rgba(14,14,14,1) 100%)',
      },
      boxShadow: {
        'gold': '0 10px 40px -10px rgba(201, 162, 39, 0.35)',
        'gold-lg': '0 20px 60px -10px rgba(201, 162, 39, 0.5)',
        'card': '0 20px 50px -20px rgba(0, 0, 0, 0.8)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(30px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      backdropBlur: { xs: '2px' },
      transitionTimingFunction: {
        'lux': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
