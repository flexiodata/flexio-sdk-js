var _ = require('../lodash-local')
var util = require('../util')

var connect = function(params) {
  return _.assign({}, params, { op: 'connect' })
}

connect.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  return 'connect(' + JSON.stringify(params) + ')'
}

module.exports = connect
