var _ = require('../lodash-local')                               // import _ from 'lodash'
var util = require('../util')                           // import util from '../util'
var taskOps = require('../constants/task-op')           // import * as taskOps from '../constants/task-op'

// task definition function
var sequence = function(steps) {

  return {
    op: taskOps.TASK_OP_SEQUENCE,
    params: {
      steps
    }
  }
}

sequence.toCode = function(json, Flexio) {

  var retval = []

  for (var i = 0; i < json.params.items.length; ++i) {
    var task = json.params.items[i]

    var cmd_str = Flexio.task.toCode(task, Flexio)

    // TODO: review this; it makes the code that is output very nice and tidy,
    //       however, if we don't like it we can yank it

    // increase indent of all lines of the commands (except the Python execute task which cares about indents)
    // other than the first line (which will be indented below)
    if (task.hasOwnProperty('params') && task.params.hasOwnProperty('lang') && task.params.lang != 'python')
      cmd_str = cmd_str.replace(/\n/g, '\n  ')

    retval.push(cmd_str)
  }

  // prepend the start of the JS code
  var retval = ['Flexio.pipe()'].concat(retval)

  // indent tasks and add dot notation
  return retval.join('\n  .')
}


/*
    // create JS task strings from JSON
    var retval = _.map(json.params.items, function(t) {

      var cmd_str = Flexio.task.toCode(t, Flexio)
  
      // TODO: review this; it makes the code that is output very nice and tidy,
      //       however, if we don't like it we can yank it

      // increase indent of all lines of the commands (except the Python execute task which cares about indents)
      // other than the first line (which will be indented below)
      if (_.get(t, 'params.lang', '') != 'python')
        cmd_str = cmd_str.replace(/\n/g, '\n  ')
  
      return cmd_str
    })
  
    // prepend the start of the JS code
    var retval = ['Flexio.pipe()'].concat(retval)
  
    // indent tasks and add dot notation
    return retval.join('\n  .')
*/


module.exports = sequence  // export default sequence
