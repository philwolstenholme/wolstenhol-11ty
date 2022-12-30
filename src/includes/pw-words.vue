<script>
import PwLede from './pw-lede.vue';
import PwCardMedium from './pw-card-medium.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwSimpleScroller from './pw-simple-scroller.vue';
import PwSimpleScrollerItem from './pw-simple-scroller-item.vue';
import PwSection from './pw-section.vue';

export default {
  props: {
    posts: {
      type: Array,
    },
  },

  components: {
    PwLede,
    PwCardMedium,
    PwSectionHeading,
    PwSimpleScroller,
    PwSimpleScrollerItem,
    PwSection,
  },
};
</script>

<template>
  <pw-section section-key="words">
    <pw-section-heading title="Words" icon="penAlt" section="words" />
    <pw-lede class="mt-3">
      Blog posts I've posted on <a href="https://dev.to/philw_" class="underline">DEV Community</a> or
      <a href="https://philwolstenholme.medium.com" class="underline">Medium</a>
      (one day I'll build my own blog, I promise…)
    </pw-lede>

    <pw-simple-scroller class="items-1 md:items-2 lg:items-3 mt-12" :scroll-full="true" theme="medium" label="Blog posts">
      <pw-simple-scroller-item fit-to-grid v-for="(post, key) in posts" :key="key">
        <pw-card-medium class="h-full" :post="post" />
      </pw-simple-scroller-item>
    </pw-simple-scroller>
  </pw-section>
</template>
