import _ from 'lodash'
import axios from 'axios'

import * as ttypes from './constants/task-type'
import * as ctypes from './constants/connection-type'

var toBase64 = function(str) {
  try { return btoa(unescape(encodeURIComponent(str))) } catch(e) { return e }
}

var fromBase64 = function(str) {
  try { return decodeURIComponent(escape(atob(str))) } catch(e) { return e }
}

export default (auth_token) => {
  return _.assign({}, {
    pipe: {
      name: 'Javascript SDK Pipe',
      description: 'This pipe was created using the Flex.io Javascript SDK',
      task: []
    },
    processes: [],

    // axios instance with base url and auth token factored into it
    http: axios.create({
      baseURL: 'https://www.flex.io/api/v1',
      headers: { 'Authorization': 'Bearer ' + auth_token }
    }),

    // -- state --

    loading: false,
    saving: false,
    running: false,

    // -- debug --

    debug(msg) {
      if (!window)
        return

      // TODO: add flag for 'debug' mode

      var msg = 'Flex.io Javascript SDK: ' + msg
      window.console ? console.log(msg) : alert(msg)

      return this
    },

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
      var successCb = _.get(args, '[1]')
      var errorCb = _.get(args, '[2]')

      if (this.loading === true || this.saving === true || this.running === true)
      {
        setTimeout(() => { this.load.apply(this, arguments) }, 50)
        return this
      }

      if (_.isNil(identifier))
        return this.debug("The `identifier` parameter is required. Either the pipe's eid or pipe's alias may be used.")

      this.loading = true
      this.debug('Loading Pipe `' + identifier + '`...')

      this.http
        .get('/pipes/' + identifier)
        .then(response => {
          _.assign(this.pipe, _.get(response, 'data', {}))
          this.loading = false
          this.debug('Pipe Loaded.')

          if (typeof successCb == 'function')
            successCb(response)
        })
        .catch(error => {
          this.loading = false
          this.debug('Pipe Load Failed.')

          if (typeof errorCb == 'function')
            errorCb(error)
        })

      return this
    },

    save() {
      var args = Array.from(arguments)
      var params = _.get(args, '[0]')
      var successCb = _.get(args, '[0]')
      var errorCb = _.get(args, '[1]')

      if (this.loading === true || this.saving === true || this.running === true)
      {
        setTimeout(() => { this.save.apply(this, arguments) }, 50)
        return this
      }

      if (_.isObject(params))
      {
        _.assign(this.pipe, _.pick(params, ['name', 'description', 'ename']))
        successCb = _.get(args, '[1]')
        errorCb = _.get(args, '[2]')
      }

      this.saving = true
      this.debug('Saving Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      this.http
        .post('/pipes', this.pipe)
        .then(response => {
          _.assign(this.pipe, _.get(response, 'data', {}))
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

    run() {
      var args = Array.from(arguments)
      var successCb = _.get(args, '[0]')
      var errorCb = _.get(args, '[1]')

      if (this.loading === true || this.saving === true || this.running === true)
      {
        setTimeout(() => { this.run.apply(this, arguments) }, 50)
        return this
      }

      this.running = true
      this.debug('Running Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      var run_params = _.assign({}, this.pipe)

      // if we have saved this pipe, use the pipe's eid as the parent eid
      var parent_eid = _.get(this.pipe, 'eid', '')
      if (parent_eid.length > 0)
        run_params = { parent_eid }

      // set the process to run mode and auto-run it
      _.assign(run_params, {
        process_mode: 'R',
        run: true
      })

      this.http
        .post('/processes', run_params)
        .then(response => {
          this.processes.push(_.get(response, 'data', {}))
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

    input() {
      var type = ttypes.TASK_TYPE_INPUT
      var args = Array.from(arguments)
      var connection_type = _.get(args, '[0]', '')
      var connection = undefined
      var items = undefined

      if (args.length == 0)
        return this.debug('The input task requires at least 1 parameter')

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
          connection = _.get(args, '[1]', '')
          items = _.get(args, '[2]', [])
          break

        case ctypes.CONNECTION_TYPE_RSS:
          connection = connection_type
          items = _.get(args, '[1]', [])
          break
      }

      items = _.map(items, (item) => {
        return {
          path: item
        }
      })

      return this.addTask({
        type,
        metadata: { connection_type },
        params: {
          connection,
          items
        }
      })
    },

    output() {
      var type = ttypes.TASK_TYPE_OUTPUT
      var args = Array.from(arguments)
      var connection_type = _.get(args, '[0]', '')
      var connection = undefined
      var location = undefined

      if (args.length == 0)
        return this.debug('The output task requires at least 1 parameter')

      switch (connection_type)
      {
        case ctypes.CONNECTION_TYPE_AMAZONS3:
        case ctypes.CONNECTION_TYPE_ELASTICSEARCH:
        case ctypes.CONNECTION_TYPE_GOOGLESHEETS:
        case ctypes.CONNECTION_TYPE_MYSQL:
        case ctypes.CONNECTION_TYPE_POSTGRES:
          connection = _.get(args, '[1]', '')
          break

        case ctypes.CONNECTION_TYPE_DROPBOX:
        case ctypes.CONNECTION_TYPE_GOOGLEDRIVE:
        case ctypes.CONNECTION_TYPE_SFTP:
          connection = _.get(args, '[1]', '')
          location = _.get(args, '[2]', '/')
          break
      }

      return this.addTask({
        type,
        metadata: { connection_type },
        params: {
          connection,
          location
        }
      })
    },

    convert(input, output) {
      var type = ttypes.TASK_TYPE_CONVERT

      var task = {
        type,
        params: {}
      }

      var csv_format = {
        format: 'delimited',
        delimiter: '{comma}',
        header: true,
        qualifier: '{double-quote}'
      }

      var tsv_format = {
        format: 'delimited',
        delimiter: '{tab}',
        header: true,
        qualifier: '{none}'
      }

      // convert input

      if (_.isString(input))
      {
        if (input == 'csv')
          _.set(task, 'params.input', csv_format)
           else if (input == 'tsv')
          _.set(task, 'params.input', tsv_format)
           else
          _.set(task, 'params.input.format', input)
      }
       else if (_.isObject(input))
      {
        _.set(task, 'params.input', input)
      }

      // convert output

      if (_.isString(output))
      {
        if (output == 'csv')
          _.set(task, 'params.output', csv_format)
           else if (output == 'tsv')
          _.set(task, 'params.output', tsv_format)
           else
          _.set(task, 'params.output.format', output)
      }
       else if (_.isObject(output))
      {
        _.set(task, 'params.output', output)
      }

      return this.addTask(task)
    },

    email(to, subject, body_text, body_html, data) {
      var type = ttypes.TASK_TYPE_EMAIL_SEND

      if (_.isNil(to))
        return this.debug('The `to` parameter is required')

      if (_.isNil(subject))
        return this.debug('The `subject` parameter is required')

      if (_.isNil(body_text))
        return this.debug('The `body_text` parameter is required')

      // `to` parameter must be an array
      if (!_.isArray(to))
        to = [to]

      if (_.isNil(body_html))
        body_html = body_text

      if (data != 'body' && data != 'attachment')
        data = 'none'

      return this.addTask({
        type,
        params: {
          to,
          subject,
          body_text,
          body_html,
          data
        }
      })
    },

    execute() {
      var type = ttypes.TASK_TYPE_EXECUTE
      var args = Array.from(arguments)
      var lang = _.get(args, '[0]', '')
      var code = undefined

      var task = {
        type,
        params: {}
      }

      if (lang == 'python' || lang == 'javascript')
      {
        _.set(task, 'params.lang', lang)
        code = _.get(args, '[1]', '')
      }
       else
      {
        // default to python
        _.set(task, 'params.lang', 'python')
        code = _.get(args, '[0]', '')
      }

      // handle files or code snippets
      var http_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      if (code.match(http_regex))
        _.set(task, 'params.file', code)
         else
        _.set(task, 'params.code', toBase64(code))

      return this.addTask(task)
    },

    filter(where) {
      var type = ttypes.TASK_TYPE_FILTER

      if (_.isNil(where))
        return this.debug('The `filter` parameter is required')

      return this.addTask({
        type,
        params: {
          where
        }
      })
    },

    limit(value) {
      var type = ttypes.TASK_TYPE_LIMIT
      value = _.defaultTo(value, 10)

      return this.addTask({
        type,
        params: {
          value
        }
      })
    },

    select() {
      var type = ttypes.TASK_TYPE_SELECT
      var columns = Array.from(arguments)

      return this.addTask({
        type,
        params: {
          columns
        }
      })
    },

    sleep(value) {
      var type = ttypes.TASK_TYPE_SLEEP
      value = _.defaultTo(value, 10)

      return this.addTask({
        type,
        params: {
          value
        }
      })
    }
  })
}
