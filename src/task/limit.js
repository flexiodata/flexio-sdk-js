var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var limit = function(value) {
  value = _.defaultTo(value, 10)

  return {
    op: taskOps.TASK_OP_LIMIT,
    params: {
      value
    }
  }
}

limit.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var val = JSON.stringify(params.value) || ''
  return 'limit(' + val + ')'
}

module.exports = limit  // export default limit
