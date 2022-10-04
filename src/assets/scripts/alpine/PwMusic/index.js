document.addEventListener('alpine:init', () => {
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
});
