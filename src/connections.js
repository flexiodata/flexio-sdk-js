import _ from 'lodash'
import util from './util'
import Flexio from './flexio'

export default () => {
  return _.assign({}, {
    // -- state --

    items: [],
    loading: false,

    // -- methods --

    getJSON(keys) {
      var arr = [].concat(this.items)

      return _.map(arr, (a) => {
        if (!_.isArray(keys))
          return a
        return _.pick(a, keys)
      })
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
      util.debug.call(this, 'Requesting Connections...')

      Flexio.http().get('/connections')
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
