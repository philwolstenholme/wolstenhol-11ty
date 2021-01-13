<script>
import PwLede from './pw-lede.vue';
import PwCardTestimonial from './pw-card-testimonial.vue';
import PwCardTalk from './pw-card-talk.vue';
import PwHorizontalScroller from './pw-horizontal-scroller.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwSimpleScroller from './pw-simple-scroller.vue';
import PwSimpleScrollerItem from './pw-simple-scroller-item.vue';

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
  },
};
</script>

<template>
  <section data-section="speaking">
    <pw-section-heading title="Speaking" icon="chalkboardTeacher" />
    <pw-lede class="mt-3">Talks I've given at conferences or other events. I'll link to slides or videos where they are available.</pw-lede>
    <pw-simple-scroller class="mt-5 items-1 md:items-2 xl:items-3" theme="testimonial">
      <pw-simple-scroller-item>
        <pw-card-talk
          href="https://www.youtube.com/watch?v=MYY1teFZ_Fk"
          event="DrupalCon Europe 2020"
          talk="Write Better CSS by Stopping Writing Any More CSS! (Tailwind)"
          image="https://res.cloudinary.com/wolstenh/image/upload/c_fill,f_auto,g_center,h_306,q_auto:good,w_544,y_0/v1610202401/one-offs/EoyOVx4XMAEHdx_.jpg"
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
          image="https://res.cloudinary.com/wolstenh/image/fetch/c_lfill,f_auto,g_face,h_306,w_544,q_auto:good/https://img.youtube.com/vi/TBLlwvM_uPc/maxresdefault.jpg"
          href="https://www.youtube.com/watch?v=TBLlwvM_uPc"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item fit-to-grid>
        <pw-card-testimonial class="h-full">
          <template v-slot:blockquote
            >Brilliant talk. If this guy made a 10 hour series on Drupal &amp; Vue development I'd watch it ASAP.</template
          >
          <template v-slot:figcaption>
            <a href="https://www.youtube.com/watch?v=TBLlwvM_uPc" class="hocus:underline">a YouTube commenter on my DrupalCon 2019 video</a>
          </template>
        </pw-card-testimonial>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG"
          talk="Let's go on a Contrib module safari!"
          image="https://res.cloudinary.com/wolstenh/image/fetch/c_crop,g_xy_center,h_306,w_544,x_557,y_522,q_auto:good/https://pbs.twimg.com/media/EQhHVx7XYAALhh-%3Fformat%3Djpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG Unconference 2019"
          talk="Progressive decoupling with Vue and Drupal"
          image="https://res.cloudinary.com/wolstenh/image/upload/c_scale,f_auto,h_306,q_auto:good/v1609337202/one-offs/EGqx-wNX4AEZ7ZM.jpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG"
          talk="Pattern Lab, Tailwind, and Vue (or the time I tried to cover three talks in one… 😬)"
          image="https://res.cloudinary.com/wolstenh/image/fetch/c_lfill,f_auto,g_face,h_306,w_544,q_auto:good/v1609338082/https://pbs.twimg.com/media/D8zLonEWsAAyfqy%3Fformat=jpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="VueJS Manchester Community"
          talk="Vue at the Royal Navy"
          image="https://res.cloudinary.com/wolstenh/image/upload/c_scale,f_auto,h_306,q_auto:good/v1609271232/one-offs/vuejs-manchester-navy.jpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG Unconference 2018"
          talk="How to write better CSS by stopping writing CSS"
          image="https://res.cloudinary.com/wolstenh/image/fetch/c_lfill,f_auto,g_face,h_306,w_544,q_auto:good/v1609338082/https://pbs.twimg.com/media/DrE8EgyWkAIXaEs%3Fformat=jpg"
        ></pw-card-talk>
      </pw-simple-scroller-item>
      <pw-simple-scroller-item>
        <pw-card-talk
          event="NWDUG Unconference 2017"
          talk="Performance Optimisation for the Rich and Famous"
          image="https://res.cloudinary.com/wolstenh/image/upload/c_scale,f_auto,h_306,q_auto:good/v1609337202/one-offs/IMG_20171104_112942_1.webp"
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
          image="https://res.cloudinary.com/wolstenh/image/fetch/c_lfill,f_auto,g_face,h_306,w_544,q_auto:good/https://i3.ytimg.com/vi/CJgtt1XGtkU/maxresdefault.jpg"
          href="https://www.youtube.com/watch?v=oX7iCufDiHM"
        ></pw-card-talk>
      </pw-simple-scroller-item>
    </pw-simple-scroller>
  </section>
</template>
