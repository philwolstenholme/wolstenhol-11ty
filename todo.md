# Todos

## General

- [x] Basic OG image
- [x] Per-page bundles for unique JS
- [ ] Per-page bundles for unique CSS _that isn't inlined_ (should be handled via Vue plugin)
- [ ] Remove duplication when the scroll saver thing is used
- [x] use something like !window.matchMedia('(hover: hover)').matches to turn off Instagram lightbox on 'mobile'
- [x] Remove Twitter lazyloading as it causes CLS
- [x] Fix issue of Twitter scrollsaver appearing at top when going from desktop to mobile
- [ ] Connect work screenshots script to Cloudinary uploader
- [ ] Make components for non-homepage header and lede
- [ ] Do some fancy CSS clipping and animating to make a full-page screenshot 'scroll' on hover on portfolio

## Integrations

- [ ] Pull in toots and boosted toots
- [ ] Design new card for Mastodon posts, like Twitter one but different colour scheme

## Testing

- [ ] Add Playwright test for audio player, Spotify now playing etc
- [ ] Use MSW for mocking in Playwright
- [ ] Also use MSW for mocking in Vitest
- [ ] Give talk on the above!

## Github stars

- [] Pagination

## Alpine

- [ ] Use `x-spread` to avoid Alpine/Vue conflict and remove need for Vite rewrite workaround
- [ ] Or use https://github.com/rollup/plugins/tree/master/packages/replace
- [ ] break scroll shadow into a mixin, use for scroller and header
- [ ] vibrate when end of scroller/header reached

## Vite migration

- [ ] Move build dependencies to devDependencies
- [ ] Review dependencies and remove unused
- [x] Noscript for CSS not working any more

## Service worker

- [ ] https://developer.chrome.com/docs/workbox/serving-cached-audio-and-video/

## CSS

- Go through old Vue templates and replace scoped CSS with utilities or custom CSS

## Eleventy

- [ ] Move speaking data to a collection?
- [x] Sort out page templates for homepage vs other pages
- [ ] Use navigation plugin to do active link classes in top nav with HTML not JS
- [x] FINISH portfolio section from local feature branch

## Accessibility

- [ ] Review how linked cards work, e.g. have only the heading be a link and handle clicks elsewhere via JS (to reduce SR verbosity)
