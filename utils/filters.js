const path = require('path');
const { URL } = require('url');
const debug = require('debug')('EleventyFilters');
const { DateTime } = require('luxon');

// Get config
const config = require('@config');

const build = path.join(process.cwd(), config.dir.input, config.dir.data, 'build');

let defaultZone = 'local';
if (Object.prototype.hasOwnProperty.call(build, 'timezone')) {
  const testDate = DateTime.local().setZone(build.timezone);
  if (testDate.isValid) {
    defaultZone = build.timezone;
  } else {
    console.warn(testDate.invalidExplanation);
  }
}

module.exports = {
  dateToFormat: (date, format, zone = defaultZone) => {
    return DateTime.fromJSDate(date, { zone }).toFormat(String(format));
  },

  dateToISO: (date, zone = defaultZone) => {
    return DateTime.fromJSDate(date, { zone }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  },

  obfuscate: str => {
    const chars = [];
    for (var i = str.length - 1; i >= 0; i--) {
      chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return chars.join('');
  },

  split: (val, delimiter = '/') => {
    return val.toString().split(delimiter);
  },

  ltrim: (val, charlist) => {
    return val.toString().replace(new RegExp('^[' + charlist + ']+'), '');
  },

  rtrim: (val, charlist) => {
    return val.toString().replace(new RegExp('[' + charlist + ']+$'), '');
  },

  absoluteUrl: function (url, base) {
    try {
      return new URL(url, base).toString();
    } catch (e) {
      debug('Trying to convert %o to be an absolute url with base %o and failed, returning: %o (invalid url)', url, base, url);
      // TODO add debug output!
      return url;
    }
  },
};
