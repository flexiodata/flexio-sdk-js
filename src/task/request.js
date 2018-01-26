var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

/*
  syntax: request(url|connection[, config])

  json: {
    "op": "request",
    "params": {
      "method": "",
      "connection": "",
      "url": "",
      "username": "",
      "password": "",
      "params": {},
      "data": {},
      "headers": {}
    }
  }
*/

// task definition function
var request = function() {
  var args = Array.from(arguments)
  var url = _.get(args, '[0]', '')
  var params = _.get(args, '[1]', {})

  // if we specify all of the options as a param object, we're basically done
  // and we can skip all of the parameterization checks below
  if (_.isPlainObject(_.get(args, '[0]', {})))
  {
    params = _.get(args, '[0]', {})
  }
   else
  {
    params = _.assign({}, { url }, params)
  }

  // default to `GET` method
  params = _.assign({ method: 'GET' }, params)

  return {
    op: taskOps.TASK_OP_REQUEST,
    params
  }
}

request.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var url = _.get(params, 'url', '')
  var opts = _.omit(params, ['url'])
  if (_.get(opts, 'method', '') == 'GET')
    opts = _.omit(opts, ['method'])

  if (_.isEmpty(opts))
    return 'request(' + JSON.stringify(url) + ')'
     else
    return 'request(' + JSON.stringify(url) + ', ' + JSON.stringify(opts, null, 2) + ')'
}

module.exports = request // export default request
