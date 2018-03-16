var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'





// task definition function
var insert = function(path, values) {

  var data;
  if (Array.isArray(values))
    data = values
      else
    data = [ values ]

  return {
    op: taskOps.TASK_OP_INSERT,
    params: {
      path: path,
      values: data
    }
  }
}

insert.toCode = function(json, Flexio) {
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
