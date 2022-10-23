const { defineConfig } = require('vite');
const { splitVendorChunkPlugin } = require('vite');
import htmlMinimize from '@sergeymakinen/vite-plugin-html-minimize';
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
    name: 'workaround-for-using{dot}and-vue-binding-together',
    transformIndexHtml(html) {
      return html.replace(/{dot}/gm, '.');
    },
  };
};

module.exports = defineConfig({
  test: {
    environment: 'happy-dom',
  },
  plugins: [
    splitVendorChunkPlugin(),
    // sri(),
    addNoscriptCss(),
    workaroundForUsingAlpineAndVueBindingTogether(),
    htmlMinimize({
      collapseWhitespace: true,
      conservativeCollapse: true,
      html5: true,
      keepClosingSlash: false,
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
      customAttrCollapse: /x-.*/,
    }),
  ],
  build: {
    emptyOutDir: true,
    sourcemap: true,
    assetsInlineLimit: 0,
  },
});
