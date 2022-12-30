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
    <ul role="list" class="grid gap-5 pb-2 md:grid-cols-2 xl:grid-cols-3">
      <li class="stars-list__item flex min-w-0" v-for="(item, index) in stars" :key="index">
        <a
          :href="item.html_url"
          class="stars-list-link contain-content group relative min-w-0 flex-1 items-baseline rounded border border-gray-300 border-black bg-gray-900 p-4 font-serif text-white shadow-hard hocus:bg-black"
        >
          <div class="isolate flex h-full flex-col">
            <div class="flex-1">
              <img
                :src="`https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,h_50,w_50,q_auto,fl_progressive/${item.owner.avatar_url}`"
                :srcset="`https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,h_100,w_100,q_auto,fl_progressive/${item.owner.avatar_url} 2x`"
                :alt="item.owner.login"
                class="w-15 h-15 float-right ml-3 mb-3 block rounded-full bg-white"
                :loading="index > 7 ? 'lazy' : null"
                width="50"
                height="50"
              />
              <h2 class="text-lg leading-tight group-hocus:underline">
                {{ item.owner.login }}/<span class="font-bold">{{ item.name }}</span>
              </h2>
              <p class="stars-list-link__description mt-3 font-sans text-sm leading-tight no-underline" v-if="item.description">
                {{ item.description }}
              </p>
            </div>
            <dl class="mt-5 flex gap-5 no-underline">
              <div class="flex flex-col-reverse">
                <dt class="font-sans text-sm font-light">{{ pluralize('Issue', item.open_issues) }}</dt>
                <dd class="font-bold">{{ Intl.NumberFormat('en-GB').format(item.open_issues) }}</dd>
              </div>
              <div class="flex flex-col-reverse">
                <dt class="font-sans text-sm font-light">{{ pluralize('Star', item.stargazers_count) }}</dt>
                <dd class="font-bold">{{ Intl.NumberFormat('en-GB').format(item.stargazers_count) }}</dd>
              </div>
              <div class="flex flex-col-reverse">
                <dt class="font-sans text-sm font-light">{{ pluralize('Fork', item.forks) }}</dt>
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
.stars-list-link {
  content-visibility: auto;
  contain-intrinsic-height: 185px;
}

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
