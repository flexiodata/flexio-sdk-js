import inputFn from './input'
import outputFn from './output'
import convertFn from './convert'
import emailFn from './email'
import * as executeFns from './execute'
import filterFn from './filter'

export const input      = inputFn
export const output     = outputFn
export const convert    = convertFn
export const email      = emailFn
export const execute    = executeFns.execute
export const filter     = filterFn
export const javascript = executeFns.javascript
export const python     = executeFns.python
