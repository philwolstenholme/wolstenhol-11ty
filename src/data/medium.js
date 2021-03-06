const Cache = require('@11ty/eleventy-cache-assets');
const Parser = require('rss-parser');
const truncate = require('node-truncate-string');
const cheerio = require('cheerio');

module.exports = async function () {
  const posts = [];

  // Load newer posts from dev.to.
  let devto = await Cache('https://dev.to/api/articles?username=philw_', {
    duration: '1h',
    type: 'json',
  });

  devto.forEach(item => {
    posts.push({
      title: item.title,
      url: item.url,
      categories: item.tag_list,
      content: truncate(item.description, 130),
    });
  });

  // Load older Medium posts.
  // let response = await Cache('https://medium.com/feed/@philwolstenholme', {
  //   duration: '1h',
  //   type: 'text',
  // });

  // const parser = new Parser();
  // const feed = await parser.parseString(response);

  // feed.items.forEach(item => {
  //   $ = cheerio.load(item['content:encoded']);
  //   $('figure').remove();

  //   const content = $.root()
  //     .text()
  //     // Add a space after full-stops.
  //     .replace(/\.(?=[^\d])[ ]*/g, '. ');

  //   posts.push({
  //     title: item.title,
  //     url: item.link,
  //     categories: item.categories,
  //     content: truncate(content, 130),
  //   });
  // });

  return posts;
};
