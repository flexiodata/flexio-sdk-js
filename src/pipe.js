import _ from 'lodash'

import * as ttypes from './constants/task-type'
import * as ctypes from './constants/connection-type'

import util from './util'
import flexio from './flexio'

var toBase64 = function(str) {
  try { return btoa(unescape(encodeURIComponent(str))) } catch(e) { return e }
}

var fromBase64 = function(str) {
  try { return decodeURIComponent(escape(atob(str))) } catch(e) { return e }
}

export default (auth_token) => {
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
      var successCb = _.get(args, '[1]')
      var errorCb = _.get(args, '[2]')

      if (this.loading === true || this.saving === true || this.running === true)
      {
        setTimeout(() => { this.load.apply(this, arguments) }, 50)
        return this
      }

      if (_.isNil(identifier))
        return util.debug.call(this, "The `identifier` parameter is required. Either the pipe's eid or pipe's alias may be used.")

      this.loading = true
      util.debug.call(this, 'Loading Pipe `' + identifier + '`...')

      flexio.http().get('/pipes/' + identifier)
        .then(response => {
          _.assign(this.pipe, _.get(response, 'data', {}))
          this.loading = false
          util.debug.call(this, 'Pipe Loaded.')

          if (typeof successCb == 'function')
            successCb.call(this, response)
        })
        .catch(error => {
          this.loading = false
          util.debug.call(this, 'Pipe Load Failed.')

          if (typeof errorCb == 'function')
            errorCb.call(this, error)
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
      util.debug.call(this, 'Saving Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      flexio.http().post('/pipes', this.pipe)
        .then(response => {
          _.assign(this.pipe, _.get(response, 'data', {}))
          this.saving = false
          util.debug.call(this, 'Pipe Saved.')

          if (typeof successCb == 'function')
            successCb.call(this, response)
        })
        .catch(error => {
          this.saving = false
          util.debug.call(this, 'Pipe Save Failed.')

          if (typeof errorCb == 'function')
            errorCb.call(this, error)
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
      util.debug.call(this, 'Running Pipe `' + _.get(this.pipe, 'name', 'Untitled Pipe') + '`...')

      var run_params = _.assign({}, this.pipe)

      // if we have saved this pipe, use the pipe's eid as the parent eid
      var parent_eid = _.get(this.pipe, 'eid', '')
      if (parent_eid.length > 0)
        run_params = { parent_eid }

      // set the process to run mode and auto-run it
      _.assign(run_params, {
        process_mode: 'R',
        background: false,
        run: true
      })

      flexio.http().post('/processes', run_params)
        .then(response => {
          this.processes.push(_.get(response, 'data', {}))
          util.debug.call(this, 'Process Running.')
          this.running = false

          if (typeof successCb == 'function')
            successCb.call(this, response)
        })
        .catch(error => {
          util.debug.call(this, 'Process Failed.')
          this.running = false

          if (typeof errorCb == 'function')
            errorCb.call(this, error)
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
        return util.debug.call(this, 'The input task requires at least 1 parameter')

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
        return util.debug.call(this, 'The output task requires at least 1 parameter')

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
        return util.debug.call(this, 'The `to` parameter is required')

      if (_.isNil(subject))
        return util.debug.call(this, 'The `subject` parameter is required')

      if (_.isNil(body_text))
        return util.debug.call(this, 'The `body_text` parameter is required')

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

      // allow for flexible parameters
      if (lang == 'python' || lang == 'javascript')
      {
        code = _.get(args, '[1]', '')
      }
       else
      {
        lang = undefined
        code = _.get(args, '[0]', '')
      }

      if (_.isFunction(code))
      {
        // first argument is a function; we're using javascript
        lang = 'javascript'
        code = _.get(args, '[0]', function(input, output) {})

        // stringify the javascript function
        try {
          code = code.toString()
        } catch(e) {
          code = 'function(input, output) {}'
        }
      }

      if (lang != 'python' && lang != 'javascript')
      {
        // default to python
        lang = 'python'
      }

      // set the job's language
      _.set(task, 'params.lang', lang)

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
        return util.debug.call(this, 'The `filter` parameter is required')

      return this.addTask({
        type,
        params: {
          where
        }
      })
    },

    // shorthand for .execute('javascript', ...)
    javascript() {
      var args = Array.from(arguments)
      return this.execute('javascript', _.get(args, '[0]', ''))
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

    // shorthand for .execute('python', ...)
    python() {
      var args = Array.from(arguments)
      return this.execute('python', _.get(args, '[0]', ''))
    },

    request() {
      var type = ttypes.TASK_TYPE_REQUEST
      var args = Array.from(arguments)
      var params = _.get(args, '[0]', {})

      // defaults
      params = _.assign({
        method: 'GET'
      }, params)

      return this.addTask({
        type,
        params
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
