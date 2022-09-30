<template>
  <li
    tabindex="-1"
    data-pw-scroller-item
    class="scroller-item relative snap-center flex-grow-0 flex-shrink-0 mb-3"
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
.scroller-item {
  margin-top: calc(var(--outline-offset, var(--outline-size)) * 2);
}
.scroller.scroller--no-interaction .scroller-item:not(:nth-child(-n + 3)) {
  // Commenting this out for now as it causes jumpiness when cards don't
  // have a fixed height, e.g. blog posts
  // content-visibility: auto;
}
</style>
