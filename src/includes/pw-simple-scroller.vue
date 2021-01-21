<template>
  <div data-scroller class="relative" :data-scroll-full="scrollFull" x-data="PwSimpleScroller($el)" x-init="init()">
    <button
      hidden
      x-bind:inert="!overflowing.left"
      class="hidden md:block md:no-js:hidden group -left-12 absolute bottom-5 top-0 w-8 transform-gpu transition-all translate-x-12"
      x-bind:class="{
        'opacity-0 translate-x-12': !overflowing.left,
      }"
      v-bind:class="themeTextClasses"
      x-on:click="scrollLeft()"
    >
      <span class="sr-only">Scroll backwards</span>
      <svg
        class="transform-gpu translate-transform"
        :class="randomRotationClass"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 84.663887 42.437332"
      >
        <path
          class="fill-current"
          d="M42.2453804.060926c1.632069-.21162 2.346698.0963 3.468039 1.42679.794909.94007.955069 1.31177 1.084209 2.55564.217541 2.55051-1.165629 5.33305-3.62287 7.26193-1.702211 1.28149-1.82612 1.33488-5.60298895 2.27293-3.18713105.78566-3.73999105.98432-3.14150905 1.12759 1.222878.28105 4.408749.25306 9.049419-.0571 2.07917-.1444 5.3889486-.22578 7.2626906-.19126a67.997917 67.997917 0 005.074518-.0507c.746641-.0505 1.914491-.0282 5.351431.10679a828.41042 828.41042 0 0010.20015.26635 25.664583 25.664583 0 012.75304.22629 16.66875 16.66875 0 002.5185.14093c.643141-.0285 1.219621.0113 1.356151.14452.105148.1129.46359.1449.800018.0734.336441-.0715.694891-.0395.831432.0938.0997.087.58361.20055 1.065959.17917 1.43765.019 2.97983.52974 3.507181 1.22913.28956.34419.753528 1.38165 1.034698 2.3227.549762 1.69547.555252 1.72136-.209428 3.72326-.915072 2.4396-1.544571 3.16849-3.597481 4.199951a12.435417 12.435417 0 01-7.227049.995169 263.8425 263.8425 0 00-23.38465-.57458 134.14375 134.14375 0 00-10.7646306.259379 105.80687 105.80687 0 01-5.13402.279792l-3.21564.14252c-3.102729.0374-3.851651.331799-2.69053 1.085829a12.329583 12.329583 0 002.4691 2.071921 11.1125 11.1125 0 011.954379 1.559189c.0276.1294.565862.880541 1.18736 1.641092 1.359141 1.685708 1.92662205 2.701149 1.706322 2.93733-.118401.0793-.180171.552219-.190162 1.014198.0158.45647-.299831 1.389142-.676021 2.037162-.396589.679368-.669258 1.305377-.647258 1.408898.055.258792-1.818611 2.388219-2.784559 3.188621-1.284261 1.084461-3.468561 1.11596-4.9858624.086a1.0583333 1.0583333 0 00-1.178869-.074c-.608491.31869-2.37584-.36059-4.85883-1.861511-1.144601-.676388-1.635691-.950687-5.154891-2.745308-3.75923-1.905889-8.428899-5.295339-9.721399-7.049299a11.377083 11.377083 0 00-.92043-1.021592c-.35232-.38495-.84667-.929061-1.07896-1.25839-.70788-1.039702-1.287-1.728081-1.90687-2.35372-.33581-.307311-.67488-.88441-.74638-1.220862-.077-.362328-.26303-.728527-.43485-.773157-.1459-.0502-.48334-.492352-.71726-.956562-.36657-.70652-.41378-1.18338-.19553-2.44699.48961-3.2959 1.70523-5.33955 4.82172-8.11185 4.70809-4.19255 7.858599-6.29584 11.479199-7.71461l2.866191-1.15021 3.38381-1.26024a233.33604 233.33604 0 005.6910104-1.85886c2.093039-.71538 12.027771-3.09756 13.87239-3.32736"
        />
      </svg>
    </button>
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
    <button
      hidden
      x-bind:inert="!overflowing.right"
      class="hidden md:block md:no-js:hidden group -right-12 absolute bottom-5 top-0 w-8 transform-gpu transition-all -translate-x-12"
      x-bind:class="{
        'opacity-0 -translate-x-12': !overflowing.right,
      }"
      v-bind:class="themeTextClasses"
      x-on:click="scrollRight()"
    >
      <span class="sr-only">Scroll forward</span>
      <svg
        class="transform-gpu translate-transform"
        :class="randomRotationClass"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 84.663887 42.437332"
      >
        <path
          class="fill-current"
          d="M38.1641.04794c-1.64041.13229-2.275409.58208-3.09562 2.11666-.582078 1.08479-.661458 1.48167-.529169 2.72521.3175 2.54 2.248959 4.97417 5.053539 6.35 1.93146.89958 2.06375.92604 5.95313 1.05833 3.28083.10584 3.86291.18521 3.30729.4498-1.13771.52916-4.25979 1.16416-8.86354 1.82562-2.06375.29104-5.31813.89958-7.14375 1.32292a67.997917 67.997917 0 01-4.974169 1.00541c-.740831.10584-1.87854.37042-5.21229 1.21709a828.41042 828.41042 0 01-9.921881 2.38125 25.664583 25.664583 0 00-2.645829.79375 16.66875 16.66875 0 01-2.43416.66146c-.63501.10583-1.19063.26458-1.29646.42333-.0794.13229-.423341.23812-.76729.23812-.34396 0-.687921.10584-.79376.26459-.0794.10583-.529161.3175-1.005411.39687-1.402289.3175-2.804589 1.13771-3.174999 1.93146-.21167.39687-.44979 1.50813-.52917 2.48708-.18521 1.77271-.18521 1.79917.97896 3.59834 1.40229 2.19604 2.169579 2.77812 4.392079 3.36021a12.435417 12.435417 0 007.27604-.52917 263.8425 263.8425 0 0122.754171-5.42396 134.14375 134.14375 0 0110.583329-1.98437 105.80687 105.80687 0 005.08-.79375l3.175-.52917c3.04271-.60854 3.83646-.47625 2.8575.50271a12.329583 12.329583 0 01-1.98437 2.54 11.1125 11.1125 0 00-1.5875 1.93145c0 .1323-.37042.97896-.82021 1.85209-.97896 1.93146-1.32292 3.04271-1.05833 3.22792.13229.0529.29104.5027.39687.95249.0794.4498.58209 1.29646 1.08479 1.85209.52917.58208.92605 1.13771.92605 1.24354 0 .26458 2.27541 1.95792 3.38666 2.54 1.48167.79375 3.62479.37042 4.89479-.9525a1.0583333 1.0583333 0 011.13771-.3175c.66146.18521 2.24896-.84667 4.36563-2.83104.97896-.89959 1.40229-1.27 4.47146-3.75709 3.28083-2.64583 7.14375-6.93208 8.04333-8.91645a11.377083 11.377083 0 01.68792-1.19063c.26458-.44979.635-1.08479.79375-1.45521.47625-1.16416.89958-1.95791 1.37583-2.69875.26458-.37041.47625-1.00541.47625-1.34937 0-.37042.10583-.76729.26458-.84667.13229-.0794.37042-.58208.50271-1.08479.21167-.76729.15875-1.24354-.3175-2.43417-1.16416-3.12208-2.77812-4.86833-6.40291-6.93208-5.47688-3.12208-8.99584-4.52438-12.8323-5.15938l-3.0427-.52916-3.57188-.52917a233.33604 233.33604 0 01-5.95312-.635C50.2291.15377 40.01619-.11082 38.1641.04793"
        />
      </svg>
    </button>
    <div class="u-flex justify-end">
      <div
        hidden
        x-bind:inert="!overflowing.right"
        class="no-js:hidden js:block float-right font-bold mt-3 rounded text-gray-500 text-sm transition-all transform-gpu duration-300"
        x-bind:class="{
        'opacity-0 translate-y-4': !overflowing.right
      }"
      >
        There's more!
        <button
          class="transition-colors font-bold ml-1 px-2 py-1 rounded shadow-hard text-white"
          v-bind:class="{
            'bg-medium hocus:bg-medium-dark': theme === 'medium',
            'bg-purple-700 hocus:bg-purple-700': theme === 'testimonial',
            'bg-foursquare hocus:bg-foursquare': theme === 'foursquare',
            'bg-green-700 hocus:bg-green-600': theme === 'spotify',
          }"
          x-on:click="scrollRight()"
        >
          scroll this way ➜
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
        'text-purple-700 hocus:text-purple-800': this.theme === 'testimonial',
        'text-foursquare hocus:text-foursquare-dark': this.theme === 'foursquare',
        'text-green-700 hocus:text-green-800': this.theme === 'spotify',
      };
    },
  },
};
</script>
