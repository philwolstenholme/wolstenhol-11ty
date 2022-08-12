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
    <ul x-ref="container" class="tweets-grid mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <li class="tweets-grid__item" v-for="(tweet, index) in tweets.slice(0, 3)" :key="index">
        <pw-card-twitter :tweet="tweet" />
      </li>
      <li aria-hidden="true" class="tweets-grid__col space-y-5"></li>
      <li aria-hidden="true" class="tweets-grid__col space-y-5 hidden md:block"></li>
      <li aria-hidden="true" class="tweets-grid__col space-y-5 hidden xl:block"></li>
    </ul>
    <dialog
      x-data="PwLightbox"
      x-trap.noscroll="open"
      x-on:twitter-photo-dialog-open.window="srcSet=generateSrcSet($event.target.dataset.bigImage); alt=$event.target.querySelector('img').alt; className=generateClassName();"
      x-on:close="open=false; srcSet=''; alt=''"
      x-on:click.self="$el.close()"
      class="bg-binding-dark transform shadow-2xl select-none"
      x-bind:class="className"
    >
      <img
        x-bind:srcSet="srcSet"
        class="bg-black object-contain"
        style="max-height: 85vh; max-width: 85vw"
        x-bind:alt="alt"
        alt=""
        x-on:load="$root.showModal(); open=true;"
      />
      <button
        class="absolute text-lg font-bold bg-binding-dark hover:bg-black focus:bg-black transition px-3 py-2 right-3 rounded-bl-lg text-white top-3"
        x-on:click="$root.close();"
      >
        Close
      </button>
    </dialog>
  </pw-section>
</template>
