var _ = require('lodash')                               // import _ from 'lodash'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'
var connTypes = require('../constants/connection-type') // import * as connTypes from '../constants/connection-type'
var util = require('../util')                           // import util from '../util'


// task definition function
var input = function() {
  var args = Array.from(arguments)
  var connection_type = _.get(args, '[0]', '')
  var connection = undefined
  var items = undefined

  if (args.length == 0)
    throw 'The input task requires at least 1 parameter'

  switch (connection_type)
  {
    default:
      connection_type = connTypes.CONNECTION_TYPE_HTTP
      items = [].concat(args)
      break

    case connTypes.CONNECTION_TYPE_AMAZONS3:
    case connTypes.CONNECTION_TYPE_DROPBOX:
    case connTypes.CONNECTION_TYPE_ELASTICSEARCH:
    case connTypes.CONNECTION_TYPE_GOOGLEDRIVE:
    case connTypes.CONNECTION_TYPE_GOOGLESHEETS:
    case connTypes.CONNECTION_TYPE_HTTP:
    case connTypes.CONNECTION_TYPE_MYSQL:
    case connTypes.CONNECTION_TYPE_POSTGRES:
    case connTypes.CONNECTION_TYPE_SFTP:
      connection = _.get(args, '[1]', '')
      items = _.get(args, '[2]', [])
      break

    case connTypes.CONNECTION_TYPE_RSS:
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
    op: taskOps.TASK_OP_INPUT,
    metadata: { connection_type },
    params: {
      connection,
      items
    }
  }
}

module.exports = input // export default input
