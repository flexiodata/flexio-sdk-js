var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var list = function(path) {
  return {
    op: taskOps.TASK_OP_LIST,
    params: {
      path
    }
  }
}

module.exports = list   // export default list
