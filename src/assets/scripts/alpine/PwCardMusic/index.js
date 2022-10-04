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
});
