<script>
import sortBy from 'lodash/sortBy';
const cloudinary = require('cloudinary').v2;

export default {
  data: {
    permalink(data) {
      const parts = [data.page.filePathStem];
      return `${parts.join('.')}.html`;
    },
    layout: 'page',
    title: 'Work',
    seo: {
      description: `A portfolio of things that I've created or contributed to over the years`,
      changeFreq: 'monthly',
    },
    eleventyNavigation: { key: 'work' },
  },
  methods: {
    urlToHostname(url) {
      return new URL(url).hostname;
    },
  },
  computed: {
    sortedItems() {
      return sortBy(this.collections.work, ['data.weight', 'data.name']);
    },
  },
};
</script>

<template>
  <article>
    <h1 class="text-5xl xl:text-8xl bg-clip-text text-fill-transparent bg-binding-dark tracking-tight font-serif font-bold">{{ title }}</h1>
    <div class="font-serif mt-5 xl:mt-10 mb-10 xl:mb-12 space-y-5 text-xl xl:text-2xl leading-normal">
      <p class="highlight-links links-underline">
        I've helped design and build websites for <a href="#london-transport-museum">museums</a>, a
        <a href="#university-of-west-london">few</a> <a href="#manchester-metropolitan-university">different</a>
        <a href="#durham-university">universities</a> (3!), <a href="#london.gov.uk">regional</a> and
        <a href="#report-wreck-material">national</a> government, the <a href="#co-op-delivery">Co-op[erative]</a>, as well as the odd
        <a href="#project-nelson">aircraft carrier</a>…
      </p>
      <p>I enjoy producing modern, fast-performing sites that don't lose sight of the importance of accessibility and maintainability.</p>
    </div>
    <h2 class="font-serif font-bold text-3xl xl:text-5xl mb-4 xl:mb-5">Some things I've contributed to</h2>
    <p class="mt-3 xl:mt-6 mb-8 xl:mb-10">A randomised/shuffled list of things I've worked on either currently, or in the past.</p>
    <ul class="space-y-14 md:space-y-20">
      <li
        tabindex="-1"
        class="card--portfolio transition-transform"
        v-for="(item, index) in this.sortedItems"
        :id="slug(item.data.name)"
        v-bind:key="index"
      >
        <div class="flex flex-col md:grid grid-cols-2 gap-10">
          <div :class="index % 2 !== 0 && `col-start-2`">
            <div class="grid">
              <div
                class="work-card__image-bg -rotate-3 col-start-1 rounded-2xl row-start-1 transform"
                :style="item.data.color && `--brand-colour: ${item.data.color}`"
              ></div>

              <a class="relative col-start-1 row-start-1" v-if="item.data.url && !item.data.prevent_link" :href="item.data.url">
                <img
                  :src="`https://res.cloudinary.com/wolstenh/image/upload/c_scale,w_560,f_auto,q_auto/${item.data.cloudinarySuffix}`"
                  :srcset="`https://res.cloudinary.com/wolstenh/image/upload/c_scale,w_560,f_auto,q_auto/${item.data.cloudinarySuffix} 1x, https://res.cloudinary.com/wolstenh/image/upload/c_scale,w_1120,f_auto,q_auto/${item.data.cloudinarySuffix} 2x`"
                  width="548"
                  height="344"
                  :loading="index > 0 ? 'lazy' : 'eager'"
                  :alt="`${urlToHostname(item.data.url)} screenshot`"
                  class="bg-white border-2 border-white object-cover object-top rounded-2xl screenshot shadow-hard"
                />
              </a>
              <img
                v-else
                :src="`https://res.cloudinary.com/wolstenh/image/upload/c_scale,w_560,f_auto,q_auto/${item.data.cloudinarySuffix}`"
                :srcset="`https://res.cloudinary.com/wolstenh/image/upload/c_scale,w_560,f_auto,q_auto/${item.data.cloudinarySuffix} 1x, https://res.cloudinary.com/wolstenh/image/upload/c_scale,w_1120,f_auto,q_auto/${item.data.cloudinarySuffix} 2x`"
                width="548"
                height="344"
                :loading="index > 0 ? 'lazy' : 'eager'"
                :alt="`${urlToHostname(item.data.url)} screenshot`"
                class="col-start-1 bg-white border-2 border-white object-cover object-top relative rounded-2xl row-start-1 screenshot shadow-hard"
              />
            </div>
          </div>
          <div :class="index % 2 !== 0 && `row-start-1 col-start-1`">
            <h3 class="font-serif font-bold text-2xl xl:text-4xl mb-4 xl:mb-5">{{ item.data.name }}</h3>
            <div class="prose links-underline" v-html="item.templateContent"></div>
            <!-- <div class="text-gray-700 uppercase font-light pt-2">
              <span v-for="(tag, index) in item.data.work_tags" v-bind:key="index"
                >{{ tag }}<template v-if="index != Object.keys(item.data.work_tags).length - 1">, </template>
              </span>
            </div> -->
          </div>
        </div>
      </li>
    </ul>
    <style v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </article>
</template>

<style>
.work-card__image-bg {
  background-color: var(--brand-colour, rgb(252, 211, 77));
}
</style>
