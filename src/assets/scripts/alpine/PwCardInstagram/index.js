import loadjs from 'loadjs';

document.addEventListener('alpine:init', () => {
  Alpine.data('PwCardInstagram', $root => ({
    playing: false,
    confetti($root) {
      loadjs('https://wolstenhol.me/proxy/jsdelivr/npm/canvas-confetti@1.5.1/dist/confetti.browser.js', 'canvas-confetti', {
        success: () => {
          var dimensions = $root.getBoundingClientRect();
          var centerXCoord = dimensions.left + window.pageXOffset + dimensions.width / 2;
          var centerYCoord = dimensions.y + dimensions.height / 2;

          var count = 150;
          var defaults = {
            origin: {
              y: centerYCoord / window.innerHeight,
              x: centerXCoord / window.innerWidth,
            },
            disableForReducedMotion: true,
          };

          function fire(particleRatio, opts) {
            confetti(
              Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
              })
            );
          }

          fire(0.25, {
            spread: 26,
            startVelocity: 55,
          });

          fire(0.2, {
            spread: 60,
          });

          fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
          });

          fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
          });

          fire(0.1, {
            spread: 120,
            startVelocity: 45,
          });
        },
        before: (path, el) => {
          // We add a SRI hash to make up for the security risk of loading JS from a third-party.
          el.integrity = 'sha256-DLqQ9Jy1MLOv8QhzYyGo2km2ZBmOZFsL2GsXlogfgOk=';
          el.crossOrigin = 'anonymous';
        },
      });
    },
  }));
});
