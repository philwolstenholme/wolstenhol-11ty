<template>
  <article>
    <h1 class="text-5xl xl:text-8xl bg-clip-text text-fill-transparent bg-binding-dark tracking-tight font-serif font-bold">{{ title }}</h1>
    <div class="font-serif mt-5 xl:mt-10 mb-10 xl:mb-12 space-y-5 text-xl xl:text-2xl leading-normal">
      <p>A portfolio of things that I've created or contributed to over the years.</p>
    </div>
    <ul class="space-y-14 md:space-y-20">
      <li>
        <div class="flex flex-col md:grid grid-cols-2 gap-10">
          <div class="grid">
            <div class="-rotate-3 col-start-1 rounded-2xl row-start-1 transform" style="background-color: #e7135d"></div>
            <img
              src="https://image.thum.io/get/auth/65395-8c22ef6c3090f8ea5a2c7744fccc8c28/noanimate/viewportWidth/1440/width/1440/https://www.london.gov.uk"
              alt=""
              class="col-start-1 object-cover object-top relative rounded-2xl row-start-1 screenshot shadow-hard"
              style="aspect-ratio: 16/9"
            />
          </div>
          <div>
            <h2 class="font-serif font-bold text-2xl xl:text-4xl mb-4 xl:mb-5">London.gov.uk</h2>
            <p>London.gov.uk is the official website of the Mayor of London.</p>
          </div>
        </div>
      </li>
      <!-- use this one as the component: -->
      <li>
        <div class="flex flex-col md:grid grid-cols-2 gap-10">
          <div class="col-start-2">
            <div class="grid">
              <div class="-rotate-3 col-start-1 rounded-2xl row-start-1 transform" style="background-color: #d20076"></div>
              <img
                src="https://image.thum.io/get/auth/65395-8c22ef6c3090f8ea5a2c7744fccc8c28/noanimate/viewportWidth/1440/width/1440/https://www.ltmuseum.co.uk"
                alt=""
                class="col-start-1 object-cover object-top relative rounded-2xl row-start-1 screenshot shadow-hard"
                style="aspect-ratio: 16/9"
              />
            </div>
          </div>
          <div class="row-start-1 col-start-1">
            <h2 class="font-serif font-bold text-2xl xl:text-4xl mb-4 xl:mb-5">London Transport Museum</h2>
            <p>
              London Transport Museum is a museum in Covent Garden, London, England, which is dedicated to the history of transport in
              London.
            </p>
          </div>
        </div>
      </li>
      <li>
        <div class="flex flex-col md:grid grid-cols-2 gap-10">
          <div class="grid">
            <div class="-rotate-3 col-start-1 rounded-2xl row-start-1 transform" style="background-color: #03b0e7"></div>
            <img
              src="https://image.thum.io/get/auth/65395-8c22ef6c3090f8ea5a2c7744fccc8c28/noanimate/viewportWidth/1440/width/1440/https://shop.coop.co.uk"
              alt=""
              class="col-start-1 object-cover object-top relative rounded-2xl row-start-1 screenshot shadow-hard"
              style="aspect-ratio: 16/9"
            />
          </div>
          <div>
            <h2 class="font-serif font-bold text-2xl xl:text-4xl mb-4 xl:mb-5">Co-op delivery</h2>
            <p>Shop.coop.co.uk is the home delivery service for Co-op.</p>
          </div>
        </div>
      </li>
      <li>
        <div class="flex flex-col md:grid grid-cols-2 gap-10">
          <div class="col-start-2 grid">
            <div class="-rotate-3 col-start-1 rounded-2xl row-start-1 transform" style="background-color: #68246d"></div>
            <img
              src="https://image.thum.io/get/auth/65395-8c22ef6c3090f8ea5a2c7744fccc8c28/noanimate/viewportWidth/1440/width/1440/https://www.durham.ac.uk"
              alt=""
              class="col-start-1 object-cover object-top relative rounded-2xl row-start-1 screenshot shadow-hard"
              style="aspect-ratio: 16/9"
            />
          </div>
          <div class="row-start-1 col-start-1">
            <h2 class="font-serif font-bold text-2xl xl:text-4xl mb-4 xl:mb-5">Durham University</h2>
            <p>Durham University is a collegiate public research university in Durham, North East England.</p>
          </div>
        </div>
      </li>
    </ul>
    <style v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </article>
</template>

<script>
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
};
</script>
