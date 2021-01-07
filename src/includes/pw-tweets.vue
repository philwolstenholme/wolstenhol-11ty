<script>
import PwLede from './pw-lede.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwCardTwitter from './pw-card-twitter.vue';

export default {
  props: {
    tweets: {
      type: Object,
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
    data-section="speaking"
    x-data="{}"
    x-init="() => {
      if (window.innerWidth > 767) {
        loadjs(['https://unpkg.com/colcade@0/colcade.js'], 'colcade');

        loadjs.ready('colcade', function() {
          var colcade = new Colcade( '.tweets', {
            columns: '.tweets__col',
            items: '.tweets__item'
          });
        });
      }
    }"
  >
    <pw-section-heading title="Tweets" icon="twitter" />
    <pw-lede class="mt-3">Tweets by me, <a href="https://twitter.com/intent/user?user_id=38276082" class="font-bold">@philw_</a>.</pw-lede>
    <div class="tweets mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div class="tweets__col space-y-5"></div>
      <div class="tweets__col space-y-5 hidden md:block"></div>
      <div class="tweets__col space-y-5 hidden xl:block"></div>

      <div class="tweets__item" v-for="(tweet, index) in tweets" :key="index">
        <pw-card-twitter :tweet="tweet" />
      </div>
    </div>
  </section>
</template>
