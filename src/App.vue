<template>
  <div>
    <MindvalleyUniversalPlayer
      :sources="sources"
      :markers="markers"
      :playback-rates="playbackRates"
    />

    <br>

    <MindvalleyUniversalPlayer
      :sources="sources"
    />
  </div>
</template>

<script>
import MindvalleyUniversalPlayer from './MindvalleyUniversalPlayer.vue';

export default {
  name: 'App',
  components: {
    MindvalleyUniversalPlayer,
  },
  data() {
    return {
      sources: [
        {
          src: '//vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4',
        },
        {
          src: '//vjs.zencdn.net/v/oceans.webm',
          type: 'video/webm',
        },
        {
          src: '//vjs.zencdn.net/v/oceans.ogv',
          type: 'video/ogg',
        },
      ],
      markers: [
        { text: 'Welcome to Mindvalley Universal Player', time: 5 },
        { text: 'The player has a lot of features, check out the docs for reference', time: 10 },
        { text: 'The documentation can be found here at https://github.com/mindvalley/universal-player', time: 15 },
      ],
      playbackRates: [0.25, 0.5, 1],
    };
  },
};
</script>
