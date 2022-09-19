require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');
const tryForCache = require('../../cache');

const getData = async function () {
  let response = await Cache(
    'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=philw_&include_rts=true&exclude_replies=true&tweet_mode=extended&count=40&include_ext_alt_text=true',
    {
      duration: '1h',
      type: 'json',
      fetchOptions: {
        headers: {
          Authorization: process.env.TWITTER_AUTH_BEARER,
        },
      },
    }
  );

  return response.filter(entry => !entry.full_text.startsWith('📚 Added'));
};

module.exports = async () => {
  return tryForCache('twitter', getData);
};
