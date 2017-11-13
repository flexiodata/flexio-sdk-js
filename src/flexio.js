var _ = require('lodash')                  // import _ from 'lodash'
var axios = require('axios')               // import axios from 'axios'
var task = require('./task')               // import * as task from './task'

var base_url = 'https://www.flex.io/api/v1'

var cfg = {
  token: '',
  baseUrl: 'https://www.flex.io/api/v1',
  insecure: false,
  debug: false
}

var Flexio = {
  // see `../build/webpack.dist.js`
  version: require('../package.json').version,

  _init() {
    this.connections = require('./connections').getConnectionsObject(this)
    this.pipes = require('./pipes').getPipesObject(this)
    this.util = require('./util').getUtilObject(this)
    
    var getPipeConstructor = require('./pipe').getPipeConstructor
    this.pipe = getPipeConstructor(this)

    var getConnectionConstructor = require('./connection').getConnectionConstructor
    this.connection = getConnectionConstructor(this)
  },

  setup(token, params) {
    cfg = _.assign({}, { token }, params)
    this._http = null
    this._createHttp()
    return this
  },

  getConfig() {
    return _.assign({}, cfg)
  },

  http() {
    if (!this._http)
      this._createHttp()

    return this._http
  },

  task,

  _createHttp() {
    // axios instance options with base url and auth token
    var axios_opts = {
      baseURL: cfg.baseUrl,
      headers: { 'Authorization': 'Bearer ' + cfg.token }
    }

    // TODO: try to figure out a better way to do this...

    // if the `insecure` flag is set, allow unauthorized HTTPS calls
    if (cfg.insecure === true)
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

    this._http = axios.create(axios_opts)
  }
}


Flexio._init()

module.exports = Flexio
