import axios from 'axios'

// individual lodash includes
import assign from 'lodash.assign'
import pick from 'lodash.pick'
import last from 'lodash.last'
import tail from 'lodash.tail'
import get from 'lodash.get'
import map from 'lodash.map'

import input from './task/input'
import output from './task/output'

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

    input,
    output
  })
}
