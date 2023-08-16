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
        'medium-blue': '#2566A3',
        'border-blue': '#5096FF',
      },
      borderRadius: {
        'medium': '20px',
      }
    },
  },
  plugins: [],
}
