var _ = require('../lodash-local')
var util = require('../util')

var mkdir = function(path) {
  return _.assign({}, { path }, { op: 'mkdir' })
}

mkdir.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var path = JSON.stringify(params.path) || '""'
  return 'mkdir(' + path + ')'
}

module.exports = mkdir
