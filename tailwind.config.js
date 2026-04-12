/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neu: {
          bg: '#E8ECF1',
          dark: '#A3B1C6',
          light: '#FFFFFF',
        },
        ink: {
          primary: '#2D3748',
          muted: '#718096',
          faint: '#A0AEC0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neu: '8px 8px 15px #A3B1C6, -8px -8px 15px #FFFFFF',
        'neu-sm': '4px 4px 8px #A3B1C6, -4px -4px 8px #FFFFFF',
        'neu-lg': '12px 12px 24px #A3B1C6, -12px -12px 24px #FFFFFF',
        'neu-inset': 'inset 6px 6px 10px #A3B1C6, inset -6px -6px 10px #FFFFFF',
        'neu-inset-sm': 'inset 3px 3px 6px #A3B1C6, inset -3px -3px 6px #FFFFFF',
      },
    },
  },
  plugins: [],
}

