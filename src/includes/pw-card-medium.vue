<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<template>
  <article class="card__blog relative flex overflow-hidden w-full rounded shadow-hard">
    <a :href="`https://medium.com/@philw_/${post.uniqueSlug}`" class="text-white bg-medium hocus:bg-medium-dark p-5 no-underline w-full">
      <h3 class="text-lg mb-4 font-serif font-bold leading-tight">
        {{ post.title }}
      </h3>
      <p class="font-bold text-sm leading-tight">{{ post.content.subtitle }}</p>
    </a>
  </article>
</template>
