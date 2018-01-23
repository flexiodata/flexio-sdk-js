var _ = require('lodash')                               // import _ from 'lodash'


module.exports = {}
module.exports.getPipesObject = function(Flexio) {

  return new function() {

    this.create = function(pipe, callback) {
      
      var data;
      if (_.isPlainObject(pipe)) {
        data = pipe
      } else if (pipe instanceof Flexio.pipe) {
        data = pipe.pipe
      } else {
        throw "Unknown pipe object type"
      }


      Flexio.http().post('/pipes', data)
      .then(response => {
        if (typeof callback == 'function')
          callback.call(null, null, response.data)
      })
      .catch(error => {
        Flexio.util.debug('Flexio.pipes.create(): Failed.')
        if (typeof callback == 'function')
          callback.call(this, error, null)
      })
    }

    this.list = function(callback) {
      var args = Array.from(arguments)
      var callback = _.get(args, '[0]')

      if (this.loading === true)
      {
        setTimeout(() => { this.load.apply(this, arguments) }, 50)
        return this
      }

      this.loading = true
      Flexio.util.debug('Requesting Pipes...')

      Flexio.http().get('/pipes')
        .then(response => {
          var items = _.get(response, 'data', [])
          this.items = [].concat(items)
          this.loading = false
          Flexio.util.debug('Success!')

          if (typeof callback == 'function')
            callback.call(this, null, items)
        })
        .catch(error => {
          this.loading = false
          Flexio.util.debug('Failed.')

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    }

    // Flexio.pipes.run([pipeIdentifier|pipeObject|taskArray], params, callback)
    // Flexio.pipes.run([pipeIdentifier|pipeObject|taskArray], callback)

    this.run = function() {
      var args = Array.from(arguments)
      args.push(null,null,null)

      var run_params = {}
      var callback
      var pipe_identifier
      var tasks_array = null

      if (args[0] instanceof Flexio.pipe) {
        pipe_identifier = _.get(args[0], 'pipe.eid', '')
        tasks_array =  _.get(args[0], 'pipe.task', '')
      } else if (Array.isArray(args[0])) {
        pipe_identifier = ''
        tasks_array =  args[0]
      } else {
        pipe_identifier = args[0]
      }

      if (_.isPlainObject(args[1])) {
        run_params = args[1]
      }

      if (_.isFunction(args[1])) {
        callback = args[1]
      } else if (_.isFunction(args[2])) {
        callback = args[2]
      } else {
        callback = null;
      }

      Flexio.util.debug('Running Pipe `' + (pipe_identifier.length==0?'[Pipe Object/Task Array]':pipe_identifier) + '`...')

      if (pipe_identifier.length == 0) {
        // execute ephemeral pipe (as process)

        var create_params = {
          name: 'SDK Pipe',
          description: 'SDK Pipe',
          task: tasks_array,

          process_mode: 'R'
        }

        Flexio.http().post('/processes', create_params)
          .then(response => {
            var obj = _.get(response, 'data', {})
            var process_eid = _.get(obj, 'eid', '')
            Flexio.util.debug('Created Process.')

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
                Flexio.util.debug('Process Complete.')

                var arraybuffer = response.data
                var content_type =  _.get(response, 'headers.content-type', 'text/plain')

                var response_object = {
                  contentType: content_type,
                  buffer: arraybuffer,
                  get blob() {
                    return new Blob([this.buffer], {"type":content_type})
                  },
                  get text() {
                    return Flexio.util.arrayBufferToString(this.buffer)
                  },
                  get data() {
                    try {
                      return JSON.parse(Flexio.util.arrayBufferToString(this.buffer))
                    }
                    catch (e) {
                      return null
                    }
                  }
                }

                if (typeof callback == 'function')
                  callback.call(null, null, response_object)
              })
              .catch(error => {
                console.log(Flexio.util.arrayBufferToString(error.response.data));
                Flexio.util.debug('Process Run Failed. ' + error)
    
                if (typeof callback == 'function')
                  callback.call(null, error, null)
              })
          })
          .catch(error => {
            console.log(Flexio.util.arrayBufferToString(error.response.data));
            Flexio.util.debug('Process Create Failed. ' + error)
            
            if (typeof callback == 'function')
              callback.call(null, error, null)
          })
      }
        else {
        // execute existant pipe

        var http_config = {
          method: 'post',
          url: '/pipes/'+pipe_identifier+'/run',
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
          Flexio.util.debug('Process Complete.')

          var arraybuffer = response.data
          var content_type =  _.get(response, 'headers.content-type', 'text/plain')

          var response_object = {
            contentType: content_type,
            buffer: arraybuffer,
            get blob() {
              return new Blob([this.buffer], {"type":content_type})
            },
            get text() {
              return Flexio.util.arrayBufferToString(this.buffer)
            },
            get data() {
              try {
                return JSON.parse(Flexio.util.arrayBufferToString(this.buffer))
              }
              catch (e) {
                return null
              }
            }
          }
          
          if (typeof callback == 'function')
            callback.call(null, null, response_object)
        })
        .catch(error => {

          Flexio.util.debug('Pipe Run Call Failed. ' + error)

          if (typeof callback == 'function')
            callback.call(null, error, null)
        })
      }

      return this
    }
  }

}
