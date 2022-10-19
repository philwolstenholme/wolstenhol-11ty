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
      return Math.round((Math.random() / 1.5) * 100) / 100;
    },
  },
};
</script>

<template>
  <article class="card-blog contain-content relative flex overflow-hidden w-full rounded shadow-hard" x-ignore>
    <a
      :href="`${post.url}`"
      class="grid grid-stack text-white bg-medium hover:bg-medium-dark focus:bg-black outline-offset-invert no-underline w-full"
    >
      <img
        hidden="hidden"
        alt=""
        loading="lazy"
        width="365"
        height="199"
        srcset="
          https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_365%2Ch_199%2Cf_auto%2Cq_70%2Cfl_progressive/v1661284312/one-offs/white-grungy-wall-textured-background.jpg,
          https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_730%2Ch_398%2Cf_auto%2Cq_70%2Cfl_progressive/v1661284312/one-offs/white-grungy-wall-textured-background.jpg 2x
        "
        data-frivolous-grunge
        class="opacity-grunge mix-blend-multiply absolute block w-full h-full object-cover"
        :style="`--opacity: ${this.randomOpacity}`"
      />
      <div class="flex flex-col isolate p-5">
        <h3 class="text-lg mb-4 font-serif font-bold leading-tight">
          {{ post.title }}
        </h3>
        <p class="flex-grow font-bold text-sm leading-tight">{{ post.content }}</p>
        <p v-if="post.page_views_count > 900" class="mt-3 font-bold text-sm leading-tight tracking-tight">
          🔥 {{ Intl.NumberFormat('en-GB').format(post.page_views_count) }} views
        </p>
      </div>
    </a>
  </article>
</template>
