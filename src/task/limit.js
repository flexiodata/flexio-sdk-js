var _ = require('../lodash-local')

var limit = function(value) {
  return _.assign({}, { value }, { op: 'limit' })
}

limit.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var val = JSON.stringify(params.value) || ''
  return 'limit(' + val + ')'
}

module.exports = limit
