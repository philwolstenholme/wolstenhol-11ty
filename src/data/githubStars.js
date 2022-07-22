const Cache = require('@11ty/eleventy-cache-assets');
const _ = require('lodash');

module.exports = async function () {
  let response = await Cache('https://api.github.com/users/philwolstenholme/starred', {
    duration: '1h',
    type: 'json',
  });

  return _.shuffle(response).slice(0, 12);
};
