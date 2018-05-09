var _ = require('../lodash-local')

var read = function(path) {
  return {
    op: 'read',
    params: {
      path
    }
  }
}

read.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var path = JSON.stringify(params.path) || '""'
  return 'read(' + path + ')'
}

module.exports = read
