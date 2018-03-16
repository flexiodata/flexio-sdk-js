var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var set = function(variable, value) {

  if (util.isPipeObject(value))
    value = value.pipe.task

  return {
    op: taskOps.TASK_OP_SET,
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

module.exports = set   // export default set
