const htmlmin = require('html-minifier-terser');

module.exports = {
  htmlmin: (content, outputPath) => {
    // bail if not production env
    if (process.env.ELEVENTY_ENV !== 'production') {
      return content;
    }

    // returned minified content from html files
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        sortClassName: true,
      });

      return minified;
    }

    return content;
  },
};
