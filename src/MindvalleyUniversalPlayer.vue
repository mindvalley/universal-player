<template>
  <div>
    <AudioPlayer
      v-if="audioMode"
      v-bind="$props"
      @ready="('ready', $event)"
      @play="emitEvent('play', $event)"
      @pause="emitEvent('pause', $event)"
      @seeking="emitEvent('seeking', $event)"
      @timeupdate="emitEvent('timeupdate', $event)"
      @ended="emitEvent('ended', $event)"
    />
    <VideoPlayer
      v-if="videoMode"
      v-bind="$props"
      @ready="('ready', $event)"
      @play="emitEvent('play', $event)"
      @pause="emitEvent('pause', $event)"
      @seeking="emitEvent('seeking', $event)"
      @timeupdate="emitEvent('timeupdate', $event)"
      @ended="emitEvent('ended', $event)"
    />
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';

import AudioPlayer from '@/components/AudioPlayer.vue';
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
  name: 'MindvalleyUniversalPlayer',
  components: {
    AudioPlayer,
    VideoPlayer,
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
    mediaDuration: {
      type: Number,
      required: true,
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
  computed: {
    audioMode() {
      return (this.playerType === 'audio');
    },
    videoMode() {
      return (this.playerType === 'video');
    },
  },
  methods: {
    emitEvent(event, payload) {
      this.$emit(event, payload);
    },
  },
};
</script>

<style lang="scss">
@import 'assets/embedded-woff2.css';
</style>
