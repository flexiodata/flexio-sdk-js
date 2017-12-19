var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var list = function(path) {
  return {
    op: taskTypes.TASK_TYPE_LIST,
    params: {
      path
    }
  }
}

module.exports = list   // export default list
