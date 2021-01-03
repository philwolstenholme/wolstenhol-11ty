<template>
  <ul
    class="scroller relative mt-5 flex space-x-5 overflow-x-auto overflow-y-auto custom-scrollbars scrolling-touch snap snap-x snap-mandatory"
  >
    <slot></slot>
  </ul>
</template>

<style>
.scroller::after {
  position: absolute;
  content: 'wooo';
}
</style>
