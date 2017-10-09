import * as types from './task-type'

/* task info */

const CALC_FIELD = {
  name: 'Calculation',
  type: types.TASK_TYPE_CALC,
  icon: 'flash_on',
  bg_color: 'bg-task-green'
}

const COMMENT = {
  name: 'Comment',
  type: types.TASK_TYPE_COMMENT,
  icon: 'comment',
  bg_color: 'bg-task-blue'
}

const CONVERT = {
  name: 'Convert',
  type: types.TASK_TYPE_CONVERT,
  icon: 'settings',
  bg_color: 'bg-task-blue'
}

const COPY = {
  name: 'Copy',
  type: types.TASK_TYPE_COPY,
  icon: 'content_copy',
  bg_color: 'bg-task-orange'
}

const CUSTOM = {
  name: 'Custom',
  type: types.TASK_TYPE_CUSTOM,
  icon: 'build',
  bg_color: 'bg-task-orange'
}

const DISTINCT = {
  name: 'Distinct',
  type: types.TASK_TYPE_DISTINCT,
  icon: 'clear_all',
  bg_color: 'bg-task-green'
}

const DUPLICATE = {
  name: 'Duplicate',
  type: types.TASK_TYPE_DUPLICATE,
  icon: 'content_copy',
  bg_color: 'bg-task-green'
}

const EMAIL_SEND = {
  name: 'Email',
  type: types.TASK_TYPE_EMAIL_SEND,
  icon: 'mail_outline',
  bg_color: 'bg-task-blue'
}

const EXECUTE = {
  name: 'Execute',
  type: types.TASK_TYPE_EXECUTE,
  icon: 'code',
  bg_color: 'bg-task-purple'
}

const FIND_REPLACE = {
  name: 'Find/Replace',
  type: types.TASK_TYPE_FIND_REPLACE,
  icon: 'find_replace',
  bg_color: 'bg-task-orange'
}

const FILTER = {
  name: 'Filter',
  type: types.TASK_TYPE_FILTER,
  icon: 'filter_list',
  bg_color: 'bg-task-green'
}

const GROUP = {
  name: 'Group',
  type: types.TASK_TYPE_GROUP,
  icon: 'functions',
  bg_color: 'bg-task-green'
}

const INPUT = {
  name: 'Input',
  type: types.TASK_TYPE_INPUT,
  icon: 'input',
  bg_color: 'bg-task-blue'
}

const LIMIT = {
  name: 'Limit',
  type: types.TASK_TYPE_LIMIT,
  icon: 'play_for_work',
  bg_color: 'bg-task-green'
}

const LIST = {
  name: 'List',
  type: types.TASK_TYPE_LIST,
  icon: 'play_for_work',
  bg_color: 'bg-task-green'
}

const MERGE = {
  name: 'Merge',
  type: types.TASK_TYPE_MERGE,
  icon: 'call_merge',
  bg_color: 'bg-task-green'
}

const NOP = {
  name: 'No Op.',
  type: types.TASK_TYPE_NOP,
  icon: 'build',
  bg_color: 'bg-task-orange'
}

const OUTPUT = {
  name: 'Output',
  type: types.TASK_TYPE_OUTPUT,
  icon: 'input',
  bg_color: 'bg-task-blue'
}

const PROMPT = {
  name: 'Prompt',
  type: types.TASK_TYPE_PROMPT,
  icon: 'info_outline',
  bg_color: 'bg-task-blue'
}

const R = {
  name: 'R',
  type: types.TASK_TYPE_R,
  icon: '',
  bg_color: 'bg-task-purple'
}

const RENAME = {
  name: 'Rename',
  type: types.TASK_TYPE_RENAME,
  icon: 'edit',
  bg_color: 'bg-task-orange'
}

const REQUEST = {
  name: 'Request',
  type: types.TASK_TYPE_REQUEST,
  icon: 'http',
  bg_color: 'bg-task-blue'
}

const SEARCH = {
  name: 'Search',
  type: types.TASK_TYPE_SEARCH,
  icon: 'search',
  bg_color: 'bg-task-green'
}

const SELECT = {
  name: 'Select',
  type: types.TASK_TYPE_SELECT,
  icon: 'view_carousel',
  bg_color: 'bg-task-orange'
}

const SORT = {
  name: 'Sort',
  type: types.TASK_TYPE_SORT,
  icon: 'sort_by_alpha',
  bg_color: 'bg-task-green'
}

const TRANSFORM = {
  name: 'Transform',
  type: types.TASK_TYPE_TRANSFORM,
  icon: 'transform',
  bg_color: 'bg-task-orange'
}

/* exports */

//export const TASK_INFO_CALC_FIELD    = CALC_FIELD
export const TASK_INFO_COMMENT       = COMMENT
export const TASK_INFO_CONVERT       = CONVERT
//export const TASK_INFO_COPY          = COPY
//export const TASK_INFO_CUSTOM        = CUSTOM
//export const TASK_INFO_DISTINCT      = DISTINCT
//export const TASK_INFO_DUPLICATE     = DUPLICATE
export const TASK_INFO_EMAIL_SEND    = EMAIL_SEND
export const TASK_INFO_EXECUTE       = EXECUTE
//export const TASK_INFO_FIND_REPLACE  = FIND_REPLACE
//export const TASK_INFO_FILTER        = FILTER
//export const TASK_INFO_GROUP         = GROUP
export const TASK_INFO_INPUT         = INPUT
export const TASK_INFO_LIMIT         = LIMIT
//export const TASK_INFO_MERGE         = MERGE
//export const TASK_INFO_NOP           = NOP
export const TASK_INFO_OUTPUT        = OUTPUT
//export const TASK_INFO_PROMPT        = PROMPT
//export const TASK_INFO_R             = R
//export const TASK_INFO_RENAME        = RENAME
export const TASK_INFO_REQUEST       = REQUEST
//export const TASK_INFO_SEARCH        = SEARCH
//export const TASK_INFO_SELECT        = SELECT
//export const TASK_INFO_SORT          = SORT
//export const TASK_INFO_TRANSFORM     = TRANSFORM
