<template>
  <article>
    <h1 class="text-5xl xl:text-8xl bg-clip-text text-fill-transparent bg-binding-dark tracking-tight font-serif font-bold">{{ title }}</h1>
    <div class="font-serif mt-5 xl:mt-10 mb-10 xl:mb-12 space-y-5 text-xl xl:text-2xl leading-normal">
      <p class="mt-3">
        You can send me a
        <a href="https://twitter.com/messages/compose?recipient_id=38276082" class="underline">direct message on Twitter</a> or drop me an
        email via this contact form (all fields are required).
      </p>
    </div>
    <PwContact></PwContact>
    <style v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </article>
</template>

<script>
import PwContact from './includes/pw-contact.vue';
export default {
  data: {
    permalink(data) {
      const parts = [data.page.filePathStem];
      return `${parts.join('.')}.html`;
    },
    layout: 'page',
    title: 'Contact me',
    seo: {
      description: `Drop me a line on here or via Twitter`,
    },
    eleventyNavigation: { key: 'contact' },
  },
  components: { PwContact },
};
</script>
