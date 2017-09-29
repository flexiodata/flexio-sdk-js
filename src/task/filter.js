import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_FILTER } from '../constants/task-type'

// task definition function
var filter = function(where) {
  var type = TASK_TYPE_FILTER

  if (_.isNil(where))
    return util.debug.call(this, 'The `filter` parameter is required')

  return {
    type,
    params: {
      where
    }
  }
}

export default filter
