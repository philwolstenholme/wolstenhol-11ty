const { defineConfig } = require('vite');
const { splitVendorChunkPlugin } = require('vite');
import htmlMinimize from '@sergeymakinen/vite-plugin-html-minimize';
import { VitePWA } from 'vite-plugin-pwa';
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
    VitePWA({
      registerType: 'prompt',
      workbox: {
        globPatterns: [
          '*.{js,css,html,ico,png,svg,woff2,woff,xml,webp,avif,jpg,jpeg,gif}',
          '**/*.{js,css,html,ico,png,svg,woff2,woff,xml,webp,avif,jpg,jpeg,gif}',
        ],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.startsWith === 'https://wolstenhol.me/proxy/',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'wolstenhol-proxy',
              expiration: {
                maxEntries: 200,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: {
                maxEntries: 10,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        lang: 'en',
        dir: 'ltr',
        name: 'Phil Wolstenholme',
        short_name: 'PW',
        icons: [
          {
            src: '/favicon/android-chrome-192x192.png?v=lkvRGjnrz8',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon/android-chrome-256x256.png?v=lkvRGjnrz8',
            sizes: '256x256',
            type: 'image/png',
          },
        ],
        theme_color: '#fbbf24',
        background_color: '#fbbf24',
        display: 'minimal-ui',
        orientation: 'natural',
        start_url: '/index.html',
        share_target: {
          action: '/submit-reading-item/',
          method: 'GET',
          enctype: 'application/x-www-form-urlencoded',
          params: {
            title: 'title',
            url: 'url',
            text: 'text',
          },
        },
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    sourcemap: true,
    assetsInlineLimit: 0,
  },
});
