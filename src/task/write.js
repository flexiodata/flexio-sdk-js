var _ = require('../lodash-local')
var util = require('../util')

var write = function(path) {
  return _.assign({}, { path }, { op: 'write' })
}

write.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var path = JSON.stringify(params.path) || '""'
  return 'write(' + path + ')'
}

module.exports = write
