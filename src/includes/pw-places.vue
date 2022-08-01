<script>
import PwLede from './pw-lede.vue';
import PwCardFoursquare from './pw-card-foursquare.vue';
import PwSimpleScroller from './pw-simple-scroller.vue';
import PwSimpleScrollerItem from './pw-simple-scroller-item.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwSection from './pw-section.vue';

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
    PwSection,
  },
};
</script>

<template>
  <pw-section
    section-key="places"
    x-data
    x-intersect.once="(() => {var l = document.createElement('link'); l.rel = 'preconnect'; l.href = 'https://maps.googleapis.com'; document.head.appendChild(l);})()"
  >
    <pw-section-heading title="Places" icon="mapMarkerAlt" section="places" />
    <pw-lede class="mt-3"
      >A randomised asortment of places I've liked on Foursquare at one point - it could be somewhere from a holiday, or it could be a
      random bar in Manchester that closed three years ago…</pw-lede
    >

    <pw-simple-scroller class="mt-12 items-1 sm:items-2 lg:items-3" :scroll-full="true" theme="foursquare" label="Foursquare places">
      <pw-simple-scroller-item v-for="(place, index) in places" :key="index">
        <pw-card-foursquare class="h-full" :place="place" />
      </pw-simple-scroller-item>
    </pw-simple-scroller>
  </pw-section>
</template>
