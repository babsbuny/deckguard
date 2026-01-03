import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#050505',
        'bg-card': '#121212',
        'bg-surface': '#1a1a1a',
        'text-primary': '#E5E5E5',
        'text-secondary': '#A3A3A3',
        'border-color': '#333333',
        'go': '#00FF94',
        'hold': '#FFD600',
        'no-go': '#FF003C',
        'brand-blue': '#2563EB',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
