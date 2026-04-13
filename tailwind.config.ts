import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#141414',
        'surface-2': '#1A1A1A',
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          dark: '#9A7A30',
          muted: 'rgba(201,168,76,0.15)',
        },
        text: {
          primary: '#F5F5F0',
          secondary: '#B0AFA8',
          muted: '#6B6A63',
        },
        gpu: {
          DEFAULT: '#1E3A5F',
          light: '#2A5080',
          glow: 'rgba(30,58,95,0.4)',
        },
        staffing: {
          DEFAULT: '#2D1B69',
          light: '#3D2585',
          glow: 'rgba(45,27,105,0.4)',
        },
        kominka: {
          DEFAULT: '#1C3A2B',
          light: '#264D3A',
          glow: 'rgba(28,58,43,0.4)',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Noto Serif JP', 'Georgia', 'serif'],
        sans: ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #141414 100%)',
        'hero-radial': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)',
        'gpu-gradient': 'linear-gradient(135deg, #1E3A5F 0%, #0A1628 100%)',
        'staffing-gradient': 'linear-gradient(135deg, #2D1B69 0%, #110A28 100%)',
        'kominka-gradient': 'linear-gradient(135deg, #1C3A2B 0%, #0A1611 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
        'line-grow': 'lineGrow 1s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 20px rgba(201,168,76,0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(201,168,76,0.6)' },
        },
        lineGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(201,168,76,0.3)',
        'gold-lg': '0 0 60px rgba(201,168,76,0.4)',
        'inner-gold': 'inset 0 1px 0 rgba(201,168,76,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.6)',
      },
      borderColor: {
        DEFAULT: 'rgba(201,168,76,0.2)',
      },
    },
  },
  plugins: [],
}

export default config
