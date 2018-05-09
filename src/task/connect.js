var _ = require('../lodash-local')

var connect = function(params) {
  return {
    op: 'connect',
    params
  }
}

connect.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  delete params['op']
  return 'connect(' + JSON.stringify(params) + ')'
}

module.exports = connect
