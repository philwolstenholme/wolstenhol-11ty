export default function PwCardMusic() {
  return {
    isPlaying: false,
    progress: 0,
    previewUrl: this.$root.dataset.previewUrl,
    index: this.$root.dataset.index,
    artist: this.$root.dataset.artist,
    track: this.$root.dataset.track,
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
          artist: this.artist,
          track: this.track,
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
  };
}
