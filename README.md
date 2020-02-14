# MindvalleyUniversalPlayer

## Development & Testing

We use Yarn to manage packages.
And Vue CLI for development, linting & testing.
Please install both before you begin any development on the player.

```
npm install -g yarn
yarn global add @vue/cli
```

To run unit tests
```
yarn run test:unit
```

To run E2E tests
```
yarn run test:e2e
```

## Installation

Supported Formats: HLS, MP4, MP3, Ogg.

### 1. Install

```
yarn add mindvalley-universal-player
# or
npm i mindvalley-universal-player --save
```

### 2. Plug-in

```js
import MindvalleyUniversalPlayer from 'mindvalley-universal-player'

Vue.use(MindvalleyUniversalPlayer)

new Vue({
  // your vue config
  mvPlayerSettings: new MindvalleyUniversalPlayer(),
})
```

### 3. Use in your components

```vue
<template>
  <mindvalley-universal-player />
</template>

<script>
  export default {
    async created() {
      // console.log(this.$mvPlayer);
    },
  };
</script>
```
