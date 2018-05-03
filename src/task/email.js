var _ = require('../lodash-local')

var email = function(p0, p1) {

  var params = {}
  if (_.isPlainObject(p0)) {
    _.assign(params, p0)
  } else {
    params.connection = p0
  }

  if (_.isPlainObject(p1)) {
    _.assign(params, p1)
  }

  return {
    op: 'email',
    params
  }
}

email.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  return 'email(' + JSON.stringify(params, null, 2) + ')'
}

module.exports = email
