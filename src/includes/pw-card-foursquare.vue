<script>
import icon from './icon.vue';
import spriteIcon from './sprite-icon.vue';

export default {
  props: {
    place: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    formattedAddress: function () {
      return [this.place.location.formattedAddress[0], this.place.location.city].join(', ');
    },
    formattedYear: function () {
      let d = new Date(this.place.ratedAt * 1000);
      return d.getFullYear();
    },
    randomOpacity: function () {
      return Math.round((Math.random() / 2.5) * 100) / 100;
    },
  },

  components: {
    icon,
    spriteIcon,
  },
};
</script>

<template>
  <article class="contain-content relative flex overflow-hidden w-full rounded shadow-hard" x-ignore>
    <component
      :is="place.url ? 'a' : 'div'"
      :href="place.url"
      class="text-white bg-foursquare outline-offset-invert no-underline w-full flex flex-col-reverse"
      style="--outline-color: black"
      :class="{
        group: place.url,
        'hocus:bg-foursquare-dark': place.url,
      }"
    >
      <div class="foursquare-card__body flex-grow p-5">
        <h3 class="text-lg mb-4 font-serif font-bold leading-tight">
          <span aria-hidden="true"><sprite-icon hash="heart"></sprite-icon>'d </span>
          <span class="group-hocus:underline">{{ place.name }}</span>
        </h3>
        <div class="space-y-1 text-xs font-bold">
          <p v-text="place.tipHint" />
          <p v-text="formattedAddress" />
        </div>
      </div>
      <div class="grid grid-stack shadow-inner overflow-hidden">
        <img alt="" loading="lazy" width="365" height="182" :src="place.map" class="mix-blend-multiply foursquare-card__img" />
        <img
          hidden
          alt=""
          loading="lazy"
          width="365"
          height="182"
          srcset="
            https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_365%2Ch_182%2Cf_auto%2Cq_auto%3Alow%2Fv1661284312%2Fone-offs%2F9-soft-grunge-texture-4-1.png 1x,
            https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_730%2Ch_364%2Cf_auto%2Cq_auto%3Alow%2Fv1661284312%2Fone-offs%2F9-soft-grunge-texture-4-1.png 2x
          "
          data-frivolous-grunge
          class="foursquare-card__img opacity-grunge block w-full h-full"
          :style="`--opacity: ${this.randomOpacity}`"
        />
        <div class="flex items-center justify-center">
          <icon
            name="mapMarkerAlt"
            class="w-8 h-8 opacity-80 duration-75 transform-gpu transition-transform group-hocus:-translate-y-1 group-hocus:opacity-100"
          ></icon>
        </div>
        <div class="foursquare-card__map-scrim"></div>
        <p class="absolute font-light left-4 text-sm text-white top-4">{{ formattedYear }}</p>
      </div>
    </component>
  </article>
</template>

<style>
.foursquare-card__map-scrim {
  background: radial-gradient(circle, rgba(255, 255, 255, 0) 30%, rgb(0 0 0 / 40%) 100%);
}

.foursquare-card__body {
  max-width: 365px;
}

.foursquare-card__img {
  max-width: calc(100vw - 40px);
}
</style>
