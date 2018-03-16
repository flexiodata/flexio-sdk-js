var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var mkdir = function(path) {
  return {
    op: taskOps.TASK_OP_MKDIR,
    params: {
      path
    }
  }
}

mkdir.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var path = JSON.stringify(params.path) || '""'
  return 'mkdir(' + path + ')'
}

module.exports = mkdir
