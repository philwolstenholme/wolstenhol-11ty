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
      <pw-lede>Some things I've been reading recently:</pw-lede>
    </div>

    <ul role="list" class="pb-2 gap-5 grid md:grid-cols-2 xl:grid-cols-3 mt-8">
      <li class="reading-list__item flex min-w-0" v-for="(item, index) in reading.slice(0, 5)" :key="index" :style="getRandomRotationVar()">
        <a
          :href="item.url"
          class="reading-list-link relative flex min-w-0 group items-baseline space-x-3 flex-1 border border-gray-300 rounded shadow-hard bg-oc-yellow-2 hocus:bg-oc-yellow-3 p-4 font-serif"
        >
          <img
            :src="item.favicon"
            :srcset="`${item.favicon.replace(/16/gi, 32)} 2x`"
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
      <li class="md:hidden scroll-saver space-y-3" x-data>
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
        v-for="(item, index) in reading.slice(5, reading.length + 1)"
        :key="index"
        :style="getRandomRotationVar()"
      >
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
