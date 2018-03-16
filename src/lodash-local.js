

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


module.exports = {
  assign:        assign,
  isString:      function(value) { return typeof value === 'string' || value instanceof String },
  isPlainObject: require('lodash.isplainobject'),
  isNumber:      function(value) { return !isNaN(parseFloat(value)) && isFinite(value) },
  isNil:         function(value) { return value == null },
  pick:          require('lodash.pick'),
  last:          require('lodash.last'),
  isFunction:    require('lodash.isfunction'),
  defaultTo:     require('lodash.defaultto'),
  get:           getprop
}
