
util = {}
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

util.arrayBufferToString = function(buf) {

  if (this.isNodeJs()) {
    return buf.toString('utf-8')
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

module.exports.getUtilObject = function(Flexio) {

  return new function() {

    for (method in util) {
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
