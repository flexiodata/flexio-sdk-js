import newPipe from './pipe'

var auth_token = ''

export default {
  version() {
    return VERSION
  },
  setup(token) {
    auth_token = token
  },
  pipe(params) {
    return newPipe(auth_token, params)
  }
}
