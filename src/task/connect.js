var _ = require('../lodash-local')

var connect = function(params) {
  return _.assign({}, params, { op: 'connect' })
}

connect.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  delete params['op']
  delete params['eid']
  return 'connect(' + JSON.stringify(params) + ')'
}

module.exports = connect
