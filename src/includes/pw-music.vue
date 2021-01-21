<script>
import PwLede from './pw-lede.vue';
import PwSimpleScroller from './pw-simple-scroller.vue';
import PwSimpleScrollerItem from './pw-simple-scroller-item.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwCardMusic from './pw-card-music.vue';
import PwSection from './pw-section.vue';

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
    PwSection,
  },
};
</script>

<template>
  <pw-section section-key="music">
    <pw-section-heading title="Music" icon="headphones" section="music" />
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
      x-data="PwMusic()"
      x-init="init($dispatch)"
      x-on:play-preview.window="play($event.detail, $el)"
      x-on:stop-preview.window="pause($el)"
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
  </pw-section>
</template>
