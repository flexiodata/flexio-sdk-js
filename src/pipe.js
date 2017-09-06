import axios from 'axios'

// individual lodash includes
import assign from 'lodash.assign'
import pick from 'lodash.pick'
import last from 'lodash.last'
import tail from 'lodash.tail'
import get from 'lodash.get'
import map from 'lodash.map'

import * as ttypes from './constants/task-type'
import * as ctypes from './constants/connection-type'

var base_params = {
  name: 'New JS SDK Pipe',
  description: '',
  task: []
}

export default (auth_token, params) => {
  return assign({}, {
    pipe: assign({}, base_params, pick(params, ['name', 'description', 'ename'])),
    processes: [],

    // axios instance with base url and auth token factored into it
    http: axios.create({
      baseURL: 'https://test.flex.io/api/v1',
      headers: { 'Authorization': 'Bearer ' + auth_token }
    }),

    // -- state --

    saving: false,
    running: false,

    // -- debug --

    debug(msg) {
      if (!window)
        return

      // TODO: add flag for 'debug' mode

      var msg = 'Flex.io Javascript SDK: ' + msg
      return window.console ? console.log(msg) : alert(msg)
    },

    // -- methods --

    getJson() {
      return assign({}, this.pipe)
    },

    getProcesses() {
      return [].concat(this.processes)
    },

    getLastProcess() {
      return last(this.processes)
    },

    addTask(task) {
      this.pipe.task.push(task)
      return this
    },

    save(successCb, errorCb) {
      this.saving = true
      this.debug('Saving Pipe...')

      this.http
        .post('/pipes', this.pipe)
        .then(response => {
          assign(this.pipe, get(response, 'data', {}))
          this.saving = false
          this.debug('Pipe Saved.')

          if (typeof successCb == 'function')
            successCb(response)
        })
        .catch(error => {
          this.saving = false
          this.debug('Pipe Save Failed.')

          if (typeof errorCb == 'function')
            errorCb(error)
        })

      return this
    },

    run(successCb, errorCb) {
      if (this.saving === true)
      {
        setTimeout(() => { this.run(successCb, errorCb) }, 50)
        return this
      }

      this.running = true
      this.debug('Running Pipe...')

      var run_params = assign({}, this.pipe)

      // if we have saved this pipe, use the pipe's eid as the parent eid
      var parent_eid = get(this.pipe, 'eid', '')
      if (parent_eid.length > 0)
        run_params = { parent_eid }

      // set the process to run mode and auto-run it
      assign(run_params, {
        process_mode: 'R',
        run: true
      })

      this.http
        .post('/processes', run_params)
        .then(response => {
          this.processes.push(get(response, 'data', {}))
          this.debug('Process Running.')
          this.running = false

          if (typeof successCb == 'function')
            successCb(response)
        })
        .catch(error => {
          this.debug('Process Failed.')
          this.running = false

          if (typeof errorCb == 'function')
            errorCb(error)
        })

      return this
    },

    // -- tasks --

    /*
      syntax:
        url1, url2, etc.
        connection identifier, [path1, path2, etc.]
    */
    input() {
      var args = Array.from(arguments)
      var type = ttypes.TASK_TYPE_INPUT
      var connection_type = get(args, '[0]', '')
      var connection = undefined
      var items = undefined

      if (args.length == 0)
      {
        this.debug('Input task requires at least 1 parameter')
        return this
      }

      switch (connection_type)
      {
        default:
          connection_type = ctypes.CONNECTION_TYPE_HTTP
          items = [].concat(args)
          break

        case ctypes.CONNECTION_TYPE_AMAZONS3:
        case ctypes.CONNECTION_TYPE_DROPBOX:
        case ctypes.CONNECTION_TYPE_ELASTICSEARCH:
        case ctypes.CONNECTION_TYPE_GOOGLEDRIVE:
        case ctypes.CONNECTION_TYPE_GOOGLESHEETS:
        case ctypes.CONNECTION_TYPE_HTTP:
        case ctypes.CONNECTION_TYPE_MYSQL:
        case ctypes.CONNECTION_TYPE_POSTGRES:
        case ctypes.CONNECTION_TYPE_SFTP:
          connection = get(args, '[1]', '')
          items = get(args, '[2]', [])
          break

        case ctypes.CONNECTION_TYPE_RSS:
          connection = connection_type
          items = get(args, '[1]', [])
          break
      }

      items = map(items, (item) => {
        return {
          path: item
        }
      })

      this.pipe.task.push({
        type,
        metadata: { connection_type },
        params: {
          connection,
          items
        }
      })

      return this
    },

    output() {
      var args = Array.from(arguments)
      var type = ttypes.TASK_TYPE_OUTPUT
      var connection_type = get(args, '[0]', '')
      var connection = undefined
      var location = undefined

      if (args.length == 0)
      {
        this.debug('Output task requires at least 1 parameter')
        return this
      }

      switch (connection_type)
      {
        case ctypes.CONNECTION_TYPE_AMAZONS3:
        case ctypes.CONNECTION_TYPE_ELASTICSEARCH:
        case ctypes.CONNECTION_TYPE_GOOGLESHEETS:
        case ctypes.CONNECTION_TYPE_MYSQL:
        case ctypes.CONNECTION_TYPE_POSTGRES:
          connection = get(args, '[1]', '')
          break

        case ctypes.CONNECTION_TYPE_DROPBOX:
        case ctypes.CONNECTION_TYPE_GOOGLEDRIVE:
        case ctypes.CONNECTION_TYPE_SFTP:
          connection = get(args, '[1]', '')
          location = get(args, '[2]', '/')
          break
      }

      this.pipe.task.push({
        type,
        metadata: { connection_type },
        params: {
          connection,
          location
        }
      })

      return this
    }
  })
}
