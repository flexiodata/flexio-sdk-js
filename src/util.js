
var util = {}
module.exports = util


util.isPipeObject = function(obj) {
  return (typeof obj === 'object' && obj.hasOwnProperty('pipe') && typeof obj.pipe === 'object')
}

util.isPipeJson = function(obj) {
  return (typeof obj === 'object' && obj.hasOwnProperty('op') && obj.hasOwnProperty('params'))
}

util.isNodeJs = function() {
  return (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]')
}

util.toBase64 = function(str) {
  try {
    if (util.isNodeJs()) {
      return Buffer(str,'utf8').toString('base64')
    } else {
      return btoa(unescape(encodeURIComponent(str)))
    }
  }
  catch(e) {
    return e
  }
}

util.fromBase64 = function(str) {
  try {
    if (util.isNodeJs()) {
      return Buffer.from(str, 'base64').toString('utf8')
    } else {
      return decodeURIComponent(escape(atob(str)))
    }
  }
  catch(e) {
    return e
  }
}

util.queryString = function(obj) {
  if (util.isNodeJs()) {
    return require('querystring').stringify(obj)
  } else {
    return Object.keys(obj).map(
      function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&')
  }
}


util.arrayBufferToString = function(buf) {

  if (this.isNodeJs()) {
    if (buf instanceof Buffer) {
      return buf.toString('utf-8')
    } else {
      return Buffer.from(buf).toString('utf-8')
    }
  } else {
    if ("TextDecoder" in window) {
      return (new TextDecoder('utf-8')).decode(buf)
    } else {
      var uint8arr = new Uint8Array(buf)
      var utf8str = ''
      var i, len = uint8arr.length
      for (i = 0; i < len; ++i) {
        utf8str += String.fromCharCode(uint8arr[i]);
      }
      return decodeURIComponent(escape(utf8str));
    }
  }
}

// for simultaneous support of promise and errback callbacks
util.callbackAdapter = function(err, response, resolve, reject, callback) {
  if (typeof callback == 'function') {
    callback(err, response)
  }
   else {
    if (err) {
      reject(err)
    } else {
      resolve(response)
    }
  }
}

util.getTaskParams = function(task) {
  var ret = JSON.parse(JSON.stringify(task))
  delete ret['op']
  delete ret['eid']
  return ret
}

module.exports.getUtilObject = function(Flexio) {

  return new function() {

    for (var method in util) {
      if (util.hasOwnProperty(method)) {
        this[method] = util[method]
      }
    }

    this.debug = function(msg) {
      var cfg = Flexio.getConfig()
      if (cfg.debug) {
        var msg = 'flexio-sdk-js: ' + msg
        //this.isNodeJs() ? console.log(msg) : alert(msg)
        console.log(msg)
      }
      return this
    }

  }
}
