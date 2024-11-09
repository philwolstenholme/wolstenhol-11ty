require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');
const tryForCache = require('../../cache');

const transfromEntry = function (entry) {
  entry.content = entry.content.replace(/<span class="invisible">/g, '<span class="hidden">');
  entry.content = entry.content.replace(/`([^`]+)`/g, '<code>$1</code>');
  entry.content = entry.content.replace(/@(\w+)@twitter\.com/g, '<a href="https://twitter.com/$1">@$1</a>');

  return entry;
};

const getData = async function () {
  let response = await Cache(`https://${process.env.MAS_INSTANCE}/api/v1/accounts/${process.env.MAS_USER_ID}/statuses?limit=60`, {
    duration: '30m',
    type: 'json',
  });

  response = response.filter(entry => !entry.content.includes('📚 Added'));
  response = response.filter(entry => entry.in_reply_to_id === null);

  response = response.filter(entry => {
    if (!entry.application) return true;

    return !entry.application.name.includes('Moa');
  });

  response = response.map(entry => {
    entry.pw = {
      source: 'mastodon',
    };

    if (entry.account.acct === process.env.MAS_USER_NAME) {
      entry.account.acct = `${process.env.MAS_USER_NAME}@${process.env.MAS_INSTANCE}`;
    }

    if (entry.reblog) {
      entry.reblog = transfromEntry(entry.reblog);
    } else {
      entry = transfromEntry(entry);
    }

    return entry;
  });

  return response;
};

module.exports = tryForCache('mastodon', getData);
