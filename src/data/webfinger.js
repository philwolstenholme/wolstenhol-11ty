const Cache = require('@11ty/eleventy-cache-assets');
const _ = require('lodash');
const tryForCache = require('../../cache');

const getData = async function () {
  let response = await Cache('https://wolstenhol.me/.well-known/webfinger?resource=acct:phil@wolstenhol.me', {
    duration: '24h',
    type: 'json',
  });

  return response;
};

module.exports = tryForCache('webfinger', getData);
