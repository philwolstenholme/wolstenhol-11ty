<template>
  <article>
    <h1 class="text-fill-transparent bg-binding-dark bg-clip-text font-serif text-5xl font-bold tracking-tight xl:text-8xl">{{ title }}</h1>
    <div class="mt-5 mb-10 space-y-5 font-serif text-xl leading-normal xl:mt-10 xl:mb-12 xl:text-2xl">
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
      size: 30,
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
