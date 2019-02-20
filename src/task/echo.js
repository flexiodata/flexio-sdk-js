var _ = require('../lodash-local')
var util = require('../util')

// task definition function
var echo = function(msg) {
  return _.assign({}, { msg }, { op: 'echo' })
}

echo.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var msg = JSON.stringify(params.msg) || '""'
  return 'echo(' + msg + ')'
}

module.exports = echo
