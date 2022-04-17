module.exports = ctx => ({
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'postcss-pxtorem': {
      propList: ['*', '!border*'],
      mediaQuery: false,
    },
    'postcss-em-media-query': {},
    cssnano:
      ctx.env === 'production'
        ? {
            preset: [
              'default',
              {
                zindex: false,
                svgo: false,
                calc: false,
                mergeRules: false,
                normalizeUrl: {
                  stripWWW: false,
                },
              },
            ],
          }
        : false,
  },
});
