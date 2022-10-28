import AsyncAlpine from 'async-alpine';
import Alpine from 'alpinejs';

AsyncAlpine.init(Alpine)
  .data('PwHeader', () => import('./alpine/PwHeader'))
  .data('PwContact', () => import('./alpine/PwContact'))
  .start();

Alpine.start();
