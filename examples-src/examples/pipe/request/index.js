import get_simple from './get-simple'
import get_with_params from './get-with-params'
import post_simple from './post-simple'
import get_simple_from_connection from './get-simple-from-connection'

export default {
  title: 'Request',
  description: '',
  items: [
    get_simple,
    get_with_params,
    get_simple_from_connection,
    post_simple
  ]
}
