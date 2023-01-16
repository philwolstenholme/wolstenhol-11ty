// node scripts/instagram.mjs

import dotenv from 'dotenv';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import wretch from 'wretch';

dotenv.config();

wretch.polyfills({
  fetch,
});

let data = await wretch(
  'https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables={%22id%22:%2233932705%22,%22first%22:12}',
  {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8,es;q=0.7',
      'cache-control': 'max-age=0',
      'sec-ch-prefers-color-scheme': 'light',
      'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'viewport-width': '840',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
  }
)
  .get()
  .json();

data = data.data.user.edge_owner_to_timeline_media.edges;

try {
  // Write as txt rather than JSON so that Eleventy doesn't try to add it to global data
  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'instagram.txt'), JSON.stringify(data, null, 2));
} catch (e) {
  console.log(e);
}
