require('module-alias/register');
const fs = require('fs');
const yaml = require('js-yaml');

const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginVue = require('@11ty/eleventy-plugin-vue');
const pluginVite = require('@11ty/eleventy-plugin-vite');

const filters = require('./utils/filters');
const transforms = require('./utils/transforms');
const shortcodes = require('./utils/shortcodes');
const markdown = require('./utils/markdown');

// You can now require config options using @config
const config = require('@config');

module.exports = function (eleventyConfig) {
  /**
   * Add plugins
   *
   * @link https://www.11ty.dev/docs/plugins/
   */
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginVue, {
    rollupPluginVueOptions: {
      style: {
        postcssPlugins: [
          //require('autoprefixer')
        ],
      },
    },
  });

  eleventyConfig.addPlugin(pluginVite);

  /**
   * Add filters
   *
   * @link https://www.11ty.io/docs/filters/
   */
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  /**
   * Add Transforms
   *
   * @link https://www.11ty.io/docs/config/#transforms
   */
  Object.keys(transforms).forEach(transformName => {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  });

  /**
   * Add shortcodes
   *
   * @link https://www.11ty.io/docs/shortcodes/
   */
  Object.keys(shortcodes).forEach(shortcodeName => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  /**
   * Add custom watch targets
   *
   * @link https://www.11ty.dev/docs/config/#add-your-own-watch-targets
   */
  eleventyConfig.addWatchTarget('./tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./src/media');

  /**
   * Passthrough file copy
   *
   * @link https://www.11ty.io/docs/copy/
   */
  eleventyConfig.addPassthroughCopy({ 'src/assets/scripts/service-worker.js': 'service-worker.js' });
  // eleventyConfig.addPassthroughCopy('src/assets/fonts');
  // eleventyConfig.addPassthroughCopy('src/assets/images');
  // eleventyConfig.addPassthroughCopy('src/assets/scripts');
  // eleventyConfig.addPassthroughCopy('src/assets/styles');
  // eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  // eleventyConfig.addPassthroughCopy('src/robots.txt');
  // eleventyConfig.addPassthroughCopy('src/favicon.ico');
  // eleventyConfig.addPassthroughCopy('src/media');
  // eleventyConfig.addPassthroughCopy('src/submit-reading-item');
  eleventyConfig.addPassthroughCopy('src');

  /**
   * Set custom markdown library instance
   *
   * @link https://www.11ty.dev/docs/languages/liquid/#optional-set-your-own-library-instance
   */
  eleventyConfig.setLibrary('md', markdown);

  /**
   * Add layout aliases
   *
   * @link https://www.11ty.dev/docs/layouts/#layout-aliasing
   */
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');

  /**
   * Opts in to a full deep merge when combining the Data Cascade.
   *
   * @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
   */
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents));
  eleventyConfig.addDataExtension('yml', contents => yaml.safeLoad(contents));

  return {
    dir: config.dir,
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
