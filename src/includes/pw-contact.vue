<script>
import PwLede from './pw-lede.vue';
import PwSectionHeading from './pw-section-heading.vue';
import PwSection from './pw-section.vue';
import icon from './icon.vue';

export default {
  components: {
    PwLede,
    PwSectionHeading,
    PwSection,
    icon,
  },
};
</script>

<template>
  <pw-section section-key="contact">
    <pw-section-heading title="Contact" icon="envelope" section="contact" />
    <pw-lede class="mt-3">Get in touch</pw-lede>
    <p class="mt-3">
      You can send me a
      <a href="https://twitter.com/messages/compose?recipient_id=38276082" class="underline">direct message on Twitter</a> or drop me an
      email via this contact form (all fields are required).
    </p>
    <div x-data="PwContact()" id="contact-form-component" class="mt-12">
      <form
        netlify
        netlify-honeypot="message_1"
        x-ref="form"
        class="space-y-4 text-xl mt-8 max-w-3xl"
        name="contact"
        method="POST"
        x-bind:hidden="submitted"
        x-on:submit.prevent="submitForm()"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p class="space-y-2 lg:space-y-0 lg:flex lg:space-x-5">
          <label for="contact-name" class="font-bold lg:pt-4 lg:text-right lg:w-28"
            >Name:<sup class="text-red-800"
              ><span aria-hidden="true">*</span><span class="sr-only">(this field is required)</span></sup
            ></label
          >
          <br class="hidden" />
          <input
            required
            aria-required="true"
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
          <label for="contact-email" class="lg:pt-4 font-bold lg:text-right lg:w-28"
            >Email:<sup class="text-red-800"
              ><span aria-hidden="true">*</span><span class="sr-only">(this field is required)</span></sup
            ></label
          >
          <br class="hidden" />
          <input
            required
            aria-required="true"
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
          <label for="contact-subject" class="lg:pt-4 font-bold lg:text-right lg:w-28"
            >Subject:<sup class="text-red-800"
              ><span aria-hidden="true">*</span><span class="sr-only">(this field is required)</span></sup
            ></label
          >
          <br class="hidden" />
          <input
            required
            aria-required="true"
            id="contact-subject"
            type="text"
            name="subject"
            placeholder="What's this all about then?"
            class="w-full bg-white font-serif p-4 rounded text-black shadow-hard lg:flex-1"
            size="45"
          />
        </p>
        <p class="space-y-2 lg:space-y-0 lg:flex lg:space-x-5">
          <label for="contact-message" class="lg:pt-4 font-bold lg:text-right lg:w-28"
            >Message:<sup class="text-red-800"
              ><span aria-hidden="true">*</span><span class="sr-only">(this field is required)</span></sup
            ></label
          >
          <br class="hidden" />
          <textarea
            required
            aria-required="true"
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
            class="mb-0.5 flex items-center bg-yellow-300 hocus:bg-yellow-400 px-4 py-2 rounded shadow-hard font-bold space-x-2 select-none"
          >
            <icon name="paperPlane"></icon>
            <span>Send</span>
          </button>
        </p>
        <div hidden x-bind:hidden="!error" x-cloak class="font-bold text-red-800 lg:ml-32 space-y-2">
          <p>Oops, it looks like there's been some sort of error:</p>
          <div
            x-text="error"
            class="bg-black block text-base font-mono p-5 rounded shadow-hard text-green-300 w-full"
            rows="5"
            readonly
            x-ref="error"
            x-on:click="window.getSelection().selectAllChildren($refs.error);"
          ></div>
        </div>
        <div hidden aria-hidden="true">
          <label>
            Please leave this empty:
            <input name="message_1" />
          </label>
        </div>
      </form>
      <div hidden x-bind:hidden="!submitted" x-cloak class="space-y-4 text-xl mt-8 max-w-3xl">
        <p class="text-xl text-3xl font-bold font-serif text-green-700"><span aria-hidden="true">✅&nbsp;</span>Thanks!</p>
        <p class="text-base">Your message has been sent.</p>
      </div>
    </div>
  </pw-section>
</template>
f
