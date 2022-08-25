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
  <pw-section
    section-key="tweets"
    x-data="PwTweets"
    x-intersect.once="colcade(); loadMore(); twitterIntents()"
    x-on:resize.window.debounce="colcade()"
  >
    <pw-section-heading title="Tweets" icon="twitter" section="tweets" />
    <pw-lede class="mt-3">Tweets by me, <a href="https://twitter.com/intent/user?user_id=38276082" class="font-bold">@philw_</a>.</pw-lede>
    <ul role="list" x-ref="container" class="tweets-grid mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <li class="tweets-grid__item" v-for="(tweet, index) in tweets.slice(0, 3)" :key="index">
        <pw-card-twitter :tweet="tweet" />
      </li>
      <li class="tweets-grid__col space-y-5"></li>
      <li class="tweets-grid__col space-y-5 hidden md:block"></li>
      <li class="tweets-grid__col space-y-5 hidden xl:block"></li>
    </ul>
  </pw-section>
</template>
