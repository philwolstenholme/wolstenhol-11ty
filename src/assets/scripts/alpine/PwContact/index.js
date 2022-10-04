document.addEventListener('alpine:init', () => {
  Alpine.data('PwContact', () => ({
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
    submitForm() {
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
            });
          }
          return response;
        })
        .then(() => {
          this.submitted = true;
          this.submissionError = null;
          this.$nextTick(() => {
            this.$refs.submitted.focus();
          });
        })
        .catch(error => {
          this.submissionError = JSON.stringify(error, null, 2);
          console.error('Contact form error: ', error);

          this.$nextTick(() => {
            this.$refs.submissionError.focus();
          });
        });
    },
  }));
});
