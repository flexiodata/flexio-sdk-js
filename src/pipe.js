var _ = require('./lodash-local')                               // import _ from 'lodash'


module.exports = {}
module.exports.getPipeConstructor = function(Flexio) {

return function(pipeconstruct_param) {

  if (!(this instanceof Flexio.pipe)) {
    return new Flexio.pipe(pipeconstruct_param)
  }

  var pipeobj = _.assign(this, {
    // -- state --

    pipe: {
      name: 'Untitled',
      description: '',
      task: { op: 'sequence', items: [] }
    },
    processes: [],
    _params: {}, // avoid collision with `params` method name
    loading: false,
    saving: false,
    running: false,

    // -- methods --

    getJSON() {
      return _.assign({}, this.pipe)
    },

    getProcesses() {
      return [].concat(this.processes)
    },

    getLastProcess() {
      return _.last(this.processes)
    },

    addTask(task) {
      this.pipe.task.items.push(task)
      return this
    },

    clearTasks() {
      this.pipe.task.items = []
      return this
    },

    getTasks() {
      return this.pipe.task.items
    },

    load() {
      var args = Array.from(arguments)
      var identifier = _.get(args, '[0]')
      var callback = _.get(args, '[1]')

      if (this.loading === true || this.saving === true || this.running === true)
      {
        setTimeout(() => { this.load.apply(this, arguments) }, 50)
        return this
      }

      if (_.isNil(identifier))
        return Flexio.util.debug("The `identifier` parameter is required. Either the pipe's eid or pipe's alias may be used.")

      this.loading = true
      Flexio.util.debug('Loading Pipe `' + identifier + '`...')

      Flexio.http().get('/me/pipes/' + identifier)
        .then(response => {
          var obj = _.get(response, 'data', {})
          this.pipe = _.assign({}, obj)
          this.loading = false
          Flexio.util.debug('Pipe Loaded.')

          if (typeof callback == 'function')
            callback.call(this, null, obj)
        })
        .catch(error => {
          this.loading = false
          Flexio.util.debug('Pipe Load Failed. ')

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    },

    save() {
      var args = Array.from(arguments)
      var params = _.get(args, '[0]')
      var callback = _.get(args, '[0]')

      if (this.loading === true || this.saving === true || this.running === true)
      {
        setTimeout(() => { this.save.apply(this, arguments) }, 50)
        return this
      }

      if (_.isPlainObject(params))
      {
        _.assign(this.pipe, _.pick(params, ['name', 'description', 'alias', 'task', 'schedule', 'schedule_status']))
        callback = _.get(args, '[1]')
      }

      this.saving = true
      Flexio.util.debug('Saving Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      Flexio.http().post('/me/pipes', this.pipe)
        .then(response => {
          var pipe = _.get(response, 'data', {})
          this.pipe = _.assign({}, pipe)
          this.saving = false
          Flexio.util.debug('Pipe Saved.')

          if (typeof callback == 'function')
            callback.call(this, null, this.pipe)
        })
        .catch(error => {
          this.saving = false
          Flexio.util.debug('Pipe Save Failed.')

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    },

    run() {
      var args = Array.from(arguments)
      args.unshift(this) // 'this' pipe object will be the first parameter
      return Flexio.pipes.run.apply(null, args)
    },

    params(params) {
      this._params = _.assign({}, this.getParams(), params)
      return this
    },

    getParams() {
      return _.assign({}, this._params)
    },


    toCode(p) {
      return Flexio.task.toCode(this.pipe.task, Flexio)
    }


  }) /* end assign */

  /*
    iterate through each of the task functions on the `Flexio` object and
    create a function which will add that task's JSON to the pipe when called --
    this will auto-generate these functions and eliminate the need for us
    to keep this list of functions updated every time we add a new task;
    see `./task/*.js` for the list of tasks that are available for use

    so we do this...
  */

 for (var task_name in Flexio.task) {

    (function(task_name, task_func){
      if (Flexio.task.hasOwnProperty(task_name) && task_name != 'toCode') {
        pipeobj[task_name] = function() {
          return pipeobj.addTask(task_func.apply(pipeobj, arguments))
        }
      }
    })(task_name, Flexio.task[task_name])

  }
  /*
  var forEachTask = function(callback) {
    for (var task_name in Flexio.task) {
      if (Flexio.task.hasOwnProperty(task_name) && task_name != 'toCode') {
        callback(task_name, Flexio.task[task_name])
      }
    }
  }

  forEachTask(function(task_name, task_func) {
      pipeobj[task_name] = function() { return pipeobj.addTask(task_func.apply(pipeobj, arguments)) }
  })
*/



/*
  _.each(Flexio.task, function(taskFn, task_name) {
    if (task_name != 'toCode') {
      pipeobj[task_name] = function() { return pipeobj.addTask(taskFn.apply(pipeobj, arguments)) }
    }
  })
*/

  /*
    instead of this...

    input()      { return this.addTask(Flexio.task.input.apply(this, arguments))      },
    output()     { return this.addTask(Flexio.task.output.apply(this, arguments))     },
    convert()    { return this.addTask(Flexio.task.convert.apply(this, arguments))    },
    etc...
  */


  if (pipeconstruct_param !== undefined) {
    if (typeof pipeconstruct_param === 'string' || pipeconstruct_param instanceof String) {
      // parameter is eid or identifier
      pipeobj.pipe.eid = pipeconstruct_param
    } else if (typeof pipeconstruct_param === 'object') {
      pipeconstruct_param = _.cloneDeep(pipeconstruct_param)
      if (pipeconstruct_param.hasOwnProperty('pipe')) {
        pipeobj.pipe = pipeconstruct_param.pipe
      } else if (pipeconstruct_param.hasOwnProperty('task')) {
        pipeobj.pipe = pipeconstruct_param
      } else if (pipeconstruct_param.hasOwnProperty('op')) {
        pipeobj.pipe.task = pipeconstruct_param
      }
    }
  }

  return pipeobj
}


} // module.exports.getPipeConstructor

