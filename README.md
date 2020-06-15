# MindvalleyUniversalPlayer

## Features
Supported Formats: HLS, MP4, MP3, Ogg.

## Development & Testing

We use Yarn to manage packages. And Vue CLI for development, linting & testing.  
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

Cleaning package.json
```
npx sort-package-json
```

## Installation

### 0. Pre-installation setup  
Since this is a private package, you need a token to install it.  

i) You can get your token by generating one at [https://github.com/settings/tokens](https://github.com/settings/tokens)
![Generate Token](/docs/assets/images/token_scopes.png)
   
ii) Copy the token & paste it in your project's .npmrc
```bash
//npm.pkg.github.com:_authToken=YOUR_TOKEN_HERE
```
  
iii) Create a .yarnrc on your project's root directory and add this line to it.
```bash
"@mindvalley:registry" "https://npm.pkg.github.com"
```

iv) Authorize SSO.

![Authorize SSO & Scopes](/docs/assets/images/token_grant_sso.png)


### 1. Add The Package To Your package.json

```json
...
"@mindvalley/universal-player": "0.1.5",
...
```

### 2. Import As Plugin

```js
import MindvalleyUniversalPlayer from '@mindvalley/universal-player'

Vue.use(MindvalleyUniversalPlayer)

new Vue({
  // your vue config
  mvPlayerSettings: new MindvalleyUniversalPlayer(),
})
```

### 3. Use In Your Components

```vue
<template>
  <mindvalley-universal-player />
</template>
```
