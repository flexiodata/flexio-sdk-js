var _ = require('../lodash-local')

var sleep = function(value) {
  value = _.defaultTo(value, 10)

  return {
    op: 'sleep',
    params: {
      value
    }
  }
}

sleep.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var val = JSON.stringify(params.value) || ''
  return 'sleep(' + val + ')'
}

module.exports = sleep
