<script>
const twitter = require('twitter-text');
import icon from './icon.vue';
import spriteIcon from './sprite-icon.vue';

export default {
  components: {
    icon,
    spriteIcon,
  },

  props: {
    tweet: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    originalTweet: function () {
      if (this.tweet.retweeted_status) {
        return this.tweet.retweeted_status;
      }

      return this.tweet;
    },

    linkedText: function () {
      return twitter.autoLinkWithJSON(this.originalTweet.full_text, this.originalTweet.entities, {});
    },

    tweetMedia: function () {
      let extEntities = this.originalTweet.extended_entities;
      if (typeof extEntities === 'object' && typeof extEntities.media[0] === 'object') {
        return this.originalTweet.extended_entities.media;
      } else {
        return false;
      }
    },

    cloudinaryProfileImage: function () {
      let userName = this.originalTweet.user.screen_name;
      let URL = `https://wolstenhol.me/proxy/cloudinary/image/twitter_name/w_32,h_32,f_auto,q_auto:low/${userName}.jpg`;

      return URL;
    },

    tweetURL: function () {
      return `https://twitter.com/${this.originalTweet.user.screen_name}/status/${this.originalTweet.id_str}`;
    },
  },
};
</script>

<template>
  <article class="card-twitter contain-content overflow-hidden rounded font-bold text-white shadow-hard">
    <div
      class="card-twitter__gallery grid overflow-hidden rounded-tl rounded-tr border border-b-0 border-gray-300 bg-black"
      v-if="tweetMedia"
    >
      <a
        :is="media.type == 'photo' ? 'a' : 'div'"
        v-for="(media, index) in tweetMedia"
        v-bind:key="index"
        :href="media.type == 'photo' ? media.expanded_url : null"
        class="focus:outline-none group relative block w-full"
        :class="{
          'aspect-ratio aspect-w-4 aspect-h-3': Object.keys(tweetMedia).length > 1,
        }"
        :data-lightbox-image="media.type == 'photo' ? media.media_url_https : null"
        x-data
        :x-init="
          media.type == 'photo' ? `$root.setAttribute('role', 'button'); $root.firstChild.innerText = 'Open tweet media in modal'` : null
        "
        :x-on:click{dot}prevent="
          media.type == 'photo' ? `$root.dispatchEvent(new CustomEvent('pw-lightbox-open', { bubbles: true }));` : null
        "
        :x-on:keydown{dot}enter{dot}prevent="media.type == 'photo' ? `$root.click()` : null"
        :x-on:keydown{dot}space="media.type == 'photo' ? `$root.click()` : null"
      >
        <span class="sr-only">Tweet media</span>
        <br class="hidden" />
        <img
          v-if="media.type == 'photo'"
          :src="`https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:400,f_auto,q_auto/${media.media_url_https}`"
          :srcset="`https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:800,f_auto,q_auto/${media.media_url_https} 2x, https://wolstenhol.me/proxy/cloudinary/image/fetch/w_auto:100:1200,f_auto,q_auto/${media.media_url_https} 3x`"
          sizes="368px"
          :width="media.sizes.small.w"
          :height="media.sizes.small.h"
          class="group-focus:outline outline-offset-invert h-full w-full object-cover"
          loading="lazy"
          crossorigin="anonymous"
          :alt="media.ext_alt_text || ''"
        />
        <div
          v-if="['video', 'animated_gif'].includes(media.type)"
          class="aspect-ratio relative"
          :style="`--aspect-ratio: ${media.video_info.aspect_ratio[0]}/${media.video_info.aspect_ratio[1]};`"
        >
          <noscript>
            <video
              class="aspect-ratio absolute inset-0 w-full bg-gradient-to-t from-black to-gray-900"
              :style="`--aspect-ratio: ${media.video_info.aspect_ratio[0]}/${media.video_info.aspect_ratio[1]};`"
              :poster="media.media_url_https"
              muted
              loop
              playsinline
              disablePictureInPicture
              disableRemotePlayback
              preload="metadata"
              width="300"
            >
              <source v-for="(variant, index) in media.video_info.variants" :key="index" :src="variant.url" :type="variant.content_type" />
            </video>
          </noscript>
          <video
            data-lozad
            class="aspect-ratio lozad absolute inset-0 w-full bg-gradient-to-t from-black to-gray-900 no-js:hidden"
            :style="`--aspect-ratio: ${media.video_info.aspect_ratio[0]}/${media.video_info.aspect_ratio[1]};`"
            :data-poster="media.media_url_https"
            muted
            loop
            playsinline
            disablePictureInPicture
            disableRemotePlayback
            preload="metadata"
            width="300"
          >
            <source
              v-for="(variant, index) in media.video_info.variants"
              :key="index"
              :data-src="variant.url"
              :type="variant.content_type"
            />
          </video>
          <div hidden class="play-button-container absolute inset-0 flex grow items-center justify-center no-js:hidden">
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
      <a :href="`https://twitter.com/intent/user?user_id=${originalTweet.user.id_str}`" class="m-4 mb-2 flex space-x-3 text-sm">
        <img
          :src="cloudinaryProfileImage"
          :srcset="`${cloudinaryProfileImage.replace(/32/gi, 64)} 2x`"
          class="h-8 w-8 rounded"
          width="32"
          height="32"
          alt=""
          loading="lazy"
          crossorigin="anonymous"
        />
        <div class="min-w-0">
          <p class="truncate">{{ originalTweet.user.name }}</p>
          <p class="truncate text-xs">@{{ originalTweet.user.screen_name }}</p>
        </div>
      </a>
    </div>

    <p class="links-underline lists-decorated m-4 mt-0 space-y-3 font-serif leading-snug" v-html="linkedText"></p>

    <p class="card-twitter__tweet-actions space-x-3 px-4 py-3 text-sm">
      <a :href="`https://twitter.com/intent/tweet?in_reply_to=${originalTweet.id_str}&related=philw_`" class="twitter-intent">
        <sprite-icon hash="twitter-reply"></sprite-icon>
        <span class="sr-only">Reply</span>
      </a>
      <a
        :href="`https://twitter.com/intent/retweet?tweet_id=${originalTweet.id_str}&related=philw_`"
        class="twitter-intent twitter-intent--retweet"
      >
        <sprite-icon hash="twitter-retweet"></sprite-icon>
        <span class="sr-only">Retweet</span>
        <template v-if="originalTweet.retweet_count">&nbsp;{{ originalTweet.retweet_count.toLocaleString() }}</template>
      </a>
      <a
        :href="`https://twitter.com/intent/like?tweet_id=${originalTweet.id_str}&related=philw_`"
        class="twitter-intent twitter-intent--like"
      >
        <sprite-icon hash="heart"></sprite-icon>
        <span class="sr-only">Like</span>
        <template v-if="originalTweet.favorite_count">&nbsp;{{ originalTweet.favorite_count.toLocaleString() }}</template>
      </a>
      <a :href="tweetURL" class="twitter-intent float-right space-x-0.5">
        <icon name="twitter" />
        <icon name="link" />
        <span class="sr-only">Permalink to Tweet</span>
      </a>
    </p>
  </article>
