<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    randomOpacity: function () {
      return Math.round(Math.random() * 100) / 100;
    },
  },
};
</script>

<template>
  <article class="card-blog contain-content relative flex overflow-hidden w-full rounded shadow-hard" x-ignore>
    <a :href="`${post.url}`" class="text-white bg-medium hover:bg-medium-dark focus:bg-black outline-offset-invert p-5 no-underline w-full">
      <img
        hidden="hidden"
        alt=""
        loading="lazy"
        width="365"
        height="199"
        srcset="
          https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_365%2Ch_199%2Cf_auto%2Cq_auto%3Alow/v1661284312/one-offs/white-grungy-wall-textured-background.jpg,
          https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_730%2Ch_398%2Cf_auto%2Cq_auto%3Alow/v1661284312/one-offs/white-grungy-wall-textured-background.jpg 2x
        "
        data-frivolous-grunge
        class="opacity-grunge mix-blend-multiply absolute block inset-0"
        :style="`--opacity: ${this.randomOpacity}`"
      />
      <h3 class="isolate text-lg mb-4 font-serif font-bold leading-tight">
        {{ post.title }}
      </h3>
      <p class="isolate font-bold text-sm leading-tight">{{ post.content }}</p>
    </a>
  </article>
</template>
