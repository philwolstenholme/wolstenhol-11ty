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

module.exports = {
  subject: 'acct:philw_@hachyderm.io',
  aliases: ['https://hachyderm.io/@philw_', 'https://hachyderm.io/users/philw_', 'https://wolstenhol.me'],
  links: [
    { rel: 'http://webfinger.net/rel/profile-page', type: 'text/html', href: 'https://hachyderm.io/@philw_' },
    { rel: 'self', type: 'application/activity+json', href: 'https://hachyderm.io/users/philw_' },
    { rel: 'http://ostatus.org/schema/1.0/subscribe', template: 'https://hachyderm.io/authorize_interaction?uri={uri}' },
    { rel: 'http://webfinger.net/rel/profile-page', type: 'text/html', href: 'https://wolstenhol.me' },
  ],
};
