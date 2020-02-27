import Vue from 'vue';
import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';

import MindvalleyUniversalPlayer from '../src/mindvalley-universal-player';

Vue.use(Vuex);
Vue.use(MindvalleyUniversalPlayer);

const withSettings = component => ({
  mvPlayerSettings: new MindvalleyUniversalPlayer(),
  ...component
});

const stories = storiesOf('MindvalleyUniversalPlayer', module);

stories
  // Add some stories here to make your plugin more descriptive
  .add(
    'Getting Started',
    () =>
      withSettings({
        data() {
          return {
            sources: [ { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }, { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }, { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }, ],
          }
        },
        template: `
        <div>
          <mindvalley-universal-player :sources="sources" />
        </div>
      `
      }),
    {
      notes: `
        # How To Use The Player
        The player won't work without a source file. Define your source files
        this way.

        For other settings, refer to the sidebar on the left.

        \`\`\`html
        <template>
          <mindvalley-universal-player
            :sources="[
              { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
              { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
              { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
            ]"
          />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'Setting Player Cover Image',
    () =>
      withSettings({
        data() {
          return {
            sources: [ { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }, { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }, { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }, ],
            posterUrl: '//vjs.zencdn.net/v/oceans.png',
          }
        },
        template: `
        <div>
          <mindvalley-universal-player :sources="sources" :posterUrl="posterUrl" />
        </div>
      `
      }),
    {
      notes: `
        # Setting The Cover Image
        The player has no placeholder cover by default. If you did not set the cover image,
        then it will be a blank screen.

        \`\`\`html
        <template>
          <mindvalley-universal-player
            posterUrl="//vjs.zencdn.net/v/oceans.png"
            :sources="[
              { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
              { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
              { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
            ]"
          />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'Setting The Player To Autoplay',
    () =>
      withSettings({
        data() {
          return {
            sources: [ { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }, { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }, { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }, ],
          }
        },
        template: `
        <div>
          <mindvalley-universal-player :sources="sources" :autoplay="true" />
        </div>
      `
      }),
    {
      notes: `
        # Setting The Player To Autoplay
        The autoplay is disabled by default. You can enable it by doing so.

        \`\`\`html
        <template>
          <mindvalley-universal-player
            :autoplay="true"
            :sources="[
              { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
              { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
              { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
            ]"
          />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'Hiding The Player Controls',
    () =>
      withSettings({
        data() {
          return {
            sources: [ { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }, { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }, { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }, ],
          }
        },
        template: `
        <div>
          <mindvalley-universal-player :sources="sources" :show-controls="false" :autoplay="true" />
        </div>
      `
      }),
    {
      notes: `
        # Hiding The Player Controls
        You can hide the player's controls by doing so.

        \`\`\`html
        <template>
          <mindvalley-universal-player
            :show-controls="false"
            :sources="[
              { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
              { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
              { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
            ]"
          />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'Disable Fullscreen',
    () =>
      withSettings({
        data() {
          return {
            sources: [ { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }, { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }, { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }, ],
          }
        },
        template: `
          <div>
            <mindvalley-universal-player :sources="sources" :disable-fullscreen="true"/>
          </div>
        `
      }),
    {
      notes: `
        # Disable Fullscreen
        By default, fullscreen is enabled for the player.
        You can disable fullscreen by doing so.

        \`\`\`html
          <mindvalley-universal-player
            :disable-fullscreen="true"
            :sources="[
              { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
              { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
              { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
            ]"
          />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'Custom Playback Speeds',
    () =>
      withSettings({
        data() {
          return {
            sources: [ { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }, { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }, { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }, ],
            playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
          }
        },
        template: `
        <div>
          <mindvalley-universal-player :sources="sources" :playback-rates="playbackRates" />
        </div>
      `
      }),
    {
      notes: `
        # Setting Custom Playback Speeds
        By default, the player has playback speeds of 0.5x, 1x, 1.5x, 2x.

        If you want to set your own playback speeds, you can do so by doing:

        \`\`\`html
        <template>
          <mindvalley-universal-player
            :playback-rates="[0.5, 0.75, 1, 1.25, 1.5, 2]"
            :sources="[
              { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
              { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
              { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
            ]"
          />
        </template>
        \`\`\`
      `
    }
  )
.add(
    'Disable Playback Speed',
    () =>
      withSettings({
        data() {
          return {
            sources: [ { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }, { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }, { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }, ],
          }
        },
        template: `
        <div>
          <mindvalley-universal-player :sources="sources" :disable-playback-rates="true" />
        </div>
      `
      }),
    {
      notes: `
        # Disable Playback Speeds
        By default, the player has playback speeds enabled and
        the speeds are 0.5x, 1x, 1.5x, 2x.

        If you want to set your disable playback speeds, you can do so by doing:

        \`\`\`html
        <template>
          <mindvalley-universal-player
            :disable-playback-rates="true"
            :sources="[
              { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
              { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
              { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
            ]"
          />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'Picture In Picture Mode',
    () =>
      withSettings({
        data() {
          return {
            sources: [ { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }, { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }, { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }, ],
          }
        },
        template: `
        <div>
          <mindvalley-universal-player :sources="sources" :enable-picture-in-picture="true" />
        </div>
      `
      }),
    {
      notes: `
        # Picture-in-Picture mode

        \`\`\`html
        <template>
          <mindvalley-universal-player
            :enable-picture-in-picture="true"
            :sources="[
              { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
              { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
              { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
            ]"
          />
        </template>
        \`\`\`
      `
    }
  )
.add(
    'Setting The Player To Autoplay',
    () =>
      withSettings({
        data() {
          return {
            sources: [ { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }, { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' }, { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' }, ],
          }
        },
        template: `
        <div>
          <mindvalley-universal-player :sources="sources" :autoplay="true" />
        </div>
      `
      }),
    {
      notes: `
        # Setting The Player To Autoplay
        The autoplay is disabled by default. You can enable it by doing so.

        \`\`\`html
        <template>
          <mindvalley-universal-player
            :autoplay="true"
            :sources="[
              { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
              { src: '//vjs.zencdn.net/v/oceans.webm', type: 'video/webm' },
              { src: '//vjs.zencdn.net/v/oceans.ogv', type: 'video/ogg' },
            ]"
          />
        </template>
        \`\`\`
      `
    }
  );
