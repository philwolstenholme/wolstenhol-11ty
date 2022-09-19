import 'wicg-inert';
import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import lozad from 'lozad';
import loadjs from 'loadjs';

// import CssNakedDay from './css-naked-day.js';
// CssNakedDay();

const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;

window.Alpine = Alpine;

window.lozad = lozad('[data-lozad]', {
  enableAutoReload: true,
});
window.lozad.observe();

Alpine.plugin(intersect);
Alpine.plugin(focus);

if (navigator && ((navigator.connection?.effectiveType && navigator.connection?.effectiveType != '4g') || navigator.connection?.saveData)) {
  document.querySelectorAll('[data-section="photos"] video source').forEach(source => source.remove());
}

document.addEventListener('alpine:init', () => {
  Alpine.store('music', {
    isPlaying: false,
  });

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

  Alpine.data('PwMusic', $store => ({
    isPlaying: false,
    src: null,
    init() {
      this.$watch('isPlaying', value => {
        this.$dispatch(value ? 'playing-preview' : 'stopped-preview', {
          src: this.src,
        });
        $store.music.isPlaying = value;
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
    submissionError: null,
    invalidFormIds: [],
    invalidMessages: [],
    getValidationMessage(id) {
      const field = document.getElementById(id);
      return field.validationMessage;
    },
    setAsInvalid(id) {
      this.invalidFormIds = [...this.invalidFormIds, id];
      this.invalidMessages = [...this.invalidMessages, this.getValidationMessage(id)];
    },
    isInvalid(id) {
      return this.invalidFormIds.includes(id);
    },
    getInputLabel(id) {
      const field = document.getElementById(id);
      // Try to split out a short label without any 'this field is required' text and without more than one sentence.
      return [...field.labels].shift().firstChild.nodeValue.split(':').shift().split('.').shift().split('!').shift().split('?').shift();
    },
    init() {
      const form = this.$refs.form;
      form.setAttribute('novalidate', '');
    },
    submitForm() {
      const form = this.$refs.form;
      const data = new FormData(form);
      this.invalidFormIds = [];
      this.invalidMessages = [];

      form.checkValidity();

      if (this.invalidFormIds.length > 0) {
        console.warn('Form validation failed!', this.invalidFormIds);

        this.$nextTick(() => {
          this.$refs.errors.focus();
        });

        return;
      }

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
          this.submissionError = null;
        })
        .catch(error => {
          this.submissionError = JSON.stringify(error, null, 2);
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
      const firstListItem = this.$root.querySelector('[data-pw-scroller-list] > li:first-child');
      const lastListItem = this.$root.querySelector('[data-pw-scroller-list] > li:last-child');

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

      this.$root.querySelectorAll('[data-pw-scroller-list] > li').forEach(item => {
        inertObserver.observe(item);
      });

      // Hacky workaround for a weird browser/CSS issue (it happens before JS loads/runs)
      // where a scroller will start off partially scroled.
      if (this.$refs.scroller.scrollLeft !== 0) {
        this.$refs.scroller.classList.remove('scroll-smooth');
        this.$refs.scroller.scrollLeft = 0;
        this.$refs.scroller.classList.add('scroll-smooth');
      }
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
      loadjs('https://wolstenhol.me/proxy/jsdelivr/npm/canvas-confetti@1.5.1/dist/confetti.browser.js', 'canvas-confetti', {
        success: () => {
          var dimensions = $root.getBoundingClientRect();
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
        },
        before: (path, el) => {
          // We add a SRI hash to make up for the security risk of loading JS from a third-party.
          el.integrity = 'sha256-DLqQ9Jy1MLOv8QhzYyGo2km2ZBmOZFsL2GsXlogfgOk=';
          el.crossOrigin = 'anonymous';
        },
      });
    },
  }));

  Alpine.data('PwSpotifyLive', () => ({
    data: {},
    timeagoVisible: false,
    queryInterval: null,
    queryTimeout: null,
    queryApi() {
      if (document.visibilityState !== 'visible') {
        console.log(`🔕 Tab not visible so we didn't query Spotify`);
        return;
      }

      console.log(`🎵 Checking the Spotify API via Pipedream…`);
      fetch('https://wolstenhol.me/api/recently-played-spotify')
        .then(res => res.json())
        .then(res => (this.data = res))
        .then(() => {
          // If loadjs has't previously loaded timeago then let's load it.
          if (!loadjs.isDefined('timeago')) {
            loadjs('https://wolstenhol.me/proxy/jsdelivr/npm/timeago.js@4.0.2/dist/timeago.min.js', 'timeago', {
              before: (path, el) => {
                // We add a SRI hash to make up for the security risk of loading JS from a third-party.
                el.integrity = 'sha256-sTurDi2etLN9CpnUIoCC9y5iynb2qr/uo6QJqzoO7mA=';
                el.crossOrigin = 'anonymous';
              },
            });
          }

          loadjs.ready('timeago', () => {
            // Apply timeago against the DOM node for our 'x minutes ago' label.
            timeago.render(this.$refs.label);
            // Set a boolean so we can display our component. We do this to avoid a flash of content
            // jumping in once timeago has been loaded and applied to the element.
            this.timeagoVisible = true;

            if (this.data && this.data?.name) {
              // Now timeagoVisible the x-show display none will be removed and we can safely set
              // a CSS display property.
              this.$root.style.display = '';
            }
          });
        })
        .catch(err => console.error(err));
    },
    startInterval() {
      const timeoutInMinutes = 15;
      console.log(`🔈 Starting to check the Spotify API every so often to see what I might be listening to`);
      // Create an interval to check the API every-so-often.
      this.queryInterval = setInterval(this.queryApi.bind(this), MILLISECONDS_IN_A_SECOND * 30);
      // Create a timeout to eventually clear the interval so we don't hit the API infinitely if someone
      // leaves the page open forever.
      this.queryTimeout = setTimeout(() => {
        clearInterval(this.queryInterval);
      }, MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE * timeoutInMinutes);
    },
    stopInterval() {
      console.log(
        `🔇 Stopping checking the Spotify API as you've not got the music section visible. Gotta save those Pipedream invocation credits!`
      );
      clearInterval(this.queryInterval);
      clearTimeout(this.queryTimeout);
    },
    onVisibilityChange() {
      // If someone has just come back to the page after having it hidden then let's hit the API.
      if (document.visibilityState === 'visible') {
        this.queryApi();
      }
    },
    init() {
      // Hit the API when the component is initalised.
      this.queryApi();

      loadjs.ready('timeago', () => {
        // If the playedAt time from the API changes (e.g. a new track starts playing) then we need
        // to reinitalise timeago, cancelling any existing instance and then creating a new one.
        this.$watch('data.playedAt', () => {
          const labelEl = this.$refs.label;

          if (labelEl.getAttribute('timeago-id')) {
            timeago.cancel(labelEl);
          }

          timeago.render(labelEl);
        });
      });

      document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
    },
    destroy() {
      clearInterval(this.queryInterval);
      clearTimeout(this.queryTimeout);
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    },
  }));
});

Alpine.data('PwLightbox', () => ({
  open: false,
  srcSet: '',
  alt: '',
  width: '',
  height: '',
  className: '',
  style: '',
  showLoadingSpinner: true,
  generateSrcSet(src) {
    // Cloudinary has a limit on URL length.
    if (src.length > 255) {
      return src;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return `https://wolstenhol.me/proxy/cloudinary/image/fetch/h_${height},w_${width},c_limit,f_auto,q_auto/${src} 1x,
      https://wolstenhol.me/proxy/cloudinary/image/fetch/h_${height * 2},w_${width * 2},c_limit,f_auto,q_auto/${src} 2x,
      https://wolstenhol.me/proxy/cloudinary/image/fetch/h_${height * 3},w_${width * 3},c_limit,f_auto,q_auto/${src} 3x`;
  },
  generateClassName() {
    return ['-rotate-3', '-rotate-2', '-rotate-1', 'rotate-3', 'rotate-2', 'rotate-1'].sort(() => 0.5 - Math.random())[0];
  },
  init() {
    this.$watch('open', value => {
      document.documentElement.classList.toggle('lightbox-open');
    });
  },
  onOpen($event) {
    this.srcSet = this.generateSrcSet($event.target.dataset.lightboxImage);
    const img = $event.target.tagName === 'IMG' ? $event.target : $event.target.querySelector('img');
    this.alt = img.getAttribute('alt');
    this.width = img.getAttribute('width');
    this.height = img.getAttribute('height');
    this.className = this.generateClassName();

    const viewportIsLandscape = window.matchMedia('(orientation: landscape)').matches;

    if (viewportIsLandscape) {
      this.style = `width: auto; height: 85vh;`;
    }

    this.open = true;

    this.$nextTick(() => {
      this.$root.showModal();
    });
  },
  onClose() {
    this.open = false;
    this.srcSet = '';
    this.alt = '';
    this.height = '';
    this.width = '';
    this.style = '';
    this.showLoadingSpinner = true;
  },
}));

Alpine.start();

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
