require('dotenv').config();

module.exports = {
  env: process.env.ELEVENTY_ENV,
  timestamp: new Date(),
  timezone: process.env.TIMEZONE || 'UTC',
  url: process.env.URL || 'http://localhost:8080',
  noCss: process.env.ELEVENTY_NO_CSS,
  noJs: process.env.ELEVENTY_NO_JS,
};
