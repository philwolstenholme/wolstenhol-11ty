require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');
const cheerio = require('cheerio');
const { orderBy } = require('natural-orderby');
const { getHostname } = require('tldts');
const metascraper = require('metascraper')([require('metascraper-description')()]);
const got = require('got');
const _ = require('lodash');
const { sampleSize } = require('lodash');
const tryForCache = require('../../cache');

const getData = async function () {
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

  let airtableReadingListJson = await Cache('https://api.airtable.com/v0/appT2NMQ7UD8T2smq/List?maxRecords=20&view=Grid%20view', {
    duration: '30m',
    type: 'json',
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      },
    },
  });

  const getDescription = async targetUrl => {
    try {
      const { body: html, url } = await got(targetUrl);
      const metadata = await metascraper({ html, url });
      return metadata.description;
    } catch {
      return null;
    }
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

  const has200Status = async url => {
    try {
      const response = await got(url);
      return response.statusCode === 200;
    } catch {
      return false;
    }
  };

  const getFavicon = async url => {
    const hostname = getHostname(url);
    const faviconUrl = `https://wolstenhol.me/proxy/cloudinary/image/fetch/f_auto,w_16,h_16,q_auto/https://t2.gstatic.com/faviconV2%3Fclient=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=32`;

    if (await has200Status(faviconUrl)) {
      return faviconUrl;
    } else {
      return `data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ctext x='0' y='14'%3E🔗%3C/text%3E%3C/svg%3E`;
    }
  };

  const prepareItem = async item => {
    return {
      ...item,
      subTitle: item.subTitle.substring(0, 100),
      favicon: await getFavicon(item.url),
    };
  };

  console.table({
    mediumReadingList: mediumReadingList.length,
    devToReadingList: devToReadingList.length,
    airtableReadingList: airtableReadingList.length,
  });

  const sortedItems = orderBy([...mediumReadingList, ...devToReadingList, ...airtableReadingList], 'date', 'desc');
  const recentItems = sortedItems.slice(0, 9);
  const olderItems = sortedItems.slice(12, sortedItems.length);
  const items = await Promise.all([...recentItems, ...sampleSize(olderItems, 6)].map(prepareItem));

  return items;
};

module.exports = async function () {
  return tryForCache('reading', getData);
};
