var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var limit = function(value) {
  value = _.defaultTo(value, 10)

  return {
    type: taskTypes.TASK_TYPE_LIMIT,
    params: {
      value
    }
  }
}

limit.fromJSON = function(json) {
  var params = _.get(json, 'params', {})
  return 'limit(' + JSON.stringify(params.value) + ')'
}

module.exports = limit  // export default limit
