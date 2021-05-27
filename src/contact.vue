<script>
import PwContact from './includes/pw-contact.vue';

export default {
  data: {
    layout: 'base',
    title: 'Contact',
    eleventyNavigation: { key: 'Contact' },
  },
  components: {
    PwContact,
  },
};
</script>

<template>
  <div>
    <pw-contact></pw-contact>
    <style v-if="!build.noCss" v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </div>
</template>

<style>
.with-sidebar {
  overflow: hidden;
}

.with-sidebar > * {
  display: flex;
  flex-wrap: wrap;
  margin: calc(2em / 2 * -1);
}

.with-sidebar > * > * {
  margin: calc(2em / 2);
  flex-basis: 250px;
  flex-grow: 1;
}

.with-sidebar > * > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-width: calc(70% - 2em);
}

.card--portfolio:target {
  --tw-ring-opacity: 1 !important;
  --tw-ring-color: rgba(251, 191, 36, var(--tw-ring-opacity)) !important;
  --tw-ring-offset-width: 2px !important;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color) !important;
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;
  transform: scale(1.03);
}
</style>
