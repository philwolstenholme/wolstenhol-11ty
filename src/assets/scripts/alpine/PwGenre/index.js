document.addEventListener('alpine:init', () => {
  Alpine.data('PwGenre', () => ({
    open: false,
    toggle() {
      this.$root.closest('p').classList.add('select-none');
      setTimeout(() => {
        this.$root.closest('p').classList.remove('select-none');
      }, 1000);
      if (this.open) {
        this.$root.blur();
      }
      this.open = !this.open;
    },
  }));
});
