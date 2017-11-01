import get_simple from './get-simple'
import get_simple_shorthand from './get-simple-shorthand'
import get_with_params from './get-with-params'
import get_with_params_shorthand from './get-with-params-shorthand'
import get_simple_from_connection from './get-simple-from-connection'
import post_simple from './post-simple'
import post_to_twilio_from_connection from './post-to-twilio-from-connection'

export default {
  title: 'Request',
  description: '',
  items: [
    get_simple,
    get_simple_shorthand,
    get_with_params,
    get_with_params_shorthand,
    get_simple_from_connection,
    post_simple,
    post_to_twilio_from_connection
  ]
}
