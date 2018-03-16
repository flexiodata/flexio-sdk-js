var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

const defaults = {
  format: 'png',
  width: 800,
  height: 600,
  scrollbars: false
}

// task definition function
var render = function(url, options) {
  var args = Array.from(arguments)
  var url = _.get(args, '[0]', '')
  var params = _.get(args, '[1]', {})

  if (_.isNil(url))
    throw 'The `url` parameter is required'

  if (_.isPlainObject(_.get(args, '[0]', {})))
  {
    var params = _.get(args, '[0]', {})
  }
   else
  {
    var params = _.assign({}, defaults, options, { url })
  }

  return {
    op: taskOps.TASK_OP_RENDER,
    params
  }
}

render.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var url = JSON.stringify(params.url) || ''
  var opts = _.omit(params, ['url'])

  if (_.isEqual(opts, defaults))
    return 'render(' + url + ')'
     else
    return 'render(' + url + ', ' + JSON.stringify(opts, null, 2) + ')'
}

module.exports = render   // export default render
