import _ from 'lodash'
import util from './util'
import Flexio from './flexio'

export default () => {
  var retval = _.assign({}, {
    // -- state --

    connection: {
      name: 'Javascript SDK Connection',
      description: 'This connection was created using the Flex.io Javascript SDK',
      connection_info: {}
    },
    loading: false,
    saving: false,
    running: false,

    // -- methods --

    getJSON() {
      return _.assign({}, this.connection)
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

      if (_.isObject(params))
      {
        _.assign(this.connection, _.pick(params, ['name', 'description', 'ename', 'connection_info']))
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
    }
  })

  return retval
}
