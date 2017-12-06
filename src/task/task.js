var _ = require('lodash')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'

// task definition function
// .task() simply passes through json raw
var task = function(json) {
  return json
}

module.exports = task   // export default list
