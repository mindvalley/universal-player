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
        { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non elit eu metus volutpat ultricies.", time: 240 },
        { text: "Nullam finibus non orci quis tincidunt.", time: 340 },
        { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non elit eu metus volutpat ultricies.", time: 380 },
        { text: "Nullam finibus non orci quis tincidunt.", time: 540 },
        { text: "Nullam finibus non orci quis tincidunt.", time: 640 },
        { text: "Nullam finibus non orci quis tincidunt.", time: 740 },
        { text: "Nullam finibus non orci quis tincidunt.", time: 940 },
        { text: "Nullam finibus non orci quis tincidunt.", time: 1040 },
        { text: "The documentation can be found here at https://github.com/mindvalley/universal-player", time: 1060 },
        { text: "The End", time: 5060 },
      ],
      posterUrl: 'https://assets.mindvalley.com/api/v1/assets/30206741-a1ed-453d-a197-7af465671466.png',
    };
  }
};
</script>

<style>
</style>
