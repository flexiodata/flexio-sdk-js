var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

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
    op: taskTypes.TASK_TYPE_RENDER,
    params
  }
}

render.toCode = function(json) {
  var params = _.get(json, 'params', {})
  var url = JSON.stringify(params.url) || ''
  var opts = _.omit(params, ['url'])

  if (_.isEqual(opts, defaults))
    return 'render(' + url + ')'
     else
    return 'render(' + url + ', ' + JSON.stringify(opts, null, 2) + ')'
}

module.exports = render   // export default render
