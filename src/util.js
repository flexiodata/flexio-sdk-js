import Flexio from './flexio'

export default {
  debug(msg) {
    var cfg = Flexio.getConfig()

    if (cfg.debug !== true)
      return

    if (!window)
      return

    var msg = 'flexio-sdk-js: ' + msg
    window.console ? console.log(msg) : alert(msg)

    return this
  },

  isNodeJs() {
    return false
    return (typeof process !== 'undefined')
  },

  arrayBufferToString(buf) {

    if (this.isNodeJs()) {
      return Buffer.from(buf).toString('utf-8')
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
