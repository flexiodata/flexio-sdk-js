import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_RENDER } from '../constants/task-type'

// task definition function
var render = function(url, format, options) {
  var type = TASK_TYPE_RENDER

  var defaults = {
    format: 'png',
    width: 800,
    height: 600,
    scrollbars: false
  }

  if (_.isNil(format))
    format = 'png'

  if (_.isNil(url))
    return util.debug.call(this, 'The `url` parameter is required')

  var params = _.assign({}, defaults, options, {
    url,
    format
  })

  return {
    type,
    params
  }
}

export default render
