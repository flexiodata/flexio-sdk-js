import newPipe from './pipe'

export default {
  version() {
    return VERSION
  },
  pipe() {
    return newPipe()
  }
}
