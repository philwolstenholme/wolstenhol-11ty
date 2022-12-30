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
    width: 365,
    blurryUri: '',
  }),

  computed: {
    cloudinaryUrl: function () {
      let public_id = `11ty/instagram/${this.post.id}`;
      return cloudinary
        .url(public_id, {
          secure: true,
          width: this.width,
          quality: 'auto',
          fetch_format: 'auto',
        })
        .replace('https://res.cloudinary.com/wolstenh/', 'https://wolstenhol.me/proxy/cloudinary/');
    },

    cloudinarySrcSet: function () {
      return `${this.cloudinaryUrl.replace(this.width, this.width * 1)} ${this.width * 1}w, ${this.cloudinaryUrl.replace(
        this.width,
        this.width * 2
      )} ${this.width * 2}w, ${this.cloudinaryUrl.replace(this.width, this.width * 3)} ${this.width * 3}w`;
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

      if (!this.post.videos) {
        attributes.push('prefetchImage($el.dataset.lightboxImage)');
      }

      return attributes.length ? attributes.join(';') : null;
    },

    onMousenterOnceEvents() {
      const attributes = [];

      if (this.isParty) {
        attributes.push('confetti()');
      }

      return attributes.length ? attributes.join(';') : null;
    },

    onMouseleaveEvents() {
      const attributes = [];

      if (this.post.videos) {
        attributes.push('$refs.video.play()');
      }

      return attributes.length ? attributes.join(';') : null;
    },

    onFocusEvents() {
      const attributes = [];

      if (this.post.videos) {
        attributes.push('$refs.video.pause()');
      }

      if (!this.post.videos) {
        attributes.push('prefetchImage($el.dataset.lightboxImage)');
      }

      return attributes.length ? attributes.join(';') : null;
    },

    onFocusOnceEvents() {
      const attributes = [];

      if (this.isParty) {
        attributes.push('confetti()');
      }

      return attributes.length ? attributes.join(';') : null;
    },

    onBlurEvents() {
      const attributes = [];

      if (this.post.videos) {
        attributes.push('$refs.video.play()');
      }

      return attributes.length ? attributes.join(';') : null;
    },

    onTouchstartEvents() {
      const attributes = [];

      if (!this.post.videos) {
        attributes.push('prefetchImage($el.dataset.lightboxImage)');
      }

      return attributes.length ? attributes.join(';') : null;
    },
  },
};
</script>

<template comments>
  <figure
    tabindex="0"
    x-ignore
    ax-load="visible"
    x-data="PwCardInstagram($root)"
    v-bind:x-on:mouseenter="onMousenterEvents"
    v-bind:x-on:mouseenter{dot}once="onMousenterOnceEvents"
    v-bind:x-on:mouseleave="onMouseleaveEvents"
    v-bind:x-on:focus="onFocusEvents"
    v-bind:x-on:focus{dot}once="onFocusOnceEvents"
    v-bind:x-on:blur="onBlurEvents"
    v-bind:x-on:touchstart{dot}passive="onTouchstartEvents"
    class="contain-content card-instagram group aspect-h-1 aspect-w-1 relative flex select-none overflow-hidden rounded bg-gradient-to-t from-black to-gray-900 shadow-hard"
    v-bind:class="{ 'card-instagram--party': isParty }"
    v-bind:data-lightbox-image="
      !post.videos ? `https://instagram-proxy.philgw.workers.dev/${post.display_url.replace('https://', 'https:/')}` : null
    "
    v-bind:x-init="!post.videos ? `$root.setAttribute('role', 'button');` : null"
    v-bind:x-on:click{dot}prevent="
      !post.videos ? `if (useLightbox) $root.dispatchEvent(new CustomEvent('pw-lightbox-open', { bubbles: true }));` : null
    "
    v-bind:x-on:keydown{dot}enter{dot}prevent="!post.videos ? `$root.click()` : null"
    v-bind:x-on:keydown{dot}space="!post.videos ? `$root.click()` : null"
  >
    <div class="flex-col justify-center shadow-hard">
      <template v-if="post.videos">
        <noscript>
          <video
            x-ref="video"
            class="inset-0 h-full w-full object-cover transition-opacity group-hocus:opacity-50"
            :poster="cloudinaryUrl"
            muted
            loop
            autoplay
            playsinline
            disablePictureInPicture
            disableRemotePlayback
            preload="none"
          >
            <source
              data-remove-if-save-data="true"
              :src="`https://instagram-proxy.philgw.workers.dev/${post.videos.standard_resolution.url.replace('https://', 'https:/')}`"
              type="video/mp4"
            />
          </video>
        </noscript>
        <video
          x-ref="video"
          data-lozad
          class="inset-0 h-full w-full object-cover transition-opacity group-hocus:opacity-50 no-js:hidden"
          :data-poster="cloudinaryUrl"
          muted
          loop
          autoplay
          playsinline
          disablePictureInPicture
          disableRemotePlayback
          preload="none"
        >
          <source
            :data-src="`https://instagram-proxy.philgw.workers.dev/${post.videos.standard_resolution.url.replace('https://', 'https:/')}`"
            type="video/mp4"
          />
        </video>
      </template>
      <template v-if="!post.videos">
        <div class="grid-stack grid">
          <div class="grid-stack grid h-full w-full no-js:hidden">
            <img alt="" :src="post.svgPlaceholder" class="block h-full w-full" width="368" height="368" />
            <div class="flex items-center justify-center">
              <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
              <svg x-ignore width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
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
          <img
            :src="cloudinaryUrl"
            :srcset="cloudinarySrcSet"
            :key="post.id"
            :alt="post.accessibilityCaption ? post.accessibilityCaption : ''"
            :id="`instagram-${post.id}`"
            width="368"
            height="368"
            sizes="368px"
            class="card-instagram__img w-full transition-opacity group-hocus:opacity-50"
            loading="lazy"
            decoding="async"
            crossorigin="anonymous"
            onLoad="this.previousElementSibling.remove()"
          />
        </div>
      </template>
      <figcaption
        class="to-grey-900 z-1 pointer-events-none absolute bottom-0 max-h-full w-full translate-y-full transform-gpu space-y-3 bg-gradient-to-t from-black p-5 text-xs font-bold text-white transition-transform group-hocus:translate-y-0"
      >
        <div v-if="post.likes.count > 0 || post.comments.count > 0 || post.location.name" class="space-y-2">
          <p v-if="post.likes.count > 0 || post.comments.count > 0">
            <template v-if="post.likes.count > 0">
              <sprite-icon hash="heart" class="text-red-600"></sprite-icon>
              <span class="sr-only">Likes: </span>
              <span class="mr-2 inline-block" v-text="post.likes.count" />
            </template>
            <template v-if="post.comments.count > 0">
              <sprite-icon hash="speech"></sprite-icon>
              <span class="sr-only">Comments: </span>
              <span class="inline-block" v-text="post.comments.count" />
            </template>
          </p>
          <p v-if="post.location.name">
            <icon name="mapMarkerAlt" class="mr-1 inline-block" />
            <span class="sr-only">Tagged location: </span>
            <span v-text="post.location.name" />
          </p>
        </div>
        <p v-if="post.caption.text" class="card-instagram__caption-text">
          {{ post.caption.text }}
        </p>
        <span v-if="isParty" class="absolute -top-8 right-8 text-6xl sm:hidden lg:inline-block lg:text-4xl xl:text-6xl" aria-hidden="true"
          >🥳</span
        >
      </figcaption>
    </div>
  </figure>
</template>

<style lang="scss" scoped>
.card-instagram__caption-text {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
