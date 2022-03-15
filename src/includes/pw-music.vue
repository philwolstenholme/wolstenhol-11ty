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
  <pw-section section-key="music" v-if="Object.keys(artists).length && genres.length">
    <pw-section-heading title="Music" icon="headphones" section="music" />
    <pw-lede class="mt-3"
      >According to the Spotify API, I've been listening to a bit of
      <template v-for="(genre, index) in genres">
        <template v-if="index + 1 == genres.length"> and </template
        ><mark v-bind:key="index" class="group cursor-help" tabindex="0" x-data="PwGenre" x-on:click="toggle()"
          >{{ genre.genre }}<span class="hidden group-focus:inline"> ({{ genre.artist }})</span></mark
        ><template v-if="index < genres.length - 2">, </template></template
      >
      over the last few weeks (their genre names, not mine!)</pw-lede
    >

    <p
      x-cloak
      class="mt-3 text-sm"
      x-data="PwSpotifyLive()"
      x-show="data && data.name && timeagoVisible"
      x-intersect:enter="startInterval"
      x-intersect:leave="stopInterval"
    >
      <span class="pulsating-circle h-3 inline-block rounded-full w-3"></span>&nbsp;<span
        class="spotify-live__label"
        x-bind:datetime="data.playedAt"
        x-ref="label"
        >XX MINUTES AGO</span
      >: <a x-bind:href="data.trackUrl" href="#" x-text="`${data.name} — ${data.artistList}`" class="font-semibold"></a>
    </p>

    <pw-simple-scroller class="mt-12" :scroll-full="true" theme="spotify" label="What I've been listening to">
      <pw-simple-scroller-item v-for="(artist, index) in artists" :key="index">
        <pw-card-music :music="artist" :index="index"></pw-card-music>
      </pw-simple-scroller-item>
    </pw-simple-scroller>

    <p class="pointer-events-none font-bold max-w-prose mt-4 lg:mt-0 opacity-90 text-xs">
      You can click the cards above to play a little preview of the artist, courtesy of the Spotify API. I also use the Spotify API to get
      the tempo/BPM of the preview song, and I use this to influence the speed that a card bops at while its playing.
    </p>
    <p class="pointer-events-none no-js:hidden pb-0.5 max-w-prose mt-2 opacity-90 text-xs">
      Press the pause icon or the <kbd class="rounded border border-gray-300 p-0.5 bg-white">esc</kbd> key on your keyboard to stop the
      previews.
    </p>

    <audio
      controls
      autoplay
      hidden
      class="inline sr-only"
      x-init="$root.classList.remove('inline')"
      x-bind:src="src"
      x-data="PwMusic"
      x-on:play-preview.window="play($event.detail, $root)"
      x-on:stop-preview.window="pause($root)"
      x-on:pause="pause()"
      x-on:ended="ended()"
      x-on:playing="playing()"
      x-on:timeupdate="timeUpdate($event, $dispatch)"
    ></audio>
    <iframe x-data="{}" x-init="$root.remove()" class="js:hidden" name="spotify-preview" title="Spotify preview"></iframe>
  </pw-section>
</template>

<style scoped>
.pulsating-circle {
  --spotify-brand: #1db954;
  background: var(--spotify-brand);
  box-shadow: 0 0 0 0 var(--spotify-brand);
  transform: scale(1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 var(--spotify-brand);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

.spotify-live__label {
  text-transform: uppercase;
  letter-spacing: -0.05em;
  font-variant: tabular-nums;
}
</style>
