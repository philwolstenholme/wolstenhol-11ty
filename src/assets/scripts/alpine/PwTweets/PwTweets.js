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
    loadMore() {
      fetch('/partial-tweets.html')
        .then(response => {
          return response.text();
        })
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const tweets = doc.getElementById('results').children;

          if (window.innerWidth > 767) {
            if (this.colcadeInstance) {
              this.colcadeInstance.append(tweets);
            }
          } else {
            // Add the new tweets (not using Colcade) as the items only need to be stacked.
            const tweetsFragment = document.createDocumentFragment();
            [...tweets].forEach(tweet => {
              tweetsFragment.appendChild(tweet);
            });
            this.$refs.container.appendChild(tweetsFragment);

            // Move columns to the bottom of the list so that they don't interfere with owl classes.
            const cols = this.$root.querySelectorAll('.tweets-grid__col');
            const colsFragment = document.createDocumentFragment();
            [...cols].forEach(col => {
              colsFragment.appendChild(col);
            });
            this.$refs.container.appendChild(colsFragment);
          }

          window.lozad.observe();
        })
        .catch(err => {
          console.error('Something went wrong.', err);
        });
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
