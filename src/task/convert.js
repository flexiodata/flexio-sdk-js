var _ = require('../lodash-local')

var convert = function(input, output) {
  return {
    op: 'convert',
    params: { input, output }
  }
}

convert.toCode = function(json, Flexio) {
  var input = _.get(json, 'params.input', {})
  var output = _.get(json, 'params.output', {})
  return 'convert(' + JSON.stringify(input) + ', ' + JSON.stringify(output) + ')'
}

module.exports = convert
