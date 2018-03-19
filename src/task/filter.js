var _ = require('../lodash-local')

var filter = function(where) {

  if (_.isNil(where))
    throw 'The `filter` parameter is required'

  return {
    op: 'filter',
    params: {
      where
    }
  }
}

filter.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var where = JSON.stringify(params.where) || '""'
  return 'filter(' + where + ')'
}

module.exports = filter
