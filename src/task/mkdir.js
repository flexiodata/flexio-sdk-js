var _ = require('../lodash-local')

var mkdir = function(path) {
  return {
    op: 'mkdir',
    params: {
      path
    }
  }
}

mkdir.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var path = JSON.stringify(params.path) || '""'
  return 'mkdir(' + path + ')'
}

module.exports = mkdir
