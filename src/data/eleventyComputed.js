module.exports = {
  noCssUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `https://wolstenhol.me/no-css`;
    } else {
      return `https://wolstenhol.me/no-css${data.page.filePathStem}`;
    }
  },
  noJsUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `https://wolstenhol.me/no-js`;
    } else {
      return `https://wolstenhol.me/no-js${data.page.filePathStem}`;
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
