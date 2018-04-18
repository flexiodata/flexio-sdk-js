var _ = require('./lodash-local')          // import _ from 'lodash'
var task = require('./task')               // import * as task from './task'




var Flexio = {
  // see `../build/webpack.dist.js`

  _init() {

    this.config = {
      token: '',
      host: 'api.flex.io',
      insecure: false,
      debug: false
    }
    
    this.connections = require('./connections').getConnectionsObject(this)
    this.pipes = require('./pipes').getPipesObject(this)
    this.util = require('./util').getUtilObject(this)
    this._http = null
    this.version = (this.util.isNodeJs() ? require('../package.json').version : VERSION)


    var getPipeConstructor = require('./pipe').getPipeConstructor
    this.pipe = getPipeConstructor(this)

    var getConnectionConstructor = require('./connection').getConnectionConstructor
    this.connection = getConnectionConstructor(this)
  },

  setup(token, params) {
    delete this.config.baseUrl
    _.assign(this.config, { token }, params)
    this._http = null
    this._createHttp()
    return this
  },

  getConfig() {
    if (!this.config.baseUrl) {
      var baseUrl = 'https://' + this.config.host + '/v1'
      _.assign(this.config, { baseUrl })
    }
    return _.assign({}, this.config)
  },

  http() {
    if (!this._http)
      this._createHttp()

    return this._http
  },

  task,

  _createHttp() {
    // axios instance options with base url and auth token
    var cfg = this.getConfig()

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
