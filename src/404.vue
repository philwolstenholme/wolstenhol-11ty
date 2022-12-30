<template>
  <article>
    <h1 class="text-fill-transparent bg-binding-dark bg-clip-text font-serif text-5xl font-bold tracking-tight xl:text-8xl">{{ title }}</h1>
    <div class="links-underline mt-5 mb-10 space-y-5 font-serif text-xl leading-normal xl:mt-10 xl:mb-12 xl:text-2xl">
      <p>Looks like someone got a link wrong somewhere, or you got a URL wrong. Sorry about that.</p>
      <p>
        If it looks like I broke something and you'd like to let me know about it then you can get in touch on my
        <a href="/contact">contact page</a>.
      </p>
      <p>Otherwise, try a link from the main menu up at the top of the page.</p>
    </div>
    <style v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </article>
</template>

<script>
export default {
  data: {
    eleventyExcludeFromCollections: true,
    permalink(data) {
      const parts = [data.page.filePathStem];
      return `${parts.join('.')}.html`;
    },
    layout: 'page',
    title: 'Uh oh… 404',
  },
};
</script>
