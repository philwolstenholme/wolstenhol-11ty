// node -r dotenv/config scripts/instagram.mjs

import { default as fetch } from 'node-fetch';

const instagramUrl = new URL('https://graph.instagram.com');

// Refresh token
// {{ROOT_URL}}/refresh_access_token?grant_type=ig_refresh_token&access_token={{TOKEN}}
const refreshTokenUrl = instagramUrl;
refreshTokenUrl.pathname = 'refresh_access_token';
refreshTokenUrl.searchParams.append('access_token', process.env.INSTAGRAM_TOKEN);
refreshTokenUrl.searchParams.append('grant_type', 'ig_refresh_token');

await fetch(refreshTokenUrl.href)
  .then(res => res.json())
  .then(body => {
    console.log(`Instagram token refreshed. Expires in ${body.expires_in / 86400} days`);
  });

// Get own media
// {{ROOT_URL}}/me?access_token={{TOKEN}}&fields=id,username,media
const ownMediaUrl = instagramUrl;
ownMediaUrl.pathname = 'me';
ownMediaUrl.searchParams.append('access_token', process.env.INSTAGRAM_TOKEN);
ownMediaUrl.searchParams.append('fields', 'id,username,media');

const ownMedia = await fetch(ownMediaUrl.href);
const ownMediaJson = await ownMedia.json();

const media = ownMediaJson.media.data;
console.log(`Found ${media.length} media items`);
