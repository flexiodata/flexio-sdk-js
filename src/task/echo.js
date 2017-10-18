import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_ECHO } from '../constants/task-type'

// task definition function
var echo = function(msg) {
  var type = TASK_TYPE_ECHO

  return {
    type,
    params: {
      msg
    }
  }
}

export default echo
