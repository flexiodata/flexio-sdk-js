var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'





// task definition function
var insert = function(path, values) {

  var data;
  if (Array.isArray(values))
    data = values
      else
    data = [ values ]

  return {
    op: taskTypes.TASK_TYPE_INSERT,
    params: {
      path: path,
      values: data
    }
  }
}

insert.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var path = _.get(params, 'path', undefined)
  var values = _.get(params, 'values', undefined)

  if (!Array.isArray(values))
    values = [ values ]

  path = JSON.stringify(path)
  values = JSON.stringify(values)

  return 'insert(' + path + ', ' + values + ')'
}

module.exports = insert  // export default insert
