var _ = require('../lodash-local')

var connect = function(params) {
  return {
    op: 'connect',
    params
  }
}

connect.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  return 'connect(' + JSON.stringify(params) + ')'
}

module.exports = connect
