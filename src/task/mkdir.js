var _ = require('../lodash-local')

var mkdir = function(path) {
  return _.assign({}, { path }, { op: 'mkdir' })
}

mkdir.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var path = JSON.stringify(params.path) || '""'
  return 'mkdir(' + path + ')'
}

module.exports = mkdir
