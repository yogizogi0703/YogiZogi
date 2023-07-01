/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  important: true,
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')]
};
