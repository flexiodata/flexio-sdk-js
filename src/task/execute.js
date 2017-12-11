var _ = require('lodash')     // import _ from 'lodash'
var util = require('../util') // import util from '../util'
var taskTypes = require('../constants/task-type')


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
var execute = function() {
  var args = Array.from(arguments)
  var param0 = _.get(args, '[0]', null)
  var param1 = _.get(args, '[1]', null)
  var param2 = _.get(args, '[2]', null)
  var lang, code, check


  var task = {
    type: taskTypes.TASK_TYPE_EXECUTE,
    params: {}
  }

  // allow for flexible parameters
  if (param0 == 'python' || param0 == 'javascript')
  {
    lang = param0
    code = param1
    if (code === null || code === undefined) {
     code = ''
    }
    check = param2
  }
   else
  {
    // default to javascript
    lang = 'javascript'
    code = param0
    check = param1
  }

  if (lang == 'javascript') {
    code = getJsExport(code)
  }

  // set the job's language
  _.set(task, 'params.lang', lang)

  // handle files or code snippets
  var http_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  if (code.match(http_regex))
  {
    _.set(task, 'params.path', code)
  }
  else
  {
    _.set(task, 'params.code', toBase64(code))
  }

  if (check !== null) {
    _.set(task, 'params.integrity', check)
  }

  return task
}

// shorthand for .execute('javascript', ...)
var javascript = function() {
  var args = Array.from(arguments)
  args.unshift('javascript')
  return execute.apply(this, args)
}

// shorthand for .execute('python', ...)
var python = function() {
  var args = Array.from(arguments)
  args.unshift('python')
  return execute.apply(this, args)
}

var toCode = function(json) {
  var params = _.get(json, 'params', {})
  var lang = params.lang || ''
  var code = fromBase64(params.code || '')

  // TODO: we nee to handle 'path' and 'integrity'
  switch (lang)
  {
    case 'javascript':
      code = code.replace('exports.flexio_handler =', '')
      return 'javascript(' + code.trim() + ')'
    case 'python':
      return 'python(`\n' + code + '\n`)'
    default:
      return 'execute(' + JSON.stringify(lang) + ', `\n' + code + '\n`)'
  }
}

/*
export const execute    = executeFn
export const javascript = javascriptFn
export const python     = pythonFn
export default executeFn
*/

module.exports = {
  execute: execute,
  javascript: javascript,
  python: python,
  toCode: toCode
}
