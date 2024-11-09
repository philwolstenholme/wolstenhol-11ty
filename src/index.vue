<template>
  <article>
    <div class="space-y-14">
      <div class="space-y-3">
        <h2 class="font-serif text-4xl font-bold">Meanwhile, elsewhere on the internet…</h2>
        <pw-lede>
          Tweets from Twitter, blog posts from DEV/Medium, talks from YouTube and beyond, photos from Instagram, music from Spotify, and
          nice places from Foursquare (lol, I know, but I've built the API integration now so Foursquare lives on on this website!).
        </pw-lede>
      </div>

      <pw-words :posts="this.medium"></pw-words>

      <pw-reading :reading="this.reading"></pw-reading>

      <pw-speaking></pw-speaking>

      <pw-music v-if="this.spotify.artists" :artists="this.spotify.artists" :genres="this.spotify.randomGenres"></pw-music>

      <pw-photos v-if="this.instagram" :photos="this.instagram"></pw-photos>

      <pw-tweets v-if="this.twitter || this.mastodon" :tweets="this.twitter" :toots="this.mastodon"></pw-tweets>

      <pw-places v-if="this.foursquare" :places="this.foursquare"></pw-places>
    </div>

    <pw-lightbox></pw-lightbox>
    <style v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </article>
</template>

<script>
import PwLede from './includes/pw-lede.vue';
import PwSectionHeading from './includes/pw-section-heading.vue';
import PwWords from './includes/pw-words.vue';
import PwSpeaking from './includes/pw-speaking.vue';
import PwCardTestimonial from './includes/pw-card-testimonial.vue';
import PwCardTalk from './includes/pw-card-talk.vue';
import Icon from './includes/icon.vue';
import PwPlaces from './includes/pw-places.vue';
import PwMusic from './includes/pw-music.vue';
import PwPhotos from './includes/pw-photos.vue';
import PwReading from './includes/pw-reading.vue';
import PwLightbox from './includes/pw-lightbox.vue';

export default {
  data: {
    permalink(data) {
      const parts = [data.page.filePathStem];
      return `${parts.join('.')}.html`;
    },
    layout: 'homepage',
    layout: 'base',
    title: 'Phil Wolstenholme',
    seo: {
      title: `Phil Wolstenholme's personal website, blog and portfolio`,
      changeFreq: 'daily',
    },
    eleventyNavigation: { key: 'Home' },
  },
  components: {
    PwLede,
    PwSectionHeading,
    PwWords,
    PwSpeaking,
    PwCardTestimonial,
    PwCardTalk,
    Icon,
    PwPlaces,
    PwMusic,
    PwPhotos,
    PwReading,
    PwLightbox,
  },
};
</script>
