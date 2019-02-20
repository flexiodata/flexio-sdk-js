var _ = require('../lodash-local')
var util = require('../util')

var dump = function(msg) {
  return _.assign({}, { msg }, { op: 'dump' })
}

dump.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var msg = JSON.stringify(params.msg) || '""'
  return 'dump(' + msg + ')'
}

module.exports = dump
