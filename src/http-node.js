
var _ = require('./lodash-local')

function requestNodeJs(config) {

    if (this.options.insecure === true) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    }

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

    if (config.params) {
        var qs = require('querystring').stringify(config.params)
        options.path += (options.path.indexOf('?') < 0 ? '?'+qs:'&'+qs)
    }

    var postdata = _.get(config, 'data', null)
    if (postdata) {
        if (!options.hasOwnProperty('headers')) {
            options.headers = {}
        }
        options.headers['Content-Length'] = Buffer.byteLength(postdata)
    }


    return new Promise(function(resolve, reject) {

        var resData = []

        var req = https.request(options, function(res) {
            
            //console.log(`STATUS: ${res.statusCode}`)
            //console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
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
            
            var response = {
                status: null,
                statusText: e.code,
                headers: {},
                request: req
            }

            reject(response)
        })
        
        req.end(postdata)
    }) // promise
}



module.exports = requestNodeJs
