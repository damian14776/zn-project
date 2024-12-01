/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./components/**/*.{js,ts,jsx,tsx}",
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'zngly-green': '#03AD51', // Replace with the hex color you find
      },
    },
  },
  plugins: [],
}

