<script>
import PwLede from './pw-lede.vue';
import PwSimpleScroller from './pw-simple-scroller.vue';
import PwSimpleScrollerItem from './pw-simple-scroller-item.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwCardInstagram from './pw-card-instagram.vue';
import PwSection from './pw-section.vue';
import filter from 'lodash/filter';

export default {
  props: {
    photos: {
      type: Array,
    },
  },

  components: {
    PwLede,
    PwSectionHeading,
    PwSimpleScroller,
    PwSimpleScrollerItem,
    PwCardInstagram,
    PwSection,
  },

  computed: {
    postsWithoutVideos() {
      return filter(this.photos, (value, index, collection) => {
        return !value.videos;
      });
    },
  },
};
</script>

<template>
  <pw-section section-key="photos">
    <pw-section-heading title="Photos" icon="cameraRetro" section="photos" />
    <pw-lede class="mt-3">Photos and videos from Instagram.</pw-lede>

    <pw-simple-scroller class="mt-5 items-1 sm:items-2 md:items-3" :scroll-full="true" theme="spotify">
      <pw-simple-scroller-item fit-to-grid v-for="(post, index) in postsWithoutVideos" :key="index">
        <pw-card-instagram :post="post" :index="index"></pw-card-instagram>
      </pw-simple-scroller-item>
    </pw-simple-scroller>
  </pw-section>
</template>
