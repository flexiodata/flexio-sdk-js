var _ = require('lodash')                               // import _ from 'lodash'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

var createFn    = require('./create.js')
var convertFn   = require('./convert.js')
var copyFn      = require('./copy.js')
var dumpFn      = require('./dump.js')
var echoFn      = require('./echo.js')
var emailFn     = require('./email.js')
var executeFn   = require('./execute.js')
var filterFn    = require('./filter.js')
var foreachFn   = require('./foreach.js')
var insertFn    = require('./insert.js')
var limitFn     = require('./limit.js')
var mergeFn     = require('./merge.js')
var mkdirFn     = require('./mkdir.js')
var listFn      = require('./list.js')
var readFn      = require('./read.js')
var renderFn    = require('./render.js')
var requestFn   = require('./request.js')
var selectFn    = require('./select.js')
var sequenceFn  = require('./sequence.js')
var setFn       = require('./set.js')
var sleepFn     = require('./sleep.js')
var taskFn      = require('./task.js')
var transformFn = require('./transform.js')
var writeFn     = require('./write.js')

var toCode = function(json, Flexio) {
  var op = _.get(json, 'op', '')

  switch (op) {
    default:
      return taskFn.toCode(json)

    case taskOps.TASK_OP_CREATE:     return createFn.toCode(json, Flexio)
    case taskOps.TASK_OP_CONVERT:    return convertFn.toCode(json, Flexio)
    case taskOps.TASK_OP_COPY:       return copyFn.toCode(json, Flexio)
    case taskOps.TASK_OP_DUMP:       return dumpFn.toCode(json, Flexio)
    case taskOps.TASK_OP_ECHO:       return echoFn.toCode(json, Flexio)
    case taskOps.TASK_OP_EMAIL_SEND: return emailFn.toCode(json, Flexio)
    case taskOps.TASK_OP_EXECUTE:    return executeFn.toCode(json, Flexio)
    case taskOps.TASK_OP_FILTER:     return filterFn.toCode(json, Flexio)
    case taskOps.TASK_OP_FOREACH:    return foreachFn.toCode(json, Flexio)
    case taskOps.TASK_OP_INSERT:     return insertFn.toCode(json, Flexio)
    case taskOps.TASK_OP_LIMIT:      return limitFn.toCode(json, Flexio)
    case taskOps.TASK_OP_LIST:       return listFn.toCode(json, Flexio)
    case taskOps.TASK_OP_MERGE:      return mergeFn.toCode(json, Flexio)
    case taskOps.TASK_OP_MKDIR:      return mkdirFn.toCode(json, Flexio)
    case taskOps.TASK_OP_READ:       return readFn.toCode(json, Flexio)
    case taskOps.TASK_OP_RENDER:     return renderFn.toCode(json, Flexio)
    case taskOps.TASK_OP_REQUEST:    return requestFn.toCode(json, Flexio)
    case taskOps.TASK_OP_SELECT:     return selectFn.toCode(json, Flexio)
    case taskOps.TASK_OP_SEQUENCE:   return sequenceFn.toCode(json, Flexio)
    case taskOps.TASK_OP_SET:        return setFn.toCode(json, Flexio)
    case taskOps.TASK_OP_SLEEP:      return sleepFn.toCode(json, Flexio)
    case taskOps.TASK_OP_WRITE:      return writeFn.toCode(json, Flexio)
  }
}

module.exports = {
  create:     createFn,
  convert:    convertFn,
  copy:       copyFn,
  dump:       dumpFn,
  echo:       echoFn,
  email:      emailFn,
  execute:    executeFn.execute,
  insert:     insertFn,
  filter:     filterFn,
  //"for":      foreachFn,
  foreach:    foreachFn,
  javascript: executeFn.javascript,
  limit:      limitFn,
  list:       listFn,
  merge:      mergeFn,
  mkdir:      mkdirFn,
  python:     executeFn.python,
  read:       readFn,
  render:     renderFn,
  request:    requestFn,
  select:     selectFn,
  sequence:   sequenceFn,
  set:        setFn,
  sleep:      sleepFn,
  task:       taskFn,
  transform:  transformFn,
  write:      writeFn,

  // expose all task 'toCode' calls as a single function
  toCode:     toCode
}
