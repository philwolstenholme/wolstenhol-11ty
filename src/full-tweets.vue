<script>
import PwCardTwitter from './includes/pw-card-twitter.vue';

export default {
  data: {
    permalink: 'full-tweets.html',
    eleventyExcludeFromCollections: true,
  },
  components: {
    PwCardTwitter,
  },
};
</script>

<template>
  <div id="results">
    <pw-card-twitter v-for="(tweet, index) in this.twitter.slice(3)" :key="index" :tweet="tweet" class="tweets-grid__item" />
  </div>
</template>
