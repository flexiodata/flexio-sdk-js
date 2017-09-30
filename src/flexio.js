import _ from 'lodash'
import axios from 'axios'
import * as task from './task'
import pipe from './pipe'
import pipes from './pipes'
import connections from './connections'

var base_url = 'https://www.flex.io/api/v1'

var cfg = {
  token: '',
  baseUrl: 'https://www.flex.io/api/v1',
  debug: false
}

export default {
  // see `../build/webpack.dist.js`
  version: VERSION,

  // allow all tasks exports from `./task/index.js`
  task,

  setup(token, params) {
    cfg = _.assign({}, { token }, params)
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

  pipe()        { return pipe()        },
  pipes()       { return pipes()       },
  connections() { return connections() },

  _createHttp() {
    // axios instance with base url and auth token factored into it
    this._http = axios.create({
      baseURL: cfg.baseUrl,
      headers: { 'Authorization': 'Bearer ' + cfg.token }
    })
  }
}
