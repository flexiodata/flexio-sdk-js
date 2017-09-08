import axios from 'axios'

import consoleList from './util/json-to-fixed-list'

// individual lodash includes
import assign from 'lodash.assign'
import pick from 'lodash.pick'
import get from 'lodash.get'
import map from 'lodash.map'
import isArray from 'lodash.isarray'
import isString from 'lodash.isstring'

// emulate lodash syntax
var _ = {
  assign,
  pick,
  get,
  map,
  isArray,
  isString
}

export default (auth_token) => {
  return _.assign({}, {
    connections: [],

    // axios instance with base url and auth token factored into it
    http: axios.create({
      baseURL: 'https://www.flex.io/api/v1',
      headers: { 'Authorization': 'Bearer ' + auth_token }
    }),

    // -- state --

    loading: false,

    // -- debug --

    debug(msg) {
      if (!window)
        return

      // TODO: add flag for 'debug' mode

      var msg = 'Flex.io Javascript SDK: ' + msg
      window.console ? console.log(msg) : alert(msg)

      return this
    },

    // -- methods --

    getJson(keys) {
      var arr = [].concat(this.connections)

      return _.map(arr, (a) => {
        if (!isArray(keys))
          return a
        return _.pick(a, keys)
      })
    },

    list(cfg) {
      cfg = _.assign({
        format: 'json',
        keys: [],
        show_header: true,
        spacing: 1
      }, cfg)

      if (cfg.format == 'list')
        return consoleList(this.getJson(cfg.keys), cfg)

      return this.getJson(cfg.keys)
    },

    load() {
      var args = Array.from(arguments)
      var successCb = _.get(args, '[0]')
      var errorCb = _.get(args, '[1]')

      if (this.loading === true)
      {
        setTimeout(() => { this.load.apply(this, arguments) }, 50)
        return this
      }

      this.loading = true
      this.debug('Requesting Connections...')

      this.http
        .get('/connections')
        .then(response => {
          this.connections = [].concat(_.get(response, 'data', []))
          this.loading = false
          this.debug('Success!')

          if (typeof successCb == 'function')
            successCb(response)
        })
        .catch(error => {
          this.loading = false
          this.debug('Failed.')

          if (typeof errorCb == 'function')
            errorCb(error)
        })

      return this
    },
  })
}
