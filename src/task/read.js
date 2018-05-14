var _ = require('../lodash-local')
var util = require('../util')

var read = function(path) {
  return _.assign({}, { path }, { op: 'read' })
}

read.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var path = JSON.stringify(params.path) || '""'
  return 'read(' + path + ')'
}

module.exports = read
