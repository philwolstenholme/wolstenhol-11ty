import AsyncAlpine from 'async-alpine';
import Alpine from 'alpinejs';

AsyncAlpine.init(Alpine)
  .data('PwHeader', () => import('./alpine/PwHeader'))
  .start();

Alpine.start();
