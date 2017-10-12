import _ from 'lodash'
import util from './util'
import Flexio from './flexio'

function toBase64(str) {
  try { return btoa(unescape(encodeURIComponent(str))) } catch(e) { return '' }
}

function fromBase64(str) {
  try { return decodeURIComponent(escape(atob(str))) } catch(e) { return '' }
}

export default () => {
  var allowed_auth = [
    '',
    'basic',
    'bearer',
    'oauth2'
  ]

  var cfg = {
    url: '',
    auth: '', // ``, `basic`, `bearer`, `oauth2`
    headers: {},
    username: '', // `basic auth` only
    password: '', // `basic auth` only
    token: '' // `bearer token` and `oauth2` only
  }

  var retval = _.assign({}, {
    // -- state --

    connection: {
      name: 'Javascript SDK Connection',
      description: 'This connection was created using the Flex.io Javascript SDK',
      connection_info: {
        url: '',
        auth: '',
        headers: {}
      }
    },
    loading: false,
    saving: false,
    running: false,

    // -- methods --

    getJSON() {
      return _.assign({}, this.connection)
    },

    url() {
      var args = Array.from(arguments)
      var url = _.get(args, '[0]')

      if (!_.isString(url))
        return this

      _.set(cfg, 'url', url)
      return this._updateConnectionInfo()
    },

    auth() {
      var args = Array.from(arguments)
      var auth = _.get(args, '[0]')

      if (!_.isString(auth))
        return this

      if (!_.includes(allowed_auth, auth))
        return this

      if (auth == 'none')
        auth = ''

      _.set(cfg, 'auth', auth)
      return this._updateConnectionInfo()
    },

    // `basic auth` only
    username() {
      var args = Array.from(arguments)
      var username = _.get(args, '[0]')

      if (!_.isString(username))
        return this

      _.set(cfg, 'username', username)
      return this._updateConnectionInfo()
    },

    // `basic auth` only
    password() {
      var args = Array.from(arguments)
      var password = _.get(args, '[0]')

      if (!_.isString(password))
        return this

      _.set(cfg, 'password', password)
      return this._updateConnectionInfo()
    },

    // `bearer token` and `oauth2` only
    token() {
      var args = Array.from(arguments)
      var token = _.get(args, '[0]')

      if (!_.isString(token))
        return this

      _.set(cfg, 'token', token)
      return this._updateConnectionInfo()
    },

    headers() {
      var args = Array.from(arguments)
      var headers = _.get(args, '[0]')

      if (!_.isObject(headers))
        return this

      var existing_headers = _.get(cfg, 'headers', {})
      headers = _.assign({}, existing_headers, headers)

      _.set(cfg, 'headers', headers)
      return this._updateConnectionInfo()
    },

    removeHeaders() {
      var keys = Array.from(arguments)

      // handle the case where the user passed an array of items
      // instead of just passing them as arguments
      if (keys.length == 1 && _.isArray(_.get(keys, '[0]')))
        keys = _.get(keys, '[0]', [])

      var existing_headers = _.get(cfg, 'headers', {})
      var headers = _.omit(existing_headers, keys)

      _.set(cfg, 'headers', headers)
      return this._updateConnectionInfo()
    },

    clearHeaders() {
      _.set(cfg, 'headers', {})
      return this._updateConnectionInfo()
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
        return util.debug.call(this, "The `identifier` parameter is required. Either the connection's eid or connection's alias may be used.")

      this.loading = true
      util.debug.call(this, 'Loading Connection `' + identifier + '`...')

      Flexio.http().get('/connections/' + identifier)
        .then(response => {
          var obj = _.get(response, 'data', {})
          this.connection = _.assign({}, obj)
          this.loading = false
          util.debug.call(this, 'Connection Loaded.')

          // sync the config with the result
          this._updateConfig()

          if (typeof callback == 'function')
            callback.call(this, null, obj)
        })
        .catch(error => {
          this.loading = false
          util.debug.call(this, 'Connection Load Failed.')

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

      if (_.isObject(params) && !_.isFunction(params))
      {
        _.assign(this.connection, _.pick(params, ['name', 'description', 'ename']))
        callback = _.get(args, '[1]')
      }

      this.saving = true
      util.debug.call(this, 'Saving Connection `' + _.get(this.connection, 'name', 'Untitled Connection') + '`...')

      Flexio.http().post('/connections', this.connection)
        .then(response => {
          var connection = _.get(response, 'data', {})
          this.connection = _.assign({}, connection)
          this.saving = false
          util.debug.call(this, 'Connection Saved.')

          if (typeof callback == 'function')
            callback.call(this, null, this.connection)
        })
        .catch(error => {
          this.saving = false
          util.debug.call(this, 'Connection Save Failed.')

          if (typeof callback == 'function')
            callback.call(this, error, null)
        })

      return this
    },

    _updateConnectionInfo() {
      var info = _.pick(cfg, ['url', 'auth', 'headers'])

      // update headers based on auth information
      switch (cfg.auth)
      {
        case 'bearer':
        case 'oauth2':
          _.set(info, 'headers.Authorization', 'Bearer ' + cfg.token)
          break

        case 'basic':
          var token = toBase64(cfg.username + ':' + cfg.password)
          _.set(info, 'headers.Authorization', 'Basic ' + token)
          break
      }

      _.set(this.connection, 'connection_info', info)
      return this
    },

    _updateConfig() {
      return this
    }
  })

  return retval
}
