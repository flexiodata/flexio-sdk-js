var _ = require('../lodash-local')

// task definition function
var echo = function(msg) {
  return {
    op: 'echo',
    params: {
      msg
    }
  }
}

echo.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var msg = JSON.stringify(params.msg) || '""'
  return 'echo(' + msg + ')'
}

module.exports = echo
