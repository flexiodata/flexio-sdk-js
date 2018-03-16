
module.exports = {

  assign:        require('lodash.assign'),
  isString:      function(value) { return typeof value === 'string' || value instanceof String },
  includes:      require('lodash.includes'),
  isPlainObject: require('lodash.isplainobject'),
  isNumber:      function(value) { return !isNaN(parseFloat(value)) && isFinite(value) },
  omit:          require('lodash.omit'),
  get:           require('lodash.get'),
  isNil:         function(value) { return value == null },
  pick:          require('lodash.pick'),
  set:           require('lodash.set'),
  last:          require('lodash.last'),
  each:          require('lodash.foreach'),
  isFunction:    require('lodash.isfunction'),
  defaultTo:     require('lodash.defaultto')
}
