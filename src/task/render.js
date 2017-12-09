var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskTypes = require('../constants/task-type')       // import * as taskTypes from '../constants/task-type'

// task definition function
var render = function(url, options) {
  var args = Array.from(arguments)
  var url = _.get(args, '[0]', '')
  var params = _.get(args, '[1]', {})

  var defaults = {
    format: 'png',
    width: 800,
    height: 600,
    scrollbars: false
  }

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
    type: taskTypes.TASK_TYPE_RENDER,
    params
  }
}

render.fromJSON = function(json) {
  var params = _.get(json, 'params', {})
  var url = JSON.stringify(params.url) || ''
  var opts = _.omit(params)
  return 'render(' + url + ', ' + JSON.stringify(opts, null, 2) + ')'
}

module.exports = render   // export default render
