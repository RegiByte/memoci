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
      },
      animation: {
        'blink': 'blink 2s linear infinite'
      },
      keyframes: {
        '0%': {
          opacity: '100%'
        },
        '50%': {
          opacity: '50%'
        },
        '100%': {
          opacity: '100%'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ]
}
