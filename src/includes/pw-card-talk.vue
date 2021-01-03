<script>
import icon from './icon.vue';

export default {
  components: {
    icon,
  },
  props: ['event', 'talk', 'image', 'href'],
};
</script>

<template>
  <article class="overflow-hidden rounded shadow-hard" style="min-width: 272px">
    <component :is="href ? 'a' : 'div'" :href="href" class="block group aspect-h-9 aspect-w-16 bg-black w-full overflow-hidden">
      <h3 class="sr-only">{{ talk }}</h3>
      <img
        v-if="image"
        class="object-cover opacity-70 transition-opacity"
        :class="{
          'group-hocus:opacity-40': href,
        }"
        :src="image"
        width="272"
        height="153"
        loading="lazy"
        alt=""
      />
      <div class="flex flex-col justify-end">
        <dl class="flex flex-col justify-end p-4 bg-gradient-to-t from-black text-white uppercase font-serif text-xs h-full">
          <dt class="sr-only">Event</dt>
          <dd class="font-bold" v-text="event"></dd>
          <dt class="sr-only">Talk</dt>
          <dd v-text="talk"></dd>
        </dl>
      </div>
      <icon name="link" v-if="href" class="absolute text-white top-4 left-4 opacity-80 group-hocus:opacity-100" />
    </component>
  </article>
</template>
