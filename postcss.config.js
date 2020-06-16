const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const fullhuman = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins : [
    tailwindcss('./tailwind.config.js'),
    autoprefixer,
  ],
};