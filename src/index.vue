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

    <section data-section="music" class="space-y-3">
      <pw-section-heading title="Music" icon="headphones" />
      <pw-lede
        >What I've been listening to recently, via Last.fm and Spotify. Click an artist to hear a preview of their
        music<sup>*</sup>.</pw-lede
      >
      <small class="text-xs uppercase font-serif"
        ><sup>*</sup>If the Spotify API contains a preview clip – some artists seem to have opted out of this.</small
      >
    </section>

    <section data-section="photos" class="space-y-3">
      <pw-section-heading title="Photos" icon="cameraRetro" />
      <pw-lede>Photos and videos from Instagram.</pw-lede>
    </section>

    <section data-section="tweets" class="space-y-3">
      <pw-section-heading title="Tweets" icon="twitter" />
      <pw-lede>Tweets by me, <a href="https://twitter.com/intent/user?user_id=38276082" class="font-bold">@philw_</a>.</pw-lede>
    </section>

    <section data-section="places" class="space-y-3">
      <pw-section-heading title="Places" icon="mapMarkerAlt" />
      <pw-lede>Nice places.</pw-lede>
    </section>

    <section data-section="contact">
      <pw-section-heading title="Contact" icon="envelope" />
      <pw-lede class="mt-3">Get in touch</pw-lede>
      <p class="mt-3">
        You can send me a
        <a href="https://twitter.com/messages/compose?recipient_id=38276082" class="underline">direct message on Twitter</a> or drop me an
        email via this contact form (all fields are required).
      </p>
      <!--
        @TODO MAKE IT SUBMIT WITH JS: https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget/#progressive-enhancement-with-javascript
      -->
      <div
        x-data="{
        submitted: false,
        error: null,
        submitForm($refs) {
          const data = new FormData($refs.form)
          data.append('form-name', $refs.form.getAttribute('name'));
          fetch('/', {
            method: 'POST',
            body: data,
          })
          .then(response => {
            if (!response.ok) {
              return Promise.reject({
                status: response.status,
                statusText: response.statusText,
                url: response.url,
              })
            }
            return response;
          })
          .then(() => {
            this.submitted = true;
            this.error = null;
          })
          .catch(error => {
            this.error = JSON.stringify(error, null, 2);
            console.error('Contact form error: ', error);
          })
        }
      }"
        id="contact-form-component"
      >
        <form
          netlify
          netlify-honeypot="message_1"
          x-ref="form"
          class="space-y-4 text-xl mt-8 max-w-3xl"
          name="contact"
          method="POST"
          x-bind:hidden="submitted"
          x-on:submit.prevent="submitForm($refs)"
        >
          <p class="space-y-2 lg:space-y-0 lg:flex lg:space-x-5">
            <label for="contact-name" class="font-bold lg:pt-4 lg:text-right lg:w-28">Name:</label>
            <input
              required
              id="contact-name"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="What should I call you?"
              class="w-full bg-white font-serif p-4 rounded text-black shadow-hard lg:flex-1"
              size="45"
            />
          </p>
          <p class="space-y-2 lg:space-y-0 lg:flex lg:space-x-5">
            <label for="contact-email" class="lg:pt-4 font-bold lg:text-right lg:w-28">Email:</label>
            <input
              required
              id="contact-email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="How can I get back to you?"
              class="w-full bg-white font-serif p-4 rounded text-black shadow-hard lg:flex-1"
              size="45"
            />
          </p>
          <p class="space-y-2 lg:space-y-0 lg:flex lg:space-x-5">
            <label for="contact-subject" class="lg:pt-4 font-bold lg:text-right lg:w-28">Subject:</label>
            <input
              required
              id="contact-subject"
              type="text"
              name="subject"
              placeholder="What's this all about then?"
              class="w-full bg-white font-serif p-4 rounded text-black shadow-hard lg:flex-1"
              size="45"
            />
          </p>
          <p class="space-y-2 lg:space-y-0 lg:flex lg:space-x-5">
            <label for="contact-message" class="lg:pt-4 font-bold lg:text-right lg:w-28">Message:</label>
            <textarea
              required
              id="contact-message"
              name="message"
              placeholder="Your unconditional offer of that six-figure, four-days-a-week job, perhaps a typo correction, or some other message."
              class="w-full bg-white font-serif p-4 rounded text-black shadow-hard lg:flex-1"
              rows="6"
              cols="50"
            ></textarea>
          </p>
          <p class="lg:flex lg:space-x-5">
            <span class="lg:block lg:w-28"></span>
            <button
              type="submit"
              class="flex items-center bg-yellow-300 hocus:bg-yellow-400 px-4 py-2 rounded shadow-hard font-bold space-x-2 select-none"
              :disabled="isSubmitting"
            >
              <icon name="paperPlane"></icon>
              <span>Send</span>
            </button>
          </p>
          <div hidden x-bind:hidden="!error" x-cloak class="font-bold text-red-800 lg:ml-32 space-y-2">
            <p>Oops, it looks like there's been some sort of error:</p>
            <textarea
              x-text="error"
              class="bg-black block text-base font-mono p-5 rounded shadow-hard text-green-300 w-full"
              rows="5"
              readonly
              x-ref="error"
              x-on:focus="$refs.error.select()"
            ></textarea>
          </div>
          <div hidden aria-hidden="true">
            <label>
              Please leave this empty:
              <input name="message_1" />
            </label>
          </div>
        </form>
        <div hidden x-bind:hidden="!submitted" x-cloak class="space-y-4 text-xl mt-8 max-w-3xl">
          <p class="text-xl text-3xl font-bold text-green-600">Thanks!</p>
          <p>Your message has been sent.</p>
        </div>
      </div>
    </section>

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
  },
};
</script>
