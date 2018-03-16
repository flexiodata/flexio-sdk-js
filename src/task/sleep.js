var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

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

sleep.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var val = JSON.stringify(params.value) || ''
  return 'sleep(' + val + ')'
}

module.exports = sleep   // export default sleep
