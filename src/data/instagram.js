require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');
const cloudinary = require('cloudinary').v2;
const fetchBase64 = require('fetch-base64');
const svgToMiniDataURI = require('mini-svg-data-uri');
const tryForCache = require('../../cache');

const getData = async function () {
  return null;

  let response = await Cache(
    'https://gist.githubusercontent.com/philwolstenholme/0d8f663f0d5857d1e5d43aad021d9c7e/raw/fb7fad88d670d7fc86efbc798217492391127e97/instagram.json',
    {
      duration: '1h',
      type: 'json',
    }
  );

  response.data.user.edge_owner_to_timeline_media.edges.map(edge =>
    cloudinary.uploader.upload(edge.node.thumbnail_src, { tags: 'instagram', public_id: `11ty/instagram/${edge.node.id}` })
  );

  const posts = response.data.user.edge_owner_to_timeline_media.edges.map(async edge => {
    const svgPlaceholder = await fetchBase64
      .remote(`https://res.cloudinary.com/wolstenh/image/upload/f_auto,q_20,w_20/v1/11ty/instagram/${edge.node.id}.jpg`)
      .then(data => {
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50"><filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation=".9"></feGaussianBlur><feComponentTransfer><feFuncA type="discrete" tableValues="1 1"></feFuncA></feComponentTransfer></filter><image filter="url(#b)" preserveAspectRatio="none" height="100%" width="100%" xlink:href="${data[1]}"></image></svg>`;

        return svgToMiniDataURI(svg);
      })
      .catch(reason => {});

    if (edge.node.edge_sidecar_to_children) {
      const firstChild = edge.node.edge_sidecar_to_children.edges[0].node;
      const type = firstChild['__typename'];

      if (type === 'GraphVideo') {
        edge.node.is_video = firstChild.is_video;
        edge.node.video_url = firstChild.video_url;
      }
    }

    return {
      id: edge.node.id,
      images: {
        standard_resolution: {
          url: edge.node.thumbnail_src,
        },
      },
      link: `https://instagram.com/p/${edge.node.shortcode}`,
      caption: {
        text: edge.node.edge_media_to_caption.edges.length > 0 ? edge.node.edge_media_to_caption.edges[0].node.text : null,
      },
      likes: {
        count: edge.node.edge_media_preview_like.count,
      },
      comments: {
        count: edge.node.edge_media_to_comment.count,
      },
      location: {
        name: edge.node.location ? edge.node.location.name : null,
      },
      videos: edge.node.is_video
        ? {
            standard_resolution: {
              url: edge.node.video_url,
            },
          }
        : null,
      accessibilityCaption: edge.node.accessibility_caption,
      svgPlaceholder: svgPlaceholder,
      display_url: edge.node.display_url,
      dimensions: edge.node.dimensions,
    };
  });

  return await Promise.all(posts);
};

module.exports = tryForCache('instagram', getData);
