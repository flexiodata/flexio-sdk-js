'use strict'

const options = require('./options')

module.exports = {
  resolve: {
    modules: [
      options.paths.root,
      options.paths.resolve('node_modules')
    ],

    alias: {
      src: 'src'
    },

    extensions: ['.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  // Stats is used to customize Webpack's console output
  // https://webpack.js.org/configuration/stats/
  stats: {
    hash: false,
    colors: true,
    chunks: false,
    version: false,
    children: false,
    timings: true
  }
}
