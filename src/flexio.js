var _ = require('./lodash-local')          // import _ from 'lodash'
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
    this._http = null

    var getPipeConstructor = require('./pipe').getPipeConstructor
    this.pipe = getPipeConstructor(this)

    var getConnectionConstructor = require('./connection').getConnectionConstructor
    this.connection = getConnectionConstructor(this)
  },

  setup(token, params) {
    cfg = _.assign(cfg, { token }, params)
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
    var http_opts = {
      baseURL: cfg.baseUrl,
      headers: { 'Authorization': 'Bearer ' + cfg.token },
      insecure: (cfg.insecure === true ? true:false)
    }

    //this._http = require('axios').create(http_opts)
    this._http = require('./http').create(http_opts)
  }
}


Flexio._init()

module.exports = Flexio
