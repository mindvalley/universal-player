<template>
  <div>
    <mindvalley-universal-player
      :sources="sources"
      :posterUrl="posterUrl"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sources: [
        { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
        { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
        { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
      ],
      posterUrl: '//vjs.zencdn.net/v/oceans.png',
    };
  }
};
</script>

<style>
</style>
