<script>
import icon from './icon.vue';
import spriteIcon from './sprite-icon.vue';
const cloudinary = require('cloudinary').v2;

export default {
  components: {
    icon,
    spriteIcon,
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
    blurryUri: '',
  }),

  computed: {
    cloudinaryUrl: function () {
      let public_id = `11ty/instagram/${this.post.id}`;
      return cloudinary.url(public_id, {
        secure: true,
        width: this.width,
        quality: 'auto',
        fetch_format: 'auto',
      });
    },

    cloudinarySrcSet: function () {
      return `${this.cloudinaryUrl.replace(this.width, this.width * 2)} 2x, ${this.cloudinaryUrl.replace(this.width, this.width * 3)} 3x`;
    },

    isParty: function () {
      if (this.post.caption.text) {
        const text = this.post.caption.text;
        return text.includes('birthday') || text.includes('🎉') || text.includes('🥳') || text.includes('🎂');
      }
      return false;
    },

    onMousenterEvents() {
      const attributes = [];

      if (this.post.videos) {
        attributes.push('$refs.video.pause()');
      }

      if (this.isParty) {
        attributes.push('window.pw.instagramBirthdayConfettiTimer = setTimeout(() => {confetti($root);}, 1000)');
      }

      return attributes.join(';');
    },

    onMouseleaveEvents() {
      const attributes = [];

      if (this.post.videos) {
        attributes.push('$refs.video.play()');
      }

      if (this.isParty) {
        attributes.push('window.clearTimeout(window.pw.instagramBirthdayConfettiTimer)');
      }

      return attributes.join(';');
    },

    onFocusEvents() {
      const attributes = [];

      if (this.post.videos) {
        attributes.push('$refs.video.pause()');
      }

      if (this.isParty) {
        attributes.push('window.pw.instagramBirthdayConfettiTimer = setTimeout(() => {confetti($root);}, 1000)');
      }

      return attributes.join(';');
    },

    onBlurEvents() {
      const attributes = [];

      if (this.post.videos) {
        attributes.push('$refs.video.play()');
      }

      if (this.isParty) {
        attributes.push('window.clearTimeout(window.pw.instagramBirthdayConfettiTimer)');
      }

      return attributes.join(';');
    },
  },
};
</script>

<template comments>
  <figure
    tabindex="0"
    x-data="PwCardInstagram($root)"
    v-bind:x-on:mouseenter="onMousenterEvents"
    v-bind:x-on:mouseleave="onMouseleaveEvents"
    v-bind:x-on:focus="onFocusEvents"
    v-bind:x-on:blur="onBlurEvents"
    class="contain-content group relative flex rounded overflow-hidden card__instagram bg-gradient-to-t from-black to-gray-900 shadow-hard aspect-h-1 aspect-w-1 select-none"
    :class="{ 'card__instagram--party': isParty }"
  >
    <div class="flex-col justify-center shadow-hard">
      <template v-if="post.videos">
        <video
          x-ref="video"
          class="lozad inset-0 w-full h-full object-cover transition-opacity group-hocus:opacity-50"
          :data-poster="cloudinaryUrl"
          muted
          loop
          autoplay
          playsinline
          disablePictureInPicture
          disableRemotePlayback
          preload="none"
        >
          <source :data-src="`https://wolstenhol.me/instagram-proxy/${post.videos.standard_resolution.url}`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </template>
      <template v-if="!post.videos">
        <div class="grid grid-stack">
          <img
            :src="cloudinaryUrl"
            :srcset="cloudinarySrcSet"
            :key="post.id"
            :alt="post.accessibilityCaption ? post.accessibilityCaption : ''"
            width="368"
            height="368"
            sizes="368px"
            class="has-blurry-placeholder w-full transition-opacity group-hocus:opacity-50"
            onload="this.classList.remove('has-blurry-placeholder'); this.nextElementSibling.remove(); this.style.backgroundImage = null; this.removeAttribute('onLoad')"
            loading="lazy"
            decoding="async"
            crossorigin="anonymous"
            :style="`background-image:url(&quot;${post.svgPlaceholder}&quot;)`"
          />
          <div class="w-full h-full flex items-center justify-center">
            <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
            <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
              <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                  <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </template>
      <figcaption
        class="absolute pointer-events-none space-y-3 transform-gpu transition-transform translate-y-full max-h-full group-hocus:translate-y-0 bg-gradient-to-t from-black to-grey-900 bottom-0 font-bold p-5 text-white text-xs w-full z-1"
      >
        <div v-if="post.likes.count > 0 || post.comments.count > 0 || post.location.name" class="space-y-2">
          <p v-if="post.likes.count > 0 || post.comments.count > 0">
            <template v-if="post.likes.count > 0">
              <sprite-icon hash="heart" class="text-red-600"></sprite-icon>
              <span class="sr-only">Likes: </span>
              <span class="inline-block mr-2" v-text="post.likes.count" />
            </template>
            <template v-if="post.comments.count > 0">
              <sprite-icon hash="speech"></sprite-icon>
              <span class="sr-only">Comments: </span>
              <span class="inline-block" v-text="post.comments.count" />
            </template>
          </p>
          <p v-if="post.location.name">
            <icon name="mapMarkerAlt" class="inline-block mr-1" />
            <span class="sr-only">Tagged location: </span>
            <span v-text="post.location.name" />
          </p>
        </div>
        <p v-if="post.caption.text">
          {{ post.caption.text }}
        </p>
        <span v-if="isParty" class="-top-8 absolute lg:inline-block lg:text-4xl right-8 sm:hidden text-6xl xl:text-6xl" aria-hidden="true"
          >🥳</span
        >
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
