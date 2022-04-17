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
  <article class="card-blog contain-content relative flex overflow-hidden w-full rounded shadow-hard" x-ignore>
    <a :href="`${post.url}`" class="text-white bg-medium hover:bg-medium-dark focus:bg-black outline-offset-invert p-5 no-underline w-full">
      <h3 class="text-lg mb-4 font-serif font-bold leading-tight">
        {{ post.title }}
      </h3>
      <p class="font-bold text-sm leading-tight">{{ post.content }}</p>
    </a>
  </article>
</template>
