var _ = require('../lodash-local')

var write = function(path) {
  return {
    op: 'write',
    params: {
      path
    }
  }
}

write.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var path = JSON.stringify(params.path) || '""'
  return 'write(' + path + ')'
}

module.exports = write
