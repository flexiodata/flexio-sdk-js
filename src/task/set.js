var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var set = function(path) {
  return {
    type: taskTypes.TASK_TYPE_SET,
    params: {
      path
    }
  }
}

write.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var name = JSON.stringify(params.name) || '""'
  var value = JSON.stringify(params.value) || '""'
  return 'set(' + name + ', ' + value + ')'
}

module.exports = set   // export default set
