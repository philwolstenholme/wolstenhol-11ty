<script>
const uniqueRandomArray = require('unique-random-array');

import PwLede from './pw-lede.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwSection from './pw-section.vue';

export default {
  props: {
    reading: {
      type: Array,
    },
  },

  components: {
    PwLede,
    PwSectionHeading,
    PwSection,
  },

  methods: {
    getRandomRotationVar: function () {
      return uniqueRandomArray([
        '--r: -1.2deg',
        '--r: -1.1deg',
        '--r: -1deg',
        '--r: -0.5deg',
        null,
        '--r: 0.5deg',
        '--r: 1deg',
        '--r: 1.1deg',
        '--r: 1.2deg',
      ])();
    },
  },
};
</script>

<template>
  <pw-section section-key="reading">
    <pw-section-heading title="Reading" icon="bookmark" section="reading" />

    <div class="mt-3 flex justify-between">
      <pw-lede>Some things I've been reading recently and some random items from the vaults:</pw-lede>
    </div>

    <ul role="list" class="pb-2 gap-5 grid md:grid-cols-2 xl:grid-cols-3 mt-8">
      <li class="reading-list__item flex min-w-0" v-for="(item, index) in reading.slice(0, 5)" :key="index" :style="getRandomRotationVar()">
        <a
          :href="item.url"
          class="reading-list-link relative flex min-w-0 group items-baseline space-x-3 flex-1 border border-gray-300 rounded shadow-hard bg-oc-yellow-2 hocus:bg-oc-yellow-3 p-4 font-serif"
        >
          <img
            :src="item.favicon"
            :srcset="!item.favicon.startsWith('data:') ? `${item.favicon.replace(/16/gi, 32)} 2x` : null"
            class="flex-shrink-0 rounded isolate"
            alt=""
            width="16"
            height="16"
            loading="lazy"
          />
          <div class="isolate min-w-0">
            <h3 class="font-bold leading-tight group-hocus:underline">{{ item.title }}</h3>
            <p class="mt-2 text-xs no-underline truncate" v-if="item.subTitle">{{ item.subTitle }}</p>
          </div>
        </a>
      </li>
      <li class="md:hidden no-js:hidden scroll-saver space-y-3" x-data>
        <p class="max-w-md m-auto text-center font-serif">
          There are <span class="font-bold">{{ reading.length - 5 }}</span> more of these. I thought I'd save you some scrolling, but if you
          want you can…
        </p>
        <button
          type="button"
          class="border m-auto block shadow-hard px-4 py-2 bg-black text-white font-serif font-bold rounded border-yellow-100"
          x-on:click="$event.target.parentElement.remove()"
        >
          Read more reading list items
        </button>
      </li>
      <li
        class="reading-list__item flex min-w-0"
        :class="{ relative: index === 4 }"
        v-for="(item, index) in reading.slice(5, reading.length + 1)"
        :key="index"
        :style="getRandomRotationVar()"
      >
        <svg
          v-if="index === 4"
          role="presentation"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1282 311.8"
          width="208"
          class="-left-56 2xl:inline absolute hidden top-1/4"
        >
          <path
            d="M788 0c-13 4 0 20-1 29l8 35c2 9 9 24 0 30-11 1-25 1-32 10-6 9-11 18-9 29 0 12 16 21 25 13s16-17 22-28c8 5 5 21 12 29 3 17 30 0 13-8-8-4-5-18-8-26-1-15-1-29-6-43-4-19-7-38-14-57-3-5-2-13-10-13ZM27 12c-13 3-9 20-6 30l3 42c-9 4-21 6-24 17 0 11 11 11 15 2 8-6 16-2 16 8 3 13 8 25 12 37 0 10 15 16 14 3l-11-37c-5-11-3-21 7-28 5-4 9-14-2-13-5 3-11 10-12 0-5-18-1-38-6-57-1-2-3-4-6-4Zm38 6c-12 5 1 18 1 27l11 52 10 46c-3 9 7 15 13 7 7-8-2-23 3-34 2-3 1-12 6-12 12-2 17 11 21 20 4 10 8 22 17 28 10 7 19-14 5-15-8-11-11-24-18-35-7-9-21-16-31-9-6 2-12 9-12-2-5-15-7-32-11-47-3-10-5-22-15-26Zm944 50c-11 2-21 7-29 15-2 5-9 9-9 15 0 7-1 15 3 21 14 2 9-17 17-25 5-11 21-12 24 2 2 11 7 21 7 32-5 7-2 18 8 13 10-13 4-31 0-45-4-10-7-22-18-27l-1-1zm-766 8c-16-2-10 19-9 28 7 9 14 24 0 30-6 9-22-9-18 5 8 10 23 12 31 1 9-7 11-20 6-29-3-9-14-21-2-26 3-6-3-10-8-9zm399 3c-17 6-2 23-5 34-2 10-8 20-18 25-8 3-16 0-12-8-10-4-20 11-31 6-15-5-10-23 3-27 9-3 17-22 1-21-13-2-24 7-29 19-5 13 1 28 11 37s23 6 34 1c11 3 23 13 33 3 11-9 19-21 21-34 1-12-4-23-5-34l-2-1zm238 1c-11 0-5 13 2 15 6 10 6 23 16 31 10 2 15-11 20-17 6-2 12 7 16 11 8 14 21 1 22-11 3-7 7-30-7-21-4 5-6 24-14 12-4-9-19-14-23-4-4 7-13 14-14 1-3-7-8-16-18-17zm-357 0c-10 1-19 7-25 15-5 10-11 23-5 33 16 6 8-18 17-24 5-14 21-8 17 6 4 10-1 24 8 32 12 4 9-16 8-23-3-12-3-26-10-36-2-2-6-3-10-3zm-226 1c-12 0-24 7-30 17-6 11-1 25 6 34 9 8 20 13 32 14 10 0 24-1 28-12-11-2-24 1-35-2-8-3-25-18-12-24 8-5 24-11 18-23-2-2-4-4-7-4zm173 2c-5 12-22-3-29 10-8 9-17 18-19 30-2 14 13 27 27 23 17-2 30-18 31-36 1-9 0-23-10-27zM194 95c-14-3-19 11-22 22-12 12 8 14 13 21 8 6 21 7 25-4 2-9-15-2-17-9-1-10 21-9 18-22-1-8-11-7-17-8zm667 1c-5 2 3 13-6 10-10-2-16 11-18 19-4 12 7 25 19 25 15 0 21-17 22-29 2-11-7-22-17-25zm401 0c-11 2-17 13-21 23-5 11-16 14-26 7-20-4-40 3-57 12-11 6-21 11-31 18-9 5-17 14-26 21-9 9-18 17-25 27-10 7-14 19-17 30 2 5 13 7 13 0 9-18 24-33 38-47 16-14 34-26 53-36 10-4 21-9 31-11 8 0 18-1 24 6-2 7-12 9-13 17 4 13 19 7 29 9 12 3 23 3 35 0 6 1 15-4 13-11 0-8-2-15-3-22 0-11-4-22-7-33-1-4-5-10-10-10zm-797 1c5 7 3 21-3 28-8 6-26 13-24-4 4-12 15-22 27-24zm327 6c9 6-7 17-10 24-4 11-18 10-15-3 4-10 11-20 23-21zm71 9c6 7-1 31-11 20-8-9 6-15 11-20zm23 88c-16 1-4 20-4 29 1 12 4 25 0 36-2 8-22 16-23 5 3-12 17-9 23-16-6-10-23-8-29 1-7 8-12 20-6 29 9 7 22 6 32 2 10-3 15-13 18-23 5 7 6 21 12 30 2 7 15 4 12-3-1-9-2-19-7-26-2-12-9-24-12-36-6-8-6-21-15-28zm-357 8c-14 4 1 21-2 31 0 11 5 21 5 32-4 8-9 23-21 21-15-3-6-25 7-21 13-6-13-17-17-9-7 7-14 15-12 26-2 4 2 7 5 10 6 8 21 12 29 5 9-3 15-25 21-9 7 10 20 18 31 17 13-1 25-12 23-25-1-11-5-25-19-21-13-2-18 14-25 17-5-11-10-23-11-35-2-11-3-23-6-34-2-3-5-5-8-5zm193 19c-12 1-6 17 4 10 12 2 1-10-4-10zm-670 5c-14-1-22 12-29 21-7 10-10 23-6 34 4 10 17 18 26 11 8-4 15-24 20-7-1 8 13 20 14 7 0-13-7-25-9-37-3-10-2-29-16-29zm722 6c-12 4-24 17-19 31 6 4 11 21-1 16-10-2-9 22 4 17 10-3 21-13 18-25-9-9-11-26 4-29 4-4-1-11-6-10zm-605 1c-12 3-21 10-29 19s-24 4-34 11c-6 8-14-11-16 4-2 11 7 18 11 27 10 7 12-9 12-16 8-9 22-8 27 4 7 9 17 14 28 16s26 2 34-6c-4-11-20-2-29-7-8-2-25-8-20-18 12-4 23-14 23-27 0-4-4-7-7-7zm186 2c-12 2-24 9-26 23-6 9-10 19-5 30 0 10 13 17 15 4 0-12 1-26 6-37 7-10 22-4 28-12-4-6-12-7-18-8zm-302 4c1 7-2 21-7 29 0 13-20 16-16 0 1-11 8-23 19-28l4-1zm761 4c-13-1-23 8-28 18-2 12 7 23 16 30 8 2 29 1 27-10-9-4-24 3-26-12-6-17 25-3 24-18 0-8-7-7-13-8zm-352 1c-12 1-23 9-26 20-6 7-2 28 7 16 2-9 13-29 23-17 9 10 1 26 13 34 14 2 5-17 5-25-2-11-8-27-21-28zm-56 2c-11 3-17 15-23 23s-13 25 1 26c11-1 19-10 27-16 7-1 21 10 20-4-4-9-14-25-22-11-4 5-18 15-9 4 2-9 24-15 6-22zm240 5c-15 0-27 12-34 24-11 4-5 30 8 21 5-9 6-22 16-28 15-9 6 13 13 18 13 8 11-11 18-15 5 6 9 29 20 18 6-10-1-21-8-29-5-13-21-2-30-9h-2zm74 1c-13 4 2 19-1 28-4 9 7 20 12 9 4-11 3-25-5-35-2-2-4-1-6-2zm-139 18c10 7-6 28-11 14 0-7 6-12 11-14z"
          ></path>
        </svg>
        <a
          :href="item.url"
          class="reading-list-link relative flex min-w-0 group items-baseline space-x-3 flex-1 border border-gray-300 rounded shadow-hard bg-oc-yellow-2 hocus:bg-oc-yellow-3 p-4 font-serif"
        >
          <img :src="item.favicon" class="flex-shrink-0 rounded isolate" alt="" width="16" height="16" loading="lazy" />
          <div class="isolate min-w-0">
            <h3 class="font-bold leading-tight group-hocus:underline">{{ item.title }}</h3>
            <p class="mt-2 text-xs no-underline truncate" v-if="item.subTitle">{{ item.subTitle }}</p>
          </div>
        </a>
      </li>
    </ul>
  </pw-section>
</template>

<style>
.reading-list__item {
  transform: rotate(var(--r));
}

.reading-list-link {
  background-image: url('https://wolstenhol.me/proxy/cloudinary/image/upload/c_crop,f_auto,h_200,w_200,q_auto:eco/v1473712910/subtle_grunge_ux3r0f.png');
  background-blend-mode: luminosity;
}

.reading-list-link::before {
  content: '';
  inset: 0;
  position: absolute;
  background: rgb(255 236 153 / 40%);
}

.reading-list-link img:first-child {
  transform: translateY(2px);
}
</style>
