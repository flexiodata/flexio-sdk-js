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

  var retval = _.assign({}, {
    // -- state --

    connection: {
      name: 'Javascript SDK Connection',
      description: 'This connection was created using the Flex.io Javascript SDK',
      connection_info: {
        url: '',           // base url for all calls that will use this connection
        auth: '',          // ``, `basic`, `bearer`, `oauth2`
        username: '',      // `basic auth` only
        password: '',      // `basic auth` only
        token: '',         // `bearer token` only
        access_token: '',  // `oauth2` only
        refresh_token: '', // `oauth2` only
        expires: '',       // `oauth2` only
        headers: {}        // custom request headers
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

      this._setInfo('url', url)
      return this
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

      this._setInfo('auth', auth)
      return this
    },

    // `basic auth` only
    username() {
      var args = Array.from(arguments)
      var username = _.get(args, '[0]')

      if (!_.isString(username))
        return this

      this._setInfo('username', username)
      return this
    },

    // `basic auth` only
    password() {
      var args = Array.from(arguments)
      var password = _.get(args, '[0]')

      if (!_.isString(password))
        return this

      this._setInfo('password', password)
      return this
    },

    // `bearer token` only
    token() {
      var args = Array.from(arguments)
      var token = _.get(args, '[0]')

      if (!_.isString(token))
        return this

      this._setInfo('token', token)
      return this
    },

    // `oauth2` only
    accessToken() {
      var args = Array.from(arguments)
      var token = _.get(args, '[0]')

      if (!_.isString(token))
        return this

      this._setInfo('access_token', token)
      return this
    },

    // `oauth2` only
    refreshToken() {
      var args = Array.from(arguments)
      var token = _.get(args, '[0]')

      if (!_.isString(token))
        return this

      this._setInfo('refresh_token', token)
      return this
    },

    // `oauth2` only
    expires() {
      var args = Array.from(arguments)
      var expires = _.get(args, '[0]')

      // cast numbers to a string
      if (_.isNumber(expires))
        expires = '' + expires

      if (!_.isString(expires))
        return this

      this._setInfo('expires', expires)
      return this
    },

    headers() {
      var args = Array.from(arguments)
      var headers = _.get(args, '[0]')

      if (!_.isPlainObject(headers))
        return this

      var existing_headers = this._getInfo('headers', {})
      headers = _.assign({}, existing_headers, headers)

      this._setInfo('headers', headers)
      return this
    },

    removeHeaders() {
      var keys = Array.from(arguments)

      // handle the case where the user passed an array of items
      // instead of just passing them as arguments
      if (keys.length == 1 && _.isArray(_.get(keys, '[0]')))
        keys = _.get(keys, '[0]', [])

      var existing_headers = this._getInfo('headers', {})
      var headers = _.omit(existing_headers, keys)

      this._setInfo('headers', headers)
      return this
    },

    clearHeaders() {
      this._setInfo('headers', {})
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
        return util.debug.call(this, "The `identifier` parameter is required. Either the connection's eid or connection's alias may be used.")

      this.loading = true
      util.debug.call(this, 'Loading Connection `' + identifier + '`...')

      Flexio.http().get('/connections/' + identifier)
        .then(response => {
          var connection = _.get(response, 'data', {})
          this.connection = _.assign({}, connection)
          this.loading = false
          util.debug.call(this, 'Connection Loaded.')

          if (typeof callback == 'function')
            callback.call(this, null, connection)
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

      if (_.isPlainObject(params))
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

    _getInfo(key, default_val) {
      return _.get(this.connection, 'connection_info.'+key, default_val)
    },

    _setInfo(key, val) {
      _.set(this.connection, 'connection_info.'+key, val)
      return this
    }

    /*
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
      var info = _.get(this.connection, 'connection_info', {})
      info = _.pick(info, ['url', 'auth', 'headers'])

      var url = _.get(info, 'url', '')
      var auth = _.get(info, 'auth', '')
      var headers = _.get(info, 'headers', '')
      var username = ''
      var password = ''
      var token = ''

      switch (auth)
      {
        case 'bearer':
        case 'oauth2':
          var auth_header = _.get(info, 'headers.Authorization', '')

          if (auth_header.length > 0)
          {
            var keypair = auth_header.split(' ', 2)
            if (keypair.length == 2)
              token = keypair[1]
          }
          break

        case 'basic':
          var auth_header = _.get(info, 'headers.Authorization', '')

          if (auth_header.length > 0)
          {
            auth_header = fromBase64(auth_header)

            var keypair = auth_header.split(':', 2)
            if (keypair.length == 2)
            {
              username = keypair[0]
              password = keypair[1]
            }
          }
          break
      }

      // remove the authorization header from the headers object since
      // it is automatically built up based on the config settings
      headers = _.omit(headers, ['Authorization'])

      cfg = _.assign({}, {
        url,
        auth,
        headers,
        username,
        password,
        token
      })

      return this
    }
    */
  })

  return retval
}
