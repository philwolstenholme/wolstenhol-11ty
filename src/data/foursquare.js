require('dotenv').config();
const Cache = require('@11ty/eleventy-cache-assets');
const _ = require('lodash');
const urlSigner = require('gmaps-url-signer');
const tryForCache = require('../../cache');

const getData = async function () {
  let json = await Cache(
    `https://api.foursquare.com/v2/users/81013017/venuelikes?oauth_token=${process.env.FOUR_TOKEN}&v=20151227&limit=100`,
    {
      duration: '1d',
      type: 'json',
    }
  );

  const places = await json.response.venues.items.map(place => {
    place.map = urlSigner.sign(
      `https://maps.googleapis.com/maps/api/staticmap?center=${place.location.lat},${place.location.lng}&zoom=13&size=365x182&maptype=roadmap&key=${process.env.GOOGLE_MAPS_KEY}&format=png&visual_refresh=true&map_id=db8ea46f9ea0d213&scale=2`,
      process.env.GOOGLE_MAPS_SECRET
    );

    return place;
  });

  return _.sampleSize(places, 9);
};

module.exports = tryForCache('foursquare', getData);
