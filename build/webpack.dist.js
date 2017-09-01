'use strict'

const merge = require('deep-assign')
const webpack = require('webpack')

const options = require('./options')
const base = require('./webpack.base.js')

const config = merge(base, {
  entry: options.paths.resolve('src/main.js'),

  output: {
    filename: options.isProduction ? 'flexio.min.js' : 'flexio.js',
    path: options.paths.output.main,
    library: 'flexio',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: options.banner,
      raw: true,
      entryOnly: true
    })
  ]
})

config.plugins = config.plugins.concat([
  new webpack.LoaderOptionsPlugin({
    minimize: true
  })
])

if (options.isProduction) {
  config.plugins = config.plugins.concat([
    // Set the production environment
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // Minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

module.exports = config
