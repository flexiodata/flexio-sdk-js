import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_REQUEST } from '../constants/task-type'

var method_types = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'HEAD', 'OPTIONS']
var http_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

// task definition function
var request = function() {
  var type = TASK_TYPE_REQUEST
  var args = Array.from(arguments)
  var params = _.get(args, '[0]', {})

  // if we specify all of the options as a param object, we're basically done
  // and we can skip all of the parameterization checks below
  if (!_.isPlainObject(params))
  {
    var method = 'GET'
    var connection = undefined
    var url = undefined
    var headers = {}

    var arg = _.get(args, '[0]')

    // `method` is our first parameter
    if (_.includes(method_types, arg))
    {
      method = _.get(args, '[0]')
      args = args.slice(1)
      arg = _.get(args, '[0]')
    }

    if (_.isString(arg))
    {
      if (arg.match(http_regex))
      {
        // parameter is a URL; allow for .request([method], url, headers) syntax
        url = arg
        headers = _.get(args, '[1]', {})
      }
       else
      {
        // parameter is a connection identifier; allow for .request([method], connection, url, headers) syntax
        connection = arg
        url = _.get(args, '[1]')
        headers = _.get(args, '[2]', {})
      }
    }

    // fill out `params` based on the specified arguments
    params = {
      method,
      connection,
      url,
      headers
    }
  }

  // default to `GET` method (this will also ensure that `params` is an object)
  params = _.assign({ method: 'GET' }, params)

  return {
    type,
    params
  }
}

export default request
