import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Refined palette — restrained charcoal + one muted teal accent,
        //    champagne reserved for the premium / Control4 tier. ───────────
        background: '#0C0D11',
        surface: '#14161C',
        'surface-2': '#1D2028',
        border: 'rgba(255,255,255,0.08)',
        'border-lit': 'rgba(255,255,255,0.16)',
        // Muted teal accent (kept under `accent`/`signal` so existing classes
        // adopt the refined palette automatically).
        accent: '#5FBEB2',
        signal: '#5FBEB2',
        'accent-glow': 'rgba(95,190,178,0.12)',
        // Champagne "premium" tone (aliased to `gold`/`ember`).
        gold: '#CBA46C',
        ember: '#CBA46C',
        'gold-glow': 'rgba(203,164,108,0.12)',
        'text-primary': '#F3F1EC',
        'text-secondary': '#A2A9B4',
        'text-muted': '#79828F',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-grid': "url('/assets/textures/grid.svg')",
        noise: "url('/assets/textures/noise.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-blue': '0 0 28px rgba(95,190,178,0.14)',
        'glow-signal': '0 0 28px rgba(95,190,178,0.14)',
        'glow-gold': '0 0 28px rgba(203,164,108,0.14)',
        'glow-ember': '0 0 28px rgba(203,164,108,0.14)',
      },
      backdropBlur: {
        glass: '16px',
        'glass-heavy': '24px',
      },
      letterSpacing: {
        label: '0.2em',
        pill: '0.1em',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.15)', opacity: '0' },
        },
        // Signal travelling along a path (dash offset).
        'signal-flow': {
          to: { strokeDashoffset: '-1000' },
        },
        // Node pulse for the system schematic.
        'node-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-ring': 'pulse-ring 5s ease-out infinite',
        'signal-flow': 'signal-flow 3s linear infinite',
        'node-pulse': 'node-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
