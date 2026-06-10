/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./html/**/*.{html,js}",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#d70018',
          redHover: '#b80012',
          blue: '#0974e8',
        }
      }
    },
  },
  plugins: [],
}
