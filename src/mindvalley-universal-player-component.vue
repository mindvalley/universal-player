<template>
  <div>
    <video
      ref="player"
      preload="auto"
      :poster="posterUrl"
      data-setup='{}'
      class="video-js"
      controls
    >
      <source
        v-for="source in sources"
        v-bind:key="source.type"
        :type="source.type"
        :src="source.src"
      >
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to
        a web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">
        supports HTML5 video</a>
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
      default: '',
    },
  },
  mounted() {
    videojs(this.$refs.player);
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
