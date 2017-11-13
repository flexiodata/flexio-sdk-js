var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var select = function() {
  var columns = Array.from(arguments)

  // handle the case where the user passed an array of items
  // instead of just passing them as arguments
  if (columns.length == 1 && _.isArray(_.get(columns, '[0]')))
    columns = _.get(columns, '[0]', [])

  return {
    type: taskTypes.TASK_TYPE_SELECT,
    params: {
      columns
    }
  }
}

module.exports = select   // export default select
