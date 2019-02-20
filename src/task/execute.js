var _ = require('../lodash-local')
var util = require('../util')


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
  var param0 = _.get(args, '[0]')
  var param1 = _.get(args, '[1]')
  var param2 = _.get(args, '[2]')
  var lang, code, check
  var params = {}

  // allow for flexible parameters
  if (param0 == 'python' || param0 == 'javascript')
  {
    lang = param0
    code = param1
    check = param2
  }
   else
  {
    // default to javascript
    lang = 'javascript'
    code = param0
    check = param1
  }

  if (!code) {
    code = ''
  }

  if (lang == 'javascript') {
    code = getJsExport(code)
  }

  // set the job's language
  params.lang = lang

  // handle files or code snippets
  var http_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  if (code.match(http_regex))
  {
    params.path = code
  }
  else
  {
    params.code = util.toBase64(code)
  }

  if (check) {
    params.integrity = check
  }

  return _.assign({}, params, { op: 'execute' })
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
  var params = util.getTaskParams(json)
  var lang = params.lang || ''
  var code = util.fromBase64(params.code || '')

  // TODO: we need to handle 'path' and 'integrity'
  switch (lang)
  {
    case 'javascript':
      if (code.indexOf('exports.flexio_handler') != -1) {
        code = code.replace('exports.flexio_handler =', '')
        return 'javascript(' + code.trim() + ')'
      } else {
        return 'javascript(' + JSON.stringify(code.trim()) + ')'
      }

    case 'python':
      return 'python(`\n' + code + '\n`)'
    
    default:
      return 'execute(' + JSON.stringify(lang) + ', `\n' + code + '\n`)'
  }
}

module.exports = {
  execute: execute,
  javascript: javascript,
  python: python,
  toCode: toCode
}
