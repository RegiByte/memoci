const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

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
    plugin(function({addComponents, theme}) {
      addComponents({
        '.react-flow__edge-string .graphix-edge': {
          stroke: theme('colors.blue.400')
        },
        '.react-flow__edge-number .graphix-edge': {
          stroke: theme('colors.lime.400')
        },
        '.react-flow__edge-boolean .graphix-edge': {
          stroke: theme('colors.red.400')
        },
        '.react-flow__edge-json .graphix-edge': {
          stroke: theme('colors.amber.400')
        },
        '.react-flow__edge-array .graphix-edge': {
          stroke: theme('colors.indigo.400')
        },
        '.react-flow__edge-image .graphix-edge': {
          stroke: theme('colors.purple.400')
        },
      })
    })
  ]
}
