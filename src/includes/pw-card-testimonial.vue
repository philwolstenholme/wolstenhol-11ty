<script>
export default {
  computed: {
    randomOpacity: function () {
      return Math.round((Math.random() / 1.5) * 100) / 100;
    },
  },
};
</script>

<template>
  <figure class="grid-stack contain-content relative grid rounded bg-purple-700 text-white shadow-hard" x-ignore>
    <img
      hidden="hidden"
      alt=""
      loading="lazy"
      width="365"
      height="153"
      srcset="
        https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_365%2Ch_153%2Cf_auto%2Cq_70%2Cfl_progressive/v1661284312/one-offs/white-grungy-wall-textured-background.jpg,
        https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_730%2Ch_306%2Cf_auto%2Cq_70%2Cfl_progressive/v1661284312/one-offs/white-grungy-wall-textured-background.jpg 2x
      "
      data-frivolous-grunge
      class="opacity-grunge absolute block h-full w-full object-cover mix-blend-multiply"
      :style="`--opacity: ${this.randomOpacity}`"
    />
    <div class="isolate flex flex-col justify-center space-y-3 p-4 text-center">
      <blockquote class="isolate mx-auto max-w-md font-serif text-xl font-bold leading-tight">
        <h3>&ldquo;<slot name="blockquote"></slot>&rdquo;</h3>
      </blockquote>
      <figcaption class="isolate mx-9 text-xs uppercase text-white">
        <slot name="figcaption"></slot>
      </figcaption>
    </div>
  </figure>
</template>
