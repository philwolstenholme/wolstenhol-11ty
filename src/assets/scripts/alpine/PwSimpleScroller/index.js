document.addEventListener('alpine:init', () => {
  Alpine.data('PwSimpleScroller', $root => ({
    scrollAmount: null,
    scrollFull: $root.dataset.scrollFull,
    overflowing: {
      left: false,
      right: true,
    },
    init() {
      const firstListItem = this.$root.querySelector('[data-pw-scroller-list] > li:first-child');
      const lastListItem = this.$root.querySelector('[data-pw-scroller-list] > li:last-child');

      const firstLastObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            const target = entry.target === firstListItem ? 'left' : 'right';
            if (entry.intersectionRatio < 0.95) {
              this.overflowing[target] = true;
            } else {
              this.overflowing[target] = false;
            }
          });
        },
        {
          root: this.$refs.scroller,
          threshold: 0.95,
        }
      );

      firstLastObserver.observe(firstListItem);
      firstLastObserver.observe(lastListItem);

      if (this.scrollAmount === null) {
        if (this.scrollFull) {
          this.scrollAmount = this.$refs.scroller.offsetWidth;
        } else {
          this.scrollAmount = this.$refs.scroller.offsetWidth / 2;
        }
      }

      var inertObserver = new IntersectionObserver(
        (entries, observer) => {
          Array.prototype.forEach.call(entries, function (entry) {
            if (entry.intersectionRatio > 0.5) {
              entry.target.removeAttribute('inert');
            } else {
              entry.target.setAttribute('inert', 'inert');
            }
          });
        },
        {
          root: this.$refs.scroller,
          threshold: 0.5,
        }
      );

      this.$root.querySelectorAll('[data-pw-scroller-list] > li').forEach(item => {
        inertObserver.observe(item);
      });

      // Hacky workaround for a weird browser/CSS issue (it happens before JS loads/runs)
      // where a scroller will start off partially scroled.
      if (this.$refs.scroller.scrollLeft !== 0) {
        this.$refs.scroller.classList.remove('scroll-smooth');
        this.$refs.scroller.scrollLeft = 0;
        this.$refs.scroller.classList.add('scroll-smooth');
      }
    },
    focusOnFirstItem() {
      setTimeout(() => {
        this.$refs.scroller.querySelectorAll('li[tabindex]:not([inert])')[0].focus({ preventScroll: true });
      }, 750);
    },
    scrollRight() {
      this.$refs.scroller.scrollLeft += this.scrollAmount;

      this.focusOnFirstItem();
    },
    scrollLeft() {
      this.$refs.scroller.scrollLeft -= this.scrollAmount;

      this.focusOnFirstItem();
    },
  }));
});
