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
  <article class="card-blog contain-content relative flex w-full overflow-hidden rounded shadow-hard" x-ignore>
    <!-- can this div have its classes merged into the one above? -->
    <div class="grid-stack group grid bg-medium text-white focus-within:bg-medium-dark hover:bg-medium-dark">
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
        class="opacity-grunge absolute block h-full w-full object-cover mix-blend-multiply"
        :style="`--opacity: ${this.randomOpacity}`"
      />
      <div class="isolate flex flex-col p-5">
        <h3 class="mb-4 font-serif text-lg font-bold leading-tight">
          <a :href="`${post.url}`" class="group-hover:underline">{{ post.title }}</a>
        </h3>
        <p class="flex-grow text-sm font-bold leading-tight">{{ post.content }}</p>
        <p v-if="post.page_views_count > 900" class="mt-3 text-sm font-bold leading-tight tracking-tight">
          🔥 {{ Intl.NumberFormat('en-GB').format(post.page_views_count) }} views
        </p>
      </div>
    </div>
  </article>
</template>
