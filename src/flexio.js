import axios from 'axios'
import pipe from './pipe'
import pipes from './pipes'
import connections from './connections'

var base_url = 'https://www.flex.io/api/v1'
var auth_token = ''
var http = undefined

export default {
  version() {
    // see `../build/webpack.dist.js`
    return VERSION
  },

  setup(token) {
    auth_token = token
    this._createHttp()
    return this
  },

  setBaseUrl(url) {
    base_url = url
    this._createHttp()
    return this
  },

  http() {
    if (!this._http)
      this._createHttp()

    return this._http
  },

  pipe() {
    return pipe(auth_token)
  },

  pipes() {
    return pipes(auth_token)
  },

  connections() {
    return connections(auth_token)
  },

  _createHttp() {
    // axios instance with base url and auth token factored into it
    this._http = axios.create({
      baseURL: base_url,
      headers: { 'Authorization': 'Bearer ' + auth_token }
    })
  }
}
