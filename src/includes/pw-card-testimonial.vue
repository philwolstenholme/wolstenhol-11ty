<script>
export default {
  computed: {
    randomOpacity: function () {
      return Math.round(Math.random() * 100) / 100;
    },
  },
};
</script>

<template>
  <figure
    class="contain-content bg-purple-700 text-white rounded p-4 shadow-hard text-center space-y-3 flex flex-col justify-center"
    x-ignore
  >
    <img
      hidden="hidden"
      alt=""
      loading="lazy"
      width="365"
      height="153"
      srcset="
        https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_365%2Ch_153%2Cf_auto%2Cq_auto%3Alow/v1661284312/one-offs/white-grungy-wall-textured-background.jpg,
        https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_730%2Ch_306%2Cf_auto%2Cq_auto%3Alow/v1661284312/one-offs/white-grungy-wall-textured-background.jpg 2x
      "
      data-frivolous-grunge
      class="opacity-grunge mix-blend-multiply absolute block inset-0"
      :style="`--opacity: ${this.randomOpacity}`"
    />
    <blockquote class="isolate font-serif text-xl font-bold max-w-md mx-auto leading-tight">
      <h3>&ldquo;<slot name="blockquote"></slot>&rdquo;</h3>
    </blockquote>
    <figcaption class="isolate mx-9 text-white text-xs uppercase">
      <slot name="figcaption"></slot>
    </figcaption>
  </figure>
</template>
