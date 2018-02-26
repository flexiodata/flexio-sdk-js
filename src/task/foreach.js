var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var foreach = function(p0, p1) {

  var res = {
    op: taskOps.TASK_OP_FOREACH,
    params: {}
  }

  if (typeof p0 === 'string' || p0 instanceof String) {
    res.params.spec = p0
  }

  if (util.isPipeObject(p0)) {
    res.params.run = p0.pipe.task
  } else if (util.isPipeObject(p1)) {
    res.params.run = p1.pipe.task
  }

  return res
}

foreach.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {}), p = []
  if (params.hasOwnProperty('spec')) {
    p.push(JSON.stringify(params.spec))
  }
  if (params.hasOwnProperty('run')) {
    p.push(Flexio.task.toCode(params.run, Flexio))
  }

  return 'foreach(' + p.join(', ') + ')'
}

module.exports = foreach
