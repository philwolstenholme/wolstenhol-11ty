require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');
const cheerio = require('cheerio');
const { orderBy } = require('natural-orderby');
const { getHostname } = require('tldts');
const metascraper = require('metascraper')([require('metascraper-description')()]);
const got = require('got');

module.exports = async function () {
  let mediumReadingListHtml = await Cache('https://philwolstenholme.medium.com/list/reading-list', {
    duration: '30m',
    type: 'text',
    fetchOptions: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        authority: 'philwolstenholme.medium.com',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        cookie: process.env.MEDIUM_COOKIE,
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    },
  });

  const $ = cheerio.load(mediumReadingListHtml);
  const apolloStateJson = JSON.parse($('script:contains("__APOLLO_STATE__")').html().replace('window.__APOLLO_STATE__ = ', ''));
  const apolloStatePosts = Object.fromEntries(
    Object.entries(apolloStateJson).filter(thing => thing[0].startsWith('Post:') && thing[1].title && thing[1].mediumUrl)
  );
  const mediumReadingList = Object.entries(apolloStatePosts).map(post => {
    return {
      title: post[1].title,
      subTitle:
        post[1][
          'extendedPreviewContent({"truncationConfig":{"minimumWordLengthForTruncation":150,"previewParagraphsWordCountThreshold":400,"shortformMinimumWordLengthForTruncation":30,"shortformPreviewParagraphsWordCountThreshold":30,"showFullImageCaptions":true,"truncateAtEndOfSentence":true}})'
        ]?.subtitle || '',
      url: post[1].mediumUrl,
      date: new Date(post[1].firstPublishedAt).toISOString(),
      isMedium: true,
    };
  });

  let devToReadingListJson = await Cache('https://dev.to/api/readinglist', {
    duration: '30m',
    type: 'json',
    fetchOptions: {
      headers: {
        'api-key': process.env.DEV_TO_API_KEY,
      },
    },
  });

  const devToReadingList = devToReadingListJson.map(item => {
    return {
      date: item.created_at,
      title: item.article.title,
      url: item.article.canonical_url ?? item.article.url,
      subTitle: item.article.description,
    };
  });

  let airtableReadingListJson = await Cache('https://api.airtable.com/v0/appT2NMQ7UD8T2smq/List?maxRecords=100&view=Grid%20view', {
    duration: '30m',
    type: 'json',
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      },
    },
  });

  const getDescription = async targetUrl => {
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({ html, url });
    return metadata.description;
  };

  const prepareAirtableItem = async item => {
    let description = null;
    if (!item.fields.subTitle) {
      description = await getDescription(item.fields.url);
    }

    return {
      date: item.fields.date,
      title: item.fields.title,
      url: item.fields.url,
      subTitle: item.fields.subTitle || description || '',
    };
  };

  const airtableReadingList = await Promise.all(airtableReadingListJson.records.map(item => prepareAirtableItem(item)));

  const prepareItem = item => {
    return {
      ...item,
      hostname: getHostname(item.url),
      subTitle: item.subTitle.substring(0, 100),
    };
  };

  const sortedItems = orderBy([...mediumReadingList, ...devToReadingList, ...airtableReadingList], 'date', 'desc').map(prepareItem);

  return sortedItems.slice(0, 12);
};
