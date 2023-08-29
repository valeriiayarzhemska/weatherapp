/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './screens/**/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      width: {
        'container': '70px',
        'metric': '95px',
      },
      height: {
        'input': '62px',
      },
      lineHeight: {
        'middle': '22px',
      },
      colors: {
        'dark-blue': '#001026',
        'medium-blue-bg': '#2566A3',
        'light-blue': '#104084',
        'light-blue-bg': '#4899E3',
        'br-blue': '#5096ff',
        'br-blue-light': '#8ebbff',
      },
      borderWidth: {
        'min': '1px',
      },
      borderRadius: {
        'medium': '20px',
      }
    },
  },
  plugins: [],
}
