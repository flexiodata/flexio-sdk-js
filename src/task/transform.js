var _ = require('../lodash-local')
var util = require('../util')

var transform = function(value) {
  var args = Array.from(arguments)

  var default_params = { operations: [] }
  var params = {}
  var columns = undefined
  var operations = []

  var arg1 = _.get(args, '[0]')

  // handle the case where the user passed an array of items
  // instead of just passing them as arguments
  if (_.isPlainObject(arg1))
  {
    // .transform({ columns: [], operations: [] }) syntax
    if (args.length == 1 && _.has(arg1, 'operations'))
    {
      params = _.pick(arg1, ['columns', 'operations'])
      params = _.assign(default_params, params)
    }
     else
    {
      // .transform({ operation: '', ... }, etc.) syntax
      operations = [].concat(args)
      params = { operations }
    }
  }
   else
  {
    params = { columns, operations }
  }

  return _.assign({}, params, { op: 'transform' })
}

transform.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  if (!_.has(params,'columns') && _.has(params, 'operations') && Array.isArray(params.operations) && params.operations.length == 1) {
    return "transform(" + JSON.stringify(params.operations[0]) + ")"
  } else {
    return "transform(" + JSON.stringify(params) + ")"
  }
}

module.exports = transform
