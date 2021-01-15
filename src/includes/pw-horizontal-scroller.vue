<script>
import debounce from 'lodash/debounce';
import round from 'lodash/round';
import icon from './icon.vue';

export default {
  components: { icon },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => ({}),
    },

    itemsRow: {
      type: Number,
      default: 3,
    },

    flex: {
      type: Boolean,
      default: true,
    },

    overflowHidden: {
      type: Boolean,
      default: false,
    },
  },

  data: function () {
    return {
      sliderWidth: 0,
      sliderScroll: 0,
      remainingOffscreenCards: 0,
    };
  },

  computed: {
    tileWidth: function () {
      let width = (this.sliderWidth - 16 * (this.itemsRow - 1)) / this.itemsRow;
      return Math.floor(width);
    },

    tileWidthWithMargin: function () {
      return round(this.tileWidth + 16);
    },
  },

  mounted() {
    this.getSliderWidth();
    window.addEventListener('resize', debounce(this.getSliderWidth, 500));
    this.remainingOffscreenCards = Object.keys(this.items).length - this.itemsRow;
  },

  methods: {
    getSliderWidth() {
      this.sliderWidth = this.$el.clientWidth;
    },

    scrollFunction() {
      let scroller = this.$refs['scroller'];
      this.sliderScroll = scroller.scrollLeft;
      let remainingPixels = scroller.scrollWidth - scroller.scrollLeft;
      let remainingCards = round(remainingPixels / this.tileWidthWithMargin) - this.itemsRow;
      this.remainingOffscreenCards = remainingCards;
    },

    previous() {
      let scroller = this.$refs['scroller'];
      scroller.scrollLeft = scroller.scrollLeft - this.tileWidthWithMargin * this.itemsRow;
    },

    next() {
      let scroller = this.$refs['scroller'];
      scroller.scrollLeft = scroller.scrollLeft + this.tileWidthWithMargin * this.itemsRow;
    },
  },
};
</script>

<template>
  <div class="relative">
    <button
      :class="{ 'opacity-0': sliderScroll < 10 }"
      :tabindex="{ '-1': sliderScroll < 10 }"
      class="pw-horizontal-scroller__button absolute top-0 bottom-0 bg-transparent b--transparent opacity-70"
      style="left: -3em"
      @click="previous"
    >
      <span class="sr-only">Previous</span>
      <icon name="chevronLeft" />
    </button>
    <button
      :class="{ 'opacity-0': remainingOffscreenCards === 0 }"
      :tabindex="{ '-1': remainingOffscreenCards === 0 }"
      class="pw-horizontal-scroller__button absolute top-0 bottom-0 bg-transparent b--transparent opacity-70"
      style="right: -3em"
      @click="next"
    >
      <span class="sr-only">Next</span>
      <icon name="chevronRight" />
    </button>
    <ul
      ref="scroller"
      class="pw-horizontal-scroller p-0 flex space-x-5 mb-2 scrolling-touch overflow-y-hidden overflow-x-scroll custom-scrollbars snap snap-x snap-mandatory"
      @scroll="scrollFunction"
    >
      <li
        v-for="(item, index) in items"
        :ref="`scroll-item-${index}`"
        :key="index"
        :class="{ flex: flex, 'overflow-hidden': overflowHidden }"
        style="flex-basis: calc((100% - (1.25rem * 2)) / 3)"
        class="flex-shrink-0 mb-3 snap-start"
      >
        <slot :item="item" :index="index" />
      </li>
    </ul>
    <div>
      <div class="pw-horizontal-scroller__prompt opacity-50 text-right">
        <transition mode="out-in">
          <div v-if="remainingOffscreenCards">
            ➜ scroll sideways above for
            <span class="font-bold bg-black inline-block py-2 px-4">{{ remainingOffscreenCards }}</span>
            more…
          </div>
          <slot v-if="!remainingOffscreenCards" name="no-more-offscreen-cards">
            <div class="p-2">➜ That's it for now!</div>
          </slot>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.pw-horizontal-scroller__button {
  width: 3em;
  margin-bottom: 60px;
  transition: all 0.15s ease-in;
  transform-origin: center;

  &:hover:not(.opacity-0),
  &:focus:not(.opacity-0) {
    opacity: 1 !important;
    transform: scale(1.1);
  }
}
</style>
