var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var read = function(path) {
  return {
    op: taskOps.TASK_OP_READ,
    params: {
      path
    }
  }
}

read.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var path = JSON.stringify(params.path) || '""'
  return 'read(' + path + ')'
}

module.exports = read   // export default list
