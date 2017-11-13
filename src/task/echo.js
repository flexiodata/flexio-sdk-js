var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var echo = function(msg) {

  return {
    type: taskTypes.TASK_TYPE_ECHO,
    params: {
      msg
    }
  }
}

module.exports = echo
