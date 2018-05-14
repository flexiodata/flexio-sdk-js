var _ = require('../lodash-local')
var util = require('../util')

var set = function(variable, value) {

  if (util.isPipeObject(value))
    value = value.pipe.task

  return _.assign({}, { "var": variable, "value": value }, { op: 'set' })
}

set.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var variable = _.get(params, 'var', '')
  var value =  _.get(params, 'value', '')
  
  variable = JSON.stringify(variable)
  
  if (typeof value === 'object' && value !== null && value.hasOwnProperty('op')) {
    value = Flexio.task.toCode(value, Flexio)
  } else {
    value = JSON.stringify(value)
  }
  
  return 'set(' + variable + ', ' + value + ')'
}

module.exports = set
