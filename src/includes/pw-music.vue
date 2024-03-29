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
  <pw-section section-key="music" sectionInnerClass="relative" v-if="Object.keys(artists).length && genres.length">
    <pw-section-heading title="Music" icon="headphones" section="music">
      <div
        hidden
        x-cloak
        x-ignore
        ax-load="idle"
        class="spotify-live mt-4 text-sm md:mt-0 md:pl-5"
        x-bind:hidden="!data.name || !timeagoLoaded"
        x-data="PwSpotifyLive()"
        x-intersect.margin.200px:enter="startInterval"
        x-intersect:leave="stopInterval"
      >
        <div class="flex items-center gap-1 md:gap-0">
          <span class="pulsating-circle inline-block h-3 w-3 flex-shrink-0 rounded-full"></span>&nbsp;
          <p class="md:truncate">
            <span class="spotify-live__label" x-bind:datetime="data?.playedAt" x-ref="label"></span>:
            <output>
              <span class="sr-only">I just finished listening to</span>
              <a x-bind:href="data?.trackUrl ?? '#'" x-text="`${data?.name} — ${data?.artistList}`" class="font-semibold"> </a>
            </output>
          </p>
        </div>
      </div>
    </pw-section-heading>

    <pw-lede class="mt-3"
      >According to the Spotify API, I've been listening to a bit of
      <template v-for="(genre, index) in genres">
        <template v-if="index + 1 == genres.length"> and </template
        ><mark v-bind:key="index" class="group cursor-help" tabindex="0" x-ignore ax-load="visible" x-data="PwGenre" x-on:click="toggle()"
          >{{ genre.genre }}<span class="hidden group-focus:inline"> ({{ genre.artist }})</span></mark
        ><template v-if="index < genres.length - 2">, </template></template
      >
      over the last few weeks (their genre names, not mine!)</pw-lede
    >

    <pw-simple-scroller class="mt-12" :scroll-full="true" theme="spotify" label="What I've been listening to">
      <pw-simple-scroller-item v-for="(artist, index) in artists" :key="index">
        <pw-card-music :music="artist" :index="index"></pw-card-music>
      </pw-simple-scroller-item>
    </pw-simple-scroller>

    <p
      x-data
      x-intersect.once="() => { var l = document.createElement('link'); l.rel = 'preconnect'; l.href = 'https://p.scdn.co'; document.head.appendChild(l);}"
      class="pointer-events-none mt-4 max-w-prose text-xs font-bold opacity-90 lg:mt-0"
    >
      You can click the cards above to play a little preview of the artist, courtesy of the Spotify API. I also use the Spotify API to get
      the tempo/BPM of the preview song, and I use this to influence the speed that a card bops at while its playing.
    </p>
    <p class="pointer-events-none mt-2 max-w-prose pb-0.5 text-xs opacity-90">
      <span class="no-js:hidden">
        Press the pause icon or the <kbd class="rounded border border-gray-300 bg-white p-0.5">esc</kbd> key on your keyboard to stop the
        previews.
      </span>
      &nbsp;
    </p>

    <audio
      controls
      autoplay
      hidden
      class="sr-only inline"
      x-init="$root.classList.remove('inline')"
      x-bind:src="src"
      x-ignore
      ax-load="idle"
      x-data="PwMusic($store)"
      x-on:play-preview.window="play($event.detail, $root)"
      x-on:stop-preview.window="pause($root)"
      x-on:pause="pause()"
      x-on:ended="ended()"
      x-on:playing="playing()"
      x-on:timeupdate="timeUpdate($event, $dispatch)"
    ></audio>
    <iframe
      x-data="{}"
      x-init="$root.remove()"
      class="absolute bottom-0 right-0 h-20 w-36 js:hidden js:hidden"
      name="spotify-preview"
      title="Spotify preview"
    ></iframe>
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

@media (min-width: 768px) {
  .spotify-live {
    max-width: calc(100% - 120px);
  }
}

.spotify-live__label {
  text-transform: uppercase;
  letter-spacing: -0.05em;
  font-variant: tabular-nums;
}
</style>
