var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var filter = function(where) {

  if (_.isNil(where))
    throw 'The `filter` parameter is required'

  return {
    op: taskOps.TASK_OP_FILTER,
    params: {
      where
    }
  }
}

filter.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var where = JSON.stringify(params.where) || '""'
  return 'filter(' + where + ')'
}


module.exports = filter   // export default filter
