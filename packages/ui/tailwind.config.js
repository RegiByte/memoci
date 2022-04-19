const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        green: {
          ...colors.green,
          400: '#800000'
        }
      },
      screens: {
        ...defaultTheme.screens,
      }
    }
  },
  plugins: []
}
