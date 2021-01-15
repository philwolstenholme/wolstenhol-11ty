<script>
import PwLede from './pw-lede.vue';
import PwCardFoursquare from './pw-card-foursquare.vue';
import PwSimpleScroller from './pw-simple-scroller.vue';
import PwSimpleScrollerItem from './pw-simple-scroller-item.vue';
import PwSectionHeading from './pw-section-heading.vue';

export default {
  props: {
    places: {
      type: Array,
    },
  },

  components: {
    PwLede,
    PwCardFoursquare,
    PwSectionHeading,
    PwSimpleScroller,
    PwSimpleScrollerItem,
  },
};
</script>

<template>
  <section data-section="places">
    <pw-section-heading title="Places" icon="mapMarkerAlt" />
    <pw-lede class="mt-3">Nice places that I've been to and that you might like</pw-lede>

    <pw-simple-scroller class="mt-5 items-1 sm:items-2 lg:items-3" :scroll-full="true" theme="foursquare">
      <pw-simple-scroller-item fit-to-grid v-for="(place, index) in places" :key="index">
        <pw-card-foursquare class="h-full" :place="place" />
      </pw-simple-scroller-item>
    </pw-simple-scroller>
  </section>
</template>
