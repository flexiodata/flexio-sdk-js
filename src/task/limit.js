var _ = require('../lodash-local')

var limit = function(value) {
  return {
    op: 'limit',
    params: {
      value
    }
  }
}

limit.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var val = JSON.stringify(params.value) || ''
  return 'limit(' + val + ')'
}

module.exports = limit
