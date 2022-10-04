document.addEventListener('alpine:init', () => {
  Alpine.data('PwHeader', () => ({
    obscured: true,
    activeSection: null,
    handleScroll() {
      this.obscured = window.scrollY < 200;
    },
    init() {
      let headingsInView = [];
      const io = new IntersectionObserver(
        entries => {
          const exitedElements = entries.filter(entry => !entry.isIntersecting).map(entry => entry.target);
          const enteredElements = entries.filter(entry => entry.isIntersecting).map(entry => entry.target);
          headingsInView = headingsInView.filter(h => !exitedElements.includes(h));
          headingsInView.push(...enteredElements);
          if (headingsInView.length > 0) {
            const sectionId = (this.activeSection = headingsInView[0].dataset.section);
            window.dispatchEvent(new CustomEvent('pw-header-active-section-id', { detail: sectionId }));
          }
        },
        {
          rootMargin: '-120px 0px 0px 0px',
        }
      );
      document.querySelectorAll('h2').forEach(heading => io.observe(heading));
    },
  }));
});
