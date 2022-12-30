<template>
  <article>
    <h1 class="text-fill-transparent bg-binding-dark bg-clip-text font-serif text-5xl font-bold tracking-tight xl:text-8xl">{{ title }}</h1>

    <div class="mt-5 mb-10 xl:mt-10 xl:mb-12">
      <ul class="grid grid-cols-3 gap-5">
        <li v-for="(post, key) in this.medium" :key="key">
          <a :href="`/og?title=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.url)}&type=blog%20post`" download>
            <img
              :src="`/og?title=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.url)}&type=blog%20post`"
              alt=""
              loading="lazy"
              width="1200"
              height="630"
            />
          </a>
        </li>
      </ul>
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
    title: 'Blog post OG images',
    seo: {
      description: `What are you doing here?! Shoo!`,
    },
  },
};
</script>
