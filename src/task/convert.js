var _ = require('../lodash-local')

var convert = function(input, output) {
  return {
    op: 'convert',
    params: { input, output }
  }
}

convert.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', json)
  var input = _.get(params, 'input', {})
  var output = _.get(params, 'output', {})
  return 'convert(' + JSON.stringify(input) + ', ' + JSON.stringify(output) + ')'
}

module.exports = convert
