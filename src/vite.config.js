const { resolve } = require('path');
const { defineConfig } = require('vite');
const { splitVendorChunkPlugin } = require('vite');
import handlebars from 'vite-plugin-handlebars';

module.exports = defineConfig({
  plugins: [splitVendorChunkPlugin(), handlebars()],
  build: {
    emptyOutDir: true,
  },
});
