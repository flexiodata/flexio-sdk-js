var _ = require('../lodash-local')
var util = require('../util')

var list = function(path) {
  return _.assign({}, { path }, { op: 'list' })
}

list.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var path = JSON.stringify(params.path) || '""'
  return 'list(' + path + ')'
}

module.exports = list
