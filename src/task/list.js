var _ = require('../lodash-local')

var list = function(path) {
  return {
    op: 'list',
    params: {
      path
    }
  }
}

list.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var path = JSON.stringify(params.path) || '""'
  return 'list(' + path + ')'
}

module.exports = list
