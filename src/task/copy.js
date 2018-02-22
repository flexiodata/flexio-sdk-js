var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var copy = function(from,to,options) {
  var ret = {
    op: taskOps.TASK_OP_COPY,
    params: {
      from,
      to
    }
  }

  if (_.isPlainObject(options)) {
    ret.params.options = options
  }
  return ret
}

copy.toCode = function(json, Flexio) {
  var params = _.get(json, 'params', {})
  var from = JSON.stringify(params.from) || '""'
  var to = JSON.stringify(params.to) || '""'
  var options = (params.hasOwnProperty('options') && _.isPlainObject(params.options)) ? JSON.stringify(params.options) : null
  
  var ret = 'copy(' + from + ', ' + to
  if (options !== null) {
    ret += (', ' + options)
  }
  return ret + ')'
}

module.exports = copy
