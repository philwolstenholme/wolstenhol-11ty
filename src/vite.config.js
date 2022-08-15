const { defineConfig } = require('vite');
const { splitVendorChunkPlugin } = require('vite');
import htmlMinimize from '@sergeymakinen/vite-plugin-html-minimize';
import inspect from 'vite-plugin-inspect';
// import sri from '@small-tech/vite-plugin-sri';

const addNoscriptCss = () => {
  return {
    name: 'add-noscript-css',
    transformIndexHtml(html, { chunk }) {
      const tags = [];

      Array.from(chunk.viteMetadata.importedCss, assetUrl => {
        tags.push({
          tag: 'noscript',
          children: [
            {
              tag: 'link',
              attrs: {
                rel: 'stylesheet',
                href: `/${assetUrl}`,
              },
            },
          ],
          injectTo: 'body',
        });
      });

      return {
        html,
        tags,
      };
    },
  };
};

const workaroundForUsingAlpineAndVueBindingTogether = () => {
  // Only works in build.
  return {
    name: 'workaround-for-using-alpine-and-vue-binding-together',
    transformIndexHtml(html) {
      return html.replace(/-alpine-/gm, '.');
    },
  };
};

module.exports = defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    inspect(),
    // sri(),
    addNoscriptCss(),
    workaroundForUsingAlpineAndVueBindingTogether(),
    htmlMinimize({
      collapseWhitespace: true,
      conservativeCollapse: true,
      html5: true,
      keepClosingSlash: true,
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: false,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      decodeEntities: false,
      sortAttributes: true,
      sortClassName: true,
      customAttrCollapse: /x-bind\:class|x-init|x-style/,
    }),
  ],
  build: {
    emptyOutDir: true,
  },
});
