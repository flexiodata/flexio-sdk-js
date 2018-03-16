
module.exports = {

  assign:        require('lodash.assign'),
  isString:      function(value) { return typeof value === 'string' || value instanceof String },
  isPlainObject: require('lodash.isplainobject'),
  isNumber:      function(value) { return !isNaN(parseFloat(value)) && isFinite(value) },
  get:           require('lodash.get'),
  isNil:         function(value) { return value == null },
  pick:          require('lodash.pick'),
  last:          require('lodash.last'),
  each:          require('lodash.foreach'),
  isFunction:    require('lodash.isfunction'),
  defaultTo:     require('lodash.defaultto')
}
