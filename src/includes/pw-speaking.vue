<script>
import PwLede from './pw-lede.vue';
import PwCardTestimonial from './pw-card-testimonial.vue';
import PwCardTalk from './pw-card-talk.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwSimpleScroller from './pw-simple-scroller.vue';
import PwSimpleScrollerItem from './pw-simple-scroller-item.vue';
import PwSection from './pw-section.vue';

export default {
  props: {
    posts: {
      type: Object,
    },
  },
  components: {
    PwLede,
    PwSectionHeading,
    PwCardTestimonial,
    PwCardTalk,
    PwSimpleScroller,
    PwSimpleScrollerItem,
    PwSection,
  },
};
</script>

<template>
  <pw-section section-key="speaking">
    <pw-section-heading title="Speaking" icon="chalkboardTeacher" section="speaking" />
    <pw-lede class="mt-3">Talks I've given at conferences or other events. I'll link to slides or videos where they are available.</pw-lede>
    <pw-simple-scroller
      class="items-1 md:items-2 xl:items-3 mt-12"
      theme="speaking"
      label="Public speaking that I've done"
      :allElementsEqualHeight="true"
    >
      <pw-simple-scroller-item>
        <pw-card-talk
          event="McrFRED"
          talk="Performance tips, tricks, and hacks I learnt from my over-engineered personal site"
          image="https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill,f_auto,g_center,w_272,h_153,q_auto,y_0/v1666475523/one-offs/1666298366856.jpg"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill,f_auto,g_center,w_544,h_306,q_auto,y_0/v1666475523/one-offs/1666298366856.jpg 2x"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item fit-to-grid>
        <pw-card-testimonial class="h-full">
          <template v-slot:blockquote>Honestly fantastic! It has really inspired me to work on my personal site again</template>
          <template v-slot:figcaption>
            <a href="https://twitter.com/KatieARaby" class="hocus:underline">Katie Raby</a>
          </template>
        </pw-card-testimonial>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          href="https://www.youtube.com/watch?v=MYY1teFZ_Fk"
          event="DrupalCon Europe 2020"
          talk="Write Better CSS by Stopping Writing Any More CSS! Utility-first with Tailwind"
          image="https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill,f_auto,g_center,w_272,h_153,q_auto,y_0/v1610202401/one-offs/EoyOVx4XMAEHdx_.jpg"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill,f_auto,g_center,w_544,h_306,q_auto,y_0/v1610202401/one-offs/EoyOVx4XMAEHdx_.jpg 2x"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item fit-to-grid>
        <pw-card-testimonial class="h-full">
          <template v-slot:blockquote>Phil Wolstenholme gave an insightful and well thought out presentation.</template>
          <template v-slot:figcaption>
            <a href="https://www.amazeelabs.com/en/journal/drupalcon-europe-2020-recap" class="hocus:underline"
              >Daniel Lemon, Amazee Labs</a
            >
          </template>
        </pw-card-testimonial>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="DrupalCon Europe 2019"
          talk="Progressive decoupling with Vue and Drupal"
          image="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_fill,f_auto,g_face,w_272,h_153,q_auto/https://img.youtube.com/vi/TBLlwvM_uPc/maxresdefault.jpg"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_fill,f_auto,g_face,w_544,h_306,q_auto/https://img.youtube.com/vi/TBLlwvM_uPc/maxresdefault.jpg 2x"
          href="https://www.youtube.com/watch?v=TBLlwvM_uPc"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item fit-to-grid>
        <pw-card-testimonial class="h-full">
          <template v-slot:blockquote>Stunning talk – those tips on Twig syntax gotchas were worth it alone. Many 'thank you's!</template>
          <template v-slot:figcaption>
            <a href="https://www.youtube.com/watch?v=TBLlwvM_uPc" class="hocus:underline">Jack Garratt on YouTube</a>
          </template>
        </pw-card-testimonial>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item fit-to-grid>
        <pw-card-testimonial class="h-full">
          <template v-slot:blockquote
            >Brilliant talk. If this guy made a 10 hour series on Drupal &amp; Vue development I'd watch it ASAP.</template
          >
          <template v-slot:figcaption>
            <a href="https://www.youtube.com/watch?v=TBLlwvM_uPc" class="hocus:underline">'just another human' on YouTube</a>
          </template>
        </pw-card-testimonial>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG"
          talk="Let's go on a Contrib module safari!"
          image="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_crop,g_xy_center,w_272,h_153,x_557,y_522,q_auto/https://pbs.twimg.com/media/EQhHVx7XYAALhh-%3Fformat%3Djpg"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_crop,g_xy_center,w_544,h_306,x_557,y_522,q_auto/https://pbs.twimg.com/media/EQhHVx7XYAALhh-%3Fformat%3Djpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG Unconference 2019"
          talk="Progressive decoupling with Vue and Drupal"
          image="https://wolstenhol.me/proxy/cloudinary/image/upload/c_scale,f_auto,w_272,h_153,q_auto/v1609337202/one-offs/EGqx-wNX4AEZ7ZM.jpg"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/upload/c_scale,f_auto,w_544,h_306,q_auto/v1609337202/one-offs/EGqx-wNX4AEZ7ZM.jpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG"
          talk="Pattern Lab, Tailwind, and Vue (or the time I tried to cover three talks in one… 😬)"
          image="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,w_272,h_153,q_auto/v1609338082/https://pbs.twimg.com/media/D8zLonEWsAAyfqy%3Fformat=jpg"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,w_544,h_306,q_auto/v1609338082/https://pbs.twimg.com/media/D8zLonEWsAAyfqy%3Fformat=jpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="VueJS Manchester Community"
          talk="Vue at the Royal Navy"
          href="https://twitter.com/vuejsmcr/status/1037036688491638784"
          image="https://wolstenhol.me/proxy/cloudinary/image/upload/c_scale,f_auto,w_272,h_153,q_auto/v1609271232/one-offs/vuejs-manchester-navy.jpg"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/upload/c_scale,f_auto,w_544,h_306,q_auto/v1609271232/one-offs/vuejs-manchester-navy.jpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG Unconference 2018"
          talk="How to write better CSS by stopping writing CSS"
          image="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,w_272,h_153,q_auto/v1609338082/https://pbs.twimg.com/media/DrE8EgyWkAIXaEs%3Fformat=jpg"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,w_544,h_306,q_auto/v1609338082/https://pbs.twimg.com/media/DrE8EgyWkAIXaEs%3Fformat=jpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG Unconference 2017"
          talk="Performance Optimisation for the Rich and Famous"
          image="https://wolstenhol.me/proxy/cloudinary/image/upload/c_scale,f_auto,h_153,q_auto/v1609337202/one-offs/IMG_20171104_112942_1.webp"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/upload/c_scale,f_auto,h_306,q_auto/v1609337202/one-offs/IMG_20171104_112942_1.webp"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item fit-to-grid>
        <pw-card-testimonial class="h-full">
          <template v-slot:blockquote>Phil normally delivers really good talks, and this was no exception.</template>
          <template v-slot:figcaption>
            <a href="https://www.hashbangcode.com/article/nwdug-unconference-2017-review" class="hocus:underline">Phil Norton</a>
          </template>
        </pw-card-testimonial>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="DrupalCamp London 2017"
          talk="A New Era of Accessibility with Drupal 8"
          image="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,w_272,h_153,q_auto/https://i3.ytimg.com/vi/CJgtt1XGtkU/maxresdefault.jpg"
          srcset="https://wolstenhol.me/proxy/cloudinary/image/fetch/c_lfill,f_auto,g_face,w_544,h_306,q_auto/https://i3.ytimg.com/vi/CJgtt1XGtkU/maxresdefault.jpg"
          href="https://www.youtube.com/watch?v=oX7iCufDiHM"
        ></pw-card-talk>
      </pw-simple-scroller-item>
    </pw-simple-scroller>
  </pw-section>
</template>
