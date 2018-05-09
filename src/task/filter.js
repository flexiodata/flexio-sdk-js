var _ = require('../lodash-local')

var filter = function(where) {
  return {
    op: 'filter',
    params: {
      where
    }
  }
}

filter.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var where = JSON.stringify(params.where) || '""'
  return 'filter(' + where + ')'
}

module.exports = filter
