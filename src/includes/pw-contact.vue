<script>
export default {
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
  <div
    x-ignore
    ax-load="visible"
    x-data="PwContact"
    id="contact-form-component"
    class="contact-form-container contain-content mt-12 space-y-8"
  >
    <div
      role="alert"
      aria-labelledby="contact-form-validation-problems"
      class="space-y-3 rounded border-l-4 border-red-800 pl-4"
      x-ref="errors"
      tabindex="-1"
      hidden
      x-bind:hidden="invalidFormIds.length === 0"
    >
      <h3 class="font-serif text-2xl font-bold" id="contact-form-validation-problems">
        <span aria-hidden="true">😔&nbsp;</span>There were some problems with the form:
      </h3>
      <ul role="list" class="links-underline highlight-links list-disc pl-5" v-html="errorTemplateString"></ul>
    </div>

    <form
      netlify
      netlify-honeypot="message_1"
      x-ref="form"
      class="max-w-3xl space-y-4 text-xl"
      name="contact"
      method="POST"
      x-bind:hidden="submitted"
      x-on:submit.prevent="submitForm()"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p class="space-y-2 lg:flex lg:space-y-0 lg:space-x-5">
        <label
          for="contact-name"
          class="font-bold lg:w-28 lg:pt-4 lg:text-right"
          x-bind:class="{ 'text-red-800': isInvalid('contact-name') }"
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
          class="w-full rounded border-2 border-gray-800 bg-white p-4 font-serif text-black shadow-hard lg:flex-1"
          x-bind:class="{ 'border-red-800': isInvalid('contact-name') }"
          size="45"
          x-on:invalid="setAsInvalid(event.target.id)"
        />
      </p>
      <p class="space-y-2 lg:flex lg:space-y-0 lg:space-x-5">
        <label
          for="contact-email"
          class="font-bold lg:w-28 lg:pt-4 lg:text-right"
          x-bind:class="{ 'text-red-800': isInvalid('contact-email') }"
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
          class="w-full rounded border-2 border-gray-800 bg-white p-4 font-serif text-black shadow-hard lg:flex-1"
          x-bind:class="{ 'border-red-800': isInvalid('contact-email') }"
          size="45"
          x-on:invalid="setAsInvalid(event.target.id)"
        />
      </p>
      <p class="space-y-2 lg:flex lg:space-y-0 lg:space-x-5">
        <label
          for="contact-subject"
          class="font-bold lg:w-28 lg:pt-4 lg:text-right"
          x-bind:class="{ 'text-red-800': isInvalid('contact-subject') }"
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
          class="w-full rounded border-2 border-gray-800 bg-white p-4 font-serif text-black shadow-hard lg:flex-1"
          x-bind:class="{ 'border-red-800': isInvalid('contact-subject') }"
          size="45"
          x-on:invalid="setAsInvalid(event.target.id)"
        />
      </p>
      <p class="space-y-2 lg:flex lg:space-y-0 lg:space-x-5">
        <label
          for="contact-message"
          class="font-bold lg:w-28 lg:pt-4 lg:text-right"
          x-bind:class="{ 'text-red-800': isInvalid('contact-message') }"
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
          class="min-h-24 w-full rounded border-2 border-gray-800 bg-white p-4 font-serif text-black shadow-hard lg:flex-1"
          x-bind:class="{ 'border-red-800': isInvalid('contact-message') }"
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
          <label for="no-freelance" x-bind:class="{ 'text-red-800': isInvalid('no-freelance') }">
            I work making websites full-time on a salaried basis so don't do any freelance or contracting work (sorry). Please tick the box
            to confirm you are not asking me to produce a website for a small business or offering a contract gig. Thanks!<sup
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
          class="mb-0.5 flex select-none items-center space-x-2 rounded border-2 border-black bg-yellow-300 px-4 py-2 font-bold shadow-hard hocus:bg-yellow-400"
        >
          <svg
            hidden
            role="presentation"
            aria-hidden="true"
            class="m-2 block w-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 515.9 107.5"
          >
            <path
              d="M56 0c-6 0-13 1-18 5-10 5-21 10-28 19-2 6 2 12 5 17 6 10 15 19 25 25l15 7c4 2 9 5 10 10-1 5-7 8-12 9l-28 5-20 1c-7 2-5 11 1 9h19l28-2c11-1 21-6 25-16 2-5 3-10 1-15-2-4-6-6-10-8-8-5-18-8-27-14L28 37c-2-3-4-8 0-11 4-4 10-7 16-10l12-5c6 0 10 7 15 7 7-2 1-10-3-12-3-2-7-6-12-6Zm265 1c-13 2-22 12-27 24 0 5-1 12-7 14-3 4-1 10-1 15l12 30c2 4 3 9 7 10l13-4c16-4 28-18 33-33 2-10 2-20-3-29-3-11-10-23-22-26l-5-1Zm144 1c-6 0-13 5-11 12 2 6 10 3 15 5 4 3 12 3 14 9-4 3-9 3-13 4l-19 2c-18 2-37 0-55 2-4 1-9 4-7 8 2 5 8 6 13 6 19 0 38 0 57-2 6-1 13 0 19-2 4-2 11-1 8 5l-6 14c-4 10-11 19-16 29-2 5 2 12 7 10 5-1 9-5 9-9 4-8 10-15 13-24l8-12c3-5 5-12 10-17 3-4 7-9 4-15-2-5-7-6-12-9a460 460 0 0 0-38-16ZM256 5c-7 3-4 11-5 16-2 6-1 11-2 16-3 10-3 21-8 30-6 1-7-7-11-10l-7-15c-3-8-7-15-14-20-3-2-7-6-12-4-5 3-6 10-8 15 1 4-2 12-5 5-3-5-11 0-9 5 0 5 3 9 4 14l9 31c2 4 2 10 8 10 5-1 7-7 7-12l-2-28 1-18c3-6 7 4 8 7l8 17c3 5 6 11 11 15 4 4 8 8 13 9 8 0 13-7 15-14 2-5 2-12 3-18l4-32c-1-5 2-12-2-16l-6-3zM138 5c-6 0-10 3-15 4-7 3-15 8-16 17 0 5-4 9-4 14 0 6-2 10-4 15 1 5 3 10 2 15-1 7-2 16 3 22 5 4 12 5 18 5 11-1 23-2 33-6 6-1 11-6 15-10 5-4-1-12-6-8-6 3-11 5-17 6l-16 3c-6 0-12 1-16-3-4-5-1-14 4-16l17-2 18-2c4-1 11-8 4-10s-14 0-20 0h-18c-3-5 2-11-1-15 1-5 6-8 9-12 5-3 11-4 17-4 4 0 8 2 12 4 6 0 6-8 3-11-4-3-8-5-14-6h-8Zm182 11c6-1 11 6 13 11 5 9 7 20 3 30-3 8-10 13-17 18-4 3-10 0-10-5-3-11-3-22-2-32 1-8 3-16 10-21l3-1z"
            />
          </svg>
          <span class="sr-only">Send</span>
        </button>
      </p>
      <div
        x-ref="submissionError"
        tabindex="-1"
        hidden
        x-bind:hidden="!submissionError"
        x-cloak
        class="space-y-2 font-bold text-red-800 lg:ml-32"
      >
        <p>Oops, it looks like there's been some sort of error:</p>
        <div
          x-text="submissionError"
          class="block w-full rounded bg-black p-5 font-mono text-base text-green-300 shadow-hard"
          rows="5"
          readonly
          x-ref="submissionError"
          x-on:click="window.getSelection().selectAllChildren($refs.submissionError);"
        ></div>
      </div>
      <div hidden aria-hidden="true">
        <label>
          Please leave this empty:
          <input name="message_1" />
        </label>
      </div>
    </form>
    <div x-ref="submitted" tabindex="-1" hidden x-bind:hidden="!submitted" x-cloak class="max-w-3xl space-y-4 text-xl">
      <p class="font-serif text-3xl font-bold text-green-700"><span aria-hidden="true">✅&nbsp;</span>Thanks!</p>
      <p class="text-base">Your message has been sent.</p>
    </div>
  </div>
</template>
