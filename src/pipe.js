var _ = require('lodash')                               // import _ from 'lodash'
var util = require('./util')                            // import util from './util'


module.exports = {}
module.exports.getPipeConstructor = function(Flexio) {

return function() {

  if (!(this instanceof Flexio.pipe)) {
    return new Flexio.pipe()
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
        return util.debug("The `identifier` parameter is required. Either the pipe's eid or pipe's alias may be used.")

      this.loading = true
      util.debug('Loading Pipe `' + identifier + '`...')

      Flexio.http().get('/pipes/' + identifier)
        .then(response => {
          var obj = _.get(response, 'data', {})
          this.pipe = _.assign({}, obj)
          this.loading = false
          util.debug('Pipe Loaded.')

          if (typeof callback == 'function')
            callback.call(this, null, obj)
        })
        .catch(error => {
          this.loading = false
          util.debug('Pipe Load Failed.')

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
      util.debug('Saving Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      Flexio.http().post('/pipes', this.pipe)
        .then(response => {
          var pipe = _.get(response, 'data', {})
          this.pipe = _.assign({}, pipe)
          this.saving = false
          util.debug('Pipe Saved.')

          if (typeof callback == 'function')
            callback.call(this, null, this.pipe)
        })
        .catch(error => {
          this.saving = false
          util.debug('Pipe Save Failed.')

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    },

    /*
    run() {
      var args = Array.from(arguments)
      var params = _.get(args, '[0]')
      var callback = _.get(args, '[0]')
      var run_params = _.assign({}, this.getParams())

      if (this.loading === true || this.saving === true || this.running === true)
      {
        setTimeout(() => { this.run.apply(this, arguments) }, 50)
        return this
      }

      if (_.isPlainObject(params))
      {
        run_params = _.assign({}, run_params, params)
        callback = _.get(args, '[1]')
      }

      this.running = true
      util.debug('Running Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      var create_params = _.assign({}, this.pipe)

      // if we have saved this pipe, use the pipe's eid as the parent eid
      var parent_eid = _.get(this.pipe, 'eid', '')
      if (parent_eid.length > 0)
        create_params = { parent_eid }

      // set the process to run mode
      _.assign(create_params, {
        process_mode: 'R'
      })

      Flexio.http().post('/processes', create_params)
        .then(response => {
          var obj = _.get(response, 'data', {})
          var process_eid = _.get(obj, 'eid', '')
          this.processes.push(obj)
          util.debug('Created Process.')

          // TODO: we need to figure out how we can allow the
          //       user to specify their own response options
          // config to pass to Axios
          var config = {
            responseType: 'arraybuffer'
          }

          Flexio.http().post('/processes/'+process_eid+'/run', run_params, config)
            .then(response => {

              this.running = false
              util.debug('Process Complete.')

              var arraybuffer = response.data
              var content_type =  _.get(response, 'headers.content-type', 'text/plain')

              var response_object = {
                contentType: content_type,
                buffer: arraybuffer,
                get blob() {
                  return new Blob([this.buffer], {"type":content_type})
                },
                get text() {
                  return util.arrayBufferToString(this.buffer)
                },
                get data() {
                  try {
                    return JSON.parse(util.arrayBufferToString(this.buffer))
                  }
                  catch (e) {
                    return null
                  }
                }
              }

              if (typeof callback == 'function')
                callback.call(this, null, response_object)
              //
              //
              //var obj2 = _.get(response, 'data', {})
              //util.debug('Process Complete.')
              //this.running = false
              //
              //if (typeof callback == 'function')
              //  callback.call(this, null, obj2)
              
            })
        })
        .catch(error => {
          util.debug('Process Create Failed.')
          this.running = false

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    },
*/


    run() {
      var args = Array.from(arguments)
      var params = _.get(args, '[0]')
      var callback = _.get(args, '[0]')
      var run_params = _.assign({}, this.getParams())
      var pipe_eid = _.get(this.pipe, 'eid', '')
      
      if (this.loading === true || this.saving === true || this.running === true)
      {
        setTimeout(() => { this.run.apply(this, arguments) }, 50)
        return this
      }

      if (_.isPlainObject(params))
      {
        run_params = _.assign({}, run_params, params)
        callback = _.get(args, '[1]')
      }

      this.running = true
      util.debug('Running Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      if (pipe_eid.length == 0) {
        // execute ephemeral pipe (as process)

        var create_params = _.assign({}, this.pipe)
        // set the process to run mode
        _.assign(create_params, {
          process_mode: 'R'
        })
  
        Flexio.http().post('/processes', create_params)
          .then(response => {
            var obj = _.get(response, 'data', {})
            var process_eid = _.get(obj, 'eid', '')
            this.processes.push(obj)
            util.debug('Created Process.')
  
            var http_config = {
              method: 'post',
              url: '/processes/'+process_eid+'/run',
              responseType: 'arraybuffer'
            }

            if (run_params.hasOwnProperty('data')) {
              http_config.data = run_params.data
            }

            if (run_params.hasOwnProperty('query')) {
              http_config.params = run_params.query
            }
      
            var http = Flexio.http()
            http(http_config).then(response => {
                this.running = false
                util.debug('Process Complete.')
  
                var arraybuffer = response.data
                var content_type =  _.get(response, 'headers.content-type', 'text/plain')
  
                var response_object = {
                  contentType: content_type,
                  buffer: arraybuffer,
                  get blob() {
                    return new Blob([this.buffer], {"type":content_type})
                  },
                  get text() {
                    return util.arrayBufferToString(this.buffer)
                  },
                  get data() {
                    try {
                      return JSON.parse(util.arrayBufferToString(this.buffer))
                    }
                    catch (e) {
                      return null
                    }
                  }
                }
  
                if (typeof callback == 'function')
                  callback.call(this, null, response_object)
              })
          })
          .catch(error => {
            util.debug('Process Create Failed.')
            this.running = false
  
            if (typeof callback == 'function')
              callback.call(this, error, null)
          })
      }
       else {
        // execute existant pipe

        var http_config = {
          method: 'post',
          url: '/pipes/'+pipe_eid+'/run',
          responseType: 'arraybuffer'
        }
      
        if (run_params.hasOwnProperty('data')) {
          http_config.data = run_params.data
        }

        if (run_params.hasOwnProperty('query')) {
          http_config.params = run_params.query
        }
        
        if (run_params.hasOwnProperty('contentType')) {
          http_config.headers = { 'Content-Type': run_params.contentType }
        } else {
          // no content type specified; choose a sensible one unless
          // axios can detect it
          if (http_config.hasOwnProperty('data')) {
            if (_.isPlainObject(http_config.data)) {
              // axios can figure it out
            } else if (_.isString(http_config.data)) {
              http_config.headers = { 'Content-Type': 'text/plain' }
            } else {
              http_config.headers = { 'Content-Type': 'application/octet-stream' }
            }
          }
        }

        var http = Flexio.http()
        http(http_config).then(response => {
          this.running = false
          util.debug('Process Complete.')

          var arraybuffer = response.data
          var content_type =  _.get(response, 'headers.content-type', 'text/plain')

          var response_object = {
            contentType: content_type,
            buffer: arraybuffer,
            get blob() {
              return new Blob([this.buffer], {"type":content_type})
            },
            get text() {
              return util.arrayBufferToString(this.buffer)
            },
            get data() {
              try {
                return JSON.parse(util.arrayBufferToString(this.buffer))
              }
              catch (e) {
                return null
              }
            }
          }
          
          if (typeof callback == 'function')
            callback.call(this, null, response_object)
        })
        .catch(error => {

          util.debug('Pipe Run Call Failed.')
          this.running = false

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })
      }


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

  return retval
}


} // module.exports.getPipeConstructor

