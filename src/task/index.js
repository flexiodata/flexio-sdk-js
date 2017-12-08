var _ = require('lodash')                               // import _ from 'lodash'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

var inputFn     = require('./input.js')
var outputFn    = require('./output.js')
var convertFn   = require('./convert.js')
var echoFn      = require('./echo.js')
var emailFn     = require('./email.js')
var filterFn    = require('./filter.js')
var executeFn   = require('./execute.js')
var limitFn     = require('./limit.js')
var listFn      = require('./list.js')
var readFn      = require('./read.js')
var renderFn    = require('./render.js')
var requestFn   = require('./request.js')
var selectFn    = require('./select.js')
var sleepFn     = require('./sleep.js')
var taskFn      = require('./task.js')
var transformFn = require('./transform.js')
var writeFn     = require('./write.js')

var fromJSON = function(json) {
  var type = _.get(json, 'type', '')

  switch (type) {
    default:
      return ''

    case taskTypes.TASK_TYPE_ECHO:       return echoFn.fromJSON(json)
    case taskTypes.TASK_TYPE_LIMIT:      return limitFn.fromJSON(json)
    case taskTypes.TASK_TYPE_SELECT:     return selectFn.fromJSON(json)
    case taskTypes.TASK_TYPE_SLEEP:      return sleepFn.fromJSON(json)
  }
}

module.exports = {
  input:      inputFn,
  output:     outputFn,
  convert:    convertFn,
  echo:       echoFn,
  email:      emailFn,
  execute:    executeFn.execute,
  filter:     filterFn,
  javascript: executeFn.javascript,
  limit:      limitFn,
  list:       listFn,
  python:     executeFn.python,
  read:       readFn,
  render:     renderFn,
  request:    requestFn,
  select:     selectFn,
  sleep:      sleepFn,
  task:       taskFn,
  transform:  transformFn,
  write:      writeFn,

  // expose all task 'fromJSON' calls into a single function
  fromJSON:   fromJSON
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
export const sleep      = sleepFn
export const transform  = taskFn
export const transform  = transformFn
export const write      = writeFn
*/
