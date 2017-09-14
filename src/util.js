export default {
  debug(msg) {
    if (!window)
      return

    // TODO: add config flag for 'debug' mode

    var msg = 'Flex.io Javascript SDK: ' + msg
    window.console ? console.log(msg) : alert(msg)

    return this
  }
}
