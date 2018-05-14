var _ = require('../lodash-local')
var util = require('../util')

var limit = function(value) {
  return _.assign({}, { value }, { op: 'limit' })
}

limit.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var val = JSON.stringify(params.value) || ''
  return 'limit(' + val + ')'
}

module.exports = limit
