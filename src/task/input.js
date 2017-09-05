
/* -- NOTE: the `this` scope always refers back to the pipe -- */

import  { TASK_TYPE_INPUT } from '../constants/task-type'
import * as ctypes from '../constants/connection-type'

export default () => {
  var args = Array.from(arguments)
  var type = TASK_TYPE_INPUT
  var connection_type = get(args, '[0]', '')
  var connection = undefined
  var items = undefined

  switch (connection_type)
  {
    default:
      if (args.length == 0)
      {
        // CASE 1: no args; default to 'stdin' input
        connection_type = ctypes.CONNECTION_TYPE_STDIN
        connection = connection_type
      }
       else
      {
        // CASE 1: 1 or more args, but non; default to 'stdin' input
        connection_type = ctypes.CONNECTION_TYPE_HTTP
        items = [].concat(args)
      }

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
      connection = connection_type
      items = tail(args)
      break

    case ctypes.CONNECTION_TYPE_RSS:
      items = tail(args)
      break
  }

  items = map(items, (item) => {
    return {
      path: item
    }
  })

  this.addTask({
    type,
    metadata: { connection_type },
    params: {
      connection,
      items
    }
  })

  return this
}
