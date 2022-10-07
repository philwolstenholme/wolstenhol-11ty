<template>
  <dialog
    class="bg-black p-4 transform shadow-2xl select-none"
    x-ignore
    ax-load="idle"
    x-data="PwLightbox"
    x-on:pw-lightbox-open.window="onOpen($event)"
    x-on:close="onClose()"
    x-on:click.self="$el.close()"
    x-bind:class="className"
  >
    <div class="grid grid-stack bg-black">
      <div x-show="showLoadingSpinner" class="w-full h-full flex items-center justify-center">
        <svg x-ignore width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
              </path>
            </g>
          </g>
        </svg>
      </div>
      <img
        alt=""
        x-bind:srcSet="srcSet"
        class="object-contain"
        x-bind:alt="alt"
        x-bind:width="width"
        x-bind:height="height"
        x-bind:style="style"
        x-on:load="showLoadingSpinner=false"
        x-on:error="$root.close()"
      />
    </div>
    <button
      type="button"
      class="absolute text-lg font-bold bg-black px-3 py-2 right-3 rounded-bl-lg text-white top-3"
      x-on:click="$root.close();"
    >
      <span class="sr-only">Close</span>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </dialog>
</template>
