<script>
import icon from './icon.vue';
import spriteIcon from './sprite-icon.vue';

export default {
  components: {
    icon,
    spriteIcon,
  },

  props: {
    toot: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    originalToot: function () {
      if (this.toot.reblog) {
        return this.toot.reblog;
      }

      return this.toot;
    },

    cloudinaryProfileImage: function () {
      const avatar = this.originalToot.account.avatar_static;
      const URL = `https://wolstenhol.me/proxy/cloudinary/image/fetch/w_32,h_32,f_auto,q_auto:low/${avatar}`;
      return URL;
    },
  },
};
</script>

<template>
  <article class="card-mastodon bg-mastodon contain-content shadow-hard rounded overflow-hidden text-white font-bold">
    <div
      class="card-mastodon__gallery grid bg-black border border-gray-300 rounded-tl rounded-tr overflow-hidden border-b-0"
      v-if="this.originalToot.media_attachments"
    >
      <a
        v-for="(media, index) in this.originalToot.media_attachments"
        :is="media.type == 'image' ? 'a' : 'div'"
        v-bind:key="index"
        :href="media.type == 'image' ? media.url : null"
        class="group block relative w-full focus:outline-none"
        :class="{
          'aspect-ratio aspect-w-4 aspect-h-3': originalToot.media_attachments.length > 1,
        }"
        :data-lightbox-image="media.type == 'image' ? media.url : null"
        x-data
        :x-init="
          media.type == 'image' ? `$root.setAttribute('role', 'button'); $root.firstChild.innerText = 'Open tweet media in modal'` : null
        "
        :x-on:click{dot}prevent="
          media.type == 'image' ? `$root.dispatchEvent(new CustomEvent('pw-lightbox-open', { bubbles: true }));` : null
        "
        :x-on:keydown{dot}enter{dot}prevent="media.type == 'image' ? `$root.click()` : null"
        :x-on:keydown{dot}space="media.type == 'image' ? `$root.click()` : null"
      >
        <span class="sr-only">Tweet media</span>
        <br class="hidden" />
        <img
          v-if="media.type == 'image'"
          :src="`https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:400,f_auto,q_auto/${media.url}`"
          :srcset="`https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:800,f_auto,q_auto/${media.url} 2x, https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:1200,f_auto,q_auto/${media.url} 3x`"
          sizes="368px"
          :width="media.meta.small.width"
          :height="media.meta.small.height"
          class="w-full h-full object-cover group-focus:outline outline-offset-invert"
          loading="lazy"
          crossorigin="anonymous"
          :alt="media.description || ''"
        />
        <div
          v-if="['video', 'gifv'].includes(media.type)"
          class="relative aspect-ratio"
          :style="`--aspect-ratio: ${media.meta.small.aspect};`"
        >
          <noscript>
            <video
              class="aspect-ratio absolute inset-0 bg-gradient-to-t from-black to-gray-900 w-full"
              :style="`--aspect-ratio: ${media.meta.small.aspect};`"
              :poster="media.preview_url"
              muted
              loop
              playsinline
              disablePictureInPicture
              disableRemotePlayback
              preload="metadata"
              width="300"
            >
              <source :src="media.url" type="video/mp4" />
            </video>
          </noscript>
          <video
            data-lozad
            class="no-js:hidden aspect-ratio lozad absolute inset-0 bg-gradient-to-t from-black to-gray-900 w-full"
            :style="`--aspect-ratio: ${media.meta.aspect};`"
            :data-poster="media.preview_url"
            muted
            loop
            playsinline
            disablePictureInPicture
            disableRemotePlayback
            preload="metadata"
            width="300"
          >
            <source :data-src="media.url" type="video/mp4" />
          </video>
          <div hidden class="play-button-container no-js:hidden absolute inset-0 flex items-center justify-center grow">
            <button
              type="button"
              aria-label="Play video"
              class="transform-gpu transition-transform hocus:scale-110"
              onclick="this.parentElement.previousElementSibling.play(); this.parentElement.previousElementSibling.setAttribute('controls', 'true'); this.parentElement.remove();"
            >
              <icon class="play-button text-7xl" name="playCircle" />
            </button>
          </div>
        </div>
      </a>
    </div>

    <div>
      <a :href="originalToot.account.url" class="flex space-x-3 m-4 mb-2 text-sm">
        <img
          :src="cloudinaryProfileImage"
          :srcset="`${cloudinaryProfileImage.replace(/32(?=.*32)/g, 64)} 2x`"
          class="rounded w-8 h-8"
          width="32"
          height="32"
          alt=""
          loading="lazy"
          crossorigin="anonymous"
        />
        <div class="min-w-0">
          <p class="truncate">{{ originalToot.account.display_name }}</p>
          <p class="truncate text-xs">{{ originalToot.account.acct }}</p>
        </div>
      </a>
    </div>

    <div class="m-4 mt-0 font-serif leading-snug links-underline lists-decorated space-y-3" v-html="originalToot.content"></div>

    <p class="bg-mastodon-dark px-4 py-3 text-sm space-x-3">
      <span>
        <sprite-icon hash="twitter-retweet"></sprite-icon>
        <span class="sr-only">Boost</span>
        <template v-if="originalToot.reblogs_count">&nbsp;{{ originalToot.reblogs_count.toLocaleString() }}</template>
      </span>
      <span>
        <icon name="star" />
        <span class="sr-only">Favourite</span>
        <template v-if="originalToot.favourites_count">&nbsp;{{ originalToot.favourites_count.toLocaleString() }}</template>
      </span>
      <a :href="this.originalToot.url" class="twitter-intent float-right space-x-0.5">
        <svg x-ignore xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon">
          <use href="#mastodon" />
        </svg>
        <icon name="link" />
        <span class="sr-only">Permalink to Tweet</span>
      </a>
    </p>
  </article>
</template>

<style lang="scss">
.card-mastodon {
  transition: all 150ms ease-in-out;
}

.card-mastodon__tweet-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-mastodon__tweet-text > a {
  color: white;
  text-decoration: none;
  text-shadow: 1px 1px 0 #3197e5, -1px 1px 0 #3197e5, 2px 0 0 #3197e5, -2px 0 0 #3197e5, 3px 0 0 #3197e5, -3px 0 0 #3197e5;
  box-shadow: inset 0 -1px 0 0 #fff, inset 0 -3px 0 0 #3197e5;
}

.card-mastodon__gallery {
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
}

.card-mastodon .twitter-intent {
  color: #fff;
}

.play-button {
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.7));
}

.lists-decorated ul,
.lists-decorated ol {
  list-style-type: disc;
  padding-left: 2em;
}

.card-mastodon .ellipsis::after {
  content: '…';
}
</style>
