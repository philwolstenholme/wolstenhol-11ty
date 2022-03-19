module.exports = {
  noCssUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `https://wolstenhol-no-css.philgw.workers.dev`;
    } else {
      return `https://wolstenhol-no-css.philgw.workers.dev/${data.page.filePathStem}`;
    }
  },
  noJsUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `https://wolstenhol-no-js.philgw.workers.dev`;
    } else {
      return `https://wolstenhol-no-js.philgw.workers.dev/${data.page.filePathStem}`;
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
