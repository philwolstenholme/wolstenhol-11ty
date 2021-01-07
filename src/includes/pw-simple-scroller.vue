<template>
  <div
    data-scroller
    x-data="{
      scrollAmount: null,
      overflowing: {
        left: false,
        right: true,
      },
      init() {
        const firstListItem = $el.querySelector('.scroller > li:first-child');
        const lastListItem = $el.querySelector('.scroller > li:last-child');

        let observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            const target = entry.target === firstListItem ? 'left' : 'right';
            console.log(entry.intersectionRatio);
            if (entry.intersectionRatio != 1) {
              this.overflowing[target] = true;
            } else {
              this.overflowing[target] = false;
            }
          });
        }, {threshold: 1});

        observer.observe(firstListItem);
        observer.observe(lastListItem);

        this.scrollAmount = this.$refs.scroller.offsetWidth / 2;
      },
      scrollRight() {
        this.$refs.scroller.scrollLeft += this.scrollAmount;
      }
    }"
    x-init="init"
  >
    <div class="relative overflow-x-hidden">
      <div
        x-cloak
        class="absolute bottom-5 left-0 pointer-events-none rotate-180 scroller-affordance top-0 transform-gpu transition-transform w-3 z-10"
        x-bind:class="{ '-translate-x-3': !overflowing.left }"
      ></div>
      <ul
        x-ref="scroller"
        class="scroller relative flex space-x-5 overflow-x-auto overflow-y-auto custom-scrollbars scroll-smooth scrolling-touch snap snap-x snap-mandatory"
      >
        <slot></slot>
      </ul>
      <div
        x-cloak
        class="absolute bottom-5 right-0 pointer-events-none scroller-affordance top-0 transform-gpu transition-transform w-3 z-10"
        x-bind:class="{ 'translate-x-3': !overflowing.right }"
      ></div>
    </div>
    <div
      hidden
      x-bind:hidden="false"
      x-bind:inert="!overflowing.right"
      class="float-right font-bold mt-3 rounded text-gray-500 text-sm transition-opacity duration-300"
      x-bind:class="{ 'opacity-0': !overflowing.right }"
    >
      There's more!
      <button
        class="transition-colors font-bold ml-1 px-2 py-1 rounded shadow-hard text-white"
        v-bind:class="{
          'bg-medium hocus:bg-medium-dark': theme === 'medium',
          'bg-pink-500 hocus:bg-pink-600': theme === 'testimonial',
        }"
        x-on:click="scrollRight()"
      >
        scroll this way ➜
      </button>
    </div>
  </div>
</template>

<style scoped>
.scroller-affordance {
  background: radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0)) 0 100%;
}
</style>

<script>
export default {
  props: {
    theme: {
      type: String,
    },
  },
};
</script>
