<template>
  <div class="playground">
    <!-- This component is for development & testing only. -->

    <h3>Video Player</h3>
    <mindvalley-universal-player
      player-type="video"
      :sources="sources"
      :poster-url="posterUrl"
      :media-duration="46"
    />

    <h3>Video Player with Markers</h3>
    <mindvalley-universal-player
      player-type="video"
      :sources="sources"
      :poster-url="posterUrl"
      :markers="markers"
      :media-duration="46"
    />

    <h3>Audio Player</h3>
    <mindvalley-universal-player
      player-type="audio"
      :sources="sources"
      :poster-url="posterUrl"
      media-title="Media Title tItLe meDiA"
      :media-duration="46"
    />

    <h3>Audio Player with Playback Rates</h3>
    <mindvalley-universal-player
      player-type="audio"
      :sources="sources"
      :poster-url="posterUrl"
      :playback-rates="playbackRates"
      media-title="Media title Title title MeDIA"
      :media-duration="46"
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
      posterUrl: '//vjs.zencdn.net/v/oceans.png',
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
        { text: 'Five seconds markers', time: 5 },
        { text: 'This is a 10 seconds marker', time: 10 },
        { text: '15s marker', time: 15 },
        { text: '95 Seconds Marker', time: 95 },
        { text: '15m50s - 950 seconds marker', time: 950 },
        { text: '9500 seconds marker - 9500 seconds marker', time: 9500 },
        { text: '15000 seconds marker - 15000 seconds marker', time: 15000 },
      ],
      playbackRates: [0.25, 0.5, 1],
    };
  },
};
</script>

<style lang="scss" scoped>
.playground {
  max-width: 1024px;
  font-family: sans-serif;
}
</style>
