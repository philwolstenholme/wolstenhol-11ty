<script>
import icon from './icon.vue';

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
  },
};
</script>

<template>
  <article class="relative flex overflow-hidden w-full rounded shadow-hard">
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
          <span aria-hidden="true">
            <svg
              focusable="false"
              role="img"
              class="icon"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="3.5329999923706055 12 46.933998107910156 44"
            >
              <path
                d="M38.723,12c-7.187,0-11.16,7.306-11.723,8.131C26.437,19.306,22.504,12,15.277,12C8.791,12,3.533,18.163,3.533,24.647 C3.533,39.964,21.891,55.907,27,56c5.109-0.093,23.467-16.036,23.467-31.353C50.467,18.163,45.209,12,38.723,12z"
              /></svg
            >'d
          </span>
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
