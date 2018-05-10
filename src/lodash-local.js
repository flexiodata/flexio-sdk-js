
function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function getProp(object, path, defaultVal) {
  var _path = Array.isArray(path) ? path : path.replace(/(\[(\d)\])/g, '.$2').split('.').filter(function(i) { return i.length })
  if (!_path.length) {
    return object === undefined ? defaultVal : object
  }
  if (!isPlainObject(object) && !Array.isArray(object)) {
    return defaultVal
  }
  return getProp(object[_path.shift()], _path, defaultVal)
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
  isPlainObject, assign, pick, get: getProp,

  isString:      function(value) { return typeof value === 'string' || value instanceof String },
  isNumber:      function(value) { return !isNaN(parseFloat(value)) && isFinite(value) },
  isNil:         function(value) { return value == null },
  defaultTo:     function(value, default_value) { return (value == null || value !== value) ? default_value : value },
  last:          function(array) { const length = array == null ? 0 : array.length; return length ? array[length - 1] : undefined; },
  isFunction:    function(value) { return value instanceof Function; },
  has:           function(obj, value) { return obj.hasOwnProperty(value) },
  cloneDeep:     function(value) { return JSON.parse(JSON.stringify(value)) } // poor man's version
}
