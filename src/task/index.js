var _ = require('../lodash-local')

var connectFn   = require('./connect.js')
var convertFn   = require('./convert.js')
var copyFn      = require('./copy.js')
var createFn    = require('./create.js')
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

    case 'connect':   return connectFn.toCode(json, Flexio)
    case 'convert':   return convertFn.toCode(json, Flexio)
    case 'copy':      return copyFn.toCode(json, Flexio)
    case 'create':    return createFn.toCode(json, Flexio)
    case 'dump':      return dumpFn.toCode(json, Flexio)
    case 'echo':      return echoFn.toCode(json, Flexio)
    case 'email':     return emailFn.toCode(json, Flexio)
    case 'execute':   return executeFn.toCode(json, Flexio)
    case 'filter':    return filterFn.toCode(json, Flexio)
    case 'foreach':   return foreachFn.toCode(json, Flexio)
    case 'insert':    return insertFn.toCode(json, Flexio)
    case 'limit':     return limitFn.toCode(json, Flexio)
    case 'list':      return listFn.toCode(json, Flexio)
    case 'merge':     return mergeFn.toCode(json, Flexio)
    case 'mkdir':     return mkdirFn.toCode(json, Flexio)
    case 'read':      return readFn.toCode(json, Flexio)
    case 'render':    return renderFn.toCode(json, Flexio)
    case 'request':   return requestFn.toCode(json, Flexio)
    case 'select':    return selectFn.toCode(json, Flexio)
    case 'sequence':  return sequenceFn.toCode(json, Flexio)
    case 'set':       return setFn.toCode(json, Flexio)
    case 'sleep':     return sleepFn.toCode(json, Flexio)
    case 'transform': return transformFn.toCode(json, Flexio)
    case 'write':     return writeFn.toCode(json, Flexio)
  }
}

module.exports = {

  connect:    connectFn,
  convert:    convertFn,
  copy:       copyFn,
  create:     createFn,
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
