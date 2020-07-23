<template>
  <div class="mv-universal-player-container">
    <video
      ref="videoElement"
      :poster="posterUrl"
      :class="{'mv-universal-player--with-markers' : markersEnabled}"
      preload="true"
      controls
      class="mv-universal-player video-js"
    >
      <source
        v-for="source in sources"
        :key="source.type"
        :type="source.type"
        :src="source.src"
      >
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that
        <a
          href="https://videojs.com/html5-video-support/"
          target="_blank"
        > supports HTML5 video</a>
      </p>
    </video>

    <Markers
      v-if="markersEnabled"
      :show-markers-menu="showMarkersMenu"
      :markers="markers"
      @markerItemClick="onMarkerItemClick($event)"
      @markersMenuVisibilityChange="onMarkersMenuVisibilityChange($event)"
    />
  </div>
</template>

<script>
import videojs from 'video.js';

import Markers from '@/components/Markers.vue';

export default {
  name: 'VideoPlayer',
  components: {
    Markers,
  },
  props: {
    playerType: {
      type: String,
      default: 'video',
      validator(value) {
        return [
          'video',
          'audio',
        ].indexOf(value) !== -1;
      },
    },
    sources: {
      type: Array,
      required: true,
    },
    posterUrl: {
      type: String,
      default: '',
    },
    mediaTitle: {
      type: String,
      default: '',
    },
    markers: {
      type: Array,
      default() {
        return [];
      },
    },
    playbackRates: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      videoPlayer: Object,
      videoElement: Object,
      playing: false,
      showMarkersMenu: false,
    };
  },
  computed: {
    markersEnabled() {
      return this.markers.length !== 0;
    },
    playbackRatesEnabled() {
      return this.playbackRates.length !== 0;
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.videoElement = this.$refs.videoElement;
      const self = this;

      if (this.crossOrigin !== '') {
        this.videoElement.crossOrigin = this.crossOrigin;
        this.videoElement.setAttribute('crossOrigin', this.crossOrigin);
      }

      this.videoPlayer = videojs(this.videoElement, {
        fluid: true,
        playbackRates: this.playbackRates,
        controlBar: {
          pictureInPictureToggle: false,
        },
      });

      if (this.markersEnabled) {
        const button = videojs.getComponent('Button');
        const markersButton = videojs.extend(button, {
          constructor() {
            // eslint-disable-next-line prefer-rest-params
            button.apply(this, arguments);
            this.controlText('Jump To');
          },
          handleClick() {
            self.toggleMarkers();
          },
        });

        videojs.registerComponent('markersButton', markersButton);
        this.videoPlayer.getChild('controlBar').addChild('markersButton', {});
      }
    },
    play() {
      this.videoPlayer.play();
    },
    pause() {
      this.videoPlayer.pause();
    },
    jumpToTime(seconds) {
      this.play();
      this.videoPlayer.currentTime(seconds);
    },
    toggleMarkers() {
      this.showMarkersMenu = !this.showMarkersMenu;
    },
    onMarkerItemClick(seconds) {
      this.jumpToTime(seconds);
    },
    onMarkersMenuVisibilityChange() {
      this.toggleMarkers();
    },
  },
};
</script>

<style lang="scss" scoped>
.mv-universal-player-container {
  position: relative;
  display: flex;
  overflow: hidden;
  font-family: sans-serif;
}

.mv-universal-player {
  position: relative;
  width: 100%;
  flex-shrink: 0;
  padding-top: 56.25%;
  border-radius: 10px;
}

@media (min-width: 1000px) {
  .mv-universal-player--with-markers {
    width: 65%;
    padding-top: 36.5625%;
    border-radius: 10px 0 0 10px;
  }
}

.mv-universal-player > video,
::v-deep .vjs-poster {
  border-radius: 10px;
}

::v-deep .mv-universal-player.video-js:hover .vjs-big-play-button {
  background-color: rgba(255, 255, 255, 0.75);
  transition: background-color 0.3s linear;
  border-color: transparent;
}

::v-deep .mv-universal-player .vjs-big-play-button {
  top: auto;
  bottom: 15px;
  left: 12.5px;
  width: 50px;
  height: 50px;
  font-size: 2.5em;
  line-height: 1.9;
  border-radius: 50%;
  border-color: transparent;
  color: black;
  background-color: white;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s linear;
}

@media (min-width: 600px) {
  ::v-deep .mv-universal-player .vjs-big-play-button {
    bottom: 30px;
    left: 25px;
    width: 70px;
    height: 70px;
    font-size: 3.5em;
  }
}

::v-deep .vjs-control-bar {
  font-size: 100%;
}

@media (min-width: 600px) {
  ::v-deep .vjs-control-bar {
    font-size: 130%;
  }
}

::v-deep .vjs-control.vjs-button[title="Jump To"] {
  width: 6em;
  padding-right: 10px;
}

@media (min-width: 1000px) {
  ::v-deep .vjs-control.vjs-button[title="Jump To"] {
    display: none;
  }
}

::v-deep .vjs-control.vjs-button[title="Jump To"] > .vjs-control-text {
  position: static;
  width: auto;
  height: auto;
  clip: auto;
}
</style>
