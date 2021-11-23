const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

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
        gray: colors.trueGray,
        medium: {
          DEFAULT: '#228665',
          dark: '#1e785a',
        },
        foursquare: {
          DEFAULT: '#DC3068',
          dark: '#ce225a',
        },
        spotify: {
          DEFAULT: '#1DB954',
          dark: '#1aa64b',
        },
        instagram: {
          DEFAULT: '#E0294C',
          dark: '#b91a39',
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
      cursor: {
        help: 'help',
      },
      fill: {
        blacK: colors.black,
      },
    },
  },
  variants: {
    extend: {
      display: ['js', 'no-js', 'group-hocus', 'group-focus'],
      textColor: ['hocus', 'group-hocus', 'group-focus'],
      backgroundColor: ['hocus', 'group-hocus', 'group-focus'],
      transform: ['hover', 'focus', 'hocus', 'group-hocus'],
      translate: ['hover', 'focus', 'hocus', 'group-hocus'],
      scale: ['group-focus-within', 'group-hover', 'group-hocus', 'hocus'],
      height: ['hover', 'focus', 'hocus', 'group-hocus'],
      textDecoration: ['hocus', 'group-hocus', 'group-focus-within'],
      opacity: ['hocus', 'group-hocus'],
      rotate: ['hocus', 'group-hocus'],
      ringWidth: ['focus', 'group-focus'],
      ringColor: ['focus', 'group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-scroll-snap'),
    require('tailwindcss-interaction-variants'),
    plugin(function ({ addVariant, e }) {
      addVariant('js', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.js .${e(`js${separator}${className}`)}`;
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant('no-js', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.no-js .${e(`no-js${separator}${className}`)}`;
        });
      });
    }),
  ],
};
