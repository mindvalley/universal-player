<template>
  <div class="mv-universal-player-container">
    <video
      ref="videoElement"
      preload="true"
      controls
      class="mv-universal-player--audio video-js"
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

    <div class="audio-interface">
      <section class="audio-interface__head">
        <div
          :style="{ backgroundImage: 'url(' + posterUrl + ')' }"
          class="audio-interface__poster"
        />
      </section>

      <section class="audio-interface__body">
        <div class="audio-interface__title">
          {{ mediaTitle }}
        </div>

        <div class="audio-interface__progress-bar">
          <div
            ref="seeker"
            class="audio-interface__seeker"
            @click="seek"
          >
            <div
              ref="progress"
              :style="{ width: durationCompletionPercentage + '%' }"
              class="audio-interface__current-time-seeker"
            />
          </div>
          <small class="audio-interface__current-time">
            {{ formatDuration(currentTime) }}
          </small>
          <small class="audio-interface__duration">
            {{ formatDuration(mediaDuration) }}
          </small>
        </div>

        <div class="audio-interface__controls">
          <button
            class="button button--audio-rewind"
            @click="rewind"
          >
            <i class="mup-icon mup-icon-rewind" />
          </button>

          <button
            v-if="playing"
            class="button button--audio-play"
            :class="{ 'push-button-right' : !playbackRatesEnabled }"
            @click="togglePlayState()"
          >
            <i class="mup-icon mup-icon-pause" />
          </button>

          <button
            v-if="!playing"
            class="button button--audio-play"
            :class="{ 'push-button-right' : !playbackRatesEnabled }"
            @click="togglePlayState()"
          >
            <i class="mup-icon mup-icon-play" />
          </button>

          <button
            v-show="playbackRatesEnabled"
            class="button button--audio-playback-rate"
            @click="nextPlaybackRate"
          >
            {{ playbackRate }}x
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: 'AudioPlayer',
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
    mediaDuration: {
      type: Number,
      required: true,
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
      audioPlayer: Object,
      videoElement: Object,
      playing: false,
      playbackRate: 1,
      currentTime: 0,
    };
  },
  computed: {
    playbackRatesEnabled() {
      return this.playbackRates.length !== 0;
    },
    durationCompletionPercentage() {
      return (this.currentTime / this.mediaDuration) * 100;
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

      this.audioPlayer = videojs(this.videoElement, {
        playbackRates: this.playbackRates,
      });

      this.audioPlayer.on('timeupdate', () => {
        self.currentTime = this.audioPlayer.currentTime();
        self.$emit('timeupdate', self.currentTime);
      });

      this.audioPlayer.on('play', () => {
        self.playing = true;
        self.$emit('playerPlay');
      });

      this.audioPlayer.on('pause', () => {
        self.playing = false;
        self.$emit('playerPause');
      });
    },
    play() {
      this.audioPlayer.play();
    },
    pause() {
      this.audioPlayer.pause();
    },
    togglePlayState() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },
    jumpToTime(seconds) {
      this.audioPlayer.currentTime(seconds);
      this.play();
    },
    rewind() {
      const time = this.currentTime - 10;
      this.jumpToTime(time);
    },
    nextPlaybackRate() {
      const currentPlaybackRateIndex = this.playbackRates.indexOf((
        this.audioPlayer.playbackRate()
      ));
      const nextPlaybackRateIndex = currentPlaybackRateIndex + 1;
      const playbackRatesLength = this.playbackRates.length;
      if (nextPlaybackRateIndex === playbackRatesLength) {
        // eslint-disable-next-line prefer-destructuring
        this.playbackRate = this.playbackRates[0];
        this.audioPlayer.playbackRate(this.playbackRates[0]);
      } else {
        this.playbackRate = this.playbackRates[nextPlaybackRateIndex];
        this.audioPlayer.playbackRate(this.playbackRates[nextPlaybackRateIndex]);
      }
    },
    seek(event) {
      const completionPercentage = (event.offsetX / this.$refs.seeker.offsetWidth) * 100;
      const currentTime = this.mediaDuration * (completionPercentage / 100);
      this.jumpToTime(currentTime);
    },
    formatDuration(duration) {
      const hour = Math.floor(duration / 3600) || 0;
      const minute = Math.floor((duration % 3600) / 60) || 0;
      const second = Math.floor(duration % 60) || 0;
      let secMin = '';

      if (hour > 0) {
        secMin += `${hour}:${minute < 10 ? '0' : ''}`;
      }
      secMin += `${minute}:${second < 10 ? '0' : ''}`;
      secMin += `${second}`;

      return secMin;
    },
  },
};
</script>

