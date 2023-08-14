/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/HomeScreen/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#001026',
      },
      borderRadius: {
        'medium': '20px',
      }
    },
  },
  plugins: [],
}
