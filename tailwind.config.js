/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#060F1E',
          900: '#0A1628',
          800: '#0D1B35',
          700: '#111F35',
          600: '#1A2B4A',
          500: '#243355',
          400: '#2E3F66',
        },
        teal: {
          300: '#4DFFF0',
          400: '#00E5D3',
          500: '#00C9B8',
          600: '#00A896',
          700: '#007D70',
        },
        sky: {
          400: '#389FFF',
          500: '#2B8FEF',
        },
      },
      animation: {
        'float':         'float 8s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out infinite 3s',
        'float-slow':    'float 14s ease-in-out infinite 1.5s',
        'pulse-slow':    'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow':          'glow 3s ease-in-out infinite',
        'slide-up':      'slideUp 0.4s ease-out forwards',
        'log-enter':     'logEnter 0.2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%':       { transform: 'translateY(-30px) translateX(15px) rotate(2deg)' },
          '66%':       { transform: 'translateY(20px) translateX(-20px) rotate(-1deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,201,184,0.3)' },
          '50%':       { boxShadow: '0 0 40px rgba(0,201,184,0.6)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        logEnter: {
          from: { opacity: 0, transform: 'translateX(-8px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
