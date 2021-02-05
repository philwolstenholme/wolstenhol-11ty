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

    return "Hmmm I'm not sure this is working";
  },
  noJsUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `${data.page.filePathStem}.no-js.html`;
    } else {
      return `${data.page.filePathStem}/index.no-js.html`;
    }

    return "Hmmm I'm not sure this is working";
  },
};
