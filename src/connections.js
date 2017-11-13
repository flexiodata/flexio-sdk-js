var _ = require('lodash')                               // import _ from 'lodash'
var util = require('./util')                            // import util from './util'


module.exports = {}
module.exports.getConnectionsObject = function(Flexio) {

  return new function() {

    this.create = function() { return Flexio.connection() }

    this.list = function(callback) {
      var args = Array.from(arguments)
      var callback = _.get(args, '[0]')

      if (this.loading === true) {
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
  }
}
