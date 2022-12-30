<script>
import spriteIcon from './sprite-icon.vue';
import { format } from 'timeago.js';

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
    timeAgo: function () {
      return format(new Date(this.place.ratedAt * 1000), 'en_GB');
    },
    randomOpacity: function () {
      return Math.round((Math.random() / 3) * 100) / 100;
    },
  },

  components: {
    spriteIcon,
  },
};
</script>

<template>
  <article class="foursquare-card contain-content relative flex w-full overflow-hidden rounded shadow-hard" x-ignore>
    <div
      class="outline-offset-invert flex w-full flex-col-reverse bg-foursquare text-white no-underline"
      :class="{
        group: place.url,
        'focus-within:bg-foursquare-dark hover:bg-foursquare-dark': place.url,
      }"
    >
      <div class="foursquare-card__body flex-grow p-5">
        <h3 class="mb-4 font-serif text-lg font-bold leading-tight">
          <span aria-hidden="true"><sprite-icon hash="heart"></sprite-icon>'d </span>
          <component :href="place.url" :is="place.url ? 'a' : 'span'" class="group-hover:underline">{{ place.name }}</component>
        </h3>
        <div class="space-y-1 text-xs font-bold">
          <p v-text="place.tipHint" />
          <p v-text="formattedAddress" />
        </div>
      </div>
      <div class="grid-stack grid overflow-hidden shadow-inner">
        <img alt="" loading="lazy" width="365" height="182" :src="place.map" class="foursquare-card__img mix-blend-multiply" />
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
          class="foursquare-card__img opacity-grunge block h-full w-full"
          :style="`--opacity: ${this.randomOpacity}`"
        />
        <div class="isolate flex items-center justify-center">
          <sprite-icon
            display="none"
            role="presentation"
            aria-hidden="true"
            hash="asterisk"
            class="icon h-8 w-8 transform-gpu transition-transform duration-75 group-hocus:-translate-y-1"
            :style="`--tw-rotate: ${Math.floor(Math.random() * 360) + 1}deg !important;`"
          />
        </div>
        <div class="foursquare-card__map-scrim isolate"></div>
        <p class="absolute left-4 top-4 isolate text-xs uppercase text-white">{{ timeAgo }}</p>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
.foursquare-card {
  max-width: min(365px, calc(100vw - 2.5rem));

  :focus {
    --outline-color: black;
    --outline-offset: 4px;
  }
}

.foursquare-card__map-scrim {
  background: radial-gradient(circle, rgba(255, 255, 255, 0) 30%, rgb(0 0 0 / 40%) 100%);
}
</style>
