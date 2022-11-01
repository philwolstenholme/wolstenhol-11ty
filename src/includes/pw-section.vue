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
  <section :data-section="sectionKey" class="breakout">
    <div :class="['mx-auto', 'section__inner', 'section--' + sectionKey, sectionInnerClass].join(' ').trim()">
      <slot></slot>
    </div>
  </section>
</template>
