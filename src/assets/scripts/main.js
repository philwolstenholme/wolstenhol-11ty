import AsyncAlpine from 'async-alpine';
import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';

import ric from './utils/request-idle-callback.js';

// import CssNakedDay from './css-naked-day.js';
// CssNakedDay();

window.Alpine = Alpine;

Alpine.plugin(intersect);
Alpine.plugin(focus);

document.addEventListener('alpine:init', () => {
  Alpine.store('music', {
    isPlaying: false,
  });
});

AsyncAlpine.init(Alpine)
  .data('PwCardInstagram', () => import('./alpine/PwCardInstagram'))
  .data('PwCardMusic', () => import('./alpine/PwCardMusic'))
  .data('PwContact', () => import('./alpine/PwContact'))
  .data('PwGenre', () => import('./alpine/PwGenre'))
  .data('PwHeader', () => import('./alpine/PwHeader'))
  .data('PwLightbox', () => import('./alpine/PwLightbox'))
  .data('PwMusic', () => import('./alpine/PwMusic'))
  .data('PwSimpleScroller', () => import('./alpine/PwSimpleScroller'))
  .data('PwSpotifyLive', () => import('./alpine/PwSpotifyLive'))
  .data('PwTweets', () => import('./alpine/PwTweets'))
  .start();

Alpine.start();

if (navigator?.connection?.effectiveType != '4g' || navigator?.connection?.saveData) {
  document.querySelectorAll('[data-section="photos"] video source').forEach(source => source.remove());
}
