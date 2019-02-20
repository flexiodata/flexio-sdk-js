var _ = require('../lodash-local')
var util = require('../util')

var foreach = function(p0, p1) {

  var params = {}

  if (typeof p0 === 'string' || p0 instanceof String) {
    params.spec = p0
  }

  if (util.isPipeObject(p0)) {
    params.run = p0.pipe.task
  } else if (util.isPipeObject(p1)) {
    params.run = p1.pipe.task
  }

  return _.assign({}, params, { op: 'foreach' })
}

foreach.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json), p = []
  if (params.hasOwnProperty('spec')) {
    p.push(JSON.stringify(params.spec))
  }
  if (params.hasOwnProperty('run')) {
    p.push(Flexio.task.toCode(params.run, Flexio))
  }

  return 'foreach(' + p.join(', ') + ')'
}

module.exports = foreach
