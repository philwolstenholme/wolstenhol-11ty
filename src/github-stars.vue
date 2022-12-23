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
    <PwGitHubStars :stars="this.posts"></PwGitHubStars>

    <style v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </article>
</template>

<script>
import PwGitHubStars from './includes/pw-git-hub-stars.vue';
export default {
  data: {
    // permalink(data) {
    //   const parts = [data.page.filePathStem];
    //   return `${parts.join('.')}.html`;
    // },
    pagination: {
      data: 'githubStars',
      size: 12,
      alias: 'posts',
    },
    layout: 'page',
    title: 'Github stars',
    seo: {
      description: `Partly for me to big up great projects, and partly as a set of things to check out later.`,
      changeFreq: 'weekly',
    },
    eleventyNavigation: { key: 'github-stars' },
  },
  components: { PwGitHubStars },
};
</script>
