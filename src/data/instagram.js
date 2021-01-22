const Cache = require('@11ty/eleventy-cache-assets');
const cloudinary = require('cloudinary').v2;
const fetchBase64 = require('fetch-base64');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = async function () {
  // https://developer.github.com/v3/repos/#get
  let response = await Cache(
    'https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables={%22id%22:%2233932705%22,%22first%22:12}',
    {
      duration: '1d',
      type: 'json',
    }
  );

  response.data.user.edge_owner_to_timeline_media.edges.map(edge =>
    cloudinary.uploader.upload(edge.node.thumbnail_src, { tags: 'instagram', public_id: `11ty/instagram/${edge.node.id}` })
  );

  const posts = response.data.user.edge_owner_to_timeline_media.edges.map(async edge => {
    const svgPlaceholder = await fetchBase64
      .remote(`https://res.cloudinary.com/wolstenh/image/upload/f_auto,q_auto,w_40/v1/11ty/instagram/${edge.node.id}.jpg`)
      .then(data => {
        let svg = `<svg xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 50 50">
                  <filter id="b" color-interpolation-filters="sRGB">
                    <feGaussianBlur stdDeviation=".5"></feGaussianBlur>
                    <feComponentTransfer>
                      <feFuncA type="discrete" tableValues="1 1"></feFuncA>
                    </feComponentTransfer>
                  </filter>
                  <image filter="url(#b)" preserveAspectRatio="none"
                    height="100%" width="100%"
                    xlink:href="${data[1]}">
                  </image>
                </svg>`;

        return svgToMiniDataURI(svg);
      })
      .catch(reason => {});

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
    };
  });

  return await Promise.all(posts);
};
