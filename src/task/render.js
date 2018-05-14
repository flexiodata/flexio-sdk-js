var _ = require('../lodash-local')
var util = require('../util')

var render = function(p0, p1) {

  var params = {}

  if (_.isPlainObject(p0)) {
    params = p0 
  } else if (_.isString(p0)) {
    params.url = p0
  }

  if (_.isPlainObject(p1)) {
    _.assign(params, p1)
  }

  return _.assign({}, params, { op: 'render' })
}

render.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var url = JSON.stringify(params.url) || ''
  delete params['url']

  if (Object.keys(params).length == 0)
    return 'render(' + url + ')'
     else
    return 'render(' + url + ', ' + JSON.stringify(params, null, 2) + ')'
}

module.exports = render
