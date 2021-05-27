const fs = require('fs');
const captureWebsite = require('capture-website');
const frontMatter = require('front-matter');
const filenamifyUrl = require('filenamify-url');

const getSites = () => {
  const files = fs.readdirSync('src/work').map(file => {
    return fs.readFileSync(`src/work/${file}`, 'utf-8');
  });

  const urls = files
    .map(file => {
      const parsedFile = frontMatter(file);
      const { url } = parsedFile.attributes;
      return { name: filenamifyUrl(url, { replacement: '-' }), url };
    })
    .filter(site => {
      const { name, url } = site;
      if (name == undefined || url == undefined) return false;
      return true;
    });
  console.log(urls);
  return urls;
};

const getScreenshot = async site => {
  try {
    const options = {
      delay: 3,
      timeout: 10,
      overwrite: true,
    };
    switch (site.name) {
      case 'london.gov.uk':
        var target = 'button.user-prompt--button__close';
        options.beforeScreenshot = async page => {
          await page.waitForSelector(target);
          await page.click(target);
          await page.evaluate(`document.getElementById('sliding-popup').remove()`);
        };
        break;
      case 'ltmuseum.co.uk':
        var target = '.cb-button.cb-right';
        options.beforeScreenshot = async page => {
          await page.waitForSelector(target);
          await page.click(target);
          await page.waitForTimeout(500);
          await page.evaluate('endCookieProcess()');
        };
        break;
      case 'ctidigital.com':
      case 'ctidigital.com-drupal-drupal-consultancy-and-development-agency':
      case 'ctidigital.com-our-clients-nelson-royal-navy':
        var target = '#hs-eu-confirmation-button';
        options.beforeScreenshot = async page => {
          await page.waitForSelector(target);
          await page.click(target);
        };
        break;
    }
    console.log(`Getting a screenshot of ${site.name}`);
    const screenshot = await captureWebsite.file(site.url, `src/assets/images/screenshots/${site.name}.png`, options);
  } catch (error) {
    console.error(site.name, error);
  }
};

(async () => {
  const sites = await getSites();
  (async () => {
    for (const site of sites) {
      await getScreenshot(site);
    }
  })();
  return;
})();
