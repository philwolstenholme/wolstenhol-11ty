<template>
  <div class="space-y-14">
    <div class="space-y-3">
      <h1 class="font-serif font-bold text-4xl">Meanwhile, elsewhere on the internet…</h1>
      <pw-lede>
        Tweets from Twitter, blog posts from Medium, talks from YouTube and beyond, photos from Instagram, music from Last.fm &amp; Spotify,
        and nice places from Foursquare
      </pw-lede>
    </div>

    <pw-words :posts="this.medium['payload']['references']['Post']"></pw-words>

    <pw-speaking></pw-speaking>

    <pw-music v-if="this.spotify.artists" :artists="this.spotify.artists" :genres="this.spotify.randomGenres"></pw-music>

    <pw-photos v-if="this.instagram" :photos="this.instagram"></pw-photos>

    <pw-places v-if="this.foursquare.response.venues.items" :places="this.foursquare.response.venues.items"></pw-places>

    <pw-tweets v-if="this.twitter" :tweets="this.twitter"></pw-tweets>

    <pw-contact></pw-contact>

    <style v-html="this.getVueComponentCssForPage(this.page.url)"></style>
  </div>
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
import PwTweets from './includes/pw-tweets.vue';
import PwContact from './includes/pw-contact.vue';
import PwMusic from './includes/pw-music.vue';
import PwPhotos from './includes/pw-photos.vue';

export default {
  data: {
    layout: 'homepage',
    title: 'Welcome',
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
    PwTweets,
    PwContact,
    PwMusic,
    PwPhotos,
  },
};
</script>
