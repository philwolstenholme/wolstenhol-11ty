<script>
import PwLede from './pw-lede.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwCardTwitter from './pw-card-twitter.vue';

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
  },
};
</script>

<template>
  <section
    data-section="tweets"
    x-data="{
      colcade() {
        if (window.innerWidth > 767) {
          loadjs(['https://cdn.jsdelivr.net/npm/colcade@0.2.0/colcade.min.js'], 'colcade');
          loadjs.ready('colcade', function() {
            var colcade = new Colcade( '.tweets-grid', {
              columns: '.tweets-grid__col',
              items: '.tweets-grid__item'
            });
          });
        }
      },
      twitterIntents() {
        loadjs(['https://cdn.jsdelivr.net/gh/BrandwatchLtd/twitter-intents@1.0.0/twitter-intents.min.js'], 'twitter-intents');
        loadjs.ready('twitter-intents', function() {
          const intents = new TwitterIntents();
          intents.register();
        });
      },
      init() {
        const observed = Horizon({
          toObserve: this.$el,
          triggerOnce: true,
          onEntry(entry) {
            entry.target.__x.$data.colcade()
            entry.target.__x.$data.twitterIntents()
          },
        });
      }
    }"
    x-init="init()"
    x-on:resize.window.debounce="colcade()"
  >
    <pw-section-heading title="Tweets" icon="twitter" section="tweets" />
    <pw-lede class="mt-3">Tweets by me, <a href="https://twitter.com/intent/user?user_id=38276082" class="font-bold">@philw_</a>.</pw-lede>
    <div class="tweets-grid mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div class="tweets-grid__col space-y-5"></div>
      <div class="tweets-grid__col space-y-5 hidden md:block"></div>
      <div class="tweets-grid__col space-y-5 hidden xl:block"></div>

      <div class="tweets-grid__item" v-for="(tweet, index) in tweets" :key="index">
        <pw-card-twitter :tweet="tweet" />
      </div>
    </div>
  </section>
</template>
