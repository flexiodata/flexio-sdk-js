import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_LIST } from '../constants/task-type'

// task definition function
var list = function(path) {
  var type = TASK_TYPE_LIST

  return {
    type,
    params: {
      path
    }
  }
}

export default list
