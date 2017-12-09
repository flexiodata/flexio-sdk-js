var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'

// task definition function
// .task() simply passes through json raw
var task = function(json) {
  return json
}

task.fromJSON = function(json) {
  return 'task(' + JSON.stringify(json, null, 2) + ')'
}

module.exports = task   // export default list
