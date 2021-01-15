<script>
import PwLede from './pw-lede.vue';
import PwSimpleScroller from './pw-simple-scroller.vue';
import PwSimpleScrollerItem from './pw-simple-scroller-item.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwCardMusic from './pw-card-music.vue';

export default {
  props: {
    artists: {
      type: Array,
    },
  },

  components: {
    PwLede,
    PwSectionHeading,
    PwSimpleScroller,
    PwSimpleScrollerItem,
    PwCardMusic,
  },
};
</script>

<template>
  <section data-section="music">
    <pw-section-heading title="Music" icon="headphones" />
    <pw-lede class="mt-3"
      >What I've been listening to recently, via Last.fm and Spotify. Click an artist to hear a preview of their music<sup>*</sup>.</pw-lede
    >
    <small class="text-xs uppercase font-serif"
      ><sup>*</sup>If the Spotify API contains a preview clip – some artists seem to have opted out of this.</small
    >

    <audio
      controls
      autoplay
      hidden
      class="inline w-0 h-0"
      x-bind:src="src"
      x-data="{
        isPlaying: false,
        src: null,
        init($watch, $dispatch, $refs) {
          $watch('isPlaying', value => {
            $dispatch(value ? 'playing-preview' : 'stopped-preview', {
              src: this.src,
            });
          })
        },
        play(detail) {
          this.isPlaying = false;
          this.src = detail.src;
          $el.play();
        },
        playing() {
          this.isPlaying = true;
        },
        pause() {
          $el.pause();
          this.isPlaying = false;
        },
        ended() {
          this.isPlaying = false;
          this.src = null;
        },
        timeupdate($event, $dispatch) {
          const progress = Math.round((($event.target.currentTime / $event.target.duration) + Number.EPSILON) * 100) / 100;

          if (Number.isNaN(progress)) {
            return;
          } else {
            $dispatch('preview-progress', {
              src: $event.target.src,
              progress: progress,
            });
          }
        }
      }"
      x-init="init($watch, $dispatch)"
      x-on:play-preview.window="play($event.detail)"
      x-on:stop-preview.window="pause()"
      x-on:pause="pause()"
      x-on:ended="ended()"
      x-on:playing="playing()"
      x-on:timeupdate="timeupdate($event, $dispatch)"
    ></audio>

    <pw-simple-scroller class="mt-5" :scroll-full="true" theme="spotify">
      <pw-simple-scroller-item v-for="(artist, index) in artists" :key="index">
        <pw-card-music :music="artist" :index="index"></pw-card-music>
      </pw-simple-scroller-item>
    </pw-simple-scroller>

    <iframe x-data="{}" x-init="$el.remove()" class="js:hidden" name="spotify-preview" title="Spotify preview"></iframe>
  </section>
</template>
