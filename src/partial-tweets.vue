<script>
import PwCardTwitter from './includes/pw-card-twitter.vue';

export default {
  data: {
    permalink: 'partial-tweets.html',
    eleventyExcludeFromCollections: true,
  },
  components: {
    PwCardTwitter,
  },
};
</script>

<template>
  <div id="results">
    <li v-for="(tweet, index) in this.twitter.slice(3, 5)" :key="index" class="tweets-grid__item">
      <pw-card-twitter :tweet="tweet" />
    </li>
    <li class="md:hidden scroll-saver space-y-3" x-data>
      <p class="max-w-md m-auto text-center font-serif">
        There are <span class="font-bold">{{ this.twitter.length - 5 }}</span> more of these (!) I thought I'd save you some scrolling, but
        if you want you can…
      </p>
      <button
        type="button"
        class="border m-auto block shadow-hard px-4 py-2 bg-black text-white font-serif font-bold rounded border-blue-100"
        x-on:click="$event.target.parentElement.remove()"
      >
        Read more tweets
      </button>
    </li>
    <li v-for="(tweet, index) in this.twitter.slice(5)" :key="index" class="tweets-grid__item">
      <pw-card-twitter :tweet="tweet" />
    </li>
  </div>
</template>
