
module.exports = {}
module.exports.getUtilObject = function(Flexio) {

  return new function() {
    this.isNodeJs = function() {
      return (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]')
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

    this.arrayBufferToString = function(buf) {

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
  }
}
