var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var transform = function(value) {
  var args = Array.from(arguments)

  var default_params = { operations: [] }
  var params = {}
  var columns = undefined
  var operations = []

  var arg1 = _.get(args, '[0]')

  // handle the case where the user passed an array of items
  // instead of just passing them as arguments
  if (_.isPlainObject(arg1))
  {
    // .transform({ columns: [], operations: [] }) syntax
    if (args.length == 1 && _.has(arg1, 'operations'))
    {
      params = _.pick(arg1, ['columns', 'operations'])
      params = _.assign(default_params, params)
    }
     else
    {
      // .transform({ operation: '', ... }, etc.) syntax
      operations = [].concat(args)
      params = { operations }
    }

    return {
      type: taskTypes.TASK_TYPE_TRANSFORM,
      params
    }
  }

  return {
    type: taskTypes.TASK_TYPE_TRANSFORM,
    params: {
      columns,
      operations,
    }
  }
}

module.exports = transform   // export default transform
