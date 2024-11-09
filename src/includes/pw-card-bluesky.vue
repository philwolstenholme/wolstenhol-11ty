<script>
import icon from './icon.vue';
import spriteIcon from './sprite-icon.vue';

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

  computed: {
    cloudinaryProfileImage: function () {
      const avatar = this.post.account.avatar;
      const URL = `https://wolstenhol.me/proxy/cloudinary/image/fetch/w_32,h_32,f_auto,q_auto:low/${avatar}`;
      return URL;
    },

    hasEmbeddedMedia() {
      return this.post.media_attachments && this.post.media_attachments.length > 0;
    },

    hasCard() {
      return this.post.card;
    },
  },
};
</script>

<template>
  <article class="card-bluesky contain-content overflow-hidden rounded bg-bluesky font-bold text-white shadow-hard">
    <!-- Media Gallery -->
    <div v-if="hasEmbeddedMedia" class="card-bluesky__gallery grid overflow-hidden rounded-tl rounded-tr bg-black">
      <a
        v-for="(media, index) in post.media_attachments"
        :key="index"
        :href="media.url"
        class="focus:outline-none group relative block w-full"
        :class="{
          'aspect-ratio aspect-w-4 aspect-h-3': post.media_attachments.length > 1,
        }"
        :data-lightbox-image="media.url"
        x-data
        x-init="$root.setAttribute('role', 'button'); $root.firstChild.innerText = 'Open post media in modal'"
        @click.prevent="$root.dispatchEvent(new CustomEvent('pw-lightbox-open', { bubbles: true }))"
      >
        <span class="sr-only">Post media</span>
        <br class="hidden" />
        <img
          :src="`https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:400,f_auto,q_auto/${media.url}`"
          :srcset="`https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:800,f_auto,q_auto/${media.url} 2x, https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:1200,f_auto,q_auto/${media.url} 3x`"
          sizes="368px"
          class="group-focus:outline outline-offset-invert h-full w-full object-cover"
          loading="lazy"
          crossorigin="anonymous"
          :alt="media.description || ''"
        />
      </a>
    </div>

    <!-- Link Card -->
    <div v-if="hasCard && !hasEmbeddedMedia">
      <a :href="post.card.url" class="block hover:bg-blue-700">
        <img
          v-if="post.card.image"
          :src="`https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:400,f_auto,q_auto/${post.card.image}`"
          class="w-full object-cover"
          loading="lazy"
          crossorigin="anonymous"
          alt=""
        />
      </a>
    </div>

    <!-- Author Info -->
    <div>
      <a :href="`https://bsky.app/profile/${post.account.acct}`" class="m-4 mb-2 flex space-x-3 text-sm">
        <img
          :src="cloudinaryProfileImage"
          :srcset="`${cloudinaryProfileImage.replace(/32(?=.*32)/g, 64)} 2x`"
          class="h-8 w-8 rounded"
          width="32"
          height="32"
          alt=""
          loading="lazy"
          crossorigin="anonymous"
        />
        <div class="min-w-0">
          <p class="truncate">{{ post.account.display_name }}</p>
          <p class="truncate text-xs">{{ post.account.acct }}</p>
        </div>
      </a>
    </div>

    <!-- Post Content -->
    <div
      class="card-bluesky__text links-underline lists-decorated m-4 mt-0 space-y-3 overflow-hidden font-serif leading-snug"
      v-html="post.content"
    ></div>

    <!-- Footer -->
    <div class="flex justify-between space-x-3 bg-bluesky-dark px-4 py-3 text-sm">
      <div>
        <span v-if="post.repostCount">
          <sprite-icon hash="twitter-retweet"></sprite-icon>
          <span class="sr-only">Reposts</span>
          {{ post.repostCount.toLocaleString() }}
        </span>
        <span v-if="post.likeCount">
          <icon name="star" />
          <span class="sr-only">Likes</span>
          {{ post.likeCount.toLocaleString() }}
        </span>
      </div>
      <a :href="post.url" class="twitter-intent space-x-0.5">
        <svg x-ignore xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon">
          <use href="#bluesky" />
        </svg>
        <icon name="link" />
        <span class="sr-only">Permalink to Post</span>
      </a>
    </div>
  </article>
</template>

<style lang="scss">
.card-bluesky {
  transition: all 150ms ease-in-out;
}

.card-bluesky__text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-bluesky .ellipsis::after {
  content: '…';
}

.card-bluesky__text {
  display: -webkit-box;
  -webkit-line-clamp: 15;
  -webkit-box-orient: vertical;
}
</style>
