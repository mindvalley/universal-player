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
    'My Customs  Component',
    () =>
      withSettings({
        template: `
        <div>
          <mindvalley-universal-player />
        </div>
      `
      }),
    {
      notes: `
        # Using \`mindvalley-universal-player\`

        \`\`\`html
        <template>
          <mindvalley-universal-player />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'My Custom Component with another markup',
    () =>
      withSettings({
        template: `
        <div>
          <b>Hello</b>
          <mindvalley-universal-player />
          <i>world</i>
        </div>
      `
      }),
    {
      notes: `
        # Using \`mindvalley-universal-player\` with other components

        \`\`\`html
        <template>
          <div>
            <b>Hello</b>
            <mindvalley-universal-player />
            <i>world</i>
          </div>
        </template>
        \`\`\`
      `
    }
  );
