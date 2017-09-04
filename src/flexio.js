import newPipe from './pipe'

export default {
  version() {
    return 'Flex.io Javascript SDK v' + VERSION
  },
  pipe() {
    return newPipe()
  }
}
