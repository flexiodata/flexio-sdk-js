var _ = require('../lodash-local')

var dump = function(msg) {
  return _.assign({}, { msg }, { op: 'dump' })
}

dump.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var msg = JSON.stringify(params.msg) || '""'
  return 'dump(' + msg + ')'
}

module.exports = dump
