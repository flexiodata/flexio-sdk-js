var _ = require('lodash')                               // import _ from 'lodash'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

var createFn    = require('./create.js')
var convertFn   = require('./convert.js')
var echoFn      = require('./echo.js')
var emailFn     = require('./email.js')
var executeFn   = require('./execute.js')
var filterFn    = require('./filter.js')
var inputFn     = require('./input.js')
var insertFn    = require('./insert.js')
var limitFn     = require('./limit.js')
var listFn      = require('./list.js')
var outputFn    = require('./output.js')
var readFn      = require('./read.js')
var renderFn    = require('./render.js')
var requestFn   = require('./request.js')
var selectFn    = require('./select.js')
var setFn       = require('./set.js')
var sleepFn     = require('./sleep.js')
var taskFn      = require('./task.js')
var transformFn = require('./transform.js')
var writeFn     = require('./write.js')

var toCode = function(json) {
  var type = _.get(json, 'op', '')

  switch (type) {
    default:
      return taskFn.toCode(json)

    case taskOps.TASK_OP_CREATE:     return createFn.toCode(json)
    case taskOps.TASK_OP_CONVERT:    return convertFn.toCode(json)
    case taskOps.TASK_OP_ECHO:       return echoFn.toCode(json)
    case taskOps.TASK_OP_EMAIL_SEND: return emailFn.toCode(json)
    case taskOps.TASK_OP_EXECUTE:    return executeFn.toCode(json)
    case taskOps.TASK_OP_FILTER:     return filterFn.toCode(json)
    case taskOps.TASK_OP_INSERT:     return insertFn.toCode(json)
    case taskOps.TASK_OP_LIMIT:      return limitFn.toCode(json)
    case taskOps.TASK_OP_READ:       return readFn.toCode(json)
    case taskOps.TASK_OP_RENDER:     return renderFn.toCode(json)
    case taskOps.TASK_OP_REQUEST:    return requestFn.toCode(json)
    case taskOps.TASK_OP_SELECT:     return selectFn.toCode(json)
    case taskOps.TASK_OP_SET:        return setFn.toCode(json)
    case taskOps.TASK_OP_SLEEP:      return sleepFn.toCode(json)
    case taskOps.TASK_OP_WRITE:      return writeFn.toCode(json)
  }
}

module.exports = {
  create:     createFn,
  convert:    convertFn,
  echo:       echoFn,
  email:      emailFn,
  execute:    executeFn.execute,
  input:      inputFn,
  insert:     insertFn,
  filter:     filterFn,
  javascript: executeFn.javascript,
  limit:      limitFn,
  list:       listFn,
  output:     outputFn,
  python:     executeFn.python,
  read:       readFn,
  render:     renderFn,
  request:    requestFn,
  select:     selectFn,
  set:        setFn,
  sleep:      sleepFn,
  task:       taskFn,
  transform:  transformFn,
  write:      writeFn,

  // expose all task 'toCode' calls as a single function
  toCode:     toCode
}

/*
import inputFn from './input'
import outputFn from './output'
import convertFn from './convert'
import echoFn from './echo'
import emailFn from './email'
import * as executeFns from './execute'
import filterFn from './filter'
import limitFn from './limit'
import listFn from './list'
import readFn from './read'
import renderFn from './render'
import requestFn from './request'
import selectFn from './select'
import setFn from './set'
import sleepFn from './sleep'
import transformFn from './task'
import transformFn from './transform'
import writeFn from './write'

export const input      = inputFn
export const output     = outputFn
export const convert    = convertFn
export const echo       = echoFn
export const email      = emailFn
export const execute    = executeFns.execute
export const filter     = filterFn
export const javascript = executeFns.javascript
export const limit      = limitFn
export const list       = listFn
export const python     = executeFns.python
export const read       = readFn
export const render     = renderFn
export const request    = requestFn
export const select     = selectFn
export const set        = setFn
export const sleep      = sleepFn
export const transform  = taskFn
export const transform  = transformFn
export const write      = writeFn
*/
