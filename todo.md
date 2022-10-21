# Todos

## General

- [x] Basic OG image
- [ ] Per-page bundles for unique JS
- [ ] Per-page bundles for unique CSS _that isn't inlined_ (should be handled via Vue plugin)
- [ ] Remove duplication when the scroll saver thing is used

## Alpine

- [ ] Use `x-spread` to avoid Alpine/Vue conflict and remove need for Vite rewrite workaround

## Vite migration

- [ ] Serviceworker
- [ ] Move build dependencies to devDependencies
- [ ] Review dependencies and remove unused
- [ ] use something like !window.matchMedia('(hover: hover)').matches to turn off Instagram lightbox on 'mobile'
- [ ] Make the 'read X more' code DRY/componentised

## CSS

- Go through old Vue templates and replace scoped CSS with utilities or custom CSS

## Eleventy

- Move speaking data to a collection?
- Sort out page templates for homepage vs other pages
- FINISH portfolio section from local feature branch

## Accessibility

- Review how linked cards work, e.g. have only the heading be a link and handle clicks elsewhere via JS (to reduce SR verbosity)
