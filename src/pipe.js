var _ = require('lodash')                               // import _ from 'lodash'


module.exports = {}
module.exports.getPipeConstructor = function(Flexio) {

return function(identifier) {

  if (!(this instanceof Flexio.pipe)) {
    return new Flexio.pipe(identifier)
  }

  var retval = _.assign(this, {
    // -- state --

    pipe: {
      name: 'Javascript SDK Pipe',
      description: 'This pipe was created using the Flex.io Javascript SDK',
      task: []
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
      this.pipe.task.push(task)
      return this
    },

    clearTasks() {
      this.pipe.task = []
      return this
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

      Flexio.http().get('/pipes/' + identifier)
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
        _.assign(this.pipe, _.pick(params, ['name', 'description', 'ename']))
        callback = _.get(args, '[1]')
      }

      this.saving = true
      Flexio.util.debug('Saving Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      Flexio.http().post('/pipes', this.pipe)
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
      Flexio.pipes.run.apply(null, args)
      return this
    },


    params(params) {
      this._params = _.assign({}, this.getParams(), params)
      return this
    },

    clearParams(keys /* array */) {
      if (_.isArray(keys))
        this._params = _.omit(this._params, keys)
         else if (_.isNil(keys))
        this._params = {}

      return this
    },

    getParams() {
      return _.assign({}, this._params)
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

  _.each(Flexio.task, function(taskFn, task_name) {
    retval[task_name] = function() { return retval.addTask(taskFn.apply(retval /* scope */, arguments)) }
  })

  /*
    instead of this...

    input()      { return this.addTask(Flexio.task.input.apply(this, arguments))      },
    output()     { return this.addTask(Flexio.task.output.apply(this, arguments))     },
    convert()    { return this.addTask(Flexio.task.convert.apply(this, arguments))    },
    etc...
  */


  if (identifier !== undefined) {
    retval.pipe.eid = identifier
  }
  
  return retval
}


} // module.exports.getPipeConstructor

