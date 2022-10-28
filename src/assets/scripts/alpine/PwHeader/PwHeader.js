export default function PwHeader() {
  return {
    activeSection: null,
    init() {
      let headingsInView = [];
      const observer = new IntersectionObserver(
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
      document.querySelectorAll('h2').forEach(heading => observer.observe(heading));
    },
    onLinkActivate($event) {
      const url = new URL($event.target.href);
      const params = new URLSearchParams(url.search);

      if (this.$refs.list.scrollLeft) {
        params.set('hsp', this.$refs.list.scrollLeft);
      }

      if (url.hash) {
        // We only need this if there's an anchor link involved.
        params.set('hc', 1);
      }

      url.search = params.toString();
      window.location = url.toString();
    },
  };
}
