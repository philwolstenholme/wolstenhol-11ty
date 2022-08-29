<template>
  <div data-scroller role="group" class="relative" :data-scroll-full="scrollFull" x-data="PwSimpleScroller($root)">
    <button
      hidden
      type="button"
      x-bind:inert="!overflowing.left"
      class="hidden md:block md:no-js:hidden group -left-12 absolute bottom-5 top-0 w-8 transform-gpu transition-all translate-x-12"
      x-bind:class="{ 'opacity-0 translate-x-12': !overflowing.left }"
      v-bind:class="themeTextClasses"
      x-on:click="scrollLeft()"
    >
      <span class="sr-only">Back</span>
      <svg
        x-ignore
        focusable="false"
        role="presentation"
        class="transform-gpu translate-transform"
        v-bind:class="randomRotationClass"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 84.663887 42.437332"
      >
        <use href="#arrow-left" />
      </svg>
    </button>
    <div class="relative overflow-x-hidden">
      <div
        x-cloak
        class="absolute bottom-5 left-0 pointer-events-none rotate-180 scroller-affordance top-0 transform-gpu transition-transform w-3 z-10"
        x-bind:class="{ '-translate-x-3': !overflowing.left }"
      ></div>
      <ul
        role="list"
        tabindex="0"
        v-bind:aria-label="label"
        x-ref="scroller"
        data-pw-scroller-list
        x-on:scroll.passive.debounce.once="$refs.scroller.classList.remove('scroller--no-interaction')"
        x-on:mouseenter.once="$refs.scroller.classList.remove('scroller--no-interaction')"
        class="scroller scroller--no-interaction relative flex space-x-5 overscroll-x-none overflow-x-auto overflow-y-auto custom-scrollbars scroll-smooth scrolling-touch snap snap-x snap-mandatory"
      >
        <slot></slot>
      </ul>
      <div
        x-cloak
        class="absolute bottom-5 right-0 pointer-events-none scroller-affordance top-0 transform-gpu transition-transform w-3 z-10"
        x-bind:class="{ 'translate-x-3': !overflowing.right }"
      ></div>
    </div>
    <button
      hidden
      type="button"
      x-bind:inert="!overflowing.right"
      class="hidden md:block md:no-js:hidden group -right-12 absolute bottom-5 top-0 w-8 transform-gpu transition-all -translate-x-12"
      x-bind:class="{ 'opacity-0 -translate-x-12': !overflowing.right }"
      v-bind:class="themeTextClasses"
      x-on:click="scrollRight()"
    >
      <span class="sr-only">Forward</span>
      <svg
        x-ignore
        focusable="false"
        role="presentation"
        class="transform-gpu translate-transform"
        :class="randomRotationClass"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 84.663887 42.437332"
      >
        <use href="#arrow-right" />
      </svg>
    </button>
    <div class="flex justify-end h-10">
      <div
        hidden
        x-id="['theres-more']"
        x-bind:inert="!overflowing.right"
        class="no-js:hidden js:inline-block lg:float-right font-bold mt-3 ml-3 rounded text-gray-500 text-sm transition-all transform-gpu duration-300"
        x-bind:class="{
        'opacity-0 translate-y-4': !overflowing.right
      }"
      >
        <span x-bind:id="$id('theres-more')">There's more!</span>
        <button
          type="button"
          class="transition-colors font-bold ml-1 px-2 py-1 rounded shadow-hard text-white"
          v-bind:class="{
            'bg-medium hocus:bg-medium-dark': theme === 'medium',
            'bg-purple-700 hocus:bg-purple-800': theme === 'speaking',
            'bg-foursquare hocus:bg-foursquare': theme === 'foursquare',
            'bg-green-700 hocus:bg-green-600': theme === 'spotify',
            'bg-instagram hocus:bg-instagram-dark': theme === 'instagram',
          }"
          x-on:click="scrollRight()"
          x-bind:aria-describedby="$id('theres-more')"
        >
          scroll this way <span aria-hidden="true">➜</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroller-affordance {
  background: radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)) 0 100%;
}
</style>

<script>
export default {
  props: {
    theme: {
      type: String,
    },
    label: {
      type: String,
    },
    scrollFull: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    randomRotationClass() {
      const classes = ['rotate-3', 'rotate-6', '-rotate-6', 'rotate-12', '-rotate-12'];
      const hocusClasses = [
        'group-hocus:rotate-3',
        'group-hocus:rotate-6',
        'group-hocus:-rotate-6',
        'group-hocus:rotate-12',
        'group-hocus:-rotate-12',
      ];
      return [classes[Math.floor(Math.random() * classes.length)], hocusClasses[Math.floor(Math.random() * hocusClasses.length)]];
    },
    themeTextClasses() {
      return {
        'text-medium hocus:text-medium-dark': this.theme === 'medium',
        'text-purple-700 hocus:text-purple-800': this.theme === 'speaking',
        'text-foursquare hocus:text-foursquare-dark': this.theme === 'foursquare',
        'text-green-700 hocus:text-green-800': this.theme === 'spotify',
        'text-instagram hocus:text-instagram-dark': this.theme === 'instagram',
      };
    },
  },
};
</script>
