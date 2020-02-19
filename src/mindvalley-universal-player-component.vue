<template>
  <div
    :class="{ 'mv-universal-player-container--audio' : audioPlayerMode }"
    class="mv-universal-player-container"
  >
    <video
      ref="video"
      preload="true"
      :poster="posterUrl"
      :controls="showControls"
      :autoplay="autoplay"
      :class="videoClasses"
      class="mv-universal-player video-js"
    >
      <source
        v-for="source in sources"
        v-bind:key="source.type"
        :type="source.type"
        :src="source.src"
      >
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank"> supports HTML5 video</a>
      </p>
    </video>

    <!-- Markers Section -->
    <!-- For video player only -->
    <section
      v-if="markersEnabled"
      :class="{ 'is-active' : showMarkersMenu }"
      class="markers-container">
      <header class="markers-header">
        <div class="markers-header__title">Jump To</div>
        <button
          @click="toggleMarkers"
          class="button button--close"
        >
          <div class="vjs-icon-cancel"></div>
        </button>
      </header>

      <ul
        ref="markers"
        class="markers"
      >
        <li
          @click="jumpTo(marker.time)"
          v-for="marker in markers"
          class="markers__item"
        >
          <span class="markers__time">
            {{ formatDuration(marker.time) }}
          </span>
          <span class="markers__text">
            {{ marker.text }}
          </span>
        </li>
      </ul>
    </section>

    <!-- Audio Player Default User Interface Section -->

    <section
      v-if="audioPlayerMode"
      class="audio-interface"
    >
      <section class="audio-interface__head">
        <div
          :style="{ backgroundImage: 'url(' + this.posterUrl + ')' }"
          class="audio-interface__poster"></div>
      </section>

      <section class="audio-interface__body">
        <div class="audio-interface__title">
          {{ mediaTitle }}
        </div>

        <div class="audio-interface__progress-bar">
          <small class="audio-interface__current-time">
            {{ formatDuration(currentTime) }}
          </small>
          <small class="audio-interface__duration">
            {{ formatDuration(duration) }}
          </small>
          <div
            @click="seek"
            ref="seeker"
            class="audio-interface__seeker"
          >
            <div
              ref="progress"
              :style="{ width: this.durationCompletionPercentage + '%' }"
              class="audio-interface__current-time-seeker"></div>
          </div>
        </div>

        <div class="audio-interface__controls">

          <button class="button button--audio-rewind">
            <i class="fas fa-backward"></i>
          </button>

          <button
            v-if="playing"
            @click="togglePlayState()"
            class="button button--audio-play">
              <div><i class="fas fa-pause"></i></div>
          </button>

          <button
            v-if="!playing"
            @click="togglePlayState()"
            class="button button--audio-play">
              <div><i class="fas fa-play"></i></div>
          </button>

          <button class="button button--audio-playback-rate">
            1x
          </button>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: 'MindvalleyUniversalPlayer',
  props: {
    playerType: {
      type: String,
      default: 'video',
      validator: function (value) {
        return [
          'video',
          'audio',
        ].indexOf(value) !== -1
      }
    },
    sources: {
      type: Array,
      required: true,
    },
    posterUrl: {
      type: String,
      // TODO: Placeholder that is suitable for AUDIO & VIDEO media
      default: '',
    },
    duration: {
      type: Number,
      required: true,
    },
    mediaTitle: {
      type: String,
    },
    markers: {
      type: Array,
    },
    showControls: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    playbackRates: {
      type: Array,
      default: function () {
        return [0.5, 1, 1.5, 2]
      }
    },
    disablePlaybackRates: {
      type: Boolean,
      default: false,
    },
    disableFullscreen: {
      type: Boolean,
      default: false,

    },
    enablePictureInPicture: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      video: null,
      player: null,
      playing: false,
      currentTime: 0,
      showMarkersMenu: false,
    }
  },
  computed: {
    videoPlayerMode: function () {
      return this.playerType == 'video' ? true : false;
    },
    audioPlayerMode: function () {
      return this.playerType == 'audio' ? true : false;
    },
    videoClasses: function () {
      var videoClasses;

      videoClasses += (this.markersEnabled) ? ' mv-universal-player--with-markers ' : '';
      videoClasses += (this.audioPlayerMode) ? ' mv-universal-player--audio ' : '';

      return videoClasses;
    },
    durationCompletionPercentage: function () {
      return (this.currentTime / this.duration) * 100;
    },
    markersEnabled: function () {
      return (this.markers != null && this.playerType == 'video') ? true : false;
    },
    sortedMarkers: function () {
      return this.markersEnabled ? this.markers.sort((a, b) => a.time - b.time) : null;
    },
  },
  mounted () {
    this.initialize();
  },
  beforeDestroy () {
    if (!this.player) {
      this.player.dispose();
    }
  },
  methods: {
    initialize () {
      this.video = this.$refs.video;

      if (this.crossOrigin !== '') {
        this.video.crossOrigin = this.crossOrigin;
        this.video.setAttribute('crossOrigin', this.crossOrigin);
      }

      const self = this;

      this.player = videojs(this.video, {
        playbackRates: this.playbackRates,
        fluid: true,
        // For reference:
        // https://github.com/videojs/video.js/blob/master/src/js/control-bar/control-bar.js
        controlBar: {
          fullscreenToggle: !this.disableFullscreen,
          playbackRateMenuButton: !this.disablePlaybackRates,
          pictureInPictureToggle: this.enablePictureInPicture,
        }
      });

      this.player.on('timeupdate', function() {
        self.currentTime = this.currentTime();
        self.$emit('timeupdate', this.currentTime());
      });

      this.player.on('play', function() {
        self.playing = true;
      });

      this.player.on('pause', function() {
        self.playing = false;
      });

      if (this.markersEnabled) {
        var button = videojs.getComponent('Button');
        var markersButton = videojs.extend(button, {
          constructor: function() {
              button.apply(this, arguments);
              this.controlText("Jump To");
            },
            handleClick: function() {
              self.toggleMarkers();
            }
        });

        videojs.registerComponent('markersButton', markersButton);
        this.player.getChild('controlBar').addChild('markersButton', {});
      }

    },
    play: function () {
      this.player.play();
    },
    pause: function () {
      this.player.pause();
    },
    togglePlayState: function () {
      this.playing ? this.pause() : this.play();
    },
    seek: function(event) {
      var completionPercentage = (event.offsetX / this.$refs.seeker.offsetWidth) * 100;
      var currentTime = this.duration * (completionPercentage / 100);
      this.jumpTo(currentTime);
    },
    jumpTo: function (seconds) {
      this.play();
      this.player.currentTime(seconds);
    },
    toggleMarkers: function () {
      this.showMarkersMenu = !this.showMarkersMenu;
    },
    formatDuration: function(duration) {
      var hour = Math.floor(duration / 3600) || 0;
      var minute = Math.floor((duration % 3600) / 60) || 0;
      var second = Math.floor(duration % 60) || 0;
      var sec_min = "";

      if (hour > 0) {
        sec_min += "" + hour + ":" + (minute < 10 ? "0" : "")
      }
      sec_min += "" + minute + ":" + (second < 10 ? "0" : "");
      sec_min += "" + second;

      return sec_min
    },
  }
}
</script>

