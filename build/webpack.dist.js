'use strict'

const merge = require('deep-assign')
const webpack = require('webpack')

const options = require('./options')
const base = require('./webpack.base.js')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = merge(base, {
  entry: options.paths.resolve('src/main-webpack.js'),

  // without this, webpack throws in a polyfill for node.js's Buffer class
  node: {
    Buffer: false,
    process: false,
    querystring: false
  },
    
  plugins: [
    new webpack.BannerPlugin({
      banner: options.banner,
      raw: true,
      entryOnly: true
    }),

    // ignore https and url requires. This could have been
    // in the node:{} structure above, but webpack will throw
    // a build error if it sees code that tries to use these modules;
    // to solve this, we just ignore requires with the following modules:
    new webpack.IgnorePlugin(/http-node|package[.]json|querystring/)
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


if (false)   // set to true if bundle analyzer is desired
{
  config.plugins = config.plugins.concat([
    new BundleAnalyzerPlugin()
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

/*
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
*/


//module.exports = [clientConfig, serverConfig]
module.exports = [clientConfig]
