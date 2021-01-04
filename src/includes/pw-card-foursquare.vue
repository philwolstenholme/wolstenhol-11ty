<script>
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
};
</script>

<template>
  <article class="card__foursquare relative flex overflow-hidden w-full rounded shadow-hard">
    <a :href="place.url" class="text-white bg-foursquare hocus:bg-foursquare-dark p-5 no-underline w-full">
      <h3 class="text-lg mb-4 font-serif font-bold leading-tight">
        <span aria-hidden="true">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="3.5329999923706055 12 46.933998107910156 44">
            <path
              d="M38.723,12c-7.187,0-11.16,7.306-11.723,8.131C26.437,19.306,22.504,12,15.277,12C8.791,12,3.533,18.163,3.533,24.647 C3.533,39.964,21.891,55.907,27,56c5.109-0.093,23.467-16.036,23.467-31.353C50.467,18.163,45.209,12,38.723,12z"
            /></svg
          >'d
        </span>
        <span>{{ place.name }}</span>
      </h3>
      <div class="space-y-1 text-xs font-bold">
        <p v-text="place.tipHint" />
        <p v-text="formattedAddress" />
      </div>
    </a>
  </article>
</template>
