import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Brand ─────────────────────────────
        'sk-black':       '#0A0A0A',
        'sk-gold':        '#C9A84C',
        'sk-gold-light':  '#E8C96A',
        'sk-gold-dim':    'rgba(201,168,76,0.15)',
        'sk-text':        '#F5F5F0',
        'sk-muted':       '#8A8A80',
        'sk-subtle':      '#444440',
        // ── Surface (dark layering) ───────────
        'sf-1':           '#111111',
        'sf-2':           '#1A1A1A',
        'sf-3':           '#222222',
        'sf-4':           '#2C2C2A',
        // ── 事業別アクセント ──────────────────
        'gpu-blue':       '#1E3A5F',
        'gpu-blue-light': '#4A7FC1',
        'st-violet':      '#2D1B69',
        'st-violet-light':'#7B6DB5',
        'km-sage':        '#1C3A2B',
        'km-sage-light':  '#4A8C6A',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Noto Serif JP', 'serif'],
        sans:  ['var(--font-inter)',     'Noto Sans JP',  'sans-serif'],
      },
      fontSize: {
        'hero-en': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'hero-ja': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.2' }],
        'label':   ['0.6875rem',              { lineHeight: '1.4',  letterSpacing: '0.12em' }],
      },
      spacing: {
        'section':    '7rem',
        'section-sm': '4rem',
      },
      borderWidth: {
        'gold': '1px',
      },
      animation: {
        'fade-up':  'fadeUp 0.7s ease-out both',
        'fade-in':  'fadeIn 0.5s ease-out both',
        'count-up': 'countUp 0.1s ease-out both',
        'shimmer':  'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      boxShadow: {
        'gold-sm': '0 0 12px rgba(201,168,76,0.12)',
        'gold-md': '0 0 28px rgba(201,168,76,0.18)',
        'card':    '0 1px 0 rgba(255,255,255,0.04) inset',
      },
    },
  },
  plugins: [],
}
export default config
