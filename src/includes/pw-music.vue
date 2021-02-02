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
      type: Object,
    },
    genres: {
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
      >According to the Spotify API, I've been listening to
      <template v-for="(genre, index) in genres">
        <template v-if="index + 1 == genres.length"> and </template><mark>{{ genre }}</mark
        ><template v-if="index < genres.length - 2">, </template></template
      >
      over the last few weeks.</pw-lede
    >

    <pw-simple-scroller class="mt-12" :scroll-full="true" theme="spotify">
      <pw-simple-scroller-item v-for="(artist, index) in artists" :key="index">
        <pw-card-music :music="artist" :index="index"></pw-card-music>
      </pw-simple-scroller-item>
    </pw-simple-scroller>

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
    <iframe x-data="{}" x-init="$el.remove()" class="js:hidden" name="spotify-preview" title="Spotify preview"></iframe>
  </pw-section>
</template>
