<template>
  <article>
    <h1 class="text-fill-transparent bg-binding-dark bg-clip-text font-serif text-5xl font-bold tracking-tight xl:text-8xl">{{ title }}</h1>
    <div class="mt-5 mb-10 space-y-5 font-serif text-xl leading-normal xl:mt-10 xl:mb-12 xl:text-2xl">
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
