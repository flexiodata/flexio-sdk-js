import axios from 'axios'

// individual lodash includes
import assign from 'lodash.assign'
import pick from 'lodash.pick'
import get from 'lodash.get'

var echo = (msg) => {
  window && window.console ? console.log(msg) : alert(msg)
}

var base_params = {
  name: 'New JS SDK Pipe',
  description: '',
  task: [
    {
      type: 'flexio.input',
      metadata: {
        connection_type: 'http'
      },
      params: {
        items: [
          {
            path: 'https://static.pexels.com/photos/51387/mount-everest-himalayas-nuptse-lhotse-51387.jpeg'
          }
        ]
      }
    },
    {
      type: 'flexio.output',
      metadata: {
        connection_type: 'stdout'
      },
      params: {
        connection: 'stdout'
      }
    }
  ]
}

export default (auth_token, params) => {
  return assign({}, {
    pipe: assign({}, base_params, pick(params, ['name', 'description', 'ename'])),
    processes: [],

    // -- state --

    saving: false,
    running: false,

    // -- methods --

    getJson() {
      return assign({}, this.pipe)
    },

    getProcesses() {
      return [].concat(this.processes)
    },

    save(successCb, errorCb) {
      this.saving = true
      echo('Saving Pipe...')

      axios({
        url: 'https://test.flex.io/api/v1/pipes',
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + auth_token },
        data: this.pipe // TODO: change this to `_.pick(this, ...)`
      })
      .then(response => {
        assign(this.pipe, get(response, 'data', {}))
        this.saving = false
        echo('Pipe Saved.')

        if (typeof successCb == 'function')
          successCb(response)
      })
      .catch(error => {
        this.saving = false
        echo('Pipe Save Failed.')

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
      echo('Running Pipe...')

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

      axios({
        url: 'https://test.flex.io/api/v1/processes',
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + auth_token },
        data: run_params
      })
      .then(response => {
        this.processes.push(get(response, 'data', {}))
        echo('Process Running.')
        this.running = false

        if (typeof successCb == 'function')
          successCb(response)
      })
      .catch(error => {
        echo('Process Failed.')
        this.running = false

        if (typeof errorCb == 'function')
          errorCb(error)
      })

      return this
    }
  })
}
