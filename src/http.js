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
            return this.requestNodeJs(params)
        } else {
            return this.requestXHR(params)
        }
    }

    this.requestNodeJs = function(config) {

        var https = this.hasOwnProperty('https') ? this.https : null;
        if (https === null) {
            https = this.https = require('https')
        }

        var URL = require('url').URL
        var url = new URL(_.get(config, 'url', ''), _.get(this.options, 'baseUrl', undefined))

        var options = {
            method: config.hasOwnProperty('method') ? config.method.toUpperCase() : 'GET',
            port: (url.port ? url.port : 443),
            host: url.hostname,
            path: url.pathname,
            encoding: null
        }

        var headers = _.assign({}, _.get(this.options, 'headers', {}), _.get(config, 'headers', {}))
        if (Object.keys(headers).length > 0) {
            options.headers = headers
        }

        var content_type = null
        var postdata = _.get(config, 'data', null)
        if (_.isPlainObject(postdata)) {
            postdata = JSON.stringify(postdata)
            content_type = 'application/json'
        }
        if (postdata) {
            if (!options.hasOwnProperty('headers')) {
                options.headers = {}
            }
            if (content_type) {
                options.headers['Content-Type'] = content_type
            }
            options.headers['Content-Length'] = Buffer.byteLength(postdata)
        }



        //console.log(options)

        return new Promise(function(resolve, reject) {

            var resData = []

            var req = https.request(options, function(res) {
                
             //console.log(`STATUS: ${res.statusCode}`)
            // console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
               // res.setEncoding('binary')

                var response = {
                    status: res.statusCode,
                    statusText: res.statusMessage,
                    headers: res.headers,
                    request: req
                }

                res.on('data', (chunk) => {
                    //console.log(`BODY: ${chunk}`)
                    resData.push(chunk)
                })
                res.on('end', () => {
                    // no more data in response
                    resData = Buffer.concat(resData)

                    if (config.responseType !== 'arraybuffer') {
                        resData = resData.toString(config.responseEncoding);
                    }
                    //console.log("ONEND " + resData)
                    if (typeof resData === 'string') {
                        try { resData = JSON.parse(resData) } catch(e) { }
                    }
                    response.data = resData
                    resolve(response)
                })
            })

            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`)
            })
            
            req.end(postdata)
        }) // promise
    }




    this.requestXHR = function(config) {

        console.log("requestXHR")
        
        function parseResponseHeaders(headerstr) {
            var headers = {};
            var pairs = headerstr ? headerstr.split('\u000d\u000a') : []
            for (var i = 0, len = pairs.length; i < len; i++) {
                var comma = pairs[i].indexOf(':');
                if (comma > 0) {
                    headers[pairs[i].substr(0, comma).trim()] = pairs[i].substr(comma+1).trim()
                }
            }
            return headers
        }

        var requestData = config.data
        var requestHeaders = config.headers
    
        if ((typeof FormData !== 'undefined') && (requestData instanceof FormData)) {
            delete requestHeaders['Content-Type'] // browser will take care of setting this
        }

        return new Promise(function(resolve, reject) {

            console.log("URL " + config.url)

            var xhr = new XMLHttpRequest()
            xhr.open(config.method.toUpperCase(), config.url, true)
            
            if (config.responseType) {
              //  xhr.responseType = config.responseType
            }

            xhr.onload = function () {

                var resData = !config.responseType || config.responseType === 'text' ? xhr.responseText : xhr.response

                console.log(resData)

                if (typeof resData === 'string') {
                    try { resData = JSON.parse(resData) } catch(e) { }
                }

                var response = {
                    data: resData,
                    status: xhr.status === 1223 ? 204 : xhr.status, // IE sends 1223 instead of 204
                    statusText: xhr.status === 1223 ? 'No Content' : xhr.statusText,
                    headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
                    config: config,
                    request: xhr
                }

                resolve(response)
            }

            xhr.send(requestData)
            // xhr.send('string');
            // xhr.send(new Blob());
            // xhr.send(new Int8Array());
            // xhr.send({ form: 'data' });
            // xhr.send(document);

        }) // promise
    }


}


module.exports = {
    create: function(params) {
        return new HttpClient(params)
    }
}