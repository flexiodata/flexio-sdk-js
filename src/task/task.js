var _ = require('../lodash-local')

// task definition function
// .task() simply passes through json raw
var task = function(json) {
  return json
}

task.toCode = function(json, Flexio) {
  return 'task(' + JSON.stringify(json, null, 2) + ')'
}

module.exports = task 
