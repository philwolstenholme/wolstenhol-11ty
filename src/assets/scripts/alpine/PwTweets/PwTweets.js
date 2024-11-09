import loadjs from 'loadjs';

export default function PwTweets() {
  return {
    colcadeInstance: null,
    extraTweets: null,
    colcade() {
      if (window.innerWidth > 767 && this.colcadeInstance === null) {
        loadjs('https://wolstenhol.me/proxy/jsdelivr/npm/colcade@0.2.0/colcade.js', 'colcade', {
          success: () => {
            try {
              this.colcadeInstance = new Colcade('.tweets-grid', {
                columns: '.tweets-grid__col',
                items: '.tweets-grid__item',
              });
            } catch (error) {
              console.error(`Colcade is being weird again…`, error);
            }
          },
          before: (path, el) => {
            // We add a SRI hash to make up for the security risk of loading JS from a third-party.
            el.integrity = 'sha256-ZxEJSCFR4d0OThzWuZ8CYCzw+pDoV/E0/+4EWoLO6Eg=';
            el.crossOrigin = 'anonymous';
          },
        });
      }
    },
    twitterIntents() {
      loadjs('https://wolstenhol.me/proxy/jsdelivr/gh/BrandwatchLtd/twitter-intents@1.0.0/twitter-intents.js', 'twitter-intents', {
        success: () => {
          const intents = new TwitterIntents();
          intents.register();
        },
        before: (path, el) => {
          // We add a SRI hash to make up for the security risk of loading JS from a third-party.
          el.integrity = 'sha256-XWaaYvzENdjaBD8CdencpJdh4h8AjmEFg+BZoq4G14s=';
          el.crossOrigin = 'anonymous';
        },
      });
    },
  };
}
