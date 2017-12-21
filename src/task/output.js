var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'
var connTypes = require('../constants/connection-type') // import * as connTypes from '../constants/connection-type'

// task definition function
var output = function() {
  var args = Array.from(arguments)
  var connection_type = _.get(args, '[0]', '')
  var connection = undefined
  var location = undefined

  if (args.length == 0)
    throw 'The output task requires at least 1 parameter'

  switch (connection_type)
  {
    case connTypes.CONNECTION_TYPE_AMAZONS3:
    case connTypes.CONNECTION_TYPE_ELASTICSEARCH:
    case connTypes.CONNECTION_TYPE_GOOGLESHEETS:
    case connTypes.CONNECTION_TYPE_MYSQL:
    case connTypes.CONNECTION_TYPE_POSTGRES:
      connection = _.get(args, '[1]', '')
      break

    case connTypes.CONNECTION_TYPE_DROPBOX:
    case connTypes.CONNECTION_TYPE_GOOGLEDRIVE:
    case connTypes.CONNECTION_TYPE_SFTP:
      connection = _.get(args, '[1]', '')
      location = _.get(args, '[2]', '/')
      break
  }

  return {
    op: taskOps.TASK_OP_OUTPUT,
    metadata: { connection_type },
    params: {
      connection,
      location
    }
  }
}

module.exports = output   // export default output
