var _ = require('../lodash-local')
var util = require('../util')

var insert = function(path, values) {

  var data
  if (Array.isArray(values))
    data = values
      else
    data = [ values ]

  return _.assign({}, { path, values: data }, { op: 'insert' })
}

insert.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var path = _.get(params, 'path', undefined)
  var values = _.get(params, 'values', undefined)

  if (!Array.isArray(values))
    values = [ values ]

  path = JSON.stringify(path)
  values = JSON.stringify(values)

  return 'insert(' + path + ', ' + values + ')'
}

module.exports = insert
