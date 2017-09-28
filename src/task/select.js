import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_SELECT } from '../constants/task-type'

// task definition function
var select = function() {
  var type = TASK_TYPE_SELECT
  var columns = Array.from(arguments)

  // handle the case where the user passed an array of items
  // instead of just passing them as arguments
  if (columns.length == 1 && _.isArray(_.get(columns, '[0]')))
    columns = _.get(columns, '[0]', [])

  return {
    type,
    params: {
      columns
    }
  }
}

export default select
