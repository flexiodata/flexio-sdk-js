var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var foreach = function(run) {

  if (util.isPipeObject(run))
    run = run.pipe.task

  return {
    op: taskOps.TASK_OP_FOREACH,
    params: {
      run
    }
  }
}

foreach.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var msg = Flexio.task.toCode(params.run, Flexio)
  return 'foreach(' + msg + ')'
}

module.exports = foreach
