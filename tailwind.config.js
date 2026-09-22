/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palegreen: {
          25: '#F7FAF8',
          50: '#F0F6F2',
          100: '#E6F0E9',
          200: '#D5E6DA',
          300: '#BED9C6',
          400: '#9FC6AC',
          500: '#7FA88E',
        },
        gold: {
          50: '#FDFBF7',
          100: '#F9F4E8',
          200: '#F2E6C9',
          300: '#E5D09E',
          400: '#DFBA73',
          500: '#C5A25D',
          600: '#A8843C',
          700: '#87672D',
          800: '#684E22',
          900: '#4E3A19',
        },
        namnilam: {
          deep: '#0B1F17',
          50: '#F0F9F5',
          100: '#DCF1E7',
          200: '#BCE4D2',
          300: '#8DD1B4',
          400: '#54B791',
          500: '#2E9B73',
          600: '#1D7D5B',
          700: '#17644A',
          800: '#0F4A38',
          900: '#0C382A',
          950: '#062018',
        },
        wa: {
          light: '#25D366',
          DEFAULT: '#128C7E',
          dark: '#075E54',
          chatbg: '#EFEAE2',
          bubbleOut: '#D9FDD3',
          bubbleIn: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(12, 56, 42, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 30px -4px rgba(12, 56, 42, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'float': '0 20px 40px -10px rgba(12, 56, 42, 0.1), 0 1px 3px rgba(0,0,0,0.05)',
      },
      animation: {
        'scan': 'scan 2.4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.9' },
          '50%': { transform: 'translateY(190px)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
