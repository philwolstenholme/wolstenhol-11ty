import 'wicg-inert';
import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import lozad from 'lozad';

window.Alpine = Alpine;

window.lozad = lozad('.lozad', {
  enableAutoReload: true,
});
window.lozad.observe();

window.PwVibrate = (duration = 80) => {
  window?.navigator?.vibrate?.(duration);
};

Alpine.plugin(intersect);

document.addEventListener('alpine:init', () => {
  Alpine.data('PwCardMusic', $root => ({
    isPlaying: false,
    progress: 0,
    previewUrl: $root.dataset.previewUrl,
    index: $root.dataset.index,
    init() {
      this.$nextTick(() => {
        if (this.$refs['playButton']) {
          this.$refs['playButton'].setAttribute('role', 'button');
          this.$refs['playButton'].setAttribute('aria-pressed', 'false');
        }
      });
    },
    musicCardButtonPress($dispatch) {
      this.$refs['playButton'].setAttribute('aria-pressed', !this.isPlaying);

      if (!this.isPlaying) {
        $dispatch('play-preview', {
          src: this.previewUrl,
          index: this.index,
        });
      } else {
        $dispatch('stop-preview', {
          src: this.previewUrl,
          index: this.index,
        });
      }

      window.PwVibrate();
    },
    playingPreview($event) {
      this.isPlaying = $event.detail.src === this.previewUrl;
    },
    stoppedPreview() {
      this.isPlaying = false;
    },
    previewProgress($event) {
      if ($event.detail.src === this.previewUrl) {
        this.progress = $event.detail.progress;
      }
    },
  }));

  Alpine.data('PwMusic', () => ({
    isPlaying: false,
    src: null,
    init() {
      this.$watch('isPlaying', value => {
        this.$dispatch(value ? 'playing-preview' : 'stopped-preview', {
          src: this.src,
        });
      });
    },
    play(detail) {
      this.isPlaying = false;
      this.src = detail.src;
      this.$root.play();
    },
    playing() {
      this.isPlaying = true;
    },
    pause() {
      this.$root.pause();
      this.isPlaying = false;
    },
    ended() {
      this.isPlaying = false;
      this.src = null;
    },
    timeUpdate($event, $dispatch) {
      const progress = Math.round(($event.target.currentTime / $event.target.duration + Number.EPSILON) * 100) / 100;

      if (Number.isNaN(progress)) {
        return;
      } else {
        $dispatch('preview-progress', {
          src: $event.target.src,
          progress: progress,
        });
      }
    },
  }));

  Alpine.data('PwContact', () => ({
    submitted: false,
    error: null,
    submitForm() {
      const data = new FormData(this.$refs.form);
      fetch('/', {
        method: 'POST',
        body: data,
      })
        .then(response => {
          if (!response.ok) {
            return Promise.reject({
              status: response.status,
              statusText: response.statusText,
              url: response.url,
            });
          }
          return response;
        })
        .then(() => {
          this.submitted = true;
          this.error = null;
        })
        .catch(error => {
          this.error = JSON.stringify(error, null, 2);
          console.error('Contact form error: ', error);
        });
    },
  }));

  Alpine.data('PwSimpleScroller', $root => ({
    scrollAmount: null,
    scrollFull: $root.dataset.scrollFull,
    overflowing: {
      left: false,
      right: true,
    },
    init() {
      const firstListItem = this.$root.querySelector('.scroller > li:first-child');
      const lastListItem = this.$root.querySelector('.scroller > li:last-child');

      const firstLastObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            const target = entry.target === firstListItem ? 'left' : 'right';
            if (entry.intersectionRatio < 0.95) {
              this.overflowing[target] = true;
            } else {
              this.overflowing[target] = false;
            }
          });
        },
        {
          root: this.$refs.scroller,
          threshold: 0.95,
        }
      );

      firstLastObserver.observe(firstListItem);
      firstLastObserver.observe(lastListItem);

      if (this.scrollAmount === null) {
        if (this.scrollFull) {
          this.scrollAmount = this.$refs.scroller.offsetWidth;
        } else {
          this.scrollAmount = this.$refs.scroller.offsetWidth / 2;
        }
      }

      var inertObserver = new IntersectionObserver(
        (entries, observer) => {
          Array.prototype.forEach.call(entries, function (entry) {
            if (entry.intersectionRatio > 0.5) {
              entry.target.removeAttribute('inert');
            } else {
              entry.target.setAttribute('inert', 'inert');
            }
          });
        },
        {
          root: this.$refs.scroller,
          threshold: 0.5,
        }
      );

      this.$root.querySelectorAll('.scroller > li').forEach(item => {
        inertObserver.observe(item);
      });
    },
    focusOnFirstItem() {
      setTimeout(() => {
        this.$refs.scroller.querySelectorAll('li[tabindex]:not([inert])')[0].focus({ preventScroll: true });
      }, 750);
    },
    scrollRight() {
      this.$refs.scroller.scrollLeft += this.scrollAmount;

      this.focusOnFirstItem();
    },
    scrollLeft() {
      this.$refs.scroller.scrollLeft -= this.scrollAmount;

      this.focusOnFirstItem();
    },
  }));

  Alpine.data('PwTweets', () => ({
    colcadeInstance: null,
    extraTweets: null,
    colcade() {
      if (window.innerWidth > 767) {
        loadjs('https://cdn.jsdelivr.net/npm/colcade@0.2.0/colcade.js', () => {
          this.colcadeInstance = new Colcade('.tweets-grid', {
            columns: '.tweets-grid__col',
            items: '.tweets-grid__item',
          });
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
      loadjs('https://cdn.jsdelivr.net/gh/BrandwatchLtd/twitter-intents@1.0.0/twitter-intents.min.js', function () {
        const intents = new TwitterIntents();
        intents.register();
      });
    },
  }));

  Alpine.data('PwHeader', () => ({
    obscured: true,
    activeSection: null,
    handleScroll() {
      this.obscured = window.scrollY < 200;
    },
    init() {
      let headingsInView = [];
      const io = new IntersectionObserver(
        entries => {
          const exitedElements = entries.filter(entry => !entry.isIntersecting).map(entry => entry.target);
          const enteredElements = entries.filter(entry => entry.isIntersecting).map(entry => entry.target);
          headingsInView = headingsInView.filter(h => !exitedElements.includes(h));
          headingsInView.push(...enteredElements);
          if (headingsInView.length > 0) {
            const sectionId = (this.activeSection = headingsInView[0].dataset.section);
            window.dispatchEvent(new CustomEvent('pw-header-active-section-id', { detail: sectionId }));
          }
        },
        {
          rootMargin: '-120px 0px 0px 0px',
        }
      );
      document.querySelectorAll('h2').forEach(heading => io.observe(heading));
    },
  }));

  Alpine.data('PwGenre', () => ({
    open: false,
    toggle() {
      this.$root.closest('p').classList.add('select-none');
      setTimeout(() => {
        this.$root.closest('p').classList.remove('select-none');
      }, 1000);
      if (this.open) {
        this.$root.blur();
      }
      this.open = !this.open;
    },
  }));

  Alpine.data('PwCardInstagram', $root => ({
    playing: false,
    confetti($root) {
      loadjs('https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js', function () {
        var dimensions = this.$root.getBoundingClientRect();
        var centerXCoord = dimensions.left + window.pageXOffset + dimensions.width / 2;
        var centerYCoord = dimensions.y + dimensions.height / 2;

        var count = 150;
        var defaults = {
          origin: {
            y: centerYCoord / window.innerHeight,
            x: centerXCoord / window.innerWidth,
          },
          disableForReducedMotion: true,
        };

        function fire(particleRatio, opts) {
          confetti(
            Object.assign({}, defaults, opts, {
              particleCount: Math.floor(count * particleRatio),
            })
          );
        }

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });

        fire(0.2, {
          spread: 60,
        });

        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      });
    },
  }));
});

Alpine.start();

document.body.addEventListener(
  'load',
  e => {
    if (e.target.tagName != 'IMG' || !e.target.classList.contains('has-blurry-placeholder')) {
      return;
    }

    // Remove the blurry placeholder.
    e.target.style.backgroundImage = 'none';
  },
  true
);

document.querySelector('html').classList.remove('no-js');
document.querySelector('html').classList.add('js');

console.info(
  `%c🚧 🖥👨‍💻 Welcome to my website! Is something not working? There's always room for improvement… You can report issues on GitHub 👨‍💻 🖥 🚧`,
  `
    color: white;
    background: linear-gradient(312deg, rgba(255,0,0,1) 0%, rgba(241,255,0,1) 15%, rgba(0,255,12,1) 30%, rgba(0,254,255,1) 43%, rgba(0,1,255,1) 59%, rgba(250,0,253,1) 88%, rgba(255,0,0,1) 100%);
    border: 1px solid white;
    padding: 1em;
    font-family: "Comic Sans MS";
    font-size: 1.5em;
    text-shadow: rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px;
`
);
console.info('%c🔗 🌍 https://github.com/philwolstenholme/wolstenhol-11ty/issues/new 🌍 🔗', `font-size: 1.5em;`);
