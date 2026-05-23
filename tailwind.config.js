/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe8ee',
          200: '#ffd1df',
          300: '#ffb3cc',
          400: '#ff8fb3',
          500: '#f4729a',
          600: '#e05580',
          700: '#c43d66',
        },
        lilac: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        cream: {
          50: '#fffcf9',
          100: '#fff8f0',
          200: '#fff0e0',
        },
        mint: {
          100: '#e0f5ef',
          200: '#b8e8d8',
          300: '#8fd9c2',
          400: '#6bc4a8',
        },
      },
      fontFamily: {
        sans: ['"Gowun Dodum"', 'system-ui', 'sans-serif'],
        display: ['Jua', '"Gowun Dodum"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(244, 114, 154, 0.18)',
        card: '0 8px 32px -8px rgba(168, 85, 247, 0.12)',
        glow: '0 0 40px rgba(255, 179, 204, 0.35)',
      },
      backgroundImage: {
        'dreamy': 'linear-gradient(135deg, #fff5f7 0%, #faf5ff 40%, #fff8f0 100%)',
        'hero': 'linear-gradient(135deg, #ffb3cc 0%, #e9d5ff 50%, #ffd1df 100%)',
      },
    },
  },
  plugins: [],
};
