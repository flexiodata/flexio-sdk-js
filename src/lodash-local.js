
module.exports._ = {

  assign:        require('lodash.assign'),
  isString:      function(value) { return typeof val === 'string' || val instanceof String },
  has:           require('lodash.has'),
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
  isEqual:       require('lodash.isequal'),
  defaultTo:     require('lodash.defaultto')
}
