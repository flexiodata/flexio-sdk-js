import pipe from './pipe'
import pipes from './pipes'
import connections from './connections'

var auth_token = ''

export default {
  version() {
    // see `../build/webpack.dist.js`
    return VERSION
  },

  setup(token) {
    auth_token = token
  },

  pipe() {
    return pipe(auth_token)
  },

  pipes() {
    return pipes(auth_token)
  },

  connections() {
    return connections(auth_token)
  }
}
