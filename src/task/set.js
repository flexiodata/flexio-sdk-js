var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var set = function(variable, value) {
  return {
    op: taskOps.TASK_OP_SET,
    params: {
      "var": variable,
      "value": value
    }
  }
}

set.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var variable = JSON.stringify(params.variable) || '""'
  var value = JSON.stringify(params.value) || '""'
  return 'set(' + variable + ', ' + value + ')'
}

module.exports = set   // export default set
