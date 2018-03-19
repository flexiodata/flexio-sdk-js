var _ = require('../lodash-local')
var util = require('../util')

var set = function(variable, value) {

  if (util.isPipeObject(value))
    value = value.pipe.task

  return {
    op: 'set',
    params: {
      "var": variable,
      "value": value
    }
  }
}

set.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var variable = _.get(params, 'variable', '')
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
