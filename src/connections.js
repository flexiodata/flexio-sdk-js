var _ = require('lodash')                               // import _ from 'lodash'
var util = require('./util')                            // import util from './util'


module.exports = {}
module.exports.getConnectionsObject = function(Flexio) {

  return new function() {

    this.create = function(conn, callback) {

      var data;
      if (_.isPlainObject(conn)) {
        data = conn
      } else if (conn instanceof Flexio.connection) {
        data = conn.connection
      } else {
        throw "Unknown connection object type"
      }


      Flexio.http().post('/connections', data)
      .then(response => {
        if (typeof callback == 'function')
          callback.call(null, null, response.data)
      })
      .catch(error => {
        Flexio.util.debug('Flexio.connections.create(): Failed.')
        if (typeof callback == 'function')
          callback.call(this, error, null)
      })
    }

    this.list = function(callback) {
      var args = Array.from(arguments)
      var callback = _.get(args, '[0]')

      if (this.loading === true) {
        setTimeout(() => { this.load.apply(this, arguments) }, 50)
        return this
      }

      this.loading = true
      Flexio.util.debug('Requesting Connections...')

      Flexio.http().get('/connections')
        .then(response => {
          var items = _.get(response, 'data', [])
          this.items = [].concat(items)
          this.loading = false
          Flexio.util.debug('Success!')

          if (typeof callback == 'function')
            callback.call(this, null, items)
        })
        .catch(error => {
          this.loading = false
          Flexio.util.debug('Failed.')

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    }
  }
}
