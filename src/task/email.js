var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var email = function(params) {
  if (!_.isPlainObject(params))
    throw 'The first function parameter must be an object'

  if (!_.has(params, 'to'))
    throw 'The `to` parameter is required'

  if (!_.has(params, 'body_text'))
    throw 'The `body_text` parameter is required'

  return {
    op: taskOps.TASK_OP_EMAIL_SEND,
    params
  }
}

email.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  return 'email(' + JSON.stringify(params, null, 2) + ')'
}

module.exports = email // export default email
