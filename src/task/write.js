var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var write = function(path) {
  return {
    op: taskOps.TASK_OP_WRITE,
    params: {
      path
    }
  }
}

write.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var path = JSON.stringify(params.path) || '""'
  return 'write(' + path + ')'
}

module.exports = write   // export default write
