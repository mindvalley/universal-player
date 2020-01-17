# MindvalleyUniversalPlayer

## Installation

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
      console.log(this.$mvPlayer);
    },
  };
</script>
```
