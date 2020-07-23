// eslint-disable-next-line no-unused-vars
import Vue from 'vue';
import MindvalleyUniversalPlayer from './MindvalleyUniversalPlayer.vue';

export default {
  // eslint-disable-next-line no-unused-vars, no-shadow
  install(Vue, options) {
    Vue.component('mindvalley-universal-player', MindvalleyUniversalPlayer);
  },
};
