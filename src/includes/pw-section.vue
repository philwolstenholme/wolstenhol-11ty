<script>
export default {
  props: {
    sectionKey: {
      type: String,
    },
    sectionInnerClass: {
      type: String,
    },
  },
};
</script>

<template>
  <section :data-section="sectionKey" class="section breakout contain-content">
    <div :class="['mx-auto', 'section__inner', 'section--' + sectionKey, sectionInnerClass].join(' ').trim()">
      <slot></slot>
    </div>
  </section>
</template>

<style>
.section {
  padding-bottom: 2px;
}
</style>