<style lang="scss">
@import 'video.js/dist/video-js';
// This is for overrding Video.js' default styles.
// Video.js renders the element after the DOM is loaded.
// Scoped styles won't work.
.mv-universal-player.video-js:hover .vjs-big-play-button {
  background-color: rgba(255, 255, 255, 0.75);
  transition: background-color 0.3s linear;
  border-color: transparent;
}

.mv-universal-player .vjs-big-play-button {
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
  .mv-universal-player .vjs-big-play-button {
    bottom: 30px;
    left: 25px;
    width: 70px;
    height: 70px;
    font-size: 3.5em;
  }
}

.vjs-control-bar {
  font-size: 100%;
}

@media (min-width: 600px) {
  .vjs-control-bar {
    font-size: 130%;
  }
}

.vjs-control.vjs-button[title="Jump To"] {
  width: 6em;
  padding-right: 10px;
}

@media (min-width: 1000px) {
  .vjs-control.vjs-button[title="Jump To"] {
    display: none;
  }
}

.vjs-control.vjs-button[title="Jump To"] > .vjs-control-text {
  position: static;
  width: auto;
  height: auto;
  clip: auto;
}
</style>

<style scoped lang="scss">
$light-grey: rgba(148, 148, 148, 0.7);
$dark-grey: rgb(30, 30, 30);

// Container that hosts both player and markers section.
.mv-universal-player-container {
  position: relative;
  display: flex;
  overflow: hidden;
  font-family: sans-serif;
}

.mv-universal-player--audio {
  display: none;
}

// Player Section
.mv-universal-player {
  position: relative;
  width: 100%;
  flex-shrink: 0;
  padding-top: 56.25%;
}

@media (min-width: 1000px) {
  .mv-universal-player--with-markers {
    width: 65%;
    padding-top: 36.5625%;
  }
}

