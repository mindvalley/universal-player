import Vue from 'vue';
import Vuex from 'vuex';
import MindvalleyUniversalPlayer from '@/mindvalley-universal-player';

import App from './App.vue';

Vue.use(Vuex);
Vue.use(MindvalleyUniversalPlayer);

new Vue({
  el: '#app',
  store: new Vuex.Store(),
  mvPlayerSettings: new MindvalleyUniversalPlayer(),
  render: createElement => createElement(App)
});
