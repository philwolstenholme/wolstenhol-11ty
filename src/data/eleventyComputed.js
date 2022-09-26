module.exports = {
  noCssUrl: data => {
    if (data.page.filePathStem == '/index') {
      return `https://wolstenhol.me/no-css`;
    } else {
      return `https://wolstenhol.me/no-css${data.page.filePathStem}`;
    }
  },
};
