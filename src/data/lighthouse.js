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
      Performance: data['performance'].score,
      Accessibility: data['accessibility'].score,
      'Best Practices': data['bestPractices'].score,
      SEO: data['seo'].score,
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
  let data = await Cache(`https://wolstenhol.me/reports/lighthouse.json`, {
    duration: '0m',
    type: 'json',
  });

  const getGrade = function (score) {
    if (score < 50) {
      return 'bad';
    }
    if (score < 90) {
      return 'ok';
    }
    return 'good';
  };

  const getTitle = function (key) {
    switch (key) {
      case 'performance':
        return 'Performance';
      case 'accessibility':
        return 'Accessibility';
      case 'bestPractices':
        return 'Best Practices';
      case 'seo':
        return 'SEO';
      default:
        return key;
    }
  };

  Object.keys(data).map(function (key) {
    const score = Number(data[key]) * 100;

    data[key] = {};
    data[key].score = score;
    data[key].grade = getGrade(score);
    data[key].title = getTitle(key);
  });

  delete data['pwa'];

  postDataToAirtable(data);

  return {
    categories: data,
  };
};

module.exports = tryForCache('lighthouse', getData);
