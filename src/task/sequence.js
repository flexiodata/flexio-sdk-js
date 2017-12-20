var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var sequence = function(steps) {

  return {
    op: taskOps.TASK_OP_SEQUENCE,
    params: {
      steps
    }
  }
}

sequence.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var steps = JSON.stringify(params.steps) || '[]'
  return 'sequence(' + steps + ')'
}

module.exports = sequence  // export default sequence