</template>

<style lang="scss">
.card-twitter {
  background-color: #1876be;
  transition: all 150ms ease-in-out;
}

.card-twitter__tweet-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-twitter__tweet-text > a {
  color: white;
  text-decoration: none;
  text-shadow: 1px 1px 0 #3197e5, -1px 1px 0 #3197e5, 2px 0 0 #3197e5, -2px 0 0 #3197e5, 3px 0 0 #3197e5, -3px 0 0 #3197e5;
  box-shadow: inset 0 -1px 0 0 #fff, inset 0 -3px 0 0 #3197e5;
}

.card-twitter__tweet-actions {
  background-color: rgba(0, 0, 0, 0.45);
}

.card-twitter__gallery {
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
}

a.twitter-intent {
  display: inline-block;
  transform-origin: center;
  transition: transform 100ms ease-in-out;
}

a.twitter-intent:hover {
  transform: scale(1.1);
}

.card-twitter .twitter-intent {
  color: #fff;
}

.twitter-intent {
  &:active {
    opacity: 0.5;
  }
}

.twitter-intent--retweet {
  &:hover {
    color: #19cf86;
  }
}

.twitter-intent--like {
  &:hover {
    color: #e81c4f;
  }
}

.play-button {
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.7));
}

.lists-decorated ul,
.lists-decorated ol {
  list-style-type: disc;
  padding-left: 2em;
}
</style>
