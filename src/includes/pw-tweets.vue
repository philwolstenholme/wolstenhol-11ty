<script>
import PwLede from './pw-lede.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwCardTwitter from './pw-card-twitter.vue';
import PwSection from './pw-section.vue';

export default {
  props: {
    tweets: {
      type: Array,
    },
  },
  components: {
    PwLede,
    PwSectionHeading,
    PwCardTwitter,
    PwSection,
  },
};
</script>

<template>
  <pw-section section-key="tweets" x-data="PwTweets()" x-init="init()" x-on:resize.window.debounce="colcade()">
    <pw-section-heading title="Tweets" icon="twitter" section="tweets" />
    <pw-lede class="mt-3">Tweets by me, <a href="https://twitter.com/intent/user?user_id=38276082" class="font-bold">@philw_</a>.</pw-lede>
    <div class="tweets-grid mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div class="tweets-grid__item" v-for="(tweet, index) in tweets.slice(0, 3)" :key="index">
        <pw-card-twitter :tweet="tweet" />
      </div>

      <div class="tweets-grid__col space-y-5"></div>
      <div class="tweets-grid__col space-y-5 hidden md:block"></div>
      <div class="tweets-grid__col space-y-5 hidden xl:block"></div>
    </div>
  </pw-section>
</template>
