const Cache = require('@11ty/eleventy-cache-assets');
const Parser = require('rss-parser');
const truncate = require('node-truncate-string');
const cheerio = require('cheerio');

module.exports = async function () {
  let response = await Cache('https://medium.com/feed/@philwolstenholme', {
    duration: '1h',
    type: 'text',
  });

  const parser = new Parser();
  const feed = await parser.parseString(response);
  const posts = [];

  feed.items.forEach(item => {
    $ = cheerio.load(item['content:encoded']);
    $('figure').remove();

    posts.push({
      title: item.title,
      url: item.link,
      categories: item.categories,
      content: truncate($.root().text(), 130),
    });
  });

  return posts;
};
