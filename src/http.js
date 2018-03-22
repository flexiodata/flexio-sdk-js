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

    this.request = function(params) {

        var finalurl = _.get(this.options, 'baseURL', '')

        var url = _.get(params, 'url', '')

        if (url.indexOf('://') != -1) {
            finalurl = url
        } else {
            url = (url.substr(0,1) == '/' ? url.substr(1) : url)
            if (finalurl.slice(-1) != '/') {
                finalurl += '/'
            }
            finalurl += url
        }

        params = _.assign({}, params, { url: finalurl })

        if (util.isNodeJs()) {
            return require('./http-node').apply(this, [ params ])
        } else {
            return require('./http-xhr').apply(this, [ params ])
        }
    }



}


module.exports = {
    create: function(params) {
        return new HttpClient(params)
    }
}