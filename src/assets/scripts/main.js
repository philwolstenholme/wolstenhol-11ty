// import 'focus-visible'
import 'alpinejs';
import 'wicg-inert';

window.loadjs = require('loadjs');

// twitter-intents
// quicklink

// howler for the music stuff

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
