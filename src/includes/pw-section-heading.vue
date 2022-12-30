<template>
  <div class="relative items-center text-3xl md:flex">
    <span v-if="icon" class="absolute top-0.5 -left-12">
      <a :href="`#${anchor}`" class="text-gray-500">
        <span class="sr-only"
          >Section titled <i>{{ title }}</i></span
        >
        <icon :name="icon" class="-top-1.5" />
      </a>
    </span>
    <h2 :id="anchor" tabindex="-1" class="inline-block font-serif font-bold uppercase" :data-section="section">
      {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>

<script>
import icon from './icon.vue';
import camelCase from 'lodash/camelCase';

export default {
  props: {
    title: {
      type: String,
      required: true,
      default: null,
    },

    icon: {
      type: String,
      required: false,
      default: null,
    },

    section: {
      type: String,
      required: false,
      default: null,
    },
  },

  computed: {
    anchor: function () {
      return camelCase(this.title);
    },
  },

  components: {
    icon,
  },
};
</script>
