var _ = require('../lodash-local')                               // import _ from 'lodash'
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

  return {
    op: taskOps.TASK_OP_REQUEST,
    params
  }
}

request.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var url = _.get(params, 'url', '')

  var keys = Object.keys(params)
  if (keys.length == 1 && keys[0] == 'url')
    return 'request(' + JSON.stringify(url) + ')'
     else
    return 'request(' + JSON.stringify(params, null, 2) + ')'
}

module.exports = request // export default request
