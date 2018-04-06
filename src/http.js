var _ = require('./lodash-local')
var util = require('./util')

function HttpClient(options) {

    this.options = _.isPlainObject(options) ? options : {}

    this.post = function(url, data, config) {
        return this.request(_.assign(config || {}, { method:'POST', url, data }))
    }

    this.get = function(url, config) {
        return this.request(_.assign(config || {}, { method:'GET', url }))
    }

    this.isFormData = function(val) {
        return (typeof FormData !== 'undefined') && (val instanceof FormData)
    }

    this.isBlob = function(val) { 
        return (typeof Blob !== 'undefined') && (val instanceof Blob)
    }

    this.isStream = function(val) {
        return val !== null && typeof val === 'object' && typeof val.pipe === 'function'
    }

    this.request = function(config) {

        var finalurl = _.get(this.options, 'baseURL', '')

        var url = _.get(config, 'url', '')

        if (url.indexOf('://') != -1) {
            finalurl = url
        } else {
            url = (url.substr(0,1) == '/' ? url.substr(1) : url)
            if (finalurl.slice(-1) != '/') {
                finalurl += '/'
            }
            finalurl += url
        }

        config = _.assign({}, config, { url: finalurl })

        function setContentTypeNotSet(value) {
            if (!_.has(config,'headers')) {
                config.headers = {}
            }
            if (!_.has(config.headers,'Content-Type')) {
                config.headers['Content-Type'] = value
            }
        }

        var data = _.get(config, 'data', null)

        if (this.isFormData(data) || this.isBlob(data) || this.isStream(data) || data instanceof ArrayBuffer)
        {}
        else if (data !== null && typeof data === 'object')
        {
            config.data = JSON.stringify(data)
            setContentTypeNotSet('application/json')
        }
        else
        {
            var m = _.get(config,'method','').toUpperCase()
            if (m == 'POST' || m == 'PUT' || m == 'PATCH') {
                setContentTypeNotSet('application/x-www-form-urlencoded')
            }
        }

        if (util.isNodeJs()) {
            return require('./http-node').apply(this, [ config ])
        } else {
            return require('./http-xhr').apply(this, [ config ])
        }
    }



}


module.exports = {
    create: function(params) {
        return new HttpClient(params)
    }
}