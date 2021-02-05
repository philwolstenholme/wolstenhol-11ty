module.exports = {
  // permalink: data => {
  //   const parts = [data.page.filePathStem];

  //   if (data.build.noJs) {
  //     parts.push('no-js');
  //   }

  //   if (data.build.noCss) {
  //     parts.push('no-css');
  //   }

  //   return `${parts.join('.')}.html`;
  // },
  noCssUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `${data.page.filePathStem}.no-css.html`;
    } else {
      return `${data.page.filePathStem}/index.no-css.html`;
    }
  },
  noJsUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `${data.page.filePathStem}.no-js.html`;
    } else {
      return `${data.page.filePathStem}/index.no-js.html`;
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
