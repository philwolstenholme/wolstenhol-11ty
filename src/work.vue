<script>
import shuffle from 'lodash/shuffle';
const filenamifyUrl = require('filenamify-url');
import PwLede from './includes/pw-lede.vue';
import PwSectionHeading from './includes/pw-section-heading.vue';
import PwSection from './includes/pw-section.vue';

export default {
  data: {
    layout: 'base',
    title: 'Work',
    eleventyNavigation: { key: 'Work' },
  },
  computed: {
    shuffledItems() {
      return shuffle(this.collections.workItems);
    },
  },
  methods: {
    urlToFilename(url) {
      return filenamifyUrl(url, { replacement: '-' });
    },
  },
  components: {
    PwLede,
    PwSectionHeading,
    PwSection,
  },
};
</script>

<template>
  <pw-section section-key="work" class="-mb-3">
    <pw-section-heading class="mt-8" title="Work" icon="briefcase" section="work" />
    <pw-lede class="mt-3">Some projects I particularly enjoyed working on</pw-lede>
    <div class="mt-12 pb-3 with-sidebar overflow-visible">
      <div>
        <aside>
          <div class="sticky top-20 space-y-5 underline-links leading-relaxed">
            <p class="text-sm">
              I work as a Principal Developer helping put together Drupal and other sorts of websites and apps for
              <a href="http://www.ctidigital.com">CTI Digital</a> in Manchester.
            </p>
            <p class="highlight-links font-bold">
              I've helped design and build websites for <a href="#london-transport-museum">museums</a>, a
              <a href="#university-of-west-london">few</a> different <a href="#durham-university">universities</a>,
              <a href="#london.gov.uk">regional</a> and <a href="#droits">national</a> government, as well as the odd
              <a href="#project-nelson">aircraft carrier</a>…
            </p>
            <p class="text-sm">
              As Principal Developer, I use my deep knowledge of Drupal and frontend development to influence the direction of CTI's Drupal
              team by identifying, testing, and championing emerging technologies. My work on our Voyager Drupal accelerator has been used
              on all of CTI's Drupal new-builds since 2018.
            </p>
            <p class="text-sm">
              I enjoy producing modern, fast-performing sites that don't lose sight of the importance of accessibility and maintainability.
            </p>
          </div>
        </aside>
        <main class="grid gap-8" style="grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr))">
          <div
            v-for="(item, index) in shuffledItems"
            :id="slug(item.data.name)"
            v-bind:key="index"
            class="card--portfolio flex flex-col relative overflow-hidden shadow-hard rounded bg-white cursor-pointer transition-transform duration-75"
          >
            <div style="aspect-ratio: 16/9" class="absolute shadow-inner w-full"></div>
            <img
              :src="`/assets/images/screenshots/${urlToFilename(item.data.url)}.png`"
              width="1280"
              height="960"
              class="bg-black object-cover object-top"
              style="aspect-ratio: 16/9"
              loading="lazy"
              decoding="async"
            />
            <div class="flex-1 flex flex-col p-4 space-y-2 bg-gradient-to-tl from-white to-gray-100">
              <h2 class="flex items-center flex-wrap gap-2 font-bold text-xl font-serif">
                <img :src="item.data.favicon || `${item.data.url}/favicon.ico`" loading="lazy" class="icon top-0" height="20" width="20" />
                {{ item.data.name }}
              </h2>
              <a :href="item.data.url" class="font-mono text-xs block truncate">{{ item.data.url }}</a>
              <div class="text-sm links-underline flex-1" v-html="item.templateContent"></div>
              <div class="text-sm text-gray-700 uppercase font-light pt-2">
                <span v-for="(tag, index) in item.data.tags" v-bind:key="index"
                  >{{ tag }}<template v-if="index != Object.keys(item.data.tags).length - 1">, </template>
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <style v-if="!build.noCss" v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </pw-section>
</template>

<style>
.with-sidebar {
  overflow: hidden;
}

.with-sidebar > * {
  display: flex;
  flex-wrap: wrap;
  margin: calc(2em / 2 * -1);
}

.with-sidebar > * > * {
  margin: calc(2em / 2);
  flex-basis: 250px;
  flex-grow: 1;
}

.with-sidebar > * > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-width: calc(70% - 2em);
}

.card--portfolio:target {
  --tw-ring-opacity: 1 !important;
  --tw-ring-color: rgba(251, 191, 36, var(--tw-ring-opacity)) !important;
  --tw-ring-offset-width: 2px !important;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color) !important;
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;
  transform: scale(1.03);
}
</style>
