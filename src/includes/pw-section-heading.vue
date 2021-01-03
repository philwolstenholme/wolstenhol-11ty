<template>
  <div class="relative text-3xl">
    <h2 :id="anchor" class="font-serif font-bold">
      {{ title }}
    </h2>
    <span v-if="icon" class="absolute top-0.5 -left-12">
      <a :href="`#${anchor}`" class="text-gray-500">
        <span class="sr-only"
          >Section titled <i>{{ title }}</i></span
        >
        <icon :name="icon" />
      </a>
    </span>
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
