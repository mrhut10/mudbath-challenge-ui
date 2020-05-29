module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [
              './app/**/*.js'
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          }
        }
      : {})
  }
};