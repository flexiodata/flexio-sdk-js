var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var merge = function(path) {

  if (Array.isArray(path)) {
    var files = path
  } else {
    var files = []
    for (var i = 0; i < arguments.length; ++i) {
      files.push(arguments[i])
    }
  }

  return {
    op: taskOps.TASK_OP_MERGE,
    params: {
      files
    }
  }
}

module.exports = merge   // export default merge
