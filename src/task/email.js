var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var email = function(params) {

  if (!_.isPlainObject(params))
    return util.debug.call(this, 'The first function parameter must be an object')

  if (!_.has(params, 'to'))
    return util.debug.call(this, 'The `to` parameter is required')

  if (!_.has(params, 'body_text'))
    return util.debug.call(this, 'The `body_text` parameter is required')

  // cast `to` parameter to array, if it already isn't one
  if (!_.isArray(params.to))
    params.to = [params.to]

  if (!_.has(params, 'body_html'))
    params.body_html = params.body_text

  var data = _.get(params, 'data', '')
  if (data != 'body' && data != 'attachment')
    params.data = 'none'

    console.log(params)
  return {
    type: taskTypes.TASK_TYPE_EMAIL,
    params
  }
}

module.exports = email // export default email
