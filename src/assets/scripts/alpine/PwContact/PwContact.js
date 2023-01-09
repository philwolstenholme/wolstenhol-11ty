import wretch from 'wretch';

export default function PwContact() {
  return {
    submitted: false,
    submissionError: null,
    invalidFormIds: [],
    invalidMessages: [],
    getValidationMessage(id) {
      const field = document.getElementById(id);
      return field.validationMessage;
    },
    setAsInvalid(id) {
      this.invalidFormIds = [...this.invalidFormIds, id];
      this.invalidMessages = [...this.invalidMessages, this.getValidationMessage(id)];
    },
    isInvalid(id) {
      return this.invalidFormIds.includes(id);
    },
    getInputLabel(id) {
      const field = document.getElementById(id);
      // Try to split out a short label without any 'this field is required' text and without more than one sentence.
      return [...field.labels].shift().firstChild.nodeValue.split(':').shift().split('.').shift().split('!').shift().split('?').shift();
    },
    init() {
      const form = this.$refs.form;
      form.setAttribute('novalidate', '');
    },
    async submitForm() {
      const form = this.$refs.form;
      const data = new FormData(form);
      this.invalidFormIds = [];
      this.invalidMessages = [];

      form.checkValidity();

      if (this.invalidFormIds.length > 0) {
        console.warn('Form validation failed!', this.invalidFormIds);

        this.$nextTick(() => {
          this.$refs.errors.focus();
        });

        return;
      }

      try {
        await wretch('/').body(data).post();
        this.submitted = true;
        this.submissionError = null;
        this.$nextTick(() => {
          this.$refs.submitted.focus();
        });
      } catch (error) {
        this.submissionError = error.message;
        console.error('Contact form error: ', error);

        this.$nextTick(() => {
          this.$refs.submissionError.focus();
        });
      }
    },
  };
}
