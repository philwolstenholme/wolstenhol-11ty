<template>
  <figure
    class="contain-content bg-purple-700 text-white rounded p-4 shadow-hard text-center space-y-3 flex flex-col justify-center"
    x-ignore
  >
    <blockquote class="font-serif text-xl font-bold max-w-md mx-auto leading-tight">
      <h3>&ldquo;<slot name="blockquote"></slot>&rdquo;</h3>
    </blockquote>
    <figcaption class="mx-9 text-white text-xs uppercase">
      <slot name="figcaption"></slot>
    </figcaption>
  </figure>
</template>
