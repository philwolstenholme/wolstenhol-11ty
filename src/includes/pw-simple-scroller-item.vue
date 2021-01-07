<template>
  <li
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
.scroller-item--fit-to-grid {
  width: calc((100% - (1.25rem * (var(--items) - 1))) / var(--items));
}
</style>
