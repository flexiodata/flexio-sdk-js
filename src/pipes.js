var _ = require('./lodash-local')
var util = require('./util')

module.exports = {}
module.exports.getPipesObject = function(Flexio) {

  return new function() {


    this.create = function(pipe, callback) {
      
      var data
      if (_.isPlainObject(pipe)) {
        data = pipe
      } else if (pipe instanceof Flexio.pipe) {
        data = pipe.pipe
      } else {
        throw "Unknown pipe object type"
      }

      return new Promise((resolve, reject) => {
        Flexio.http().post('/me/pipes', data)
        .then(response => {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback)
        })
        .catch(error => {
          Flexio.util.debug('Flexio.pipes.create(): Failed.')
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback)
        })
      })
    }

    this.remove = function(identifier, callback) {

      return new Promise((resolve, reject) => {
        Flexio.http().request({ method: 'DELETE' , url: '/me/pipes/' + identifier })
        .then(response => {
          Flexio.util.callbackAdapter(null, response.data, resolve, reject, callback)
        })
        .catch(error => {
          Flexio.util.debug('Flexio.pipes.remove(): Failed.')
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback)
        })
      })
    }

    this.list = function(callback) {
      var args = Array.from(arguments)
      var callback = _.get(args, '[0]')

      return new Promise((resolve, reject) => {
        Flexio.util.debug('Requesting Pipes...')

        Flexio.http().get('/me/pipes')
        .then(response => {
          var items = _.get(response, 'data', [])
          Flexio.util.debug('Success!')
          Flexio.util.callbackAdapter(null, items, resolve, reject, callback)
        })
        .catch(error => {
          Flexio.util.debug('Failed.')
          Flexio.util.callbackAdapter(error, null, resolve, reject, callback)
        })
      })

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


      var getResponseObjectFromArrayBuffer = function (arraybuffer, content_type) {
        return {
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
      }


      return new Promise((resolve, reject) => {

        Flexio.util.debug('Running Pipe `' + (pipe_identifier.length==0?'[Pipe Object/Task Array]':pipe_identifier) + '`...')

        if (pipe_identifier.length == 0) {
          // execute ephemeral pipe (as process)

          var create_params = {
            name: 'SDK Pipe',
            description: 'SDK Pipe',
            task: tasks_array,

            process_mode: 'R'
          }

          Flexio.http().post('/me/processes', create_params)
            .then(response => {
              var obj = _.get(response, 'data', {})
              var process_eid = _.get(obj, 'eid', '')
              Flexio.util.debug('Created Process.')

              var http_config = {
                method: 'post',
                url: '/me/processes/'+process_eid+'/run',
                responseType: 'arraybuffer'
              }

              if (_.has(run_params, 'data')) {
                http_config.data = run_params.data
                if (_.isString(run_params.data)) {
                  http_config.headers = { 'Content-Type': 'text/plain' }
                }
              }

              if (_.has(run_params, 'form')) {
                http_config.data = util.queryString(run_params.form)
                http_config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
              }
    
              if (_.has(run_params, 'query')) {
                http_config.params = run_params.query
              }

              if (_.has(run_params, 'content_type')) {
                http_config.headers = { 'Content-Type': run_params.content_type }
              }

              var http = Flexio.http()
              
              http.request(http_config)
                .then(response => {
                  Flexio.util.debug('Process Complete.')
                  var content_type =  _.get(response, 'headers.content-type', 'text/plain')
                  var response_object = getResponseObjectFromArrayBuffer(response.data, content_type)
                  Flexio.util.callbackAdapter(null, response_object, resolve, reject, callback)
                })
                .catch(error => {
                  //console.log(Flexio.util.arrayBufferToString(error.response.data));
                  Flexio.util.debug('Process Run Failed. ' + error)
                  Flexio.util.callbackAdapter(error, null, resolve, reject, callback)
                })
            })
            .catch(error => {
              //console.log(error.response);
              //console.log(Flexio.util.arrayBufferToString(error.response.data));
              Flexio.util.debug('Process Create Failed. ' + error)
              Flexio.util.callbackAdapter(error, null, resolve, reject, callback)
            })
        }
          else {
          // execute existant pipe

          var http_config = {
            method: 'post',
            url: '/me/pipes/'+pipe_identifier+'/run',
            responseType: 'arraybuffer'
          }
        
          if (_.has(run_params, 'data')) {
            http_config.data = run_params.data
          }

          if (_.has(run_params, 'form')) {
            http_config.data = util.queryString(run_params.form)
            http_config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
          }

          if (_.has(run_params, 'query')) {
            http_config.params = run_params.query
          }
          
          if (_.has(run_params, 'content_type')) {
            http_config.headers = { 'Content-Type': run_params.content_type }
          }

          var http = Flexio.http()

          http.request(http_config).then(function (response) {
            Flexio.util.debug('Process Complete.')
            var content_type =  _.get(response, 'headers.content-type', 'text/plain')
            var response_object = getResponseObjectFromArrayBuffer(response.data, content_type)
            Flexio.util.callbackAdapter(null, response_object, resolve, reject, callback)
          })
          .catch(error => {
            Flexio.util.debug('Pipe Run Call Failed. ' + error)
            Flexio.util.callbackAdapter(error, null, resolve, reject, callback)
          })
        }
      })  // Promise
    } // Flexio.pipes.run()


  }
}
