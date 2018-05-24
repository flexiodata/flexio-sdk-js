var _ = require('./lodash-local')                               // import _ from 'lodash'
var util = require('./util')                            // import util from './util'


module.exports = {}
module.exports.getConnectionsObject = function(Flexio) {

  return new function() {

    this.create = function(conn, callback) {

      var data
      if (_.isPlainObject(conn)) {
        data = conn
      } else if (conn instanceof Flexio.connection) {
        data = conn.connection
      } else {
        throw "Unknown connection object type"
      }

      return new Promise((resolve, reject) => {
        Flexio.http().post('/me/connections', data)
        .then(response => {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback)
        })
        .catch(error => {
          Flexio.util.debug('Flexio.connections.create(): Failed.')
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback)
        })
      })
    }

    this.remove = function(identifier, callback) {

      return new Promise((resolve, reject) => {
        Flexio.http().request({ method: 'DELETE' , url: '/me/connections/' + identifier })
        .then(response => {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback)
        })
        .catch(error => {
          Flexio.util.debug('Flexio.connections.remove(): Failed.')
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback)
        })
      })
    }


    this.list = function(callback) {
      var args = Array.from(arguments)
      var callback = _.get(args, '[0]')

      return new Promise((resolve, reject) => {
        Flexio.util.debug('Requesting Connections...')
        Flexio.http().get('/me/connections')
        .then(response => {
          var items = _.get(response, 'data', [])
          Flexio.util.debug('Success!')
          Flexio.util.callbackAdapter(null, items, resolve, reject, callback)
        })
        .catch(error => {
          Flexio.util.debug('Failed.')
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback)
        })
      })
    }
  }
}
