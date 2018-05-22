var _ = require('../lodash-local')
var util = require('../util')

// task definition function
// .task() simply passes through json raw
var task = function(json) {
  return json
}

task.toCode = function(json, Flexio) {
  var params = JSON.parse(JSON.stringify(json))
  delete params['eid']
  return 'task(' + JSON.stringify(params, null, 2) + ')'
}

module.exports = task 
