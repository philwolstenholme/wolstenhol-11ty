const Cache = require('@11ty/eleventy-cache-assets');
const _ = require('lodash');

const getData = async function () {
  let response = await Cache('https://api.github.com/users/philwolstenholme/starred?per_page=50', {
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

module.exports = getData();
