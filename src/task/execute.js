import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_EXECUTE } from '../constants/task-type'

var isNodeJs = function() {
  return (typeof process !== 'undefined')
}

var toBase64 = function(str) {
  try {
    if (isNodeJs()) {
      return Buffer(str,'utf8').toString('base64')
    } else {
      return btoa(unescape(encodeURIComponent(str)))
    }
  }
  catch(e) {
    return e
  }
}

var fromBase64 = function(str) {
  try {
    if (isNodeJs()) {
      return Buffer.from(str, 'base64').toString('utf8')
    } else {
      return decodeURIComponent(escape(atob(str)))
    }
  }
  catch(e) {
    return e
  }
}

var getJsFunctionBody = function(f) {
  var body

  try {
    // stringify the function
    body = f.toString()

    // remove the wrapper function and just return its body
    body = body.substring(body.indexOf('{') + 1, body.lastIndexOf('}'))
  } catch (e) {
    body = ''
  }

  return body
}

var getJsExport = function(f) {
  if (_.isString(f))
    return f

  if (_.isFunction(f))
  {
    var body

    if (f.length == 0)
    {
      // function has no parameters, so just take body
      body = getJsFunctionBody(f)
      return 'exports.flexio_handler = function(context) ' + body
    }
     else
    {
      body = f.toString()
      if (body.substring(0, 8) == 'function')
      {
        // remove `function` but keep the provided arguments
        body = body.slice(8)
      }
       else
      {
        // handle arrow syntax
        var arrow = body.indexOf('=>')
        var brace = body.indexOf('{')

        if (arrow >= 0 && arrow < brace)
        {
          body = body.replace('=>\s*{', '{')
        }
      }
      return 'exports.flexio_handler = function' + body
    }
  }
}

// task definition function
var executeFn = function() {
  var type = TASK_TYPE_EXECUTE
  var args = Array.from(arguments)
  var lang = _.get(args, '[0]', '')
  var code = undefined

  var task = {
    type,
    params: {}
  }

  // allow for flexible parameters
  if (lang == 'python' || lang == 'javascript')
  {
    code = _.get(args, '[1]', '')
  }
   else
  {
    // default to javascript
    lang = 'javascript'
    code = _.get(args, '[0]', '')
  }

  if (_.isFunction(code))
  {
    // first argument is a function; we're using javascript
    if (_.isNil(lang))
      lang = 'javascript'

    code = getJsFunctionBody(code)
  }

  // set the job's language
  _.set(task, 'params.lang', lang)

  // handle files or code snippets
  var http_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  if (code.match(http_regex))
    _.set(task, 'params.file', code)
     else
    _.set(task, 'params.code', toBase64(code))

  return task
}

// shorthand for .execute('javascript', ...)
var javascriptFn = function() {
  var args = Array.from(arguments)
  var code = _.get(args, '[0]', '')
  code = getJsExport(code)
  return executeFn('javascript', code)
}

// shorthand for .execute('python', ...)
var pythonFn = function() {
  var args = Array.from(arguments)
  return executeFn('python', _.get(args, '[0]', ''))
}

export const execute    = executeFn
export const javascript = javascriptFn
export const python     = pythonFn

export default executeFn
