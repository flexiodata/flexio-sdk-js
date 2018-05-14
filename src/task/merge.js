var _ = require('../lodash-local')
var util = require('../util')

var merge = function(path) {

  if (Array.isArray(path)) {
    var files = path
  } else {
    var files = []
    for (var i = 0; i < arguments.length; ++i) {
      files.push(arguments[i])
    }
  }

  return _.assign({}, { files }, { op: 'merge' })
}

merge.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var files = _.get(params, 'files', [])
  for (var i = 0; i < files.length; ++i) {
    if (typeof files[i] === 'string' || files[i] instanceof String)
    {
      files[i] = JSON.stringify(files[i])
    } else {
      files[i] = Flexio.merge.toCode(files[i], Flexio)
    }
  }

  var param = files.length >= 10 ? ('[' + files.join(', ') + ']') : files.join(', ')
  return 'merge(' +  param + ')'
}

module.exports = merge
