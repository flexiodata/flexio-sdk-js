var _ = require('../lodash-local')

var email = function(params) {
  if (!_.isPlainObject(params))
    throw 'The first function parameter must be an object'

  if (!params.hasOwnProperty('to'))
    throw 'The `to` parameter is required'

  if (!params.hasOwnProperty('body_text'))
    throw 'The `body_text` parameter is required'

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
