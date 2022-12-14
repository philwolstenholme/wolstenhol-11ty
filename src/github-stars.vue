<template>
  <article>
    <h1 class="text-5xl xl:text-8xl bg-clip-text text-fill-transparent bg-binding-dark tracking-tight font-serif font-bold">{{ title }}</h1>
    <div class="font-serif mt-5 xl:mt-10 mb-10 xl:mb-12 space-y-5 text-xl xl:text-2xl leading-normal">
      <p>
        A recent selection of projects that I've
        <a href="https://github.com/philwolstenholme?tab=stars" class="underline">starred on GitHub</a>.
      </p>
      <p>
        This page is part for me to big up the work of great projects, and part to serve as a personal bookmark of repos I find interesting
        and might want to check out or use later.
      </p>
    </div>
    <!-- <PwGitHubStars :stars="pagination.items"></PwGitHubStars> -->

    <p>This is page {{ pagination.pageNumber }}</p>

    <nav aria-labelledby="pagination-desc">
      <h2 id="pagination-desc" class="sr-only">Pagination</h2>
      <ul class="flex flex-wrap justify-center highlight-links gap-8 text-3xl font-bold mt-8 xl:mt-12">
        <li v-if="pagination.href.first">
          <a class="underline p-4" :href="pagination.href.first.replace(/\.html$/, '')">First</a>
        </li>
        <li v-if="pagination.href.previous">
          <a class="underline p-4" :href="pagination.href.previous.replace(/\.html$/, '')">Previous</a>
        </li>
        <li v-if="pagination.href.next"><a class="underline p-4" :href="pagination.href.next.replace(/\.html$/, '')">Next</a></li>
        <li v-if="pagination.href.last">
          <a class="underline p-4" :href="pagination.href.last.replace(/\.html$/, '')">Last</a>
        </li>
      </ul>
    </nav>

    <pre>{{ JSON.stringify(pagination.href, null, 2) }}</pre>

    <style v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </article>
</template>

<script>
import PwGitHubStars from './includes/pw-git-hub-stars.vue';
export default {
  data: {
    layout: 'page',
    title: 'Github stars',
    seo: {
      description: `Partly for me to big up great projects, and partly as a set of things to check out later.`,
      changeFreq: 'weekly',
    },
    // eleventyNavigation: { key: 'github-stars' },
    pagination: {
      data: 'githubStars',
      size: 15,
    },
    permalink(data) {
      const parts = [data.page.filePathStem];
      const pageNumber = data.pagination.pageNumber + 1;

      if (pageNumber === 1) {
        return `${parts.join('.')}/index.html`;
      }

      return `${parts.join('.')}/${pageNumber}.html`;
    },
  },
  components: { PwGitHubStars },
};
</script>
