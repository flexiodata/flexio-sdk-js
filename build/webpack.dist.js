'use strict'

const merge = require('deep-assign')
const webpack = require('webpack')

const options = require('./options')
const base = require('./webpack.base.js')

const config = merge(base, {
  entry: options.paths.resolve('src/main.js'),

  plugins: [
    new webpack.BannerPlugin({
      banner: options.banner,
      raw: true,
      entryOnly: true
    })
  ]
})

// debug and production
config.plugins = config.plugins.concat([
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(options.version)
  })
])

if (options.isProduction) {
  // production only
  config.plugins = config.plugins.concat([
    // Set the production environment
    new webpack.DefinePlugin({
      //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.build': JSON.stringify('production')
    }),

    // Minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

const clientConfig = merge({
  output: {
    filename: options.isProduction ? 'flexio.min.js' : 'flexio.js',
    path: options.paths.output.main,
    library: 'Flexio',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
}, config)

const serverConfig = merge({
  // this is necessary for the Axios lib to work in a Node.js environment
  target: 'node',

  output: {
    filename: options.isProduction ? 'flexio-node.min.js' : 'flexio-node.js',
    path: options.paths.output.main,
    library: 'Flexio',
    libraryExport: 'default',
    libraryTarget: 'umd'
  }
}, config)

module.exports = [clientConfig, serverConfig]
