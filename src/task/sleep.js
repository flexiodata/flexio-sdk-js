var _ = require('../lodash-local')
var util = require('../util')

var sleep = function(value) {
  return _.assign({}, { value }, { op: 'sleep' })
}

sleep.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var val = JSON.stringify(params.value) || ''
  return 'sleep(' + val + ')'
}

module.exports = sleep
