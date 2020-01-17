/*
Nuxt.js module for mindvalley-universal-player
Usage:
    - Install mindvalley-universal-player package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'mindvalley-universal-player/nuxt'
            // Optionally passing options in module configuration
            ['mindvalley-universal-player/nuxt', { ...options }]
        ],
        // Optionally passing options in module top level configuration
        MindvalleyUniversalPlayer: { ...options }
    }
*/

const { resolve } = require('path');

module.exports = function nuxtVueWaitModule(moduleOptions) {
  const options = Object.assign({}, this.options.MindvalleyUniversalPlayer, moduleOptions);

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'mindvalley-universal-player-plugin.template.js.tpl'),
    fileName: 'mindvalley-universal-player-plugin.js',
    options: options
  });
};

// required by nuxt
module.exports.meta = require('../package.json');
