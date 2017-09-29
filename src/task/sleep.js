import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_SLEEP } from '../constants/task-type'

// task definition function
var sleep = function(value) {
  var type = TASK_TYPE_SLEEP
  value = _.defaultTo(value, 10)

  return {
    type,
    params: {
      value
    }
  }
}

export default sleep
