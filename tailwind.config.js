/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas:   'var(--color-canvas)',
        surface:  'var(--color-surface)',
        elevated: 'var(--color-elevated)',
        stroke:   'var(--color-stroke)',
        content:  'var(--color-content)',
        muted:    'var(--color-muted)',
        faint:    'var(--color-faint)',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neu':        'var(--shadow-neu)',
        'neu-sm':     'var(--shadow-neu-sm)',
        'neu-lg':     'var(--shadow-neu-lg)',
        'neu-inset':  'var(--shadow-neu-inset)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tight:    '-0.02em',
      },
    },
  },
  plugins: [],
}
