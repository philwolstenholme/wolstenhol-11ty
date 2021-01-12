// import 'focus-visible'
import 'alpinejs';
import 'wicg-inert';
import 'what-input';

window.loadjs = require('loadjs');

// twitter-intents
// quicklink

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
