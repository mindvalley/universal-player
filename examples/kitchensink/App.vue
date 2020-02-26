<template>
  <div class="demo">
    <mindvalley-universal-player
      :sources="sources"
      :posterUrl="posterUrl"
      :markers="markers"
      :duration="46"
    />

    <br>
    <br>

    <mindvalley-universal-player
      player-type="audio"
      media-title="[Audio] Meditationen der Lektion: Geführte Reise"
      :sources="sources"
      :posterUrl="posterUrl"
      :duration="46"
    />

    <br>
    <br>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sources: [
        {
          src: '//vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        },
        {
          src: '//vjs.zencdn.net/v/oceans.webm',
          type: 'video/webm'
        },
        {
          src: '//vjs.zencdn.net/v/oceans.ogv',
          type: 'video/ogg'
        }
      ],
      markers: [
        { text: "Welcome to Mindvalley Universal Player", time: 5 },
        { text: "The player has a lot of features, check out the docs for reference", time: 10 },
        { text: "The documentation can be found here at https://github.com/mindvalley/universal-player", time: 15 },
      ],
      posterUrl: '//vjs.zencdn.net/v/oceans.png',
    };
  }
};
</script>

<style>
body {
  margin: 0;
}

.demo {
  max-width: 1000px;
}
</style>
