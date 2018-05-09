var _ = require('../lodash-local')

var copy = function(from,to,options) {
  var ret = {
    op: 'copy',
    params: {
      from,
      to
    }
  }

  if (_.isPlainObject(options)) {
    ret.params.options = options
  }

  return ret
}

copy.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
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
