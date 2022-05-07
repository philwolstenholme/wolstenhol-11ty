<script>
import PwLede from './pw-lede.vue';
import PwSectionHeading from './pw-section-heading.vue';
import icon from './icon.vue';

export default {
  components: {
    PwLede,
    PwSectionHeading,
    icon,
  },
  data: function () {
    return {
      errorTemplateString: `<template x-for="(invalidId, index) in invalidFormIds">
            <li x-bind:key="invalidId + '' + getValidationMessage(invalidId)}">
              <a x-bind:href="\`#\${invalidId}\`" x-text="getInputLabel(invalidId)"></a> (<span x-text="invalidMessages[index]"></span>)
            </li>
          </template>`,
    };
  },
};
</script>

<template>
  <section data-section="contact">
    <pw-section-heading title="Contact" icon="envelope" section="contact" />
    <pw-lede class="mt-3">Get in touch</pw-lede>
    <p class="mt-3">
      You can send me a
      <a href="https://twitter.com/messages/compose?recipient_id=38276082" class="underline">direct message on Twitter</a> or drop me an
      email via this contact form (all fields are required).
    </p>
    <div x-data="PwContact" id="contact-form-component" class="contact-form-container contain-content mt-12 space-y-8">
      <div
        role="alert"
        aria-labelledby="contact-form-validation-problems"
        class="border-l-4 border-red-800 pl-4 rounded space-y-3"
        x-ref="errors"
        tabindex="-1"
        hidden
        x-bind:hidden="invalidFormIds.length === 0"
      >
        <h3 class="font-bold font-serif text-2xl" id="contact-form-validation-problems">
          <span aria-hidden="true">😔&nbsp;</span>There were some problems with the form:
        </h3>
        <ul class="links-underline highlight-links list-disc pl-5" v-html="errorTemplateString"></ul>
      </div>

      <form
        netlify
        netlify-honeypot="message_1"
        x-ref="form"
        class="space-y-4 text-xl max-w-3xl"
        name="contact"
        method="POST"
        x-bind:hidden="submitted"
        x-on:submit.prevent="window.PwVibrate(); submitForm()"
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
            x-bind:aria-invalid="isInvalid('contact-name')"
            type="text"
            name="name"
            minlength="2"
            autocomplete="name"
            placeholder="What should I call you?"
            class="w-full bg-white font-serif p-4 rounded text-black shadow-hard lg:flex-1"
            size="45"
            x-on:invalid="setAsInvalid(event.target.id)"
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
            x-bind:aria-invalid="isInvalid('contact-email')"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="How can I get back to you?"
            class="w-full bg-white font-serif p-4 rounded text-black shadow-hard lg:flex-1"
            size="45"
            x-on:invalid="setAsInvalid(event.target.id)"
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
            x-bind:aria-invalid="isInvalid('contact-subject')"
            type="text"
            name="subject"
            minlength="8"
            placeholder="What's this all about then?"
            class="w-full bg-white font-serif p-4 rounded text-black shadow-hard lg:flex-1"
            size="45"
            x-on:invalid="setAsInvalid(event.target.id)"
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
            x-bind:aria-invalid="isInvalid('contact-message')"
            name="message"
            minlength="8"
            placeholder="Your unconditional offer of that six-figure, four-days-a-week job, perhaps a typo correction, or some other message."
            class="w-full bg-white font-serif p-4 rounded text-black shadow-hard lg:flex-1"
            rows="6"
            cols="50"
            x-on:invalid="setAsInvalid(event.target.id)"
          ></textarea>
        </p>
        <p>
          <span class="flex space-x-2 text-base font-bold lg:ml-32">
            <input
              class="mt-1.5"
              type="checkbox"
              id="no-freelance"
              x-bind:aria-invalid="isInvalid('no-freelance')"
              name="no-freelance"
              required
              aria-required="true"
              x-on:invalid="setAsInvalid(event.target.id)"
            />
            <label for="no-freelance">
              I work making websites full-time on a salaried basis so don't do any freelance or contracting work (sorry). Please tick the
              box to confirm you are not asking me to produce a website for a small business or offering a contract gig. Thanks!<sup
                class="text-red-800"
                ><span aria-hidden="true">*</span><span class="sr-only">(this field is required)</span></sup
              ></label
            >
          </span>
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
        <div hidden x-bind:hidden="!submissionError" x-cloak class="font-bold text-red-800 lg:ml-32 space-y-2">
          <p>Oops, it looks like there's been some sort of error:</p>
          <div
            x-text="submissionError"
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
      <div hidden x-bind:hidden="!submitted" x-cloak class="space-y-4 text-xl max-w-3xl">
        <p class="text-3xl font-bold font-serif text-green-700"><span aria-hidden="true">✅&nbsp;</span>Thanks!</p>
        <p class="text-base">Your message has been sent.</p>
      </div>
    </div>
  </section>
</template>