<style lang="scss">
.mv-universal-player--audio {
  display: none;
}

.audio-interface {
  width: 100%;
  max-width: 1080px;
  color: white;
  border-radius: 10px;
  background-color: #23272f;
  font-family: sans-serif;
}

@media (min-width: 600px) {
  .audio-interface {
    display: flex;
  }
}

.audio-interface__head {
  padding: 0;
}

@media (min-width: 600px) {
  .audio-interface__head {
    width: 35%;
  }
}

@media (min-width: 1000px) {
  .audio-interface__head {
    width: 25%;
  }
}

@media (min-width: 600px) {
  .audio-interface__body {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    flex-grow: 1;
    width: 65%;
    padding: 1.25rem;
  }
}

@media (min-width: 1000px) {
  .audio-interface__body {
    align-items: center;
    width: 75%;
    padding: 1.5rem;
  }
}

.audio-interface__title,
.audio-interface__progress-bar,
.audio-interface__controls {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

.audio-interface__poster {
  width: 100%;
  padding-top: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media (min-width: 600px) {
  .audio-interface__poster {
    border-radius: 10px 0 0 10px;
    box-shadow: none;
  }
}

.audio-interface__title {
  margin-right: 1px;
  margin-left: 1px;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.5;
}

@media (min-width: 600px) {
  .audio-interface__title {
    order: 1;
    flex-grow: 1;
    flex-shrink: 0;
    width: 70%;
    padding: 0 0 1rem 0;
    font-size: 1.4em;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media (min-width: 1000px) {
  .audio-interface__title {
    width: 100%;
    padding-bottom: 1.25rem;
  }
}

.audio-interface__progress-bar {
  display: flex;
  flex-wrap: wrap;
  padding: 0 1.5rem;
}

@media (min-width: 600px) {
  .audio-interface__progress-bar {
    flex-grow: 1;
    order: 3;
    width: 200px;
    margin: 0;
    padding: 1rem 0 0 0;
  }
}

.audio-interface__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;
  padding-bottom: 2.75rem;
}

@media (min-width: 600px) {
  .audio-interface__controls {
    order: 2;
    width: 600px;
    flex-shrink: 1;
    padding: 0;
  }
}

@media (min-width: 1000px) {
  .audio-interface__controls {
    width: 230px;
    flex-shrink: 0;
    padding: 0;
  }
}

.audio-interface__seeker {
  position: relative;
  background-color: grey;
  height: 7px;
  border-radius: 6px;
  width: 100%;
  flex-shrink: 0;
  margin-bottom: 0.5rem;
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

.button--audio-play {
  width: 66px;
  height: 66px;
  font-size: 1em;
  line-height: 1;
  border-radius: 50%;
  font-size: 2.25rem;
  padding: 0.25rem 0 0 0;
  border-color: transparent;
  color: black;
  background-color: white;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s linear;
}

@media (min-width: 1000px) {
  .button--audio-play {
    order: 1;
    margin-right: 1rem;
  }
}

.button--audio-rewind {
  width: 40px;
  outline: none;
  padding: 0;
  border: none;
  font-size: 45px;
  margin-right: 1rem;
  color: white;
  background: transparent;
}

@media (min-width: 1000px) {
  .button--audio-rewind {
    order : 3;
    margin-right: 0;
  }
}

.button--audio-play > i {
  width: 20px;
  height: 40px;
}

.button--audio-playback-rate {
  width: 44px;
  height: 44px;
  margin-left: 1rem;
  border: 2px solid white;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: transparent;
}

@media (min-width: 1000px) {
  .button--audio-playback-rate {
    order: 2;
    margin-left: 0;
    margin-right: 0.6rem;
  }
}

@media (max-width: 599px) {
  .push-button-right {
    margin-right: 60px;
  }
}
</style>
