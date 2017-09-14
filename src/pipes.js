import _ from 'lodash'
import consoleList from 'console-list'

import { http } from './flexio'
import { debug } from './util'

export default (auth_token) => {
  return _.assign({}, {
    // -- state --

    items: [],
    loading: false,

    // -- methods --

    getJSON(keys) {
      var arr = [].concat(this.items)

      return _.map(arr, (a) => {
        if (!Array.isArray(keys))
          return a
        return _.pick(a, keys)
      })
    },

    list(cfg) {
      var cfg = _.assign({
        format: 'json',
        keys: undefined,
        show_header: true,
        spacing: _.get(cfg, 'format', 'json') == 'list' ? 1 : 2
      }, cfg)

      if (cfg.format == 'list')
        return consoleList(this.getJSON(cfg.keys), cfg)

      return JSON.stringify(this.getJSON(cfg.keys), null, cfg.spacing)
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
      this.debug.call(this, 'Requesting Pipes...')

      http().get('/pipes')
        .then(response => {
          this.items = [].concat(_.get(response, 'data', []))
          this.loading = false
          this.debug.call(this, 'Success!')

          if (typeof successCb == 'function')
            successCb(response)
        })
        .catch(error => {
          this.loading = false
          this.debug.call(this, 'Failed.')

          if (typeof errorCb == 'function')
            errorCb(error)
        })

      return this
    },
  })
}
