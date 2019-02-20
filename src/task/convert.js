var _ = require('../lodash-local')
var util = require('../util')

var convert = function(input, output) {

  var params = {
    input,
    output
  }

  return _.assign({}, params, { op: 'convert' })
}

convert.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var input = _.get(params, 'input', {})
  var output = _.get(params, 'output', {})
  return 'convert(' + JSON.stringify(input) + ', ' + JSON.stringify(output) + ')'
}

module.exports = convert
