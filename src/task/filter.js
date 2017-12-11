var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var filter = function(where) {

  if (_.isNil(where))
    throw 'The `filter` parameter is required'

  return {
    type: taskTypes.TASK_TYPE_FILTER,
    params: {
      where
    }
  }
}

filter.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var where = JSON.stringify(params.where) || '""'
  return 'filter(' + where + ')'
}


module.exports = filter   // export default filter
