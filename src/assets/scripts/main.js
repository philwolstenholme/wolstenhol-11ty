import 'alpinejs';
// import 'wicg-inert';
// import 'what-input';
import Horizon from '@mintuz/horizon';
window.Horizon = Horizon;

// quicklink

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
