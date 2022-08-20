<script>
const pluralize = require('pluralize');

import PwLede from './pw-lede.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwSection from './pw-section.vue';

export default {
  props: {
    stars: {
      type: Array,
    },
  },

  components: {
    PwLede,
    PwSectionHeading,
    PwSection,
  },

  methods: {
    pluralize: function (word, count, include) {
      return pluralize(word, count, include);
    },
  },
};
</script>

<template>
  <pw-section section-key="stars">
    <pw-section-heading title="Stars" icon="star" section="stars" />

    <div class="mt-3 flex justify-between">
      <pw-lede
        >A randomised selection of projects that I've recently
        <a href="https://github.com/philwolstenholme?tab=stars" class="underline">starred on GitHub</a>.</pw-lede
      >
    </div>

    <ul class="pb-2 gap-5 grid md:grid-cols-2 xl:grid-cols-3 mt-8" role="list">
      <li class="stars-list__item flex min-w-0" v-for="(item, index) in stars.slice(0, 5)" :key="index">
        <a
          :href="item.html_url"
          class="stars-list-link relative min-w-0 group items-baseline flex-1 border border-gray-300 rounded shadow-hard text-white bg-gray-900 border-black hocus:bg-black p-4 font-serif"
        >
          <video
            hidden
            data-lozad
            aria-hidden="true"
            loop="loop"
            autoplay="autoplay"
            muted="muted"
            playsinline
            disablepictureinpicture
            disableremoteplayback
            preload="none"
            class="no-js:hidden absolute block h-full inset-0 motion-reduce:hidden object-fill opacity-10 pointer-events-none w-full"
          >
            <source data-src="https://wolstenhol.me/proxy/cloudinary/video/upload/v1650231745/11ty/static.mp4" type="video/mp4" />
          </video>
          <noscript>
            <video
              hidden
              aria-hidden="true"
              loop="loop"
              autoplay="autoplay"
              muted="muted"
              playsinline
              disablepictureinpicture
              disableremoteplayback
              preload="none"
              class="absolute block h-full inset-0 motion-reduce:hidden object-fill opacity-10 pointer-events-none w-full"
            >
              <source src="https://wolstenhol.me/proxy/cloudinary/video/upload/v1650231745/11ty/static.mp4" type="video/mp4" />
            </video>
          </noscript>
          <div class="flex flex-col h-full isolate">
            <div class="flex-1">
              <img
                :src="`https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,h_50,w_50,q_auto/${item.owner.avatar_url}`"
                :srcset="`https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,h_100,w_100,q_auto/${item.owner.avatar_url} 2x`"
                :alt="item.owner.login"
                class="float-right w-15 h-15 block rounded-full bg-white ml-3 mb-3"
                loading="lazy"
                width="50"
                height="50"
              />
              <h3 class="leading-tight text-lg group-hocus:underline">
                {{ item.owner.login }}/<span class="font-bold">{{ item.name }}</span>
              </h3>
              <p class="stars-list-link__description mt-3 no-underline font-sans text-sm leading-tight" v-if="item.description">
                {{ item.description }}
              </p>
            </div>
            <dl class="flex gap-5 mt-5 no-underline">
              <div class="flex flex-col-reverse">
                <dt class="font-sans font-light text-sm">{{ pluralize('Issue', item.open_issues) }}</dt>
                <dd class="font-bold">{{ Intl.NumberFormat('en-GB').format(item.open_issues) }}</dd>
              </div>
              <div class="flex flex-col-reverse">
                <dt class="font-sans font-light text-sm">{{ pluralize('Star', item.stargazers_count) }}</dt>
                <dd class="font-bold">{{ Intl.NumberFormat('en-GB').format(item.stargazers_count) }}</dd>
              </div>
              <div class="flex flex-col-reverse">
                <dt class="font-sans font-light text-sm">{{ pluralize('Fork', item.forks) }}</dt>
                <dd class="font-bold">{{ Intl.NumberFormat('en-GB').format(item.forks) }}</dd>
              </div>
            </dl>
          </div>
        </a>
      </li>
      <li class="md:hidden scroll-saver space-y-3" x-data>
        <p class="max-w-md m-auto text-center font-serif">
          There are <span class="font-bold">{{ stars.length - 5 }}</span> more of these. I thought I'd save you some scrolling, but if you
          want you can…
        </p>
        <button
          type="button"
          class="border m-auto block shadow-hard px-4 py-2 bg-black text-white font-serif font-bold rounded border-yellow-100"
          x-on:click="$event.target.parentElement.remove()"
        >
          See more repos that I've starred
        </button>
      </li>
      <li class="stars-list__item flex min-w-0" v-for="(item, index) in stars.slice(5, stars.length + 1)" :key="index">
        <a
          :href="item.html_url"
          class="stars-list-link relative min-w-0 group items-baseline flex-1 border border-gray-300 rounded shadow-hard text-white bg-gray-900 border-black hocus:bg-black p-4 font-serif"
        >
          <video
            hidden
            data-lozad
            aria-hidden="true"
            loop="loop"
            autoplay="autoplay"
            muted="muted"
            playsinline
            disablepictureinpicture
            disableremoteplayback
            preload="none"
            class="no-js:hidden absolute block h-full inset-0 motion-reduce:hidden object-fill opacity-10 pointer-events-none w-full"
          >
            <source data-src="https://wolstenhol.me/proxy/cloudinary/video/upload/v1650231745/11ty/static.mp4" type="video/mp4" />
          </video>
          <noscript>
            <video
              hidden
              aria-hidden="true"
              loop="loop"
              autoplay="autoplay"
              muted="muted"
              playsinline
              disablepictureinpicture
              disableremoteplayback
              preload="none"
              class="absolute block h-full inset-0 motion-reduce:hidden object-fill opacity-10 pointer-events-none w-full"
            >
              <source src="https://wolstenhol.me/proxy/cloudinary/video/upload/v1650231745/11ty/static.mp4" type="video/mp4" />
            </video>
          </noscript>
          <div class="flex flex-col h-full isolate">
            <div class="flex-1">
              <img
                :src="`https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,h_50,w_50,q_auto/${item.owner.avatar_url}`"
                :srcset="`https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,h_100,w_100,q_auto/${item.owner.avatar_url} 2x`"
                :alt="item.owner.login"
                class="float-right w-15 h-15 block rounded-full bg-white ml-3 mb-3"
                loading="lazy"
                width="50"
                height="50"
              />
              <h3 class="leading-tight text-lg group-hocus:underline">
                {{ item.owner.login }}/<span class="font-bold">{{ item.name }}</span>
              </h3>
              <p class="stars-list-link__description mt-3 no-underline font-sans text-sm leading-tight" v-if="item.description">
                {{ item.description }}
              </p>
            </div>
            <dl class="flex gap-5 mt-5 no-underline">
              <div class="flex flex-col-reverse">
                <dt class="font-sans font-light text-sm">{{ pluralize('Issue', item.open_issues) }}</dt>
                <dd class="font-bold">{{ Intl.NumberFormat('en-GB').format(item.open_issues) }}</dd>
              </div>
              <div class="flex flex-col-reverse">
                <dt class="font-sans font-light text-sm">{{ pluralize('Star', item.stargazers_count) }}</dt>
                <dd class="font-bold">{{ Intl.NumberFormat('en-GB').format(item.stargazers_count) }}</dd>
              </div>
              <div class="flex flex-col-reverse">
                <dt class="font-sans font-light text-sm">{{ pluralize('Fork', item.forks) }}</dt>
                <dd class="font-bold">{{ Intl.NumberFormat('en-GB').format(item.forks) }}</dd>
              </div>
            </dl>
          </div>
        </a>
      </li>
    </ul>
  </pw-section>
</template>

<style scoped>
.stars-list-link__description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stars-list-link {
  background-image: url('https://wolstenhol.me/proxy/cloudinary/image/upload/c_crop,f_auto,h_200,w_200,q_auto:eco/v1473712910/binding_dark_im2rpa.png');
  background-blend-mode: darken;
}
</style>
