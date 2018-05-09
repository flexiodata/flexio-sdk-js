var _ = require('../lodash-local')

var sleep = function(value) {
  return _.assign({}, { value }, { op: 'sleep' })
}

sleep.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var val = JSON.stringify(params.value) || ''
  return 'sleep(' + val + ')'
}

module.exports = sleep
