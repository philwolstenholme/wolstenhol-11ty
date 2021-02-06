module.exports = {
  noCssUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `${data.page.filePathStem}.no-css`;
    } else {
      return `${data.page.filePathStem}/index.no-css`;
    }
  },
  noJsUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `${data.page.filePathStem}.no-js`;
    } else {
      return `${data.page.filePathStem}/index.no-js`;
    }
  },
  fullFatUrl: data => {
    if (data.page.filePathStem == '/index') {
      return '/';
    } else {
      return data.page.filePathStem;
    }
  },
};
