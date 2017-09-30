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
  }
}
