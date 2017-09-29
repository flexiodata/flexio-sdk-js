import _ from 'lodash'
import util from '../util'

import { TASK_TYPE_EMAIL_SEND } from '../constants/task-type'

// task definition function
var email = function(to, subject, body_text, body_html, data) {
  var type = TASK_TYPE_EMAIL_SEND

  if (_.isNil(to))
    return util.debug.call(this, 'The `to` parameter is required')

  if (_.isNil(subject))
    return util.debug.call(this, 'The `subject` parameter is required')

  if (_.isNil(body_text))
    return util.debug.call(this, 'The `body_text` parameter is required')

  // `to` parameter must be an array
  if (!_.isArray(to))
    to = [to]

  if (_.isNil(body_html))
    body_html = body_text

  if (data != 'body' && data != 'attachment')
    data = 'none'

  return {
    type,
    params: {
      to,
      subject,
      body_text,
      body_html,
      data
    }
  }
}

export default email
