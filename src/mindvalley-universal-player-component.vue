<template>
  <div>
    <video
      ref="player"
      preload="auto"
      :poster="posterUrl"
      :controls="showControls"
      :autoplay="autoplay"
      class="video-js"
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
    <!-- <button @click="increment()">increment ({{ counter }})</button> -->
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  name: 'MindvalleyUniversalPlayer',
  props: {
    sources: {
      type: Array,
      required: true,
    },
    posterUrl: {
      type: String,
      // TODO: Placeholder that is suitable for AUDIO & VIDEO media
      default: '',
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
  mounted() {
    videojs(this.$refs.player, {
      playbackRates: this.playbackRates,
      // For reference:
      // https://github.com/videojs/video.js/blob/master/src/js/control-bar/control-bar.js
      controlBar: {
        fullscreenToggle: !this.disableFullscreen,
        playbackRateMenuButton: !this.disablePlaybackRates,
        pictureInPictureToggle: this.enablePictureInPicture,
      }
    });
  },
}

// import { mapActions, mapGetters } from 'vuex';

// export default {
//   computed: {
//     ...mapGetters('counterStore', ['counter'])
//   },
//   methods: {
//     ...mapActions('counterStore', ['increment'])
//   }
// };
</script>

<style lang="scss">

</style>
