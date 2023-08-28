/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/HomeScreen/**/*.{js,jsx,ts,tsx}",
    "./screens/SettingsScreen/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'container': '72px',
      },
      colors: {
        'dark-blue': '#001026',
        'medium-blue-bg': '#2566A3',
        'light-blue': '#104084',
        'light-blue-bg': '#4899E3',
        'br-blue': '#5096FF',
        'br-blue-light': '#8EBBFF',
      },
      borderRadius: {
        'medium': '20px',
      }
    },
  },
  plugins: [],
}
