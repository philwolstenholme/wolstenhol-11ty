import hash from 'https://deno.land/x/object_hash@2.0.3.1/mod.ts';
import { randomItem } from 'https://deno.land/x/random_item@v1.2.0/mod.ts';

export default async (request, context) => {
  const THEMES = Object.freeze({
    emergency: 'emergency',
    sombre: 'sombre',
    celebratory: 'celebratory',
  });

  const imagineTheseCameFromACMS = [
    {
      theme: THEMES.emergency,
      text: 'Something bad has happened, but all our staff are safe. We are posting updates on our Twitter page.',
      link: 'https://twitter.com/philw_',
    },
    {
      theme: THEMES.sombre,
      text: 'We are saddened by X and wish Y',
    },
    {
      theme: THEMES.celebratory,
      text: `We won best place to work ${new Date().getFullYear()}!!!11`,
      link: 'https://example.com/a-pr-blog-article',
    },
  ];

  const randomlyPickedMessage = randomItem(imagineTheseCameFromACMS);
  randomlyPickedMessage.hash = hash(randomlyPickedMessage);

  return new Response(JSON.stringify(randomlyPickedMessage), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store, must-revalidate' },
  });
};
