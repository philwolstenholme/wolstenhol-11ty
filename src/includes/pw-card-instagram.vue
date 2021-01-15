<script>
import icon from './icon.vue';

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
      let original = this.post.images.standard_resolution.url;

      let cloudinaryPrefix = `https://res.cloudinary.com/wolstenh/image/fetch/w_auto:100:${this.width},f_auto,q_auto:best/`;

      return cloudinaryPrefix + encodeURIComponent(original);
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
    tabindex="1"
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
          sizes="368px"
          class="w-full transition-opacity group-hocus:opacity-50"
          loading="lazy"
        />
      </template>
      <figcaption
        class="absolute transform-gpu transition-transform translate-y-full max-h-full overflow-y-auto group-hocus:translate-y-0 bg-gradient-to-t from-black to-grey-900 bottom-0 font-bold p-5 text-white text-xs w-full z-1"
      >
        {{ post.caption.text }}
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
