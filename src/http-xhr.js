var _ = require('./lodash-local')

function requestXHR(config) {

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


    var headers = _.assign({}, _.get(this.options, 'headers', {}), _.get(config, 'headers', {}))
    var postdata = _.get(config, 'data', null)

    if ((typeof FormData !== 'undefined') && (postdata instanceof FormData)) {
        delete headers['Content-Type'] // browser will take care of setting this
    }

    var url = config.url
    if (config.params) {
        var qs = Object.keys(config.params).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(config.params[k]) }
        ).join('&')
        url += (url.indexOf('?') < 0 ? '?'+qs:'&'+qs)
    }

    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest()
        xhr.open(config.method.toUpperCase(), url, true)
        
        if (config.responseType) {
            xhr.responseType = config.responseType
        }

        if (Object.keys(headers).length > 0) {
            for (var k in headers) {
                if (headers.hasOwnProperty(k)) {
                    xhr.setRequestHeader(k, headers[k])
                }
            }
        }

        function getResData(req) {
            var resData = !config.responseType || config.responseType === 'text' ? req.responseText : req.response
            if (typeof resData === 'string') {
                try { resData = JSON.parse(resData) } catch(e) { }
            }
            return resData
        }

        xhr.onload = function () {

            var resData = getResData(xhr)

            var response = {
                data: resData,
                status: xhr.status === 1223 ? 204 : xhr.status, // IE sends 1223 instead of 204
                statusText: xhr.status === 1223 ? 'No Content' : xhr.statusText,
                headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
                config: config,
                request: xhr
            }

            resolve(response)
        
            xhr = null
        }

        xhr.onerror = function handleError() {

            var resData = getResData(xhr)

            var response = {
                data: resData,
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
                config: config,
                request: xhr
            }

            reject(response)

            xhr = null
        }

        xhr.send(postdata)

        // xhr.send('string');
        // xhr.send(new Blob());
        // xhr.send(new Int8Array());
        // xhr.send({ form: 'data' });
        // xhr.send(document);

    }) // promise
}


module.exports = requestXHR
