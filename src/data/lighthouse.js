require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');

module.exports = async function () {
  const params = new URLSearchParams();
  params.append('url', 'https://wolstenhol.me');
  params.append('fields', 'lighthouseResult.categories.*.score,lighthouseResult.categories.*.title');
  params.append('prettyPrint', false);
  params.append('strategy', 'mobile');
  params.append('category', 'PERFORMANCE');
  params.append('category', 'ACCESSIBILITY');
  params.append('category', 'BEST-PRACTICES');
  params.append('category', 'SEO');
  params.append('key', process.env.PAGESPEED_API_KEY);

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
    data[key].score = data[key].score * 100;
    data[key].grade = getGrade(data[key].score);
  });

  return {
    categories: data,
  };
};
