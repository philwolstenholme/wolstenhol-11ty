require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');
const tryForCache = require('../../cache');

const getData = async function () {
  const params = new URLSearchParams();
  params.append('url', 'https://wolstenhol.me');
  params.append('key', process.env.PAGESPEED_API_KEY);
  // We use the fields query string param to ask the Google API to only
  // return the data we need - a score and title for each category in the
  // Lighthouse test. Without this, the API returns a *lot* of data, which
  // isn't the end of the world but is also unnecessary.
  params.append('fields', 'lighthouseResult.categories.*.score,lighthouseResult.categories.*.title');
  params.append('prettyPrint', false);
  // I use the mobile strategy, but `desktop` is a valid value too.
  params.append('strategy', 'mobile');
  // I've not used the PWA category, but you could if it is relevant to your site.
  params.append('category', 'PERFORMANCE');
  params.append('category', 'ACCESSIBILITY');
  params.append('category', 'BEST-PRACTICES');
  params.append('category', 'SEO');

  let data = await Cache(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`, {
    duration: '1d',
    type: 'json',
  });

  data = data.lighthouseResult.categories;

  const getGrade = function (score) {
    if (score < 0.5) {
      return 'bad';
    }
    if (score < 0.9) {
      return 'ok';
    }
    return 'good';
  };

  Object.keys(data).map(function (key) {
    data[key].score = (data[key].score * 100).toFixed();
    data[key].grade = getGrade(data[key].score);
  });

  return {
    categories: data,
  };
};

module.exports = tryForCache('lighthouse', getData);
