import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_LIMIT } from '../constants/task-type'

// task definition function
var limit = function(value) {
  var type = TASK_TYPE_LIMIT
  value = _.defaultTo(value, 10)

  return {
    type,
    params: {
      value
    }
  }
}

export default limit
