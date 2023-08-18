/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/HomeScreen/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'container': '70px',
      },
      colors: {
        'dark-blue': '#001026',
        'medium-blue-bg': '#2566A3',
        'light-blue': '#104084',
        'light-blue-bg': '#4899E3',
        'border-blue': '#5096FF',
        'border-blue-light': '#8EBBFF',
      },
      borderRadius: {
        'medium': '20px',
      }
    },
  },
  plugins: [],
}
