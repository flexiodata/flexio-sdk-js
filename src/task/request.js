import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_REQUEST } from '../constants/task-type'

// task definition function
var request = function() {
  var type = TASK_TYPE_REQUEST
  var args = Array.from(arguments)
  var params = _.get(args, '[0]', {})

  // defaults
  params = _.assign({
    method: 'GET'
  }, params)

  return {
    type,
    params
  }
}

export default request
