<template>
  <dialog
    class="bg-binding-dark p-4 transform shadow-2xl select-none"
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
      class="absolute text-lg font-bold bg-binding-dark hover:bg-black focus:bg-black transition px-3 py-2 right-3 rounded-bl-lg text-white top-3"
      x-on:click="$root.close();"
    >
      Close
    </button>
  </dialog>
</template>
