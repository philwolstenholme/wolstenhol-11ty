const { defineConfig } = require('vite');
const { splitVendorChunkPlugin } = require('vite');
import htmlMinimize from '@sergeymakinen/vite-plugin-html-minimize';
import inspect from 'vite-plugin-inspect';

module.exports = defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    inspect(),
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
      decodeEntities: true,
      sortAttributes: true,
      sortClassName: true,
      customAttrCollapse: /x-bind:class|x-init|x-style/,
    }),
  ],
  build: {
    emptyOutDir: true,
  },
});
