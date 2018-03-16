var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'


// task definition function
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

  return {
    op: taskOps.TASK_OP_RENDER,
    params
  }
}

render.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var url = JSON.stringify(params.url) || ''
  delete params.url

  if (Object.keys(params).length == 0)
    return 'render(' + url + ')'
     else
    return 'render(' + url + ', ' + JSON.stringify(params, null, 2) + ')'
}

module.exports = render   // export default render
