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
  },

  components: {
    icon,
    spriteIcon,
  },
};
</script>

<template>
  <article class="contain-content relative flex overflow-hidden w-full rounded shadow-hard">
    <component
      :is="place.url ? 'a' : 'div'"
      :href="place.url"
      class="text-white bg-foursquare no-underline w-full flex flex-col-reverse"
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
      <div class="relative shadow-inner overflow-hidden">
        <img alt="" loading="lazy" width="365" height="182" :src="place.map" class="foursquare__map" />
        <div class="absolute inset-0 flex items-center justify-center">
          <icon
            name="mapMarkerAlt"
            class="w-8 h-8 opacity-80 duration-75 transform-gpu transition-transform group-hocus:-translate-y-1 group-hocus:opacity-100"
          ></icon>
        </div>
        <div class="foursquare__map-scrim absolute inset-0"></div>
      </div>
    </component>
  </article>
</template>

<style>
.foursquare__map-scrim {
  background: radial-gradient(circle, rgba(255, 255, 255, 0) 30%, rgb(0 0 0 / 40%) 100%);
}

.foursquare__map {
  mix-blend-mode: multiply;
}

.foursquare-card__body {
  max-width: 365px;
}
</style>