/* Markers Section */
.markers-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  flex-shrink: 0;
  width: 100%;
  background-color: $dark-grey;
  color: $light-grey;
  font-family: sans-serif;
  transform: translateX(100%);
  z-index: 100;
  transition: transform 0.7s;
}

.markers-container.is-active {
  display: block;
  transform: translateX(0);
  transition: transform 0.7s;
}

@media (min-width: 600px) {
  .markers-container {
    display: block;
    width: 50%;
  }
}

@media (min-width: 1000px) {
  .markers-container {
    width: 35%;
    transform: translateX(0);
    transition: none;
  }
}

.markers-header {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 21px;
  border-bottom: 1px solid $light-grey;
}

@media (min-width: 1000px) {
  .markers-header {
    padding: 17.5px 21px;
  }
}

.markers,
.markers__item {
  padding: 10px;
}

.markers {
  list-style: none;
  margin: 0;
  height: 100%;
  overflow-y: auto;
}

.markers__item {
  display: flex;
  align-items: center;
  font-size: 0.875em;
  cursor: pointer;
  transition: color 0.4s, border-color 0.4s;
  &:hover {
    color: rgba(255, 255, 255, 0.9);
    transition: color 0.4s, border-color 0.4s;
  }
  &:last-child {
    // .markers-header height + 20px whitespace
    margin-bottom: 77px;
  }
}

.markers__item:hover > .markers__time {
  border-color: rgba(255, 255, 255, 0.9);
}

.markers__text,
.markers__time {
  vertical-align: middle;
}

.markers__text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.markers__time {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin-right: 15px;
  flex-shrink: 0;
  width: 75px;
  text-align: center;
  border: 1px solid $light-grey;
  border-radius: 5px;
}
/* end Markers Section  */

// Audio Player Interface
.audio-interface {
  width: 100%;
  color: white;
  background-color:#23272f;
}

@media (min-width: 1000px) {
  .audio-interface {
    display: flex;
  }
}

@media (min-width: 1000px) {
  .audio-interface__head {
    width: 30%;
  }
}

@media (min-width: 1000px) {
  .audio-interface__body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 70%;
    flex-grow: 1;
  }
}

.audio-interface__title,
.audio-interface__progress-bar,
.audio-interface__controls {
  padding: 20px;
}

.audio-interface__poster {
  width: 100%;
  padding-top: 100%;
  background-size: cover;
  background-position: center;
}

.audio-interface__title {
  text-align: center;
  font-weight: 700;
}

@media (min-width: 1000px) {
  .audio-interface__title {
    order: 1;
    flex-grow: 1;
    flex-shrink: 0;
    width: 70%;
    margin-bottom: -40px;
    margin-left: 10px;
    padding: 20px 20px 0 20px;
    font-size: 1.4em;
    text-align: left;
  }
}

.audio-interface__progress-bar {
  padding: 0 20px;
}

@media (min-width: 1000px) {
  .audio-interface__progress-bar {
    flex-grow: 1;
    order: 3;
    width: 200px;
    margin-left: -20px;
    padding: 0 20px 20px 20px;
  }
}

@media (min-width: 1000px) {
  .audio-interface__controls {
    order: 2;
    width: 200px;
    flex-shrink: 0;
    padding: 0 20px 20px 20px;
  }
}

.audio-interface__progress-bar {
  display: flex;
  flex-wrap: wrap;
}

.audio-interface__seeker {
  position: relative;
  background-color: grey;
  height: 5px;
  border-radius: 6px;
  width: 100%;
  flex-shrink: 0;
  margin-top: 5px;
}

.audio-interface__current-time-seeker {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #2a8cf8;
  border-radius: 6px;
}

.audio-interface__current-time {
  margin-left: 1px;
}

.audio-interface__duration {
  margin-left: auto;
  margin-right: 1px;
}

.audio-interface__controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  flex-shrink: 0;
}

.button--close {
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 20px;
  height: 36px;
  margin-left: auto;
  color: white;
}

@media (min-width: 1000px) {
  .button--close {
    display: none;
  }
}

.button--audio-play {
  width: 66px;
  height: 66px;
  font-size: 1em;
  line-height: 1.9;
  border-radius: 50%;
  border-color: transparent;
  color: black;
  background-color: white;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s linear;
}

.button--audio-rewind {
  width: 44px;
  height: 44px;
  margin-right: 15px;
  border: 2px solid white;
  border-radius: 50%;
  font-size: 0.8em;
  color: white;
  background: transparent;
}

.button--audio-playback-rate {
  width: 44px;
  height: 44px;
  margin-left: 15px;
  border: 2px solid white;
  border-radius: 50%;
  font-size: 0.95em;
  color: white;
  background: transparent;
}
</style>
