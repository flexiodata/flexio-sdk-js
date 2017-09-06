import pipe from './pipe'

var auth_token = ''

export default {
  version() {
    return VERSION
  },
  setup(token) {
    auth_token = token
  },
  pipe() {
    return pipe(auth_token)
  }
}
