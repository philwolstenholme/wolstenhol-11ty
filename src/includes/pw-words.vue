<script>
import PwLede from './pw-lede.vue';
import PwCardMedium from './pw-card-medium.vue';
import PwHorizontalScroller from './pw-horizontal-scroller.vue';
import PwSectionHeading from './pw-section-heading.vue';

export default {
  props: {
    posts: {
      type: Object,
    },
  },

  components: {
    PwLede,
    PwCardMedium,
    PwHorizontalScroller,
    PwSectionHeading,
  },
};
</script>

<template>
  <section data-section="words">
    <pw-section-heading title="Words" icon="penAlt" />
    <pw-lede class="mt-3">Blog posts from Medium (until I build my own blog!)</pw-lede>

    <pw-horizontal-scroller :items="posts" :items-row="3" class="mt-5">
      <template slot-scope="{ item }">
        <pw-card-medium :post="item" />
      </template>
      <div slot="no-more-offscreen-cards">
        ➜ Read more on
        <a href="http://medium.com/@philw_" class="b bg-black-10 br2 dib pa1 ph2 black">Medium</a>…
      </div>
    </pw-horizontal-scroller>
  </section>
</template>
