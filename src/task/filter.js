var _ = require('../lodash-local')
var util = require('../util')

var filter = function(where) {
  return _.assign({}, { where }, { op: 'filter' })
}

filter.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var where = JSON.stringify(params.where) || '""'
  return 'filter(' + where + ')'
}

module.exports = filter
