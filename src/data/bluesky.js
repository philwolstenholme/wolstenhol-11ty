require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');
const tryForCache = require('../../cache');

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHTML = str => str?.replace(/[&<>"']/g, match => escapeMap[match] || match) ?? '';

const nl2br = str => str?.replaceAll('\n', '<br />\n') ?? '';

const renderPostContent = function (post) {
  let text = post.record?.text || '';
  let html = '';
  let lastIndex = 0;

  // Sort facets by start index to process in order
  const facets = [...(post.record?.facets || [])].sort((a, b) => a.index.byteStart - b.index.byteStart);

  // Process each facet and build HTML
  facets.forEach(facet => {
    const start = facet.index.byteStart;
    const end = facet.index.byteEnd;
    const feature = facet.features[0];

    // Add text before this facet
    html += nl2br(escapeHTML(text.slice(lastIndex, start)));

    // Process the facet based on its type
    const facetText = text.slice(start, end);
    if (feature.$type === 'app.bsky.richtext.facet#link') {
      html += `<a href="${escapeHTML(feature.uri)}">${escapeHTML(facetText)}</a>`;
    } else if (feature.$type === 'app.bsky.richtext.facet#mention') {
      html += `<a href="https://bsky.app/profile/${escapeHTML(feature.did)}">${escapeHTML(facetText)}</a>`;
    } else if (feature.$type === 'app.bsky.richtext.facet#tag') {
      html += `<a href="https://bsky.app/hashtag/${escapeHTML(facetText.slice(1))}">${escapeHTML(facetText)}</a>`;
    } else {
      html += nl2br(escapeHTML(facetText));
    }

    lastIndex = end;
  });

  // Add any remaining text
  html += nl2br(escapeHTML(text.slice(lastIndex)));

  return html;
};

const transformEntry = function (entry) {
  // Extract the post from the feed entry
  const post = entry.post;

  const transformedPost = {
    id: post.uri,
    created_at: post.indexedAt || post.createdAt,
    content: renderPostContent(post),
    url: `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`,
    account: {
      acct: post.author.handle,
      display_name: post.author.displayName || post.author.handle,
      avatar: post.author.avatar,
    },
    pw: {
      source: 'bluesky',
    },
  };

  // Handle reposts
  if (entry.reason?.by) {
    transformedPost.reblog = {
      account: {
        acct: entry.reason.by.handle,
        display_name: entry.reason.by.displayName || entry.reason.by.handle,
        avatar: entry.reason.by.avatar,
      },
    };
  }

  // Handle embedded media if present
  if (post.embed) {
    const embed = post.embed;
    if (embed.images) {
      transformedPost.media_attachments = embed.images.map(img => ({
        type: 'image',
        url: img.fullsize,
        preview_url: img.thumb,
      }));
    } else if (embed.external) {
      transformedPost.card = {
        url: embed.external.uri,
        title: embed.external.title,
        description: embed.external.description,
        image: embed.external.thumb,
      };
    }
  }

  return transformedPost;
};

const getData = async function () {
  try {
    let response = await Cache(
      'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=wolstenhol.me&filter=posts_no_replies&limit=50',
      {
        duration: '30m',
        type: 'json',
      }
    );

    if (!response?.feed) {
      console.error('Invalid response from Bluesky API:', response);
      return [];
    }

    // Transform posts
    const posts = response.feed.map(transformEntry);
    console.log('Fetched Bluesky data:', posts.length, 'posts');
    return posts;
  } catch (error) {
    console.error('Error fetching Bluesky data:', error);
    return [];
  }
};

module.exports = tryForCache('bluesky', getData);
