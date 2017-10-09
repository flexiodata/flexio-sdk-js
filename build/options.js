'use strict'

const path = require('path')
const version = require('../package.json').version

const banner =
  '/*!\n' +
  ' * Flex.io Javascript SDK v' + version + ' (https://github.com/flexiodata/flexio-sdk-js)\n' +
  ' * (c) ' + new Date().getFullYear() + ' Gold Prairie LLC\n' +
  ' */'

module.exports = {
  banner,
  version,

  isProduction: process.env.build === 'production',

  paths: {
    root: path.join(__dirname, '..'),

    src: {
      main: path.join(__dirname, '..', 'src'),
      examples: path.join(__dirname, '..', 'examples-src')
    },

    output: {
      main: path.join(__dirname, '..', 'dist'),
      examples: path.join(__dirname, '..', 'examples')
    },

    resolve(location) {
      return path.join(__dirname, '..', location)
    }
  }
}
