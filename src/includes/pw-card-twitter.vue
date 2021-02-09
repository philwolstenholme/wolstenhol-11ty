<script>
import VueMarkdown from 'vue-markdown';
const twitter = require('twitter-text');
import icon from './icon.vue';

export default {
  components: {
    VueMarkdown,
    icon,
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
      let original = this.originalTweet.user.profile_image_url_https;
      let cloudinaryPrefix = 'https://res.cloudinary.com/wolstenh/image/upload/w_66,h_66,f_auto,q_auto:best/twitter_profile/';
      let URL = original.replace('https://pbs.twimg.com/profile_images/', cloudinaryPrefix);

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
          :srcset="`https://res.cloudinary.com/wolstenh/image/fetch/w_auto:100:800,f_auto,q_auto/${media.media_url_https} 2x, https://res.cloudinary.com/wolstenh/image/fetch/w_auto:100:1200,f_auto,q_auto/${tweetMedia.media_url_https} 3x`"
          sizes="368px"
          :width="media.sizes.small.w"
          :height="media.sizes.small.h"
          class="w-full h-full object-cover"
          loading="lazy"
          crossorigin="anonymous"
          :alt="media.ext_alt_text || ''"
        />
        <video
          class="w-full"
          muted
          loop
          controls
          playsinline
          preload="none"
          v-if="['video', 'animated_gif'].includes(media.type)"
          :poster="media.media_url_https"
        >
          <source v-for="(variant, index) in media.video_info.variants" :key="index" :src="variant.url" :type="variant.content_type" />
        </video>
      </a>
    </p>

    <div>
      <a :href="`https://twitter.com/intent/user?user_id=${originalTweet.user.id_str}`" class="flex space-x-3 m-4 mb-2 text-sm">
        <img
          :src="cloudinaryProfileImage"
          class="rounded"
          style="height: 33px; width: 33px"
          alt=""
          loading="lazy"
          crossorigin="anonymous"
        />
        <div>
          <p>{{ originalTweet.user.name }}</p>
          <p class="text-xs">@{{ originalTweet.user.screen_name }}</p>
        </div>
      </a>
    </div>

    <vue-markdown class="m-4 mt-0 font-serif leading-snug links-underline lists-decorated space-y-3" :source="linkedText"></vue-markdown>

    <p class="card__twitter__tweet-actions px-4 py-3 text-sm space-x-3">
      <a :href="`https://twitter.com/intent/tweet?in_reply_to=${originalTweet.id_str}&related=philw_`" class="twitter-intent">
        <svg
          focusable="false"
          role="img"
          class="icon"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="5 15.805000305175781 54 38.19499969482422"
        >
          <path
            d="M41 31h-9V19c0-1.14-.647-2.183-1.668-2.688-1.022-.507-2.243-.39-3.15.302l-21 16C5.438 33.18 5 34.064 5 35s.437 1.82 1.182 2.387l21 16c.533.405 1.174.613 1.82.613.453 0 .908-.103 1.33-.312C31.354 53.183 32 52.14 32 51V39h9c5.514 0 10 4.486 10 10 0 2.21 1.79 4 4 4s4-1.79 4-4c0-9.925-8.075-18-18-18z"
          />
        </svg>
        <span class="sr-only">Reply</span>
      </a>
      <a
        :href="`https://twitter.com/intent/retweet?tweet_id=${originalTweet.id_str}&related=philw_`"
        class="twitter-intent twitter-intent--retweet"
      >
        <svg
          focusable="false"
          role="img"
          class="icon"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="2.812999963760376 15 68.37399291992188 41"
        >
          <path
            d="M70.676 36.644C70.166 35.636 69.13 35 68 35h-7V19c0-2.21-1.79-4-4-4H34c-2.21 0-4 1.79-4 4s1.79 4 4 4h18c.552 0 .998.446 1 .998V35h-7c-1.13 0-2.165.636-2.676 1.644-.51 1.01-.412 2.22.257 3.13l11 15C55.148 55.545 56.046 56 57 56s1.855-.455 2.42-1.226l11-15c.668-.912.767-2.122.256-3.13zM40 48H22c-.54 0-.97-.427-.992-.96L21 36h7c1.13 0 2.166-.636 2.677-1.644.51-1.01.412-2.22-.257-3.13l-11-15C18.854 15.455 17.956 15 17 15s-1.854.455-2.42 1.226l-11 15c-.667.912-.767 2.122-.255 3.13C3.835 35.365 4.87 36 6 36h7l.012 16.003c.002 2.208 1.792 3.997 4 3.997h22.99c2.208 0 4-1.79 4-4s-1.792-4-4-4z"
          />
        </svg>
        <span class="sr-only">Retweet</span>
        <template v-if="originalTweet.retweet_count">&nbsp;{{ originalTweet.retweet_count.toLocaleString() }}</template>
      </a>
      <a
        :href="`https://twitter.com/intent/like?tweet_id=${originalTweet.id_str}&related=philw_`"
        class="twitter-intent twitter-intent--like"
      >
        <svg
          focusable="false"
          role="img"
          class="icon"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="3.5329999923706055 12 46.933998107910156 44"
        >
          <path
            d="M38.723,12c-7.187,0-11.16,7.306-11.723,8.131C26.437,19.306,22.504,12,15.277,12C8.791,12,3.533,18.163,3.533,24.647 C3.533,39.964,21.891,55.907,27,56c5.109-0.093,23.467-16.036,23.467-31.353C50.467,18.163,45.209,12,38.723,12z"
          />
        </svg>
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
