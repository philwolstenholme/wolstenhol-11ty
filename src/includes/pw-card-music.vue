<script>
import round from 'lodash/round';
import isUndefined from 'lodash/isUndefined';
import icon from './icon.vue';

export default {
  components: { icon },

  props: {
    music: {
      type: Object,
      default: () => ({}),
    },

    index: {
      type: String,
      default: null,
    },
  },

  computed: {
    image: function () {
      return this.spotifyCloudinaryUrl;
    },

    srcset: function () {
      return `${this.image.replace(/145/gi, '290')} 2x`;
    },

    spotifyCloudinaryUrl() {
      let original = this.music.images[0].url;
      let cloudinaryPrefix = 'https://wolstenhol.me/proxy/cloudinary/image/upload/w_145,h_145,c_fill,f_auto,q_auto:low/spotify/';
      let URL = original.replace('https://i.scdn.co/image/', cloudinaryPrefix);

      return URL;
    },

    previewUrl: function () {
      return this.music.top_tracks.preview_url;
    },

    bpm() {
      if (!isUndefined(this.music.top_tracks.features)) {
        return round(this.music.top_tracks.features.tempo);
      } else {
        return 0;
      }
    },

    tempoAnimationDuration() {
      return 1 / (this.bpm / 60) / 2;
    },
  },

  methods: {},
};
</script>

<template>
  <article
    :data-index="index"
    :data-preview-url="previewUrl"
    :data-artist="music.name"
    :data-track="music.top_tracks.name"
    x-ignore
    ax-load="visible"
    x-data="PwCardMusic"
    x-bind:class="{ isPlaying: isPlaying }"
    x-on:playing-preview.window="playingPreview($event)"
    x-on:stopped-preview.window="stoppedPreview($event)"
    x-on:preview-progress.window="previewProgress($event)"
    x-on:keydown.escape.window="if (isPlaying) { musicCardButtonPress($dispatch) }"
    x-intersect.once="window?.lozad?.triggerLoad && window.lozad.triggerLoad($refs.static)"
    x-init="init()"
    v-bind:style="`animation-duration: ${tempoAnimationDuration}s;`"
    class="contain-content relative group flex overflow-hidden card-music from-spotify to-black bg-gradient-to-b shadow-hard w-full rounded select-none"
  >
    <h3 class="sr-only">{{ music.name }}</h3>

    <figure>
      <img
        v-bind:src="image"
        v-bind:srcset="srcset"
        v-bind:alt="music.name"
        class="card-music__container mix-blend-soft-light transition-all"
        loading="lazy"
        crossorigin="anonymous"
        width="145"
        height="145"
      />
      <figcaption class="sr-only">
        {{ music.name }}
      </figcaption>
    </figure>

    <a
      v-if="previewUrl"
      v-bind:href="music.top_tracks.preview_url"
      target="spotify-preview"
      class="absolute inset-0 text-yellow-300 group outline-offset-invert"
      x-ref="playButton"
      x-on:click.prevent="musicCardButtonPress($dispatch)"
      x-on:keydown.space.prevent="musicCardButtonPress($dispatch)"
      x-on:keydown.enter.prevent="musicCardButtonPress($dispatch)"
      data-instant
    >
      <div class="absolute z-10 p-2 top-0 left-0">
        <span class="sr-only">Play 30 second preview of {{ music.name }}</span>
        <icon name="play" x-show="!isPlaying" class="transform transition-transform" />
        <span x-cloak>
          <icon name="pause" x-show="isPlaying" />
        </span>
      </div>
      <video
        aria-hidden="true"
        hidden
        data-lozad
        data-frivolous-grunge
        x-bind:class="{ 'opacity-40': $store.music.isPlaying && !isPlaying }"
        x-ref="static"
        class="mix-blend-luminosity motion-reduce:hidden block absolute h-full w-full object-cover object-left-top opacity-0 pointer-events-none transition-opacity"
        loop
        autoplay
        muted
        playsinline
        disablePictureInPicture
        disableRemotePlayback
        preload="none"
      >
        <source data-src="https://wolstenhol.me/proxy/cloudinary/video/upload/v1650231745/11ty/static.mp4" type="video/mp4" />
      </video>
    </a>

    <div hidden class="absolute block z-10 font-bold text-xs p-2 bottom-0 left-0">
      <div
        class="card-music__caption relative inline-block p-1 px-2 text-yellow-300 transform-gpu transition-transform duration-75 group-hocus:-translate-y-1 focus:underline"
      >
        <span class="relative text-black z-10">{{ music.name }}</span>
      </div>
    </div>

    <progress
      hidden
      x-bind:hidden="!isPlaying"
      v-if="previewUrl"
      x-bind:value="progress"
      x-bind:class="{ active: isPlaying }"
      max="1"
      class="card-music__progress absolute bottom-0 w-full text-spotify"
    />
  </article>
</template>

<style lang="scss">
.card-music {
  &__container {
    filter: grayscale(1) contrast(1.05);
  }

  &__progress {
    $progressBarHeight: 3px;
    $progressBarBg: rgba(0, 0, 0, 0.3);

    height: $progressBarHeight;
    transition: transform 250ms cubic-bezier(1, 0, 0, 1);
    transform: translateY(3px);
    appearance: none;
    border: none;

    &.active {
      transform: translateY(0);
    }

    &::-webkit-progress-bar {
      height: $progressBarHeight;
      background: $progressBarBg;
      background-blend-mode: multiply;
    }

    &::-webkit-progress-value {
      background: currentColor;
    }

    &::-moz-progress-bar {
      height: $progressBarHeight;
      background: $progressBarBg;
      background: currentColor;
    }
  }

  &__caption {
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: inline-block;
      width: 100%;
      content: '';
      background-color: currentColor;
      border-radius: 0.125rem;
      transform: rotate(-1deg);
    }
  }

  &.isPlaying {
    @media (prefers-reduced-motion: no-preference) {
      animation: dance 100ms infinite alternate;
    }
  }
}

@keyframes dance {
  0% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1.02);
  }
}
</style>
