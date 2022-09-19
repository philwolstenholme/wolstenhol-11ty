const path = require('path');
const flatCache = require('flat-cache');

module.exports = async function (key, getData) {
  const isDevelopment = process.env.ELEVENTY_ENV === 'development';

  if (!isDevelopment) {
    return getData();
  }

  const storageKey = `wolstenhol-${key}`;
  const cache = flatCache.load(storageKey, path.resolve('.cache'));
  const cacheHit = cache.getKey(storageKey);

  if (cacheHit) {
    console.log(`[cache] hit for ${storageKey}`);
    return cacheHit;
  }

  console.log(`[cache] miss for ${storageKey}`);
  const data = await getData();
  cache.setKey(storageKey, data);
  cache.save();
  return data;
};
