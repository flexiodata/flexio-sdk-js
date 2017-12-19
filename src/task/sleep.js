var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-type')       // import * as taskOps from '../constants/task-type'

// task definition function
var sleep = function(value) {
  value = _.defaultTo(value, 10)

  return {
    op: taskOps.TASK_OP_SLEEP,
    params: {
      value
    }
  }
}

sleep.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var val = JSON.stringify(params.value) || ''
  return 'sleep(' + val + ')'
}

module.exports = sleep   // export default sleep
