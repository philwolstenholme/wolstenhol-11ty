<script>
export default {
  props: {
    sectionKey: {
      type: String,
    },
  },
};
</script>

<template>
  <section :data-section="sectionKey" class="breakout">
    <div class="mx-auto max-w-6xl px-5 sm:px-2">
      <slot></slot>
    </div>
  </section>
</template>

<style>
.breakout {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
</style>
