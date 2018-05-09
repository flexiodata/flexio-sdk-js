var _ = require('../lodash-local')

var write = function(path) {
  return _.assign({}, { path }, { op: 'write' })
}

write.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var path = JSON.stringify(params.path) || '""'
  return 'write(' + path + ')'
}

module.exports = write
