/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./frontend/src/**/*.{js,jsx,ts,tsx}', './frontend/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
};
