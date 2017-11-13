var executeFunctions = require('./execute.js')

module.exports = {
    input:  require('./input.js'),
    output: require('./input.js'),
    convert: require('./convert.js'),
    echo: require('./echo.js'),
    email: require('./email.js'),
    execute: executeFunctions.execute,
    filter: require('./filter.js'),
    javascript: executeFunctions.javascript,
    limit: require('./limit.js'),
    list: require('./list.js'),
    python: executeFunctions.python,
    render: require('./render.js'),
    request: require('./request.js'),
    select: require('./select.js'),
    sleep: require('./sleep.js'),
    transform: require('./transform.js'),
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
import renderFn from './render'
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
export const render     = renderFn
export const request    = requestFn
export const select     = selectFn
export const sleep      = sleepFn
export const transform  = transformFn
*/
