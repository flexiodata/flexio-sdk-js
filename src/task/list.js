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

list.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var path = JSON.stringify(params.path) || '""'
  return 'list(' + path + ')'
}


module.exports = list   // export default list
