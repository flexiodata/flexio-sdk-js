import _ from 'lodash'
import util from './util'
import Flexio from './flexio'

export default () => {
  return _.assign({}, {
    // -- state --

    pipe: {
      name: 'Javascript SDK Pipe',
      description: 'This pipe was created using the Flex.io Javascript SDK',
      task: []
    },
    processes: [],
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
        return util.debug.call(this, "The `identifier` parameter is required. Either the pipe's eid or pipe's alias may be used.")

      this.loading = true
      util.debug.call(this, 'Loading Pipe `' + identifier + '`...')

      Flexio.http().get('/pipes/' + identifier)
        .then(response => {
          var obj = _.get(response, 'data', {})
          this.pipe = _.assign({}, obj)
          this.loading = false
          util.debug.call(this, 'Pipe Loaded.')

          if (typeof callback == 'function')
            callback.call(this, null, obj)
        })
        .catch(error => {
          this.loading = false
          util.debug.call(this, 'Pipe Load Failed.')

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

      if (_.isObject(params))
      {
        _.assign(this.pipe, _.pick(params, ['name', 'description', 'ename']))
        callback = _.get(args, '[1]')
      }

      this.saving = true
      util.debug.call(this, 'Saving Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      Flexio.http().post('/pipes', this.pipe)
        .then(response => {
          var pipe = _.get(response, 'data', {})
          this.pipe = _.assign({}, pipe)
          this.saving = false
          util.debug.call(this, 'Pipe Saved.')

          if (typeof callback == 'function')
            callback.call(this, null, obj)
        })
        .catch(error => {
          this.saving = false
          util.debug.call(this, 'Pipe Save Failed.')

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    },

    run() {
      var args = Array.from(arguments)
      var callback = _.get(args, '[0]')

      if (this.loading === true || this.saving === true || this.running === true)
      {
        setTimeout(() => { this.run.apply(this, arguments) }, 50)
        return this
      }

      this.running = true
      util.debug.call(this, 'Running Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      var run_params = _.assign({}, this.pipe)

      // if we have saved this pipe, use the pipe's eid as the parent eid
      var parent_eid = _.get(this.pipe, 'eid', '')
      if (parent_eid.length > 0)
        run_params = { parent_eid }

      // set the process to run mode
      _.assign(run_params, {
        process_mode: 'R'
      })

      Flexio.http().post('/processes', run_params)
        .then(response => {
          var obj = _.get(response, 'data', {})
          var process_eid = _.get(obj, 'eid', '')
          this.processes.push(obj)
          util.debug.call(this, 'Created Process.')

          Flexio.http().post('/processes/'+process_eid+'/run')
            .then(response => {
              var obj2 = _.get(response, 'data', {})
              util.debug.call(this, 'Process Complete.')
              this.running = false

              if (typeof callback == 'function')
                callback.call(this, null, obj2)
            })
        })
        .catch(error => {
          util.debug.call(this, 'Process Create Failed.')
          this.running = false

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    },

    // -- tasks (simply add the JSON object created by the split-out task functions) --

    input()      { return this.addTask(Flexio.task.input.apply(this, arguments))      },
    output()     { return this.addTask(Flexio.task.output.apply(this, arguments))     },
    convert()    { return this.addTask(Flexio.task.convert.apply(this, arguments))    },
    email()      { return this.addTask(Flexio.task.email.apply(this, arguments))      },
    execute()    { return this.addTask(Flexio.task.execute.apply(this, arguments))    },
    filter()     { return this.addTask(Flexio.task.filter.apply(this, arguments))     },
    javascript() { return this.addTask(Flexio.task.javascript.apply(this, arguments)) }, // shorthand for .execute('javascript', ...)
    limit()      { return this.addTask(Flexio.task.limit.apply(this, arguments))      },
    python()     { return this.addTask(Flexio.task.python.apply(this, arguments))     }, // shorthand for .execute('python', ...)
    request()    { return this.addTask(Flexio.task.request.apply(this, arguments))    },
    select()     { return this.addTask(Flexio.task.select.apply(this, arguments))     },
    sleep()      { return this.addTask(Flexio.task.sleep.apply(this, arguments))      }
  })
}
