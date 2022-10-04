document.addEventListener('alpine:init', () => {
  Alpine.data('PwMusic', $store => ({
    isPlaying: false,
    src: null,
    originalTitle: null,
    artist: null,
    track: null,
    init() {
      this.originalTitle = document.title;
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
      this.artist = detail.artist;
      this.track = detail.track;
      this.$root.play();
    },
    async playing() {
      this.isPlaying = true;
      this.setTitle();
    },
    async pause() {
      this.$root.pause();
      this.isPlaying = false;
      await this.restoreTitle();
    },
    async ended() {
      this.isPlaying = false;
      this.src = null;
      await this.restoreTitle();
    },
    async setTitle() {
      await import('../../utils/scrolling-title.js').then(({ stopRotatingTitle }) => {
        stopRotatingTitle();
      });

      const newTitle = `${this.artist} - ${this.track}`;
      const prefix = '▶︎ ';
      document.title = prefix + newTitle;

      const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (!prefersReducedMotionQuery || prefersReducedMotionQuery.matches) {
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 400));
      await import('../../utils/scrolling-title.js').then(({ rotateTitle }) => {
        rotateTitle(newTitle, '-', 300, prefix);
      });
    },
    async restoreTitle() {
      await import('../../utils/scrolling-title.js').then(({ stopRotatingTitle }) => {
        stopRotatingTitle();
        window.requestAnimationFrame(() => {
          document.title = this.originalTitle;
        });
      });
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
});
