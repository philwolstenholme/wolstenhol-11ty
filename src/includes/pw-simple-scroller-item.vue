<template>
  <li
    tabindex="-1"
    data-pw-scroller-item
    class="scroller-item relative mb-3 flex-shrink-0 flex-grow-0 snap-center"
    :class="{
      'scroller-item--fit-to-grid': fitToGrid,
    }"
  >
    <slot></slot>
  </li>
</template>

<script>
export default {
  props: {
    fitToGrid: {
      type: Boolean,
      required: false,
      default: false,
    },
    isFirst: {
      type: Boolean,
    },
    isLast: {
      type: Boolean,
    },
  },
};
</script>

<style>
.scroller--no-interaction.scroller--all-elements-equal-height .scroller-item:not(:nth-child(-n + 4)) {
  content-visibility: auto;
}
.scroller-item--fit-to-grid {
  width: calc((100% - (1.25rem * (var(--items) - 1))) / var(--items));
}
</style>
