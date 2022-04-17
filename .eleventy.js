require('module-alias/register');
const yaml = require('js-yaml');

const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginVue = require('@11ty/eleventy-plugin-vue');
const pluginVite = require('@11ty/eleventy-plugin-vite');

const config = require('./.config.js');
const filters = require('./utils/filters');

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

  eleventyConfig.addPlugin(pluginVite, {
    tempFolderName: config.viteTemp, // Default name of the temp folder
  });

  /**
   * Add filters
   *
   * @link https://www.11ty.io/docs/filters/
   */
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  /**
   * Passthrough file copy
   *
   * @link https://www.11ty.io/docs/copy/
   */
  eleventyConfig.addPassthroughCopy('src');

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
