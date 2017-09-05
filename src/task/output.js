
/* -- NOTE: the `this` scope always refers back to the pipe -- */

import  { TASK_TYPE_OUTPUT } from './constants/task-type'
import * as ctypes from './constants/connection-type'

export default () => {
  var args = Array.from(arguments)
  var type = TASK_TYPE_OUTPUT
  var connection_type = get(args, '[0]', '')
  var connection = undefined
  var location = undefined

  switch (connection_type)
  {
    default:
      if (args.length == 0)
      {
        connection_type = ctypes.CONNECTION_TYPE_STDOUT
        connection = connection_type
      }

      break

    case ctypes.CONNECTION_TYPE_AMAZONS3:
    case ctypes.CONNECTION_TYPE_ELASTICSEARCH:
      connection = connection_type
      items = tail(args)
      break

    case ctypes.CONNECTION_TYPE_DROPBOX:
    case ctypes.CONNECTION_TYPE_GOOGLEDRIVE:
    case ctypes.CONNECTION_TYPE_GOOGLESHEETS:
    case ctypes.CONNECTION_TYPE_MYSQL:
    case ctypes.CONNECTION_TYPE_POSTGRES:
    case ctypes.CONNECTION_TYPE_SFTP:
      connection = connection_type
      location = '/'
      break
  }

  this.addTask({
    type,
    metadata: { connection_type },
    params: {
      connection,
      location
    }
  })

  return this
}
