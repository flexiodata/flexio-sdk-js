var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var read = function(path) {
  return {
    type: taskTypes.TASK_TYPE_READ,
    params: {
      path
    }
  }
}

module.exports = read   // export default list
