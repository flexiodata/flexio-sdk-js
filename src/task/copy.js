var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var copy = function(from ,to) {
  return {
    op: taskOps.TASK_OP_COPY,
    params: {
      from,
      to
    }
  }
}

copy.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var from = JSON.stringify(params.from) || '""'
  var to = JSON.stringify(params.to) || '""'
  return 'copy(' + msg + ',' + to + ')'
}

module.exports = copy
