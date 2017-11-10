import _ from 'lodash'
import util from './util'
import Flexio from './flexio'

var method_types = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
var allowed_auth = ['', 'basic', 'bearer', 'oauth2']

function toBase64(str) {
  try { return btoa(unescape(encodeURIComponent(str))) } catch(e) { return '' }
}

function fromBase64(str) {
  try { return decodeURIComponent(escape(atob(str))) } catch(e) { return '' }
}

export default () => {

  if (!(this instanceof Flexio.connection)) {
    return new Flexio.connection


  var retval = _.assign(this, {
    // -- state --

    connection: {
      name: 'Javascript SDK Connection',
      description: 'This connection was created using the Flex.io Javascript SDK',
      connection_info: {
        method: '',        // request method
        url: '',           // base url for all calls that will use this connection
        auth: '',          // ``, `basic`, `bearer`, `oauth2`
        username: '',      // `basic auth` only
        password: '',      // `basic auth` only
        token: '',         // `bearer token` only
        access_token: '',  // `oauth2` only
        refresh_token: '', // `oauth2` only
        expires: '',       // `oauth2` only
        data: {},          // form data for POST
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

    method() {
      var args = Array.from(arguments)
      var method = _.get(args, '[0]')

      if (!_.isString(method))
        return this

      if (!_.includes(method_types, method))
        return this

      return this._setInfo('method', method)
    },

    url() {
      var args = Array.from(arguments)
      var url = _.get(args, '[0]')

      if (!_.isString(url))
        return this

      return this._setInfo('url', url)
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

      return this._setInfo('auth', auth)
    },

    // `basic auth` only
    username() {
      var args = Array.from(arguments)
      var username = _.get(args, '[0]')

      if (!_.isString(username))
        return this

      return this._setInfo('username', username)
    },

    // `basic auth` only
    password() {
      var args = Array.from(arguments)
      var password = _.get(args, '[0]')

      if (!_.isString(password))
        return this

      return this._setInfo('password', password)
    },

    // `bearer token` only
    token() {
      var args = Array.from(arguments)
      var token = _.get(args, '[0]')

      if (!_.isString(token))
        return this

      return this._setInfo('token', token)
    },

    // `oauth2` only
    accessToken() {
      var args = Array.from(arguments)
      var token = _.get(args, '[0]')

      if (!_.isString(token))
        return this

      return this._setInfo('access_token', token)
    },

    // `oauth2` only
    refreshToken() {
      var args = Array.from(arguments)
      var token = _.get(args, '[0]')

      if (!_.isString(token))
        return this

      return this._setInfo('refresh_token', token)
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

      return this._setInfo('expires', expires)
    },

    data() {
      var args = Array.from(arguments)
      var data = _.get(args, '[0]')

      if (!_.isPlainObject(data))
        return this

      var existing_data = this._getInfo('data', {})
      data = _.assign({}, existing_data, data)

      return this._setInfo('data', data)
    },

    clearData() {
      var keys = Array.from(arguments)

      // no arguments; clear all form data
      if (keys.length == 0)
        return this._setInfo('data', {})

      // handle the case where the user passed an array of items
      // instead of just passing them as arguments
      if (keys.length == 1 && _.isArray(_.get(keys, '[0]')))
        keys = _.get(keys, '[0]', [])

      var existing_data = this._getInfo('data', {})
      var data = _.omit(existing_data, keys)

      return this._setInfo('data', data)
    },

    headers() {
      var args = Array.from(arguments)
      var headers = _.get(args, '[0]')

      if (!_.isPlainObject(headers))
        return this

      var existing_headers = this._getInfo('headers', {})
      headers = _.assign({}, existing_headers, headers)

      return this._setInfo('headers', headers)
    },

    clearHeaders() {
      var keys = Array.from(arguments)

      // no arguments; clear all headers
      if (keys.length == 0)
        return this._setInfo('headers', {})

      // handle the case where the user passed an array of items
      // instead of just passing them as arguments
      if (keys.length == 1 && _.isArray(_.get(keys, '[0]')))
        keys = _.get(keys, '[0]', [])

      var existing_headers = this._getInfo('headers', {})
      var headers = _.omit(existing_headers, keys)

      return this._setInfo('headers', headers)
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
  })

  return retval
}
