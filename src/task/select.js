var _ = require('../lodash-local')
var util = require('../util')

var select = function() {
  var columns = Array.from(arguments)

  // handle the case where the user passed an array of items
  // instead of just passing them as arguments
  if (columns.length == 1 && Array.isArray(_.get(columns, '[0]')))
    columns = _.get(columns, '[0]', [])

    return _.assign({}, { columns }, { op: 'select' })
}

select.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var cols = JSON.stringify(params.columns) || ''
  if (cols.indexOf('[') != -1 && cols.indexOf(']') != -1)
    cols = cols.substring(1, cols.length-1)
  return 'select(' + cols + ')'
}

module.exports = select
