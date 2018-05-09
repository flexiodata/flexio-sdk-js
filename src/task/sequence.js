var _ = require('../lodash-local')

var sequence = function(steps) {

  return {
    op: 'sequence',
    params: {
      steps
    }
  }
}

sequence.toCode = function(json, Flexio) {

  var params = _.get(json, 'params', json)
  var retval = []
  
  for (var i = 0; i < params.items.length; ++i) {
    var task = params.items[i]

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

module.exports = sequence
