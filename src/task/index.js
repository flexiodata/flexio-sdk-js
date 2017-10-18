import inputFn from './input'
import outputFn from './output'
import convertFn from './convert'
import echoFn from './echo'
import emailFn from './email'
import * as executeFns from './execute'
import filterFn from './filter'
import limitFn from './limit'
import listFn from './list'
import requestFn from './request'
import selectFn from './select'
import sleepFn from './sleep'
import transformFn from './transform'

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
export const request    = requestFn
export const select     = selectFn
export const sleep      = sleepFn
export const transform  = transformFn
