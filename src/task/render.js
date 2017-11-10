import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_RENDER } from '../constants/task-type'

// task definition function
var render = function(url, options) {
  var type = TASK_TYPE_RENDER
  var args = Array.from(arguments)
  var url = _.get(args, '[0]', '')
  var params = _.get(args, '[1]', {})

  var defaults = {
    format: 'png',
    width: 800,
    height: 600,
    scrollbars: false
  }

  if (_.isNil(url))
    return util.debug.call(this, 'The `url` parameter is required')

  if (_.isPlainObject(_.get(args, '[0]', {})))
  {
    var params = _.get(args, '[0]', {})
  }
   else
  {
    var params = _.assign({}, defaults, options, { url })
  }

  console.log(params)
  
  return {
    type,
    params
  }
}

export default render
