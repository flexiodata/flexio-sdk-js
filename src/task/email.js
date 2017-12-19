var _ = require('lodash')                               // import _ from 'lodash'
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

  // cast `to` parameter to array, if it already isn't one
  if (!_.isArray(params.to))
    params.to = [params.to]

  if (!_.has(params, 'body_html'))
    params.body_html = params.body_text

  var data = _.get(params, 'data', '')
  if (data != 'body' && data != 'attachment')
    params.data = 'none'

  return {
    op: taskOps.TASK_OP_EMAIL_SEND,
    params
  }
}

email.toCode = function(json) {
  var params = _.get(json, 'params', {})
  return 'email(' + JSON.stringify(params, null, 2) + ')'
}

module.exports = email // export default email
