import fs from 'fs';
import captureWebsite from 'capture-website';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const filenamifyUrl = require('filenamify-url');
const frontMatter = require('front-matter');

const getSites = () => {
  const files = fs.readdirSync('src/portfolio').map(file => {
    return fs.readFileSync(`src/portfolio/${file}`, 'utf-8');
  });

  const urls = files
    .map(file => {
      const parsedFile = frontMatter(file);
      const { url, happyWithScreenshot } = parsedFile.attributes;

      // if (happyWithScreenshot) {
      //   return false;
      // }

      if (url) {
        return { name: filenamifyUrl(url, { replacement: '-' }), url };
      } else {
        return false;
      }
    })
    .filter(site => {
      const { name, url } = site;
      if (name == undefined || url == undefined) return false;
      return true;
    });
  console.table(urls);
  return urls;
};

const getScreenshot = async site => {
  try {
    const options = {
      delay: 7,
      timeout: 20,
      overwrite: true,
    };
    switch (site.name) {
      case 'london.gov.uk':
        var target = '.ccc-accept-button';
        options.beforeScreenshot = async page => {
          await page.waitForSelector(target);
          await page.click(target);
          await page.evaluate(`document.getElementById('ccc').remove()`);
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
      case 'uwl.ac.uk':
      case 'mmu.ac.uk':
        var target = '#sliding-popup';
        options.beforeScreenshot = async page => {
          await page.waitForSelector(target);
          await page.evaluate(`document.querySelector('${target}').remove()`);
        };
    }
    console.log(`Getting a screenshot of ${site.name}`);

    const filename = `src/assets/images/screenshots/${site.name}.png`;

    await captureWebsite.file(site.url, filename, options);
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
