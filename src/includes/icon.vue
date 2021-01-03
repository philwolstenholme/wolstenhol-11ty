<script>
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faSync,
  faUser,
  faPlay,
  faPause,
  faMapMarkerAlt,
  faMehRollingEyes,
  faPenAlt,
  faCameraRetro,
  faHeadphones,
  faCode,
  faCalendarAlt,
  faLink,
  faChevronRight,
  faChevronLeft,
  faPlayCircle,
  faSyncAlt,
  faChalkboardTeacher,
  faEnvelope,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import camelCase from 'lodash/camelCase';

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    source: {
      type: String,
      default: 'font-awesome',
    },
    name: {
      type: String,
      required: true,
    },
    iconSize: {
      default: 'm',
    },
  },
  computed: {
    // https://fontawesome.com/icons
    fontAwesomeIcon() {
      return {
        // Add new icons to this list as you need them
        sync: faSync,
        user: faUser,
        play: faPlay,
        pause: faPause,
        mapMarkerAlt: faMapMarkerAlt,
        mehRollingEyes: faMehRollingEyes,
        penAlt: faPenAlt,
        cameraRetro: faCameraRetro,
        headphones: faHeadphones,
        twitter: faTwitter,
        code: faCode,
        calendar: faCalendarAlt,
        link: faLink,
        chevronRight: faChevronRight,
        chevronLeft: faChevronLeft,
        playCircle: faPlayCircle,
        refresh: faSyncAlt,
        chalkboardTeacher: faChalkboardTeacher,
        envelope: faEnvelope,
        paperPlane: faPaperPlane,
      }[this.name];
    },
    // Gets a CSS module class, e.g. iconCustomLogo
    customIconClass() {
      return this.$style[camelCase('icon-custom-' + this.name)];
    },
  },
};
</script>

<template>
  <FontAwesomeIcon
    v-if="source === 'font-awesome'"
    :icon="fontAwesomeIcon"
    :size="iconSize"
    v-bind="$attrs"
    class="icon"
    width="16"
    height="16"
  />
  <span v-else-if="source === 'custom'" :class="customIconClass" />
</template>

<style>
svg:not(:root).svg-inline--fa {
  overflow: visible;
}
.svg-inline--fa.fa-w-16 {
  width: 1em;
}
.svg-inline--fa.fa-w-10 {
  width: 0.625em;
}
.svg-inline--fa.fa-w-14 {
  width: 0.875em;
}
.svg-inline--fa.fa-w-12 {
  width: 0.75em;
}
.fa-spin {
  animation: fa-spin 2s infinite linear;
}
.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
@-webkit-keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-4x {
  font-size: 4em;
}
</style>
