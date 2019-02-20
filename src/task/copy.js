var _ = require('../lodash-local')
var util = require('../util')

var copy = function(from,to,options) {
  var params = {
    from,
    to
  }

  if (_.isPlainObject(options)) {
    params.options = options
  }

  return _.assign({}, params, { op: 'copy' })
}

copy.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var from = JSON.stringify(params.from) || '""'
  var to = JSON.stringify(params.to) || '""'
  var options = (params.hasOwnProperty('options') && _.isPlainObject(params.options)) ? JSON.stringify(params.options) : null
  
  var ret = 'copy(' + from + ', ' + to
  if (options !== null) {
    ret += (', ' + options)
  }
  return ret + ')'
}

module.exports = copy
