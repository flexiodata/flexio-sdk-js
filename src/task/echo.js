var _ = require('../lodash-local')

// task definition function
var echo = function(msg) {
  return _.assign({}, { msg }, { op: 'echo' })
}

echo.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var msg = JSON.stringify(params.msg) || '""'
  return 'echo(' + msg + ')'
}

module.exports = echo
