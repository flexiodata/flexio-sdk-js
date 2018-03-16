var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var dump = function(msg) {
  return {
    op: taskOps.TASK_OP_DUMP,
    params: {
      msg
    }
  }
}

dump.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var msg = JSON.stringify(params.msg) || '""'
  return 'dump(' + msg + ')'
}

module.exports = dump
