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
    <div class="mx-auto section__inner">
      <slot></slot>
    </div>
  </section>
</template>
