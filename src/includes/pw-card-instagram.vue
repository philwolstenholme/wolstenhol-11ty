<script>
import icon from './icon.vue';
const cloudinary = require('cloudinary').v2;

export default {
  components: {
    icon,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    playing: true,
    width: 400,
  }),

  computed: {
    cloudinaryUrl: function () {
      let public_id = `11ty/instagram/${this.post.id}`;
      return cloudinary.url(public_id, { width: this.width, quality: 'auto', fetch_format: 'auto' });
    },

    cloudinarySrcSet: function () {
      return `${this.cloudinaryUrl.replace(this.width, this.width * 2)} 2x, ${this.cloudinaryUrl.replace(this.width, this.width * 3)} 3x`;
    },
  },

  watch: {
    playing: function (value) {
      if (value) {
        if (this.$refs.video) this.$refs.video.play();
      } else {
        if (this.$refs.video) this.$refs.video.pause();
      }
    },
  },

  created() {
    // var motionQuery = matchMedia('(prefers-reduced-motion)');
    // motionQuery.addListener(this.handleReduceMotionChanged);
    // this.handleReduceMotionChanged(motionQuery);
  },

  methods: {
    handleReduceMotionChanged: function (e) {
      if (e.matches) {
        this.playing = false;
      } else {
        this.playing = true;
      }
    },
  },
};
</script>

<template>
  <figure
    tabindex="0"
    x-data="{playing:false}"
    class="group relative flex rounded overflow-hidden card__instagram bg-gradient-to-t from-black to-gray-900 shadow-hard aspect-h-1 aspect-w-1 select-none"
  >
    <div class="flex-col justify-center shadow-hard" x-on:mouseover="playing = !playing" x-on:mouseout="playing = !playing">
      <template v-if="post.videos">
        <video
          x-ref="video"
          :poster="cloudinaryUrl"
          x-bind:autoplay="playing"
          muted
          loop
          playsinline
          disablePictureInPicture
          disableRemotePlayback
          class="w-full h-full transition-opacity group-hocus:opacity-50"
        >
          <source :src="post.videos.standard_resolution.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </template>
      <template v-if="!post.videos">
        <img
          :src="cloudinaryUrl"
          :srcset="cloudinarySrcSet"
          :key="post.id"
          :alt="post.caption.text"
          width="368"
          height="368"
          sizes="368px"
          class="w-full transition-opacity group-hocus:opacity-50"
          loading="lazy"
        />
      </template>
      <figcaption
        class="absolute space-y-3 transform-gpu transition-transform translate-y-full max-h-full overflow-y-auto group-hocus:translate-y-0 bg-gradient-to-t from-black to-grey-900 bottom-0 font-bold p-5 text-white text-xs w-full z-1"
      >
        <div v-if="post.likes.count > 0 || post.comments.count > 0 || post.location.name" class="space-y-2">
          <p v-if="post.likes.count > 0 || post.comments.count > 0">
            <template v-if="post.likes.count > 0">
              <svg class="icon text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="3.5329999923706055 12 46.933998107910156 44">
                <path
                  d="M38.723,12c-7.187,0-11.16,7.306-11.723,8.131C26.437,19.306,22.504,12,15.277,12C8.791,12,3.533,18.163,3.533,24.647 C3.533,39.964,21.891,55.907,27,56c5.109-0.093,23.467-16.036,23.467-31.353C50.467,18.163,45.209,12,38.723,12z"
                />
              </svg>
              <span class="inline-block mr-2" v-text="post.likes.count" />
            </template>
            <template v-if="post.comments.count > 0">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 32 29.986000061035156">
                <path
                  d="M16 2c8.837 0 16 5.82 16 13s-7.163 13-16 13c-.85 0-1.682-.054-2.495-.158C10.068 31.28 5.965 31.895 2 31.986v-.84c2.142-1.05 4-2.962 4-5.146 0-.305-.024-.604-.068-.897C2.312 22.72 0 19.08 0 15 0 7.82 7.163 2 16 2z"
                />
              </svg>
              <span class="inline-block" v-text="post.comments.count" />
            </template>
          </p>
          <p v-if="post.location.name">
            <icon name="mapMarkerAlt" class="inline-block mr-1" />
            <span v-text="post.location.name" />
          </p>
        </div>
        <p v-if="post.caption.text">
          {{ post.caption.text }}
        </p>
      </figcaption>
    </div>
  </figure>
</template>

<style lang="scss" scoped>
$backgroundBufer: 30px;

.card__instagram--caption {
  max-height: calc(100% + #{$backgroundBufer});
  transition: transform 150ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: translateY(100%);
  transform-origin: top;

  &::after {
    display: block;
    width: 100%;
    height: $backgroundBufer;
    content: '';
  }
}

.card__instagram:hover,
.card__instagram:focus {
  .card__instagram--caption {
    transition: transform 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: translateY(calc(0% + #{$backgroundBufer}));
  }
}
</style>
