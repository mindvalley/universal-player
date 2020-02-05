<template>
  <div>
    <mindvalley-universal-player
      :sources="sources"
      :posterUrl="posterUrl"
      :markers="markers"
    />

    <br/>

    <mindvalley-universal-player
      :sources="sources"
      :posterUrl="posterUrl"
      :markers="[{ text: 'Welcome to Mindvalley Universal Player', time: 10 }]"
    />

    <br/>

    <mindvalley-universal-player
      :sources="sources"
      :posterUrl="posterUrl"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      sources: [
        {
          src: 'https://assets.mindvalley.com/api/v1/assets/9be313df-b5d6-480f-ae38-0e64ea42a577.m3u8',
          type: 'video/hls'
        },
        {
          src: 'https://assets.mindvalley.com/api/v1/assets/fa92cc13-8e44-4fe8-8516-d9ff84119841.mp4',
          type: 'video/mp4'
        }
      ],
      markers: [
        { text: "Welcome to Mindvalley Universal Player", time: 10 },
        { text: "The player has a lot of features, check out the docs for reference", time: 100 },
        { text: "Let's get started", time: 240 },
        { text: "Let's get started", time: 340 },
        { text: "Let's get started", time: 380 },
        { text: "Let's get started", time: 540 },
        { text: "Let's get started", time: 640 },
        { text: "Let's get started", time: 740 },
        { text: "Let's get started", time: 940 },
        { text: "Let's get started", time: 1040 },
        { text: "The documentation can be found here at https://github.com/mindvalley/universal-player", time: 1060 },
        { text: "End", time: 5060 },
      ],
      posterUrl: 'https://assets.mindvalley.com/api/v1/assets/30206741-a1ed-453d-a197-7af465671466.png',
    };
  }
};
</script>

<style>
</style>
