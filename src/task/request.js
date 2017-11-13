var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

var method_types = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'HEAD', 'OPTIONS']
var http_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

/*
  syntax: request(url|connection[, config])

  json: {
    "type": "flexio.request",
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
  var connection = undefined

  // if we specify all of the options as a param object, we're basically done
  // and we can skip all of the parameterization checks below
  if (_.isPlainObject(_.get(args, '[0]', {})))
  {
    params = _.get(args, '[0]', {})
  }
   else
  {
    if (!_.isString(url))
      return util.debug.call(this, "The first parameter is required and must be a string representing the `url` or `connection` identifier.")

    if (url.match(http_regex))
    {
      // first parameter is a URL; we're done
    }
     else
    {
      // first parameter is a connection identifier
      connection = url
      url = undefined
    }

    // default to `GET` method
    params = _.assign({}, { url, connection }, params)
  }

  // default to `GET` method
  params = _.assign({ method: 'GET' }, params)

  return {
    type: taskTypes.TASK_TYPE_REQUEST,
    params
  }
}

module.exports = request // export default request
