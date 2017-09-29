import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_OUTPUT } from '../constants/task-type'
import * as ctypes from '../constants/connection-type'

// task definition function
var output = function() {
  var type = TASK_TYPE_OUTPUT
  var args = Array.from(arguments)
  var connection_type = _.get(args, '[0]', '')
  var connection = undefined
  var location = undefined

  if (args.length == 0)
    return util.debug.call(this, 'The output task requires at least 1 parameter')

  switch (connection_type)
  {
    case ctypes.CONNECTION_TYPE_AMAZONS3:
    case ctypes.CONNECTION_TYPE_ELASTICSEARCH:
    case ctypes.CONNECTION_TYPE_GOOGLESHEETS:
    case ctypes.CONNECTION_TYPE_MYSQL:
    case ctypes.CONNECTION_TYPE_POSTGRES:
      connection = _.get(args, '[1]', '')
      break

    case ctypes.CONNECTION_TYPE_DROPBOX:
    case ctypes.CONNECTION_TYPE_GOOGLEDRIVE:
    case ctypes.CONNECTION_TYPE_SFTP:
      connection = _.get(args, '[1]', '')
      location = _.get(args, '[2]', '/')
      break
  }

  return {
    type,
    metadata: { connection_type },
    params: {
      connection,
      location
    }
  }
}

export default output
