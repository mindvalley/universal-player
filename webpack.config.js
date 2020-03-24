const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./src/mindvalley-universal-player.js'],
  output: {
    library: 'MindvalleyUniversalPlayer',
    libraryTarget: 'umd',
    filename: 'mindvalley-universal-player.js',
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
};
