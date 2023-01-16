const cloudinary = require('cloudinary').v2;
const fetchBase64 = require('fetch-base64');
const svgToMiniDataURI = require('mini-svg-data-uri');
const tryForCache = require('../../cache');
const fs = require('fs');

const getData = async function () {
  const unprocessedPosts = JSON.parse(fs.readFileSync('./src/data/instagram.txt', 'utf8'));

  unprocessedPosts.map(edge =>
    cloudinary.uploader.upload(edge.node.thumbnail_src, { tags: 'instagram', public_id: `11ty/instagram/${edge.node.id}` })
  );

  const posts = unprocessedPosts.map(async post => {
    const svgPlaceholder = await fetchBase64
      .remote(`https://res.cloudinary.com/wolstenh/image/upload/f_auto,q_20,w_20/v1/11ty/instagram/${post.node.id}.jpg`)
      .then(data => {
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50"><filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation=".9"></feGaussianBlur><feComponentTransfer><feFuncA type="discrete" tableValues="1 1"></feFuncA></feComponentTransfer></filter><image filter="url(#b)" preserveAspectRatio="none" height="100%" width="100%" xlink:href="${data[1]}"></image></svg>`;

        return svgToMiniDataURI(svg);
      })
      .catch(reason => {
        console.error(reason);
      });

    if (post.node.edge_sidecar_to_children) {
      const firstChild = post.node.edge_sidecar_to_children.edges[0].node;
      const type = firstChild['__typename'];

      if (type === 'GraphVideo') {
        post.node.is_video = firstChild.is_video;
        post.node.video_url = firstChild.video_url;
      }
    }

    return {
      id: post.node.id,
      images: {
        standard_resolution: {
          url: post.node.thumbnail_src,
        },
      },
      link: `https://instagram.com/p/${post.node.shortcode}`,
      caption: {
        text: post.node.edge_media_to_caption.edges.length > 0 ? post.node.edge_media_to_caption.edges[0].node.text : null,
      },
      likes: {
        count: post.node.edge_media_preview_like.count,
      },
      comments: {
        count: post.node.edge_media_to_comment.count,
      },
      location: {
        name: post.node.location ? post.node.location.name : null,
      },
      videos: post.node.is_video
        ? {
            standard_resolution: {
              url: post.node.video_url,
            },
          }
        : null,
      accessibilityCaption: post.node.accessibility_caption,
      svgPlaceholder: svgPlaceholder,
      display_url: post.node.display_url,
      dimensions: post.node.dimensions,
    };
  });

  return await Promise.all(posts);
};

module.exports = tryForCache('instagram', getData);
