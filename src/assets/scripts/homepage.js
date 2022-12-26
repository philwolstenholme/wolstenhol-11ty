import lozad from 'lozad';
import AsyncAlpine from 'async-alpine';
import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';

import ric from './utils/request-idle-callback.js';

window.lozad = lozad('[data-lozad]', {
  enableAutoReload: true,
});
window.lozad.observe();

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
  .data('PwHeader', () => import('./alpine/PwHeader'))
  .data('PwCardInstagram', () => import('./alpine/PwCardInstagram'))
  .data('PwCardMusic', () => import('./alpine/PwCardMusic'))
  .data('PwGenre', () => import('./alpine/PwGenre'))
  .data('PwLightbox', () => import('./alpine/PwLightbox'))
  .data('PwMusic', () => import('./alpine/PwMusic'))
  .data('PwSimpleScroller', () => import('./alpine/PwSimpleScroller'))
  .data('PwSpotifyLive', () => import('./alpine/PwSpotifyLive'))
  .data('PwTweets', () => import('./alpine/PwTweets'))
  .start();

Alpine.start();

if (navigator.connection && navigator.connection.effectiveType && navigator.connection.effectiveType != '4g') {
  document.querySelectorAll('[data-section="photos"] video source').forEach(source => source.remove());
}

if (!HTMLElement.prototype.hasOwnProperty('inert')) {
  ric(() => {
    import('wicg-inert');
  });
}

function undoHeaderContentInvisibility() {
  document.querySelector('.pw-header').style.contentVisibility = 'visible';
}

window.addEventListener('scroll', undoHeaderContentInvisibility, { once: true });

if (window.scrollY > 0) {
  undoHeaderContentInvisibility();
}

if (window.location.hash === '#stars') {
  window.location.replace('/github-stars');
}

if (window.location.hash === '#contact') {
  window.location.replace('/contact');
}

if (window.location.hash === '#tweets') {
  window.location.hash = '#tweetsAndToots';
}

const clickableCards = ['.foursquare-card', '.card-blog', '.reading-list-link'];
const clickableCardEls = document.querySelectorAll(clickableCards.join(','));
if (clickableCardEls && clickableCardEls.length) {
  clickableCardEls.forEach(card => {
    const link = card.querySelector('a');

    if (link) {
      card.classList.add('cursor-pointer');
      let down, up;

      card.onmousedown = () => (down = +new Date());
      card.onmouseup = e => {
        up = +new Date();
        if (e.target !== link && up - down < 200) {
          link.click();
        }
      };
    }
  });
}
