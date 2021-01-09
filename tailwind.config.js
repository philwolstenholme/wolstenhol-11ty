const plugin = require('tailwindcss/plugin');

module.exports = {
  important: true,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: false,
  },
  theme: {
    extend: {
      colors: {
        medium: {
          DEFAULT: '#228665',
          dark: '#1e785a',
        },
        foursquare: {
          DEFAULT: '#DC3068',
          dark: '#ce225a',
        },
      },
      boxShadow: {
        hard: '2px 2px 0 rgba(0,0,0,.15)',
      },
      fontFamily: {
        serif: ['"Roboto Slab"', 'serif'],
      },
      maxWidth: {
        container: '71rem',
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            h1: {
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            h2: {
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            h3: {
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            h4: {
              fontFamily: theme('fontFamily.serif').join(', '),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      textColor: ['hocus', 'group-hocus'],
      backgroundColor: ['hocus', 'group-hocus'],
      transform: ['hover', 'focus', 'hocus', 'group-hocus'],
      translate: ['hover', 'focus', 'hocus', 'group-hocus'],
      height: ['hover', 'focus', 'hocus', 'group-hocus'],
      textDecoration: ['hocus', 'group-hocus'],
      opacity: ['hocus', 'group-hocus'],
      rotate: ['hocus', 'group-hocus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-scroll-snap'),
    require('tailwindcss-interaction-variants'),
    // plugin(function ({ addVariant, e }) {
    //   addVariant('target', ({ modifySelectors, separator }) => {
    //     modifySelectors(({ className }) => {
    //       return `.${e(`target${separator}${className}`)}:target`;
    //     });
    //   });
    // }),
  ],
};
