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
      type: Number,
      default: null,
    },
  },

  computed: {
    image: function () {
      return this.music.spotify.images ? this.spotifyCloudinaryUrl : this.music.lastfm.image[0]['#text'];
    },

    spotifyCloudinaryUrl() {
      let original = this.music.spotify.images[0].url;
      let cloudinaryPrefix = 'https://res.cloudinary.com/wolstenh/image/upload/w_435,h_435,c_fill,f_auto,q_auto:best/spotify/';
      let URL = original.replace('https://i.scdn.co/image/', cloudinaryPrefix);

      return URL;
    },

    previewUrl: function () {
      return this.music.spotify.top_tracks.preview_url;
    },

    bpm() {
      if (!isUndefined(this.music.spotify.top_tracks.features)) {
        return round(this.music.spotify.top_tracks.features.tempo);
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
  <div
    v-bind:x-data="`{
      isPlaying: false,
      progress: 0,
      previewUrl: '${this.previewUrl}',
      index: ${this.index},
      musicCardButtonPress ($dispatch) {
        if (!this.isPlaying) {
          $dispatch('play-preview', {
            src: this.previewUrl,
            index: this.index,
          });
        } else {
          this.playing = false;
          $dispatch('stop-preview', {
            src: this.previewUrl,
            index: this.index,
          });
        }
      },
      playingPreview($event) {
        if ($event.detail.src === this.previewUrl) {
          this.isPlaying = true;
        }
      },
      stoppedPreview($event) {
        if ($event.detail.src === this.previewUrl) {
          this.isPlaying = false;
        }
      },
      previewProgress($event) {
        if ($event.detail.src === this.previewUrl) {
          this.progress = $event.detail.progress;
        }
      }
    }`"
    x-bind:class="{ isPlaying: isPlaying }"
    x-on:playing-preview.window="playingPreview($event)"
    x-on:stopped-preview.window="stoppedPreview($event)"
    x-on:preview-progress.window="previewProgress($event)"
    v-bind:style="`animation-duration: ${tempoAnimationDuration}s;`"
    class="relative group flex overflow-hidden card--music from-spotify to-black bg-gradient-to-b shadow-hard w-full rounded select-none"
  >
    <div class="absolute z-10 font-bold text-xs p-2 bottom-0 left-0">
      <a
        :href="music.spotify.external_urls.spotify"
        class="card--music__caption relative inline-block p-1 px-2 text-yellow-300 transform-gpu transition-transform duration-75 group-hocus:-translate-y-1"
      >
        <h3 class="relative text-black z-10" v-text="music.name" />
        <span class="sr-only">(Spotify artist page)</span>
      </a>
    </div>

    <figure>
      <img
        v-bind:src="image"
        v-bind:alt="music.name"
        class="card--music__container transition-all"
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
      v-bind:href="music.spotify.top_tracks.preview_url"
      target="spotify-preview"
      class="absolute inset-0 text-yellow-300"
      x-on:click.prevent="musicCardButtonPress($dispatch)"
    >
      <div class="absolute p-2 top-0 left-0">
        <span class="sr-only">{{ music.name }} (30 second preview)</span>
        <icon name="pause" icon-size="xs" x-show="isPlaying" />
        <span x-cloak>
          <icon name="play" icon-size="xs" x-show="!isPlaying" />
        </span>
      </div>
    </a>

    <progress
      hidden
      x-bind:hidden="!isPlaying"
      v-if="previewUrl"
      x-bind:value="progress"
      x-bind:class="{ active: isPlaying }"
      max="1"
      class="card--music__progress absolute bottom-0 w-full text-spotify"
    />
  </div>
</template>

<style lang="scss">
.card--music {
  &:hover,
  &:focus-within,
  &.isPlaying {
    .card--music__container {
      mix-blend-mode: unset;
    }
  }

  &__container {
    mix-blend-mode: soft-light;
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
    animation: dance 100ms infinite alternate;
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
