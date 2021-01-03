// import 'focus-visible'
import 'alpinejs';

window.loadjs = require('loadjs');

// twitter-intents
// quicklink
// alpine

// howler for the music stuff

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
