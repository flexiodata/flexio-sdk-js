

function getprop(object, path, defaultVal) {
  var _path = Array.isArray(path) ? path : path.replace(/(\[(\d)\])/g, '.$2').split('.').filter(function(i) { return i.length })
  if (!_path.length) {
    return object === undefined ? defaultVal : object
  }
  return getprop(object[_path.shift()], _path, defaultVal)
}

function assign(target, options) {
  var args = Array.from(arguments)
  args.shift()
  for (var i = 0; i < args.length; ++i) {
    for (var prop in args[i]) {
      if (args[i].hasOwnProperty(prop)) {
        target[prop] = args[i][prop]
      }
    }
  }
  return target
}

function pick(src, want_array) {
  if (src == null || !Array.isArray(want_array)) {
    return {}
  }
  var ret = {}, prop
  for (var i = 0; i < want_array.length; ++i) {
    prop = want_array[i]
    if (src.hasOwnProperty(prop)) {
      ret[prop] = src[prop]
    }
  }
  return ret
}


module.exports = {
  assign:        assign,
  pick:          pick,
  get:           getprop,
  isString:      function(value) { return typeof value === 'string' || value instanceof String },
  isNumber:      function(value) { return !isNaN(parseFloat(value)) && isFinite(value) },
  isNil:         function(value) { return value == null },
  isPlainObject: require('lodash.isplainobject'),
  last:          require('lodash.last'),
  isFunction:    require('lodash.isfunction'),
  defaultTo:     require('lodash.defaultto')
}
