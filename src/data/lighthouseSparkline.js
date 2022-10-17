var airtable = require('airtable');
const tryForCache = require('../../cache');

const base = new airtable({ apiKey: process.env.AIRTABLE_KEY }).base('appS1ETOTlKcAY8z4');

const getData = async function () {
  return new Promise((resolve, reject) => {
    const allScores = [];

    base('Score history')
      .select({
        maxRecords: 50,
        pageSize: 50,
        view: 'Grid view',
        fields: ['Performance'],
        sort: [{ field: 'ID', direction: 'desc' }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            allScores.push(record.get('Performance'));
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            resolve(allScores.reverse().join(','));
          }
        }
      );
  });
};

module.exports = tryForCache('lighthouseSparkline', getData);
