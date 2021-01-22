import 'alpinejs';
import 'wicg-inert';
import 'what-input';
import Horizon from '@mintuz/horizon';
window.Horizon = Horizon;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

window.PwCardMusic = $el => {
  return {
    isPlaying: false,
    progress: 0,
    previewUrl: $el.dataset.previewUrl,
    index: $el.dataset.index,
    init() {
      this.$nextTick(() => {
        if (this.$refs['playButton']) {
          this.$refs['playButton'].setAttribute('role', 'button');
        }
      });
    },
    musicCardButtonPress($dispatch) {
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
      if ($event.detail.src === this.previewUrl) {
        this.isPlaying = true;
      }
    },
    stoppedPreview($event) {
      if ($event.detail.src === this.previewUrl) {
        this.isPlaying = false;
      }
    },
    previewProgress($event) {
      if ($event.detail.src === this.previewUrl) {
        this.progress = $event.detail.progress;
      }
    },
  };
};

window.PwContact = () => {
  return {
    submitted: false,
    error: null,
    submitForm() {
      const data = new FormData(this.$refs.form);
      data.append('form-name', this.$refs.form.getAttribute('name'));
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
  };
};

window.PwMusic = () => {
  return {
    isPlaying: false,
    src: null,
    init($dispatch) {
      this.$watch('isPlaying', value => {
        $dispatch(value ? 'playing-preview' : 'stopped-preview', {
          src: this.src,
        });
      });
    },
    play(detail) {
      this.isPlaying = false;
      this.src = detail.src;
      this.$el.play();
    },
    playing() {
      this.isPlaying = true;
    },
    pause() {
      this.$el.pause();
      this.isPlaying = false;
    },
    ended() {
      this.isPlaying = false;
      this.src = null;
    },
    timeupdate($event, $dispatch) {
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
  };
};

window.PwSimpleScroller = $el => {
  return {
    scrollAmount: null,
    scrollFull: $el.dataset.scrollFull,
    overflowing: {
      left: false,
      right: true,
    },
    init() {
      const firstListItem = this.$el.querySelector('.scroller > li:first-child');
      const lastListItem = this.$el.querySelector('.scroller > li:last-child');

      let observer = new IntersectionObserver(
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

      observer.observe(firstListItem);
      observer.observe(lastListItem);

      if (this.scrollAmount === null) {
        if (this.scrollFull) {
          this.scrollAmount = this.$refs.scroller.offsetWidth;
        } else {
          this.scrollAmount = this.$refs.scroller.offsetWidth / 2;
        }
      }
    },
    scrollRight() {
      this.$refs.scroller.scrollLeft += this.scrollAmount;
    },
    scrollLeft() {
      this.$refs.scroller.scrollLeft -= this.scrollAmount;
    },
  };
};

window.PwTweets = () => {
  return {
    colcade() {
      if (window.innerWidth > 767) {
        loadjs(['https://cdn.jsdelivr.net/npm/colcade@0.2.0/colcade.min.js'], 'colcade');
        loadjs.ready('colcade', function () {
          var colcade = new Colcade('.tweets-grid', {
            columns: '.tweets-grid__col',
            items: '.tweets-grid__item',
          });
        });
      }
    },
    twitterIntents() {
      loadjs(['https://cdn.jsdelivr.net/gh/BrandwatchLtd/twitter-intents@1.0.0/twitter-intents.min.js'], 'twitter-intents');
      loadjs.ready('twitter-intents', function () {
        const intents = new TwitterIntents();
        intents.register();
      });
    },
    init() {
      const observed = Horizon({
        toObserve: this.$el,
        triggerOnce: true,
        onEntry(entry) {
          entry.target.__x.$data.colcade();
          entry.target.__x.$data.twitterIntents();
        },
      });
    },
  };
};

window.PwHeader = () => {
  return {
    active: null,
    init() {
      let headingsInView = [];
      const io = new IntersectionObserver(
        entries => {
          const exitedElements = entries.filter(entry => !entry.isIntersecting).map(entry => entry.target);
          const enteredElements = entries.filter(entry => entry.isIntersecting).map(entry => entry.target);
          headingsInView = headingsInView.filter(h => !exitedElements.includes(h));
          headingsInView.push(...enteredElements);
          if (headingsInView.length > 0) {
            const navigationApp = document.querySelector('header nav').__x;
            const sectionId = (this.active = headingsInView[0].dataset.section);
            navigationApp.$data.active = sectionId;
          }
        },
        {
          rootMargin: '-120px 0px 0px 0px',
        }
      );
      document.querySelectorAll('h2').forEach(heading => io.observe(heading));
    },
  };
};

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
