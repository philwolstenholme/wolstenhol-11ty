import loadjs from 'loadjs';
import wretch from 'wretch';

const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;

export default function PwSpotifyLive() {
  return {
    initialData: {
      playedAt: null,
      name: null,
      artistList: null,
      trackUrl: null,
    },
    data: {
      ...this.initialData,
    },
    timeagoLoaded: false,
    queryInterval: null,
    queryTimeout: null,
    queryApi: async function queryApi() {
      if (document.visibilityState !== 'visible') {
        return;
      }

      let apiData;
      try {
        apiData = await wretch('https://wolstenhol.me/api/recently-played-spotify').get().json();
      } catch (error) {
        console.error(error);
      }

      if (typeof apiData === 'object' && Object.keys(apiData).length === 0) {
        this.data = {
          ...this.initialData,
        };

        if (window.timeago) {
          window.timeago.cancel(this.$refs.label);
        }

        return;
      }

      if (typeof apiData === 'object' && Object.keys(apiData).length > 0) {
        this.data = apiData;
      }

      // If loadjs has't previously loaded timeago then let's load it.
      if (!loadjs.isDefined('timeago')) {
        loadjs('https://wolstenhol.me/proxy/jsdelivr/npm/timeago.js@4.0.2/dist/timeago.min.js', 'timeago', {
          before: (path, el) => {
            // We add a SRI hash to make up for the security risk of loading JS from a third-party.
            el.integrity = 'sha256-sTurDi2etLN9CpnUIoCC9y5iynb2qr/uo6QJqzoO7mA=';
            el.crossOrigin = 'anonymous';
          },
        });
      }

      loadjs.ready('timeago', () => {
        // Apply timeago against the DOM node for our 'x minutes ago' label.
        window.timeago.render(this.$refs.label);
        // Set a boolean so we can display our component. We do this to avoid a flash of content
        // jumping in once timeago has been loaded and applied to the element.
        this.timeagoLoaded = true;
      });
    },
    startInterval() {
      const timeoutInMinutes = 15;
      // Create an interval to check the API every-so-often.
      this.queryInterval = setInterval(this.queryApi.bind(this), MILLISECONDS_IN_A_SECOND * 30);
      // Create a timeout to eventually clear the interval so we don't hit the API infinitely if someone
      // leaves the page open forever.
      this.queryTimeout = setTimeout(() => {
        clearInterval(this.queryInterval);
      }, MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE * timeoutInMinutes);
    },
    stopInterval() {
      clearInterval(this.queryInterval);
      clearTimeout(this.queryTimeout);
    },
    onVisibilityChange() {
      // If someone has just come back to the page after having it hidden then let's hit the API.
      if (document.visibilityState === 'visible') {
        this.queryApi();
      }
    },
    init() {
      // Hit the API when the component is initalised.
      this.queryApi();

      loadjs.ready('timeago', () => {
        // If the playedAt time from the API changes (e.g. a new track starts playing) then we need
        // to reinitalise timeago, cancelling any existing instance and then creating a new one.
        this.$watch('data.playedAt', () => {
          const labelEl = this.$refs.label;

          if (labelEl.getAttribute('timeago-id')) {
            window.timeago.cancel(labelEl);
          }

          if (this.data.playedAt) {
            window.timeago.render(labelEl);
          }
        });
      });

      document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
    },
    destroy() {
      clearInterval(this.queryInterval);
      clearTimeout(this.queryTimeout);
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    },
  };
}
