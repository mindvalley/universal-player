import { devMode, registerVuexStore } from './utils';

// Import your additional components here
import MindvalleyUniversalPlayerComponent from './mindvalley-universal-player-component.vue';

export default class MindvalleyUniversalPlayer {
  // HERE IS YOUR PLACE TO DEVELOP YOUR COMPONENT

  constructor(options = {}) {
    const defaults = {
      // This is your plugin's options. It will be accessible with this.options
      accessorName: '$mvPlayer'
    };
    this.options = { ...defaults, ...options };
  }

  // Some instance methods that you can access from this.$mvPlayer
  world() {
    return 'world';
  }

  static register = (Vue, options, store) => {
    // console.log('Here is the options of the component', options);
    // console.log('Here is the store of the app', store);
    // You can use `this.options` property to access options.

    // Delete this line if your plug-in doesn't provide any components
    Vue.component('MindvalleyUniversalPlayer', MindvalleyUniversalPlayerComponent);

    // Vue.directive('your-custom-directive', customDirective);

    // registerVuexStore(store, 'counterStore', {
    //   namespaced: true,
    //   state: { counter: 0 },
    //   getters: {
    //     counter: state => state.counter
    //   },
    //   actions: {
    //     increment: ({ commit }) => commit('increment')
    //   },
    //   mutations: {
    //     increment: state => state.counter++
    //   }
    // });
  };

  // Some lifecycle hooks to add on mixin
  static mixin = () => ({
    mounted() {
      // console.log(this.$store);
    }
  });

  ////////////////////////////////////
  // YOU MAY NOT NEED TO EDIT BELOW //
  ////////////////////////////////////

  initialized = false;

  init(Vue, store) {
    if (devMode() && !install.installed) {
      console.warn(
        `[mindvalley-universal-player] not installed. Make sure to call \`Vue.use(MindvalleyUniversalPlayer)\` before init root instance.`
      );
    }

    if (this.initialized) {
      return;
    }

    MindvalleyUniversalPlayer.register(Vue, this.options, store);
    this.initialized = true;
  }
}

export function install(Vue) {
  const isDev = devMode();
  if (install.installed && Vue) {
    if (isDev) {
      console.warn(
        '[mindvalley-universal-player] already installed. Vue.use(MindvalleyUniversalPlayer) should be called only once.'
      );
    }
    return;
  }

  Vue.mixin({
    /**
     * MindvalleyUniversalPlayer init hook, injected into each instances init hooks list.
     */
    beforeCreate() {
      const { mvPlayerSettings, store, parent } = this.$options;

      let instance = null;
      if (mvPlayerSettings) {
        instance =
          typeof mvPlayerSettings === 'function'
            ? new mvPlayerSettings()
            : new MindvalleyUniversalPlayer(mvPlayerSettings);
        // Inject store
        instance.init(Vue, store);
      } else if (parent && parent.__$MindvalleyUniversalPlayerInstance) {
        instance = parent.__$MindvalleyUniversalPlayerInstance;
        instance.init(Vue, parent.$store);
      }

      if (instance) {
        // Store helper for internal use
        this.__$MindvalleyUniversalPlayerInstance = instance;
        this[instance.options.accessorName] = instance;
      }
    },

    ...MindvalleyUniversalPlayer.mixin()
  });

  install.installed = true;
  if (isDev) {
    console.info('[mindvalley-universal-player] is plugged in.');
  }
}

MindvalleyUniversalPlayer.install = install;
