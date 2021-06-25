<script>
import VueMarkdown from 'vue-markdown';
const twitter = require('twitter-text');
import icon from './icon.vue';
import spriteIcon from './sprite-icon.vue';

export default {
  components: {
    VueMarkdown,
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
      let URL = `https://res.cloudinary.com/wolstenh/image/twitter_name/w_64,h_64,f_auto,q_auto:low/${userName}.jpg`;

      return URL;
    },

    tweetURL: function () {
      return `https://twitter.com/${this.originalTweet.user.screen_name}/status/${this.originalTweet.id_str}`;
    },
  },
};
</script>

<template>
  <div class="card__twitter shadow-hard rounded overflow-hidden text-white font-bold">
    <p class="grid grid-flow-col bg-black" v-if="tweetMedia">
      <a
        :is="media.type == 'photo' ? 'a' : 'div'"
        v-for="(media, index) in tweetMedia"
        v-bind:key="index"
        :href="media.expanded_url"
        class="block relative w-full"
      >
        <span class="sr-only">Tweet media</span>
        <br class="hidden" />
        <img
          v-if="media.type == 'photo'"
          :src="`https://res.cloudinary.com/wolstenh/image/fetch/w_auto:100:400,f_auto,q_auto/${media.media_url_https}`"
          :srcset="`https://res.cloudinary.com/wolstenh/image/fetch/w_auto:100:800,f_auto,q_auto/${media.media_url_https} 2x, https://res.cloudinary.com/wolstenh/image/fetch/w_auto:100:1200,f_auto,q_auto/${media.media_url_https} 3x`"
          sizes="368px"
          :width="media.sizes.small.w"
          :height="media.sizes.small.h"
          class="w-full h-full object-cover"
          loading="lazy"
          crossorigin="anonymous"
          :alt="media.ext_alt_text || ''"
        />
        <div
          v-if="['video', 'animated_gif'].includes(media.type)"
          class="relative aspect-ratio"
          :style="`--aspect-ratio: ${media.video_info.aspect_ratio[0]}/${media.video_info.aspect_ratio[1]};`"
        >
          <video
            class="aspect-ratio lozad absolute inset-0 bg-gradient-to-t from-black to-gray-900 w-full"
            :style="`--aspect-ratio: ${media.video_info.aspect_ratio[0]}/${media.video_info.aspect_ratio[1]};`"
            :data-poster="media.media_url_https"
            muted
            loop
            playsinline
            disablePictureInPicture
            disableRemotePlayback
            preload="metadata"
          >
            <source
              v-for="(variant, index) in media.video_info.variants"
              :key="index"
              :data-src="variant.url"
              :type="variant.content_type"
            />
          </video>
          <div hidden class="play-button-container absolute inset-0 flex items-center justify-center grow">
            <button
              aria-label="Play video"
              class="transform-gpu transition-transform hocus:scale-110"
              onclick="this.parentElement.previousElementSibling.play(); this.parentElement.previousElementSibling.setAttribute('controls', 'true'); this.parentElement.remove();"
            >
              <icon class="play-button text-7xl" name="playCircle" />
            </button>
          </div>
        </div>
      </a>
    </p>

    <div>
      <a :href="`https://twitter.com/intent/user?user_id=${originalTweet.user.id_str}`" class="flex space-x-3 m-4 mb-2 text-sm">
        <img :src="cloudinaryProfileImage" class="rounded w-8 h-8" width="32" height="32" alt="" loading="lazy" crossorigin="anonymous" />
        <div>
          <p>{{ originalTweet.user.name }}</p>
          <p class="text-xs">@{{ originalTweet.user.screen_name }}</p>
        </div>
      </a>
    </div>

    <vue-markdown class="m-4 mt-0 font-serif leading-snug links-underline lists-decorated space-y-3" :source="linkedText"></vue-markdown>

    <p class="card__twitter__tweet-actions px-4 py-3 text-sm space-x-3">
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
      <a :href="tweetURL" class="twitter-intent float-right">
        <icon name="link" />
        <span class="sr-only">Permalink to Tweet</span>
      </a>
    </p>
  </div>
</template>

<style lang="scss">
.card__twitter {
  background-color: #1876be;
  transition: all 150ms ease-in-out;
}

.card__twitter__tweet-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.card__twitter__tweet-text > a {
  color: white;
  text-decoration: none;
  text-shadow: 1px 1px 0 #3197e5, -1px 1px 0 #3197e5, 2px 0 0 #3197e5, -2px 0 0 #3197e5, 3px 0 0 #3197e5, -3px 0 0 #3197e5;
  box-shadow: inset 0 -1px 0 0 #fff, inset 0 -3px 0 0 #3197e5;
}

.card__twitter__tweet-actions {
  background-color: rgba(0, 0, 0, 0.45);
}

a.twitter-intent {
  display: inline-block;
  transform-origin: center;
  transition: transform 100ms ease-in-out;
}

a.twitter-intent:hover {
  transform: scale(1.1);
}

.card__twitter .twitter-intent {
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
