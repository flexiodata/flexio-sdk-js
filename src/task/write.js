var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var write = function(path) {
  return {
    op: taskTypes.TASK_TYPE_WRITE,
    params: {
      path
    }
  }
}

write.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var path = JSON.stringify(params.path) || '""'
  return 'write(' + path + ')'
}

module.exports = write   // export default write
