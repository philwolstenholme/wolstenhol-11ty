<script>
export default {
  props: {
    hash: {
      type: String,
    },
  },
};
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon">
    <use :href="`#${hash}`" />
  </svg>
</template>
