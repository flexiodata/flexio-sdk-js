import _ from 'lodash'
import consoleList from 'console-list'

import util from './util'
import flexio from './flexio'

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
      var callback = _.get(args, '[0]')

      if (this.loading === true)
      {
        setTimeout(() => { this.load.apply(this, arguments) }, 50)
        return this
      }

      this.loading = true
      util.debug.call(this, 'Requesting Pipes...')

      flexio.http().get('/pipes')
        .then(response => {
          var items = _.get(response, 'data', [])
          this.items = [].concat(items)
          this.loading = false
          util.debug.call(this, 'Success!')

          if (typeof callback == 'function')
            callback.call(this, null, items)
        })
        .catch(error => {
          this.loading = false
          util.debug.call(this, 'Failed.')

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    }
  })
}
