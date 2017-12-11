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

echo.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var msg = JSON.stringify(params.msg) || '""'
  return 'echo(' + msg + ')'
}

module.exports = echo
