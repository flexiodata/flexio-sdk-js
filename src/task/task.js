var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'

// task definition function
// .task() simply passes through json raw
var task = function(json) {
  return json
}

task.toCode = function(json, Flexio) {
  return 'task(' + JSON.stringify(json, null, 2) + ')'
}

module.exports = task   // export default list
