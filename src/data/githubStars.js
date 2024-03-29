const Cache = require('@11ty/eleventy-cache-assets');
const _ = require('lodash');
const tryForCache = require('../../cache');

const getData = async function () {
  let response = await Cache('https://api.github.com/users/philwolstenholme/starred?per_page=99', {
    duration: '1h',
    type: 'json',
    fetchOptions: {
      headers: {
        Authorization: `token ${process.env.GITHUB_PAT}`,
      },
    },
  });

  return response;
};

module.exports = tryForCache('github-stars', getData);
