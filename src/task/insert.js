var _ = require('../lodash-local')

var insert = function(path, values) {

  var data;
  if (Array.isArray(values))
    data = values
      else
    data = [ values ]

  return {
    op: 'insert',
    params: {
      path: path,
      values: data
    }
  }
}

insert.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var path = _.get(params, 'path', undefined)
  var values = _.get(params, 'values', undefined)

  if (!Array.isArray(values))
    values = [ values ]

  path = JSON.stringify(path)
  values = JSON.stringify(values)

  return 'insert(' + path + ', ' + values + ')'
}

module.exports = insert
