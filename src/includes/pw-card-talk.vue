<script>
import icon from './icon.vue';

export default {
  components: {
    icon,
  },
  props: ['event', 'talk', 'image', 'href', 'srcset'],
  computed: {
    iconName: function () {
      return this.href.includes('youtube.com') ? 'youtube' : 'link';
    },
  },
};
</script>

<template>
  <article
    class="contain-content overflow-hidden rounded bg-purple-700 shadow-hard focus-within:bg-purple-900"
    style="min-width: 272px"
    x-ignore
  >
    <component
      :is="href ? 'a' : 'div'"
      :href="href"
      class="outline-offset-invert group aspect-h-9 aspect-w-16 block w-full overflow-hidden"
    >
      <h3 class="sr-only">{{ talk }}</h3>
      <img
        v-if="image"
        class="object-cover mix-blend-luminosity transition-opacity"
        :class="{
          'group-hocus:opacity-10': href,
        }"
        :src="image"
        :srcset="srcset"
        alt=""
        width="272"
        height="153"
        loading="lazy"
        decoding="async"
        crossorigin="anonymous"
      />
      <div class="flex h-full flex-col justify-end bg-gradient-to-t from-black p-4 font-serif text-xs uppercase text-white">
        <dl
          class="flex flex-col justify-end"
          :class="{
            'transition-transform group-hocus:-translate-y-1 group-hocus:transform-gpu': href,
          }"
        >
          <dt class="sr-only">Event</dt>
          <dd class="font-bold" v-text="event"></dd>
          <dt class="sr-only">Talk</dt>
          <dd v-text="talk"></dd>
        </dl>
      </div>
      <icon :name="iconName" v-if="href" class="absolute top-4 left-4 text-xl text-white opacity-80 group-hocus:opacity-100" />
    </component>
  </article>
</template>
