/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4A226E',
        'primary-dark': '#3A1B57',
        accent: '#FFBA32',
        dark: '#000000',
        light: '#FFFFFF',
        gray: {
          dark: '#4D4D4D',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};