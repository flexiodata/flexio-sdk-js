var _ = require('../lodash-local')                      // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

module.exports = convert  // export default convert

// task definition function
var convert = function(input, output) {

  return {
    op: taskOps.TASK_OP_CONVERT,
    params: { input, output }
  }
}


convert.toCode = function(json, Flexio) {
  var input = _.get(json, 'params.input', {})
  var output = _.get(json, 'params.output', {})

  return 'convert(' + JSON.stringify(input) + ', ' + JSON.stringify(output) + ')'
}


module.exports = convert
