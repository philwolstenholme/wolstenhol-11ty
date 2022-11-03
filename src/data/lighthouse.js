require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');
const airtable = require('airtable');
const tryForCache = require('../../cache');

const postDataToAirtable = data => {
  const base = new airtable({ apiKey: process.env.AIRTABLE_KEY }).base('appS1ETOTlKcAY8z4');
  const table = base('tbla7A58tptxJznEL');

  const record = {
    fields: {
      URL: 'https://wolstenhol.me',
      Date: new Date().toISOString(),
      Performance: parseInt(data['performance'].score, 10),
      Accessibility: parseInt(data['accessibility'].score, 10),
      'Best Practices': parseInt(data['best-practices'].score, 10),
      SEO: parseInt(data['seo'].score, 10),
    },
  };

  table.create([record], function (err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
};

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
    duration: '10m',
    type: 'json',
  });

  data = data.lighthouseResult.categories;
  console.table(data);

  const getGrade = function (score) {
    if (score < 50) {
      return 'bad';
    }
    if (score < 90) {
      return 'ok';
    }
    return 'good';
  };

  Object.keys(data).map(function (key) {
    data[key].score = (data[key].score * 100).toFixed();
    data[key].grade = getGrade(data[key].score);
  });

  postDataToAirtable(data);

  return {
    categories: data,
  };
};

module.exports = tryForCache('lighthouse', getData);
