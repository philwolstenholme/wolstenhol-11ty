<script>
import PwLede from './pw-lede.vue';
import PwCardMedium from './pw-card-medium.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwSimpleScroller from './pw-simple-scroller.vue';
import PwSimpleScrollerItem from './pw-simple-scroller-item.vue';

export default {
  props: {
    posts: {
      type: Object,
    },
  },

  components: {
    PwLede,
    PwCardMedium,
    PwSectionHeading,
    PwSimpleScroller,
    PwSimpleScrollerItem,
  },
};
</script>

<template>
  <section data-section="words">
    <pw-section-heading title="Words" icon="penAlt" />
    <pw-lede class="mt-3">Blog posts from Medium (until I build my own blog!)</pw-lede>

    <pw-simple-scroller class="mt-5" style="--items: 3">
      <pw-simple-scroller-item fit-to-grid v-for="(post, index) in posts" :key="index">
        <pw-card-medium class="h-full" :post="post" />
      </pw-simple-scroller-item>
    </pw-simple-scroller>
  </section>
</template>
