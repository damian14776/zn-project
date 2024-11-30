/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // Make sure it includes all React files
    './public/index.html', // If you're using a custom index.html
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

