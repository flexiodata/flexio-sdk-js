import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_INPUT } from '../constants/task-type'
import * as ctypes from '../constants/connection-type'

// task definition function
var input = function() {
  var type = TASK_TYPE_INPUT
  var args = Array.from(arguments)
  var connection_type = _.get(args, '[0]', '')
  var connection = undefined
  var items = undefined

  if (args.length == 0)
    return util.debug.call(this, 'The input task requires at least 1 parameter')

  switch (connection_type)
  {
    default:
      connection_type = ctypes.CONNECTION_TYPE_HTTP
      items = [].concat(args)
      break

    case ctypes.CONNECTION_TYPE_AMAZONS3:
    case ctypes.CONNECTION_TYPE_DROPBOX:
    case ctypes.CONNECTION_TYPE_ELASTICSEARCH:
    case ctypes.CONNECTION_TYPE_GOOGLEDRIVE:
    case ctypes.CONNECTION_TYPE_GOOGLESHEETS:
    case ctypes.CONNECTION_TYPE_HTTP:
    case ctypes.CONNECTION_TYPE_MYSQL:
    case ctypes.CONNECTION_TYPE_POSTGRES:
    case ctypes.CONNECTION_TYPE_SFTP:
      connection = _.get(args, '[1]', '')
      items = _.get(args, '[2]', [])
      break

    case ctypes.CONNECTION_TYPE_RSS:
      connection = connection_type
      items = _.get(args, '[1]', [])
      break
  }

  items = _.map(items, (path) => {
    return {
      path
    }
  })

  return {
    type,
    metadata: { connection_type },
    params: {
      connection,
      items
    }
  }
}

export default input
