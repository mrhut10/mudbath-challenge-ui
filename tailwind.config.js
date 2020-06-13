const tailwindcssTextShadow = require('tailwindcss-textshadow')
const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindcssAspectRatio = require('tailwindcss-aspect-ratio');


module.exports = {
  plugins: [
    tailwindcssTextShadow
  ],
  variants: {
  },
  theme: {
    screens: {
      'xxsm': '360px',
      'xsm': '520px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      aspectRatio: {
        square: [1, 1],
      },
      fontFamily: {
        'sans': ["Roboto", ...defaultTheme.fontFamily.sans],
        'logo': ["Fira Code"]
      },
      colors: {
        'mainbg': '#D3D9DC',
        'cardbg': '#EBEBEB',
        'buttonbg':'#E4ECF0',
        'buttonbord':'#9ABFD2',
        'linecolor': '#86A8BA',
        'dark': '#082F44',
        'medium': '#39637A',
        'light': '#00BDFF',
        'disabled': '#6A6A6A',
        'deemphgrey':'#A2B4BE'
      },
      boxShadow: {
        card: '0px 6px 5px rgba(0, 0, 0, 0.006), 0px 4px 4px rgba(0, 0, 0, 0.25)'
      },
      textShadow: {
        default: '0 2px 1px rgba(0, 0, 0, 0.12)',
        link: '0 1px 1px rgba(0, 0, 0, 0.12)',
        h1: '0 0 3px #FF0000, 0 0 5px #0000FF',
        xl: '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
        none: 'none',
      },
    },
  }
}